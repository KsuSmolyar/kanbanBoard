import { useAuthContext } from "../../store/authStore/context"
import { Btn } from "../../UI/Btn"

export const Header = () => {
    const {logout} = useAuthContext();

    return (
        <header className="bg-white flex justify-between w-full sticky top-0 z-50 p-3">
            <h1 className="font-bold text-left text-xl">KanbanBoard</h1>
            <Btn label="Выйти" onClick={logout}/>
        </header>
    )
}
