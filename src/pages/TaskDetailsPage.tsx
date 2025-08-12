import { CommentForm } from "../components/CommentForm";
import { CommentsList } from "../components/CommentsList";
import { TaskDetail } from "../components/TaskDetail";
import { CommentsStoreProvider } from "../store/commentsStore/provider";
import { BtnBack } from "../UI/BtnBack";

export const TaskDetailsPage = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto h-screen bg-gray-200">
            <BtnBack />
            <TaskDetail />
            <CommentsStoreProvider>
                <h2 className="mb-5">Оставить комментарий</h2>
                <CommentForm />
                <CommentsList />
            </CommentsStoreProvider>
        </div>
    )
}
