import { createContext, useContext } from "react";
import type { CommentsContextValue, ICommentStore } from "./types";

export const initialCommentsStore: ICommentStore = {
    repliedCommentAuthor: null,
    repliedCommentId: null
}

export const CommentsStoreContext = createContext<CommentsContextValue>({
    store: initialCommentsStore,
    actions: {
        addRepliedCommentAuthorAndId: () => {},
        removeRepliedCommentAuthor: () => {},
        removeRepliedCommentId: () => {}
    },
    comments: [],
    setComments: () => {}
});


export const useCommentsStore = () => {
    const ctx= useContext(CommentsStoreContext);

    if(!ctx) throw new Error (`useCommentsStore использовать совместно с CommentsStoreContext`);
    
    return ctx;
}
