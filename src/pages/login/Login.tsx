import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react"
import { login } from "../../services/loginApi";
import { useAuth } from "../../layouts/authProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { User } from "../../types/user";
import FormLayout from "../../layouts/formLayout/FormLayout";
import CustomForm from "../../ui/form/CustomForm";


const Login = () => {
    const setUser = useUserStore((state) => state.setLoggedInUser);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { login: authLogin } = useAuth();
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const user: Omit<User, "password"> = {
                id: data.user.id,
                name: data.user.name,
                username: data.user.username,
                role: data.user.role,
                reservedMembers: data.user.reservedMembers,
            };
            authLogin(data.token);
            setUser(user);
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            alert("Login success");
            navigate("/");
        },
        onError: (error: any) => {
            alert(`Login failed: ${error.message}`);
        }
    })

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("handlesubmit")
        event.preventDefault();
        mutation.mutate({ username, password });
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
        {/* <FormLayout> */}
            {/* <CustomForm onSubmit={handleSubmit}> */}

        <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-96 max-w-md p-8 bg-white border-2 border-purple-700 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold text-center">Log in</h2>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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
            <button 
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
                Login
            </button>
            <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/register")}>or, sign up</p>
        </form>
            {/* </CustomForm> */}
        {/* </FormLayout> */}
        </div>
    )
}

export default Login;