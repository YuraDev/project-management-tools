interface TextInputProps {
    name: string, 
    value: string,
    onChange: (value: string) => void,
    required?: boolean,
}

const TextInput = ({ name, value , onChange, required }: TextInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        required={required}
        type="text" 
        className="mt-1 px-2 py-1.5 rounded-lg border border-[#cbd5e1] text-sm bg-white text-black focus:outline-none"
    />
}

export default TextInput;