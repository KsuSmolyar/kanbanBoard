export interface ICommentCardProps {
    id: string,
    author: string,
    authorId: string,
    commentBody: string,
    className: string,
    createdAt: string,
    repliedCommentAuthor?: string,
    repliedCommentContent?: string
}
