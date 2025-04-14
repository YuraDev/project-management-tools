import React, { ReactNode } from "react";
import styles from "./CustomForm.module.css";

interface CustomFormProps {
    children: ReactNode,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    customStyles?: React.CSSProperties,
}

const CustomForm = ({ children, onSubmit, customStyles }: CustomFormProps) => {
    return <form className={styles.customForm} onSubmit={onSubmit} style={customStyles}>
        { children }
    </form>
}

export default CustomForm;