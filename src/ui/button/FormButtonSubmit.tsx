import styles from "./FormButtonSubmit.module.css";

interface FormButtonSubmitProps {
    text: string,
    customStyles?: React.CSSProperties
}

const FormButtonSubmit = ({ text, customStyles }: FormButtonSubmitProps) => {
    return <button 
        type="submit" 
        className={styles.customSubmitButton} 
        style={customStyles}
    >
        {text}
    </button>
}

export default FormButtonSubmit;