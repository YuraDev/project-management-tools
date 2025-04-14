import styles from "./Input.module.css";

interface FormTextInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
}

const FormTextInput = ({ name, value , onChange, required }: FormTextInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        type="text" 
        className={styles.cunstomInput}
    />
}

export default FormTextInput;