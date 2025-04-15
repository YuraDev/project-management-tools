import { ProjectStatus } from "../../types/project";
import { TaskPriority, TaskStatus } from "../../types/task";
import styles from "./StatusText.module.css";

interface StatusTextProps {
    status: TaskStatus | ProjectStatus | TaskPriority
}

const statusLabels: { [key in TaskStatus | ProjectStatus | TaskPriority ]: string } = {
    todo: "Todo",
    planned: "Planned",
    in_progress: "In progress",
    completed: "Completed",
    done: "Done",
    low: "Low",
    medium: "Medium",
    high: "High",
}
const statusClasses: { [key in TaskStatus | ProjectStatus | TaskPriority]: string } = {
    todo: styles.blue,
    planned: styles.blue,
    in_progress: styles.yellow,
    completed: styles.green,
    done: styles.green,
    low: styles.green,
    medium: styles.yellow,
    high: styles.red,
}

const StatusText = ({ status }: StatusTextProps) => {
    return(
        <span className={`${styles.textBlock} ${statusClasses[status]}`}>
            {statusLabels[status]}
        </span>
    )
}

export default StatusText;