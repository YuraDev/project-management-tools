import React from "react";
import styles from "./AuthFormLayout.module.css";

interface AuthFormLayoutProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNode,
}

const AuthFormLayout = ({ handleSubmit, children }: AuthFormLayoutProps) => {

    return <div className={styles.mainOverlay}>
        <form onSubmit={handleSubmit} className={styles.formAuth}>
            { children }
        </form>
    </div>
}

export default AuthFormLayout;