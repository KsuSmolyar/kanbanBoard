export interface CommentItem {
    id: string,
    task_id: string,
    author_id: string,
    content: string,
    created_at: string,
    user_name: string,
    replied_comment_author?: string,
    replied_comment_content?: string
}
