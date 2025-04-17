import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import FormTextInput from "../../ui/input/FormTextInput";
import { useEffect, useState } from "react";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import { Role } from "../../types/user";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./EditUser.module.css";
import CustomButton from "../../ui/button/CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, updateUser } from "../../services/userApi";
import FormSelect from "../../ui/select/FormSelect";

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const {data: user} = useUser(userId || "");

    const [formData, setFormData] = useState({
        name: user?.name || "",
        username: user?.username || "",
        password: user?.password || "",
        repeatedPassword: "",
        role: user?.role || "member",
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = async () => {
        let initialData = {
            id: user?.id || "",
            name: user?.name || "",
            username: user?.username || "",
            password: user?.password || "",
            role: user?.role || "member",
            reservedMembers: user?.reservedMembers || [],
        };
        initialData = {
            ...initialData,
            ...(formData.name !== "" && { name: formData.name }),
            ...(formData.username !== "" && { username: formData.username }),
            ...({ role: formData.role }),
            ...(formData.password === formData.repeatedPassword && formData.password !== "" && { password: formData.password }),
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
                name: user.name || "",
                username: user.username || "",
                password: user.password || "",
                repeatedPassword: formData.repeatedPassword,
                role: user.role || "member",
            });
    }, [user]);

    return (
        <div className={styles.editUserOverlay}>
            <form className={styles.formEditUser}>
                <div className={styles.headerBlock}>
                    <CustomUserIcon title={user?.name || ""} size={54} fontSize={28}/>
                    <h1>{user?.name}</h1>
                </div>
                <div className={styles.infoBlock}>
                    <label>ID: 
                        <div className={styles.displayInputLike}>{user?.id}</div>
                    </label>
                    <label>Role
                        <FormSelect<Role> name={"role"} value={formData.role} onChange={handleChange} options={["member", "manager", "admin"]}/>
                    </label>
                    <label>Name:
                        <FormTextInput name={"name"} value={formData.name} onChange={handleChange} placeholder="name" />
                    </label>
                    <label>Username:
                        <FormTextInput name={"username"} value={formData.username} onChange={handleChange} placeholder="username" />
                    </label>
                    <label>Password:
                        <FormPasswordInput  name={"password"} value={formData.password} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"} />
                    </label>
                    <label>Repeat password:
                        <FormPasswordInput  name={"repeatedPassword"} value={formData.repeatedPassword} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"repeatedPassword"} />
                    </label>
                </div>
                <div className={styles.buttonBlock}>
                    <CustomButton text={"Save changes"} onClick={() => handleEdit()}/>
                    <CustomButton text={"Delete user"} onClick={() => handleDelete()} customStyles={{backgroundColor: "#D10000"}}/>
                </div>
            </form>
        </div>
    )
}

export default EditUser;