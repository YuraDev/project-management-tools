import React from "react";
import styles from "./FormButtonSubmit.module.css";
import { useUserThemeStore } from "../../store/userThemeStore";

interface CustomButtonProps {
    text: string,
    // todo - mb parse generic to extract type of value
    onClick: (value: any) => void,
    customStyles?: React.CSSProperties
}

const CustomButton = ({ text, onClick, customStyles }: CustomButtonProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    return <button
        onClick={onClick}
        className={styles.customSubmitButton} 
        style={{
            backgroundColor: highlightMode,
            ...customStyles
        }}
    >
            {text}
    </button>
}

export default CustomButton;