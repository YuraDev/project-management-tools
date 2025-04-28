import { ReactNode } from "react";
import { useUserThemeStore } from "../../store/userThemeStore";

interface FormLabel{
    text: string, 
    children: ReactNode,
}

const FormLabel = ({ text, children }: FormLabel) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return <label className="flex flex-col font-medium" style={{color: backgroundMode === "black" ? "white" : "#1f2937"}}>
        {text}
        {children}
    </label>
}

export default FormLabel;