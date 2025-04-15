import { TestAndProjectStatuses } from "../../store/projectControlStore";
import { ProjectStatus } from "../../types/project";
import { TaskPriority, TaskStatus } from "../../types/task";
import StatusText from "../statusText/StatusText";
import styles from "./CheckBoxStatus.module.css";

type AvaibleTypes = TestAndProjectStatuses | TaskStatus | TaskPriority;
interface CheckBoxStatusProps<T extends AvaibleTypes> {
    status: T,
    setStatusFilter: (value: T) => void,
}

const CheckBoxStatus = <T extends AvaibleTypes,>({ status, setStatusFilter }: CheckBoxStatusProps<T>) => {
    return( 
        <div className={styles.checkboxBlock}>
            <input 
                type={"checkbox"} 
                name="status" value={status} 
                style={{marginRight: 4}} 
                onChange={() => setStatusFilter(status)}
            />
            <StatusText status={status}/>
        </div>
    )
}

export default CheckBoxStatus;