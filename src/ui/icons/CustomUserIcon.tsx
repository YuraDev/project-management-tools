import React from "react";
import styles from "./CustomUserIcon.module.css";
import { IconColorType, UserTheme } from "../../types/userTheme";

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

const CustomUserIcon: React.FC<UserIconProps> = ({ title, icon, backgroundColor = "purple", totaly, size=36, fontSize = 18, onClick }) => {
    return(
        <div className={`${styles.iconBlock} ${totaly && styles.smallerText}`} style={{ width: size, height: size, fontSize: fontSize, backgroundColor: backgroundColor }} onClick={() => onClick && onClick((prev) => !prev)}>
            { totaly ? title : title[0] } 
        </div>
    )
}

export default CustomUserIcon;