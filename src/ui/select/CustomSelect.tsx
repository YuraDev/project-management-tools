import styles from "./FormSelect.module.css";

export type SortOption = "Start date dec" | "Start date inc" | "End date dec" | "End date inc" | "none";
export const sortOptions: SortOption[] = ["Start date dec", "Start date inc", "End date dec", "End date inc", "none"];

interface CustomSelectProps {
    value: SortOption,
    onChange: (value: SortOption) => void,
    options: SortOption[],
}

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
    return <select 
        value={value} 
        onChange={(event) => onChange(event.target.value as SortOption)} 
        className={styles.customSelect}
    >
            { options.map((option) => <option value={option} key={option}>{option}</option>) }
    </select>
}

export default CustomSelect;