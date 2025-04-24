import { Check } from "lucide-react";
import styles from "./CustomColorIcon.module.css";

interface CustomColorIconProps<T extends string> {
    backgroundColor: T,
    size?: number,
    onClick: (color: T) => void,
    currentColor: T,
}

const CustomColorIcon = <T extends string>({ backgroundColor, size=36, onClick, currentColor }: CustomColorIconProps<T>) => {
    return(
        <div 
            className={`${styles.iconBlock}`} 
            style={{ width: size, height: size, backgroundColor: backgroundColor, color: backgroundColor === "white" ? "black" : "white" }} 
            onClick={() => onClick(backgroundColor)}
        >
            { currentColor === backgroundColor && <Check/> }
        </div>
    )
}

export default CustomColorIcon;