import { memo } from "react";
import styles from "./RightPanelProject.module.css";
import { useProjectControlStore } from "../../../store/projectControlStore";
import TaskAdd from "../../task/taskAdd/TaskAdd";
import TaskEdit from "../../task/taskEdit/TaskEdit";
import TaskDetails from "../../task/taskDetails/TaskDetails";

const RightPanelProject = memo(() => {
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const isEditTaskActive = useProjectControlStore((state) => state.isEditTaskActive);
    const isAddTaskActive = useProjectControlStore((state) => state.isAddTaskActive);

    return(
        <div className={styles.main}>
            {
                isAddTaskActive 
                    ? <TaskAdd/>
                    : selectedTask && (
                        isEditTaskActive
                            ? <TaskEdit/>
                            : <TaskDetails/>
                    )
            }
        </div>
    )
})

export default RightPanelProject;