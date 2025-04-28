import { useNavigate, useParams } from "react-router-dom";
import FormTextInput from "../../ui/input/FormTextInput";
import { useCallback, useEffect, useState } from "react";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import { Role } from "../../types/user";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import CustomButton from "../../ui/button/CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, updateUser } from "../../services/userApi";
import FormSelect from "../../ui/select/FormSelect";
import { useUser } from "../../hooks/users/useUser";
import { useUserThemeStore } from "../../store/userThemeStore";

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const {data: user} = useUser(userId || "");
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        repeatedPassword: "",
        role: "member" as Role,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const editUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    });
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    });

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleEdit = async () => {
        if ( !user ) return;
        if ( formData.password !== formData.repeatedPassword ) {
            alert("Passwords do not match!");
            return;
        }
        let initialData = {
            id: user.id,
            reservedMembers: user.reservedMembers,
            ...formData,
        };
        editUserMutation.mutate(initialData);
    }
    const handleDelete = async () => {
        if (window.confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            deleteUserMutation.mutate(userId || "");
            navigate("/people");
        }
    }
    
    useEffect(() => {
        if (user)
            setFormData({
                name: user.name,
                username: user.username,
                password: user.password,
                repeatedPassword: "",
                role: user.role,
            });
    }, [user]);

    return (
        <div className="flex justify-center mt-12 h-[calc(100%-100px)]">
            <form 
                className={`flex flex-col gap-5 w-[600px] p-8 rounded-lg border-3 ${highlightMode ? "border-purple-500" : ""} 
                            ${backgroundMode === "black" ? "bg-gray-800" : "bg-white"}`}
            >
                <div className="flex items-center gap-5">
                    <CustomUserIcon title={user?.name || ""} size={54} fontSize={28} />
                    <h1 className={`${backgroundMode === "black" ? "text-white" : "text-black"} text-2xl font-bold`}>
                        {user?.name}
                    </h1>
                </div>
    
                <div className="grid grid-cols-2 gap-5">
                    <label className="col-span-2">
                        ID:
                        <div className="mt-1 p-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 text-sm">
                            {user?.id}
                        </div>
                    </label>
                    <label>
                        Role
                        <FormSelect<Role> name="role" value={formData.role} onChange={handleChange} options={["member", "manager", "admin"]} />
                    </label>
                    <label>
                        Name:
                        <FormTextInput name="name" value={formData.name} onChange={handleChange} placeholder="name" />
                    </label>
                    <label>
                        Username:
                        <FormTextInput name="username" value={formData.username} onChange={handleChange} placeholder="username" />
                    </label>
                    <label>
                        Password:
                        <FormPasswordInput name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} placeholder="password" />
                    </label>
                    <label>
                        Repeat password:
                        <FormPasswordInput name="repeatedPassword" value={formData.repeatedPassword} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} placeholder="repeatedPassword" />
                    </label>
                </div>
    
                <div className="mt-5 flex flex-col items-center gap-5">
                    <CustomButton text="Save changes" onClick={() => handleEdit()} />
                    <CustomButton text="Delete user" onClick={() => handleDelete()} customStyles={{ backgroundColor: "#D10000" }} />
                </div>
            </form>
        </div>
    )
    
}

export default EditUser;