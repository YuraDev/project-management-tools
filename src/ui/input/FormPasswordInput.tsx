import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface FormPasswordInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    placeholder?: string,
    showPassword: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
}

const FormPasswordInput = ({ name, value , onChange, required, placeholder, showPassword, setShowPassword }: FormPasswordInputProps) => (
    <div className="relative">
        <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            type={showPassword ? "text" : "password"}
            className="w-full mt-1 px-2 py-1.5 rounded-lg border border-[#cbd5e1] text-sm bg-white text-black focus:outline-none pr-10"
        />
        <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
    </div>
)

export default FormPasswordInput;