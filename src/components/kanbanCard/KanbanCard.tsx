import { useTaskUsers } from "../../hooks/useTaskUsers";
import { useProjectControlStore } from "../../store/projectControlStore";
import { Task } from "../../types/task";
// @ts-ignore
import UserIconCollection from "../usersIconsCollection/usersIconsCollection";
import styles from "./Kanban.module.css";

interface KanbanCardProps {
    task: Task,
    handleOnTaskClick: (task: Task) => void,
} 

const KanbanCard = ({ task, handleOnTaskClick }: KanbanCardProps) => {
    const { data: users } = useTaskUsers(task.assignedMembers);

    return(
        <div className={styles.cardMain  + " w-full"} onClick={() => handleOnTaskClick(task)}>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            { users && <UserIconCollection size={24} users={users}/> }
        </div>
    )
}

export default KanbanCard;