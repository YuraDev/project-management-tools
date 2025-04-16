import { useTaskUsers } from "../../hooks/useTaskUsers";
import { useProjectControlStore } from "../../store/projectControlStore";
import UserIconCollection from "../usersIconsCollection/usersIconsCollection";
import styles from "./TaskDetails.module.css";
import StatusText from "../../ui/statusText/StatusText";
import RightPanelHeader from "../rightPanelHeader/RightPanelHeader";

const TaskDetails = () => {
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const { data: asignedTaskUsers } = useTaskUsers(selectedTask?.assignedMembers || []);

    const hanldleEditOpen = () => {
        setIsAddTaskActive(false);
        setIsEditTaskActive(true);
    }

    return(
        <div className={styles.main}>
            <RightPanelHeader taskTitle={selectedTask?.title || ""} setIsEditTaskActive={hanldleEditOpen} setIsRightPanelActive={setIsRightPanelActive}/>
            <h2><b>Id:</b> {selectedTask?.id}</h2>
            <h2><b>Description:</b> {selectedTask?.description}</h2>
            <h2><b>Status:</b> <StatusText status={selectedTask?.status ?? "todo"}/></h2>
            <h2><b>Assigned members:</b></h2>
            <UserIconCollection users={asignedTaskUsers || []} size={30} maxIcons={6}/>
        </div>
    )
}

export default TaskDetails;