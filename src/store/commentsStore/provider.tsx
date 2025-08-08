import { useEffect, useReducer, type ReactNode } from "react";
import { commentsActions, type CommentsActionsType, type IComment, type ICommentStore, type RepliedCommentData, type repliedCommentIdentifiers } from "./types";
import { CommentsStoreContext, initialCommentsStore } from "./context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { COMMENTS_STORE_KEY } from "../../constants";

const commentsReducer = (state: ICommentStore, action: CommentsActionsType) => {
    switch (action.type) {
        case commentsActions.add: {
            return ({
                ...state,
                comments: [
                    ...state.comments,
                    action.payload
                ]
            })
        }
        case commentsActions.remove: {
            const newComments: IComment[] = [...state.comments].filter((comment) => comment.id !== action.payload)
            const repliedCommentDataCopy: RepliedCommentData = {...state.repliedCommentData};
            const newRepliedCommentsDataArr: IComment[] = repliedCommentDataCopy[action.payload];
            if(newRepliedCommentsDataArr) {
                delete repliedCommentDataCopy[action.payload]
            }

            return ({
                ...state,
                comments: newComments,
                repliedCommentData: repliedCommentDataCopy
            })
        }
        case commentsActions.removeRepliedComment: {
            const repliedCommentDataCopy: RepliedCommentData = {...state.repliedCommentData};
            const {originalId, replyId} = action.payload;
            const repliedCommentDataArr = repliedCommentDataCopy[originalId];
            
            for(const key in repliedCommentDataCopy) {
                if(key === originalId) {
                    repliedCommentDataCopy[key] = repliedCommentDataArr.filter((comment) => comment.id !== replyId)
                }
            }

            return ({
                ...state,
                repliedCommentData: repliedCommentDataCopy
            })
        }
        case commentsActions.addRepliedCommentId: {
            return ({
                ...state,
                repliedCommentId: action.payload
            })
        }
        case commentsActions.addRepliedCommentData: {
            const repliedCommentsCopy = {...state.repliedCommentData};
            let commentId = ""

            if(typeof state.repliedCommentId === "string") {
                commentId = state.repliedCommentId
            } else if (state.repliedCommentId?.originalId) {
                const {originalId} = state.repliedCommentId
                commentId = originalId
            }

            if(repliedCommentsCopy[commentId]) {
                    repliedCommentsCopy[commentId] = [...repliedCommentsCopy[commentId], action.payload]
                } else {
                     repliedCommentsCopy[commentId] = [action.payload]
                }

            return ({
                ...state,
                repliedCommentId: null,
                repliedCommentData: repliedCommentsCopy
            })
        }
        case commentsActions.removeRepliedCommentId: {
            return ({
                ...state,
                repliedCommentId: null
            })
        }
        default:
            return state
    }
}

export const CommentsStoreProvider = ({children}: {children: ReactNode}) => {
    const [savedStore, setSavedStore] = useLocalStorage(COMMENTS_STORE_KEY, initialCommentsStore)
    const [store, dispatch] = useReducer(commentsReducer, savedStore);

    const actions = {
        addComment: (comment: IComment) => dispatch({type: commentsActions.add, payload: comment}),
        removeComment: (id: string) => dispatch({type: commentsActions.remove, payload: id}),
        addRepliedCommentId: (id: string | repliedCommentIdentifiers) => dispatch({type: commentsActions.addRepliedCommentId, payload: id}),
        addRepliedCommentData: (comment: IComment) => dispatch({type: commentsActions.addRepliedCommentData, payload: comment}),
        removeRepliedCommentId: () => dispatch({ type: commentsActions.removeRepliedCommentId}),
        removeRepliedComment: (originalId: string, replyId: string ) => dispatch({ type: commentsActions.removeRepliedComment, payload: {originalId, replyId}})
    }

    useEffect(() => {
        setSavedStore(store)
    }, [store, setSavedStore])

    return (
        <CommentsStoreContext.Provider value={{store, actions}}>
            {children}
        </CommentsStoreContext.Provider>
    )
}
