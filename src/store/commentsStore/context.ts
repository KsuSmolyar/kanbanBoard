import { createContext, useContext } from "react";
import type { CommentsContextValue, ICommentStore } from "./types";

export const initialCommentsStore: ICommentStore = {
    comments: [],
    repliedCommentId: null,
    repliedCommentData: null
}

export const CommentsStoreContext = createContext<CommentsContextValue>({
    store: initialCommentsStore,
    actions: {
        addComment: () => {},
        removeComment: () => {},
        addRepliedCommentId: () => {},
        addRepliedCommentData: () => {},
        removeRepliedCommentId: () => {}
    }
});


export const useCommentsStore = () => {
    const ctx= useContext(CommentsStoreContext);

    if(!ctx) throw new Error (`useCommentsStore использовать совместно с CommentsStoreContext`);
    
    return ctx;
}
