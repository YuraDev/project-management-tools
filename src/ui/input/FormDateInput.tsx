interface FormDateInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
}

const FormDateInput = ({ name, value , onChange, required = false }: FormDateInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        type="date" 
        className="mt-1 px-2 py-1.5 rounded-lg border border-[#cbd5e1] text-sm bg-white text-black focus:outline-none"
    />
}

export default FormDateInput;