import { useProjectControlStore } from "../../store/projectControlStore";
import TaskAdd from "../taskAdd/TaskAdd";
import TaskDetails from "../taskDetails/TaskDetails";
import TaskEdit from "../taskEdit/TaskEdit";
import styles from "./RightPanelProject.module.css";

const RightPanelPorject = () => {
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
}

export default RightPanelPorject;