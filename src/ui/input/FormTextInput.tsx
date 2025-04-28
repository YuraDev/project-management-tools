interface FormTextInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    placeholder?: string,
}

const FormTextInput = ({ name, value , onChange, required, placeholder}: FormTextInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        type="text" 
        className="mt-1 px-2 py-1.5 rounded-lg border border-[#cbd5e1] text-sm bg-white text-black focus:outline-none"
        placeholder={placeholder}
    />
}

export default FormTextInput;