import { ProjectStatus } from "../../types/project";
import { TaskPriority, TaskStatus } from "../../types/task";
import { Role } from "../../types/user";

type SelectOption = Role | ProjectStatus | TaskStatus | TaskPriority;

interface FormSelectProps<T extends SelectOption> {
    name: string, 
    value: T | undefined,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    options: T[],
}

const FormSelect = <T extends SelectOption,>({ name, value, onChange, options }: FormSelectProps<T>) => {
    return <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="mt-1 px-2 py-1 h-9 rounded-lg border border-[#cbd5e1] text-sm bg-white text-black focus:outline-none"
    >
        { options.map((option) => <option value={option} key={option}>{option}</option>) }
    </select>
}

export default FormSelect;