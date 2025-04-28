import React from "react";
import { IconColorType } from "../../types/userTheme";
import { useUserThemeStore } from "../../store/userThemeStore";

interface UserIconProps {
    title: string,
    icon?: string,
    backgroundColor?: IconColorType,
    totaly?: boolean,
    size?: number,
    fontSize?: number,
    onClick?: React.Dispatch<React.SetStateAction<boolean>>,
}

const CustomUserIcon: React.FC<UserIconProps> = ({ title, icon, backgroundColor, totaly, size=36, fontSize = 18, onClick }) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    return (
        <div className="flex items-center justify-center" title={title}>
            <div
                style={{
                    width: size,
                    height: size,
                    fontSize: fontSize,
                    backgroundColor: backgroundColor ?? highlightMode,
                }}
                className={`
                    flex items-center justify-center rounded-full font-bold capitalize cursor-pointer text-[16px] 
                    bg-gray-500 text-white
                `}
                // ${totaly ? "text-[16px] bg-gray-500" : "text-white"}
                onClick={() => onClick && onClick((prev) => !prev)}
            >
                {totaly ? title : title[0]}
            </div>
        </div>
    )
}

export default CustomUserIcon;