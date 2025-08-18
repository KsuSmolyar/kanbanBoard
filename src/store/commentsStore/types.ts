import type { CommentItem } from "../../types/comments";


export interface ICommentStore {
    repliedCommentAuthor: string | null,
    repliedCommentId: string | null
}

// export type RepliedCommentData = {
//     [key: string]: IComment[]
// }

// export type repliedCommentIdentifiers = {
//     repliedId: string,
//     originalId: string
// }
export interface IComment {
    id: string,
    author: string,
    authorId: string,
    body: string,
    repliedCommentData?: IComment[]
}


export const commentsActions = {
    addRepliedCommentAuthorAndId: "addRepliedCommentAuthorAndId",
    removeRepliedCommentAuthor: "removeRepliedCommentAuthor",
    removeRepliedCommentId: "removeRepliedCommentId"
} as const;

export type CommentsActions = keyof typeof commentsActions;

export type CommentsActionsType = 
{ type: typeof commentsActions.addRepliedCommentAuthorAndId, payload: {author: string, id: string} } |
{ type: typeof commentsActions.removeRepliedCommentAuthor } |
{ type: typeof commentsActions.removeRepliedCommentId };


export type CommentsContextValue = {
    store: ICommentStore | null,
    actions: {
        addRepliedCommentAuthorAndId: (author: string, id: string) => void,
        removeRepliedCommentAuthor: () => void,
        removeRepliedCommentId: () => void
    },
    comments: CommentItem[],
    setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}
