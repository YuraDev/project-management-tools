import { TestAndProjectStatuses } from "../../store/projectControlStore";
import { ProjectStatus } from "../../types/project";
import { TaskStatus } from "../../types/task";
import StatusText from "../statusText/StatusText";
import styles from "./CheckBoxStatus.module.css";

interface CheckBoxStatusProps {
    status: TestAndProjectStatuses,
    setStatusFilter: (value: TestAndProjectStatuses) => void,
}
const CheckBoxStatus = ({ status, setStatusFilter }: CheckBoxStatusProps) => {

    
    return( 
        <div className={styles.checkboxBlock}>
            <input type={"checkbox"} name="status" value={status} style={{marginRight: 4}} onChange={() => setStatusFilter(status)}/>
            <StatusText status={status}/>
        </div>
    )
}

export default CheckBoxStatus;