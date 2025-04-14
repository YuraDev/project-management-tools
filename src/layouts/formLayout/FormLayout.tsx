import { ReactNode } from "react"
import styles from "./FormLayout.module.css";

interface FormLayoutProps {
    children: ReactNode,
}

const FormLayout = ({ children }: FormLayoutProps) => {
    return <div className={styles.formLayout}>
        { children }
    </div>
}

export default FormLayout;