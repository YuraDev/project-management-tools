import React from "react";
import styles from "./CustomUserIcon.module.css";

interface UserIconProps {
    title: string,
    // change for image if this is possible
    icon?: string,
    totaly?: boolean,
    size?: number,
}

const CustomUserIcon: React.FC<UserIconProps> = ({ title, icon, totaly, size=36 }) => {
    return(
        <div className={`${styles.iconBlock} ${totaly && styles.smallerText}`} style={{ width: size, height: size }}>
            { totaly ? title : title[0] } 
        </div>
    )
}

export default CustomUserIcon;