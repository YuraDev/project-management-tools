import React from "react";

interface AuthFormLayoutProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNode,
    customStyles?: React.CSSProperties,
}

const AuthFormLayout = ({ handleSubmit, children, customStyles }: AuthFormLayoutProps) => {
    return (
        <div className="flex justify-center items-center h-screen" style={customStyles}>
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4 w-[400px] p-8 border-3 border-purple-500 rounded-lg"
            >
                { children }
            </form>
        </div>
    );
}


export default AuthFormLayout;