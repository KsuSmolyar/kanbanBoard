import { useCallback, useEffect, useReducer, useState, type ReactNode } from "react";
import { commentsActions, type CommentsActionsType, type ICommentStore } from "./types";
import { CommentsStoreContext, initialCommentsStore } from "./context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { COMMENTS_STORE_KEY } from "../../constants";
import type { CommentItem } from "../../types/comments";
import { useSocket } from "../../hooks/useSocket";
import { socketActionsType } from "../../types/socketMsgTypes";

const commentsReducer = (state: ICommentStore, action: CommentsActionsType) => {
    switch (action.type) {
        case commentsActions.addRepliedCommentAuthorAndId: {
            const {author, id} = action.payload
            return ({
                ...state,
                repliedCommentId: id,
                repliedCommentAuthor: author
            })
        }
        case commentsActions.removeRepliedCommentAuthor: {
            return ({
                ...state,
                repliedCommentAuthor: null
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
    const [comments, setComments] = useState<CommentItem[]>([]);

    const actions = {
        addRepliedCommentAuthorAndId: (author: string, id: string) => dispatch({type: commentsActions.addRepliedCommentAuthorAndId, payload: {author, id}}),
        removeRepliedCommentAuthor: () => dispatch({ type: commentsActions.removeRepliedCommentAuthor}),
        removeRepliedCommentId: () => dispatch({ type: commentsActions.removeRepliedCommentId})
    }

    useSocket(useCallback((msg) => {
        if (msg.type === socketActionsType.comment_created || msg.type === socketActionsType.comment_deleted) {
            setComments(msg.payload)
        }
      },[]));

    useEffect(() => {
        setSavedStore(store)
    }, [store, setSavedStore])

    return (
        <CommentsStoreContext.Provider value={{store, actions, comments, setComments}}>
            {children}
        </CommentsStoreContext.Provider>
    )
}
