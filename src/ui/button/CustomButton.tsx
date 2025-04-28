import React from "react";
import { useUserThemeStore } from "../../store/userThemeStore";

interface CustomButtonProps {
    text: string,
    onClick: (value: any) => void,
    customStyles?: React.CSSProperties
}

const CustomButton = ({ text, onClick, customStyles }: CustomButtonProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    return (
        <button
          onClick={onClick}
          className="h-10 py-2 bg-purple-700 text-white border-none rounded-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-purple-700/90"
          style={{
            backgroundColor: highlightMode,
            ...customStyles,
          }}
        >
          {text}
        </button>
    );
}

export default CustomButton;