import React from "react";
import styles from "./FormButtonSubmit.module.css";

interface CustomButtonProps {
    text: string,
    // todo - mb parse generic to extract type of value
    onClick: (value: any) => void,
    customStyles?: React.CSSProperties
}

const CustomButton = ({ text, onClick, customStyles }: CustomButtonProps) => {
    return <button
        onClick={onClick}
        className={styles.customSubmitButton} 
        style={customStyles}
    >
            {text}
    </button>
}

export default CustomButton;