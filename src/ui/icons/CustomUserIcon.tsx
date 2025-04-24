import React from "react";
import styles from "./CustomUserIcon.module.css";
import { IconColorType, UserTheme } from "../../types/userTheme";
import { useUserThemeStore } from "../../store/userThemeStore";

interface UserIconProps {
    title: string,
    // change for image if this is possible
    icon?: string,
    backgroundColor?: IconColorType,
    totaly?: boolean,
    size?: number,
    fontSize?: number,
    onClick?: React.Dispatch<React.SetStateAction<boolean>>,
    // userTheme?: UserTheme,
}

const CustomUserIcon: React.FC<UserIconProps> = ({ title, icon, backgroundColor, totaly, size=36, fontSize = 18, onClick }) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    return(
        <div 
            className={`${styles.iconBlock} ${totaly && styles.smallerText}`} 
            style={{ width: size, height: size, fontSize: fontSize, backgroundColor: backgroundColor ? backgroundColor : highlightMode }} 
            onClick={() => onClick && onClick((prev) => !prev)}
        >
            { totaly ? title : title[0] } 
        </div>
    )
}

export default CustomUserIcon;