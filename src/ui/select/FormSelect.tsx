import { ProjectStatus } from "../../types/project";
import { TaskPriority, TaskStatus } from "../../types/task";
import { Role } from "../../types/user";
import styles from "./FormSelect.module.css";

interface FormSelectProps {
    name: string, 
    value: Role | ProjectStatus | TaskStatus | TaskPriority,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    options: Role[] | ProjectStatus[] | TaskStatus[],
}

const FormSelect = ({ name, value, onChange, options }: FormSelectProps) => {
    return <select name={name} value={value} onChange={onChange} className={styles.customSelect}>
            {/* todo - add one more field for user view */}
            { options.map((option) => <option value={option} key={option}>{option}</option>) }
    </select>
}

export default FormSelect;