import { BoardWithFilters } from "../components/BoardWithFilters/BoardWithFilters"

export const BoardPage = () => {
    return (
         <main className="min-h-screen bg-gray-200">
            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
                <BoardWithFilters />
            </div>
     </main>
    )
}
