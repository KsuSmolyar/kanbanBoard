export interface ICommentStore {
    comments: IComment[],
    repliedCommentId: string | repliedCommentIdentifiers | null,
    repliedCommentData?: RepliedCommentData | null
}

export type RepliedCommentData = {
    [key: string]: IComment[]
}

export type repliedCommentIdentifiers = {
    repliedId: string,
    originalId: string
}
export interface IComment {
    id: string,
    author: string,
    body: string
}


export const commentsActions = {
    add: "add",
    remove: "remove",
    addRepliedCommentId: "addRepliedCommentId",
    removeRepliedCommentId: "removeRepliedCommentId",
    removeRepliedComment: "removeRepliedComment",
    addRepliedCommentData: "addRepliedCommentData"
} as const;

export type CommentsActions = keyof typeof commentsActions;

export type CommentsActionsType = 
{ type: typeof commentsActions.add, payload: IComment} |
{ type: typeof commentsActions.remove, payload: string} |
{ type: typeof commentsActions.addRepliedCommentId, payload: string | repliedCommentIdentifiers} |
{ type: typeof commentsActions.addRepliedCommentData, payload: IComment} |
{ type: typeof commentsActions.removeRepliedCommentId } |
{ type: typeof commentsActions.removeRepliedComment, payload: { replyId: string; originalId: string } }

export type CommentsContextValue = {
    store: ICommentStore | null,
    actions: {
        addComment: (comment: IComment) => void,
        removeComment: (id: string) => void,
        addRepliedCommentId: (id: string | repliedCommentIdentifiers) => void,
        addRepliedCommentData: (comment: IComment) => void,
        removeRepliedCommentId: () => void,
        removeRepliedComment: (originalId: string, replyId: string) => void
    }
}
