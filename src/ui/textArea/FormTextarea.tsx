interface FormTextareaProps {
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const FormTextarea = ({ name, value, onChange }: FormTextareaProps) => {
    return <textarea 
        name={name}
        value={value} 
        onChange={onChange}
        className="mt-1 p-2 rounded-lg border border-slate-300 text-sm resize-vertical min-h-[80px] bg-white text-black focus:outline-none"
    />
}

export default FormTextarea;