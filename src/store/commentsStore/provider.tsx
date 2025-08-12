import { useEffect, useReducer, type ReactNode } from "react";
import { commentsActions, type CommentsActionsType, type IComment, type ICommentStore, type repliedCommentIdentifiers } from "./types";
import { CommentsStoreContext, initialCommentsStore } from "./context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { COMMENTS_STORE_KEY } from "../../constants";

const commentsReducer = (state: ICommentStore, action: CommentsActionsType) => {
    switch (action.type) {
        case commentsActions.add: {
            const {comment, taskId} = action.payload;

            return ({
                ...state,
                comments: {
                    ...state.comments,
                    [taskId]: [
                        ...(state.comments[taskId] || []),
                        comment
                    ]
                }
            })
        }
        case commentsActions.remove: {
            const {id, taskId} = action.payload;

            return ({
                ...state,
                comments: {
                    ...state.comments,
                    [taskId]: (state.comments[taskId] || []).filter(comment => comment.id !== id)
                }
            })
        }
        case commentsActions.removeRepliedComment: {
            const { taskId, originalId, replyId } = action.payload;

            const updatedTaskComments = (state.comments[taskId] || []).map(c => {
                if (c.id === originalId && c.repliedCommentData) {
                    return {
                        ...c,
                        repliedCommentData: c.repliedCommentData.filter(r => r.id !== replyId)
                    };
                }
                return c;
            });

            return {
                ...state,
                comments: {
                    ...state.comments,
                    [taskId]: updatedTaskComments
                }
            };
        }
        case commentsActions.addRepliedCommentId: {
            return ({
                ...state,
                repliedCommentId: action.payload
            })
        }
        case commentsActions.addRepliedCommentData: {
            const { taskId, comment } = action.payload;
            if (!state.repliedCommentId) return state;
            
            const updatedTaskComments = (state.comments[taskId] || []).map(c => {
                const originalId =
                    typeof state.repliedCommentId === "string"
                        ? state.repliedCommentId
                        : state.repliedCommentId?.originalId;

                if (c.id === originalId) {
                    return {
                        ...c,
                        repliedCommentData: [...(c.repliedCommentData || []), comment]
                    };
                }
                return c;
            });

            return {
                ...state,
                comments: {
                    ...state.comments,
                    [taskId]: updatedTaskComments
                },
                repliedCommentId: null
            };
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
        addComment: (comment: IComment, taskId: string) => dispatch({type: commentsActions.add, payload: {comment, taskId}}),
        removeComment: (id: string, taskId: string) => dispatch({type: commentsActions.remove, payload: {id, taskId}}),
        addRepliedCommentId: (id: string | repliedCommentIdentifiers) => dispatch({type: commentsActions.addRepliedCommentId, payload: id}),
        addRepliedCommentData: (comment: IComment, taskId: string) => dispatch({type: commentsActions.addRepliedCommentData, payload: {comment, taskId}}),
        removeRepliedCommentId: () => dispatch({ type: commentsActions.removeRepliedCommentId}),
        removeRepliedComment: (originalId: string, replyId: string, taskId: string ) => dispatch({ type: commentsActions.removeRepliedComment, payload: {originalId, replyId, taskId}})
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
