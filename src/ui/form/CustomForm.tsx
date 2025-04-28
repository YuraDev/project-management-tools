import React, { ReactNode } from "react";
import { useUserThemeStore } from "../../store/userThemeStore";

interface CustomFormProps {
    children: ReactNode,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    customStyles?: React.CSSProperties,
}

const CustomForm = ({ children, onSubmit, customStyles }: CustomFormProps) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return <form 
        className={`
            flex flex-col gap-4 max-w-[500px] mx-auto p-6
            border border-gray-200 rounded-xl shadow-md
            ${backgroundMode === "black" ? "bg-black text-white" : "bg-white text-gray-800"}
        `} 
        onSubmit={onSubmit} 
        style={customStyles}
    >
        { children }
    </form>
}

export default CustomForm;