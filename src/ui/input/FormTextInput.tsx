import styles from "./Input.module.css";

interface FormTextInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    placeholder?: string,
}

const FormTextInput = ({ name, value , onChange, required, placeholder}: FormTextInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        type="text" 
        className={styles.cunstomInput}
        placeholder={placeholder}
    />
}

export default FormTextInput;