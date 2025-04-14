import { ReactNode } from "react";
import styles from "./FormLabel.module.css";

interface FormLabel{
    text: string, 
    children: ReactNode,
}

const FormLabel = ({ text, children }: FormLabel) => {
    return <label className={styles.customLabel}>
        {text}
        {children}
    </label>
}

export default FormLabel;