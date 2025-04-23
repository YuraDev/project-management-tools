import { useTaskUsers } from "../../../hooks/task/useTaskUsers";
import { Task } from "../../../types/task";
import UserIconCollection from "../../usersIconsCollection/UsersIconsCollection";
import styles from "./Kanban.module.css";

interface KanbanCardProps {
    task: Task,
    handleOnTaskClick: (task: Task) => void,
} 

const KanbanCard = ({ task, handleOnTaskClick }: KanbanCardProps) => {
    const { data: users } = useTaskUsers(task.assignedMembers);
    return(
        // <div className={styles.cardMain  + " w-full"} onClick={() => handleOnTaskClick(task)}>
        <div className={styles.cardMain  + " w-full"} onClick={() => handleOnTaskClick(task)}>
<h3 className={`text-lg font-semibold ${styles.title}`}>
  {task.title}
</h3>            
{/* <p className="text-sm text-gray-600 ">{task.description}</p> */}
            {/* <p  className={`text-sm text-gray-600 ${styles.text}`}>
{task.description}</p> */}

<p className={`text-sm text-gray-600 ${styles.description}`}>
  {task.description}
</p>
            { users && <UserIconCollection size={24} users={users}/> }
        </div>
    )
}

export default KanbanCard;