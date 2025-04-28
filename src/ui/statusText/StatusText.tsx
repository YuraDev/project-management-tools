import { ProjectStatus } from "../../types/project";
import { TaskPriority, TaskStatus } from "../../types/task";

interface StatusTextProps {
    status: TaskStatus | ProjectStatus | TaskPriority
}
const statusLabels: { [key in TaskStatus | ProjectStatus | TaskPriority ]: string } = {
    todo: "Todo",
    in_progress: "In progress",
    done: "Done",
    planned: "Planned",
    completed: "Completed",
    low: "Low",
    medium: "Medium",
    high: "High",
    none: "None",
}
const statusClasses: { [key in TaskStatus | ProjectStatus | TaskPriority]: string } = {
    todo: "bg-[#3b82f6]",
    planned: "bg-[#3b82f6]",
    in_progress: "bg-[#facc15]",
    completed: "bg-[#10b981]",
    done: "bg-[#10b981]",
    low: "bg-[#10b981]",
    medium: "bg-[#facc15]",
    high: "bg-[rgba(255,0,0,0.844)]",
    none: "bg-[rgba(128,128,128,0.751)]",
}

const StatusText = ({ status }: StatusTextProps) => {
    return(
        <span className={`px-2 py-1 rounded-md text-white ${statusClasses[status]}`} >
            {statusLabels[status]}
        </span>
    )
}

export default StatusText;