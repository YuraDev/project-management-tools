import { Check } from "lucide-react";
import { useUserThemeStore } from "../../store/userThemeStore";

interface CustomColorIconProps<T extends string> {
    backgroundColor: T,
    size?: number,
    onClick: (color: T) => void,
    currentColor: T,
}

const CustomColorIcon = <T extends string>({ backgroundColor, size=36, onClick, currentColor }: CustomColorIconProps<T>) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return(
        <div 
            style={{ 
                width: size, 
                height: size, 
                backgroundColor: backgroundColor, 
                color: backgroundColor === "white" ? "black" : "white", 
                borderColor: backgroundMode === "black" ? "white" :"black" 
            }}
            className="flex items-center justify-center rounded-full font-bold capitalize cursor-pointer box-border border"
            onClick={() => onClick(backgroundColor)}
        >
            { currentColor === backgroundColor && <Check/> }
        </div>
    )
}

export default CustomColorIcon;