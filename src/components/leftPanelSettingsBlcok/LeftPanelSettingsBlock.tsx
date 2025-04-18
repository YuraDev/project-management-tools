import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import { useProjectControlStore } from "../../store/projectControlStore";
import FormTextarea from "../../ui/textArea/FormTextarea";
import FormDateInput from "../../ui/input/FormDateInput";
import { useState } from "react";
import FormTextInput from "../../ui/input/FormTextInput";
import FormSelect from "../../ui/select/FormSelect";
import { ProjectStatus } from "../../types/project";
import styles from "./LeftPanelSettingsBlock.module.css";
import { useProjectUsers } from "../../hooks/useProjectUsers";
import AsignMembers from "../asignMembers/AsignMembers";
import { User } from "../../types/user";
import AddMemberTwo from "../../modals/AddMember/AddMemberTwo";
import { useUsers } from "../../hooks/useUsers";
import CustomButton from "../../ui/button/CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, updateProject } from "../../services/projectApi";
import { useUserStore } from "../../store/userStore";

const LeftPanelSettingsBlock = () => {

    const navigate = useNavigate();
    const { projectId } = useParams();
    const { data: project } = useProject(projectId || "");
    const { data: projectMembers } = useProjectUsers(projectId || "");
    //  todo - change for personal seves + active prohject users
    const { data: users } = useUsers();
    const currentUser = useUserStore((state) => state.currentUser);

    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        startDate: project?.startDate || "",
        endDate: project?.endDate || "",
        status: project?.status || "planned",
    });
    const [asignedMembers, setAsignedMembers] = useState<User[]>(projectMembers || []);

    const isAddMembersActive = useProjectControlStore((state) => state.isAddMembersActive);
    const setIsAddMembersActive = useProjectControlStore((state) => state.setIsAddMembersActive);

    const queryClient = useQueryClient();
    const editProjectMutation = useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
    });
    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAsignUserClick = (chosenUser: User) => {
        setAsignedMembers((prev) => {
            const isAdded = prev.find((u) => u.id === chosenUser.id);
            return isAdded
            ? prev.filter((u) => u.id !== chosenUser.id)
            : [...prev, chosenUser];
        })
    }

    const handleEdit = async () => {
        let initialData = {
            id: project?.id || "",
            title: project?.title || "",
            description: project?.description || "",
            startDate: project?.startDate || "",
            endDate: project?.endDate || "member",
            assignedMembers: project?.assignedMembers || [],
            status: project?.status || "planned",
        };
        initialData = {
            ...initialData,
            ...(formData.title !== "" && { name: formData.title }),
            ...({ description: formData.description }),
            ...({ startDate: formData.startDate }),
            ...({ endDate: formData.endDate }),
            ...({ status: formData.status }),
            ...({ assignedMembers: asignedMembers.map((m) => m.id) }),
        };
        editProjectMutation.mutate(initialData);
    }
    const handleDelete = async () => {
        if (window.confirm("Ви впевнені, що хочете видалити даний проект?")) {
            deleteProjectMutation.mutate(projectId || "");
            navigate("/projects");
        }
    }

    
    return(
        <div className={styles.leftPanelChildSettings}>
            <label>ID: 
                <div className={styles.displayInputLike}>{project?.id}</div>
            </label>
            <label>Name:
                <FormTextInput name={"title"} value={formData.title} onChange={handleChange} placeholder={"title"}/>
            </label>
            <label>Description:
                <FormTextarea  name={"description"} value={formData.description} onChange={handleChange}/>
            </label>
            <label>Start date:
                <FormDateInput name={"startDate"} value={formData.startDate} onChange={handleChange}/>
            </label>
            <label>End date:
                <FormDateInput name={"endDate"} value={formData.endDate} onChange={handleChange}/>
            </label>
            <label>Status:
                <FormSelect<ProjectStatus> name={"status"} value={formData.status} onChange={handleChange} options={["planned", "in_progress", "completed"]}/>
            </label>
            <AsignMembers users={asignedMembers} setAddMembersActive={setIsAddMembersActive} maxIcons={2}/>
            <div className={styles.buttonBlock}>
                <CustomButton text={"Save changes"} onClick={() => handleEdit()} />
                { currentUser?.role === "admin" && <CustomButton text={"Delete project"} onClick={() => handleDelete()} customStyles={{backgroundColor: "#D10000"}}/> }
            </div>
            { isAddMembersActive && <AddMemberTwo initiallyAsignedMembers={users} exitAction={() => setIsAddMembersActive(false)} selectedUsers={asignedMembers} handlerFilterUser={handleAsignUserClick}/> }
        </div>
    )
}

export default LeftPanelSettingsBlock;