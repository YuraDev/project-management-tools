import { useUserThemeStore } from "../../store/userThemeStore";

interface FormButtonSubmitProps {
    text: string,
    customStyles?: React.CSSProperties,
}

const FormButtonSubmit = ({ text, customStyles }: FormButtonSubmitProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    return (
        <button
            type={"submit"} 
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

export default FormButtonSubmit;