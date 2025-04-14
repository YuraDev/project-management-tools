import styles from "./FormButtonSubmit.module.css";

interface FormButtonSubmitProps {
    text: string,
}

const FormButtonSubmit = ({ text }: FormButtonSubmitProps) => {
    return <button type="submit" className={styles.customSubmitButton}>{text}</button>
}

export default FormButtonSubmit;