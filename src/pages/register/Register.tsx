import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../services/loginApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Role } from "../../types/user";

const Register = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            alert("Registration is successful!");
            navigate("/login");
        },
        onError: (error: any) => {
            throw new Error(`Error during registration. Status: ${error.message}`);
        }
    });

    const [name, setName] = useState<string>("");
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [role, setRole] = useState<Role>("member");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            name !== "" &&
            username !== "" &&
            password !== "" &&
            repeatedPassword !== ""
        ) {
            if ( password !== repeatedPassword ) {
                alert("Password fields are different!");
                return;
            }
            mutation.mutate({ name, username, password, role, reservedMembers: [] });
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen w-full overflow-hidden">
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-4 w-96 max-w-md p-8 bg-white border-2 border-purple-700 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold text-center">Registration</h2>
            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="name"                        
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <input
                type="text"
                value={username}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="user name"                        
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"                        
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"                    
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={repeatedPassword}
                    onChange={(event) => setRepeatedPassword(event.target.value)}
                    placeholder="Repeat password"                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"                    
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>


            {/* todo - allow to select role only for addmin, the rest don`t even see this input */}
            <select 
                id="role" value={role} 
                onChange={(event) => setRole(event.target.value  as Role)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white text-gray-700"
            >
                <option value={"member"}>member</option>
                <option value={"manager"}>manager</option>
                <option value={"admin"}>admin</option>
            </select>
            <button 
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
                Register
            </button>
            <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/login")}>or, you already have account</p>
        </form>
        </div>
    )

}

export default Register;