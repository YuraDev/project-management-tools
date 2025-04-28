interface FormDateInputProps {
    value: string,
    onChange: (value: string) => void,
    required?: boolean,
}

const DateInput = ({ value , onChange, required }: FormDateInputProps) => {
    return <input 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        required={required}
        type="date" 
        className="mt-1 px-2 py-1.5 rounded-lg border border-[#cbd5e1] text-sm bg-white text-black focus:outline-none"
    />
}

export default DateInput;