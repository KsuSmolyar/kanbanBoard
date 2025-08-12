export interface ICommentStore {
    comments: {
        [id: string]: IComment[]
    },
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
    authorId: string,
    body: string,
    repliedCommentData?: IComment[]
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
{ type: typeof commentsActions.add, payload: {comment: IComment, taskId: string}} |
{ type: typeof commentsActions.remove, payload: {id: string, taskId: string}} |
{ type: typeof commentsActions.addRepliedCommentId, payload: string | repliedCommentIdentifiers} |
{ type: typeof commentsActions.addRepliedCommentData, payload: { taskId: string; comment: IComment } } |
{ type: typeof commentsActions.removeRepliedCommentId } |
{ type: typeof commentsActions.removeRepliedComment, payload: { taskId: string; originalId: string; replyId: string }  }

export type CommentsContextValue = {
    store: ICommentStore | null,
    actions: {
        addComment: (comment: IComment, taskId: string) => void,
        removeComment: (id: string, taskId: string) => void,
        addRepliedCommentId: (id: string | repliedCommentIdentifiers) => void,
        addRepliedCommentData: (comment: IComment, taskId: string) => void,
        removeRepliedCommentId: () => void,
        removeRepliedComment: (originalId: string, replyId: string, taskId: string) => void
    }
}
