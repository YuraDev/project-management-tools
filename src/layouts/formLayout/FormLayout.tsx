import { ReactNode } from "react"
import { useUserThemeStore } from "../../store/userThemeStore";

interface FormLayoutProps {
    children: ReactNode,
}

const FormLayout = ({ children }: FormLayoutProps) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return (
        <div 
            className="min-h-[calc(100vh-100px)] p-8" 
            style={{
                backgroundColor: backgroundMode === "black" ? "black" : "#f9f9fb", 
                color: "black",
            }}
        >
            { children }
        </div>
    );
}

export default FormLayout;