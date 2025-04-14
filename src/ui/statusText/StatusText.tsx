import { ProjectStatus } from "../../types/project";
import { TaskStatus } from "../../types/task";
import styles from "./StatusText.module.css";

interface StatusTextProps {
    status: TaskStatus | ProjectStatus
}

const statusLabels: { [key in TaskStatus | ProjectStatus ]: string } = {
    todo: "Todo",
    planned: "Planned",
    in_progress: "In progress",
    completed: "Completed",
    done: "Done",
}
const statusClasses: { [key in TaskStatus | ProjectStatus ]: string } = {
    todo: styles.blue,
    planned: styles.blue,
    in_progress: styles.yellow,
    completed: styles.green,
    done: styles.green,
}

const StatusText = ({ status }: StatusTextProps) => {
    return(
        <span className={`${styles.textBlock} ${statusClasses[status]}`}>
            {statusLabels[status]}
        </span>
    )
}

export default StatusText;