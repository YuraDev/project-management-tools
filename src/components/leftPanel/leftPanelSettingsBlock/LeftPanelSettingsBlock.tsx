import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { useProject } from "../../../hooks/project/useProject";
import { useProjectUsers } from "../../../hooks/project/useProjectUsers";
import { useCallback, useState } from "react";
import { User } from "../../../types/user";
import { useProjectControlStore } from "../../../store/projectControlStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, updateProject } from "../../../services/projectApi";
import FormTextInput from "../../../ui/input/FormTextInput";
import FormTextarea from "../../../ui/textArea/FormTextarea";
import FormDateInput from "../../../ui/input/FormDateInput";
import FormSelect from "../../../ui/select/FormSelect";
import { ProjectStatus } from "../../../types/project";
import AsignMembers from "../../asignMembers/AsignMembers";
import CustomButton from "../../../ui/button/CustomButton";
import AddMember from "../../../modals/AddMember/AddMember";
import { useReservedUsers } from "../../../hooks/users/useReservedUsers";
import { useUsersThemes } from "../../../hooks/usersThemes/useUserThemes";
import { useUserThemeStore } from "../../../store/userThemeStore";

const LeftPanelSettingsBlock = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const currentUser = useUserStore((state) => state.currentUser);
    const isAddMembersActive = useProjectControlStore((state) => state.isAddMembersActive);
    const setIsAddMembersActive = useProjectControlStore((state) => state.setIsAddMembersActive);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);

    const { data: project } = useProject(projectId || "");
    const { data: initiallyAssignedMembers } = useReservedUsers([
        ...currentUser?.reservedMembers || [], 
        ...project?.assignedMembers || [],
    ]);
    const { data: projectMembers } = useProjectUsers(projectId || "");
    const { data: usersThemes } = useUsersThemes(project?.assignedMembers || []);

    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        startDate: project?.startDate || "",
        endDate: project?.endDate || "",
        status: project?.status || "planned",
    });
    const [asignedMembers, setAsignedMembers] = useState<User[]>(projectMembers || []);

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

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleAsignUserClick = useCallback((chosenUser: User) => {
        setAsignedMembers((prev) => {
            const isAdded = prev.find((u) => u.id === chosenUser.id);
            return isAdded
            ? prev.filter((u) => u.id !== chosenUser.id)
            : [...prev, chosenUser];
        })
    }, []);

    const handleEdit = async () => {
        if (!project) return null;
        let data = {
            id: project.id ,
            assignedMembers: asignedMembers.map((m) => m.id),
            ...formData
        };
        editProjectMutation.mutate(data);
    }

    const handleDelete = async () => {
        if (window.confirm("Ви впевнені, що хочете видалити даний проект?")) {
            deleteProjectMutation.mutate(projectId || "");
            navigate("/projects");
        }
    }

    return (
        <div className={`mt-5 h-[calc(100vh-100px-70px-30px-20px)] overflow-y-auto no-scrollbar ${backgroundMode === "black" ? "text-white" : "text-gray-900"}`}>
            <label className="block mb-5">ID:
                <div className="mt-1 px-2 py-2 rounded-md border border-slate-300 text-sm bg-gray-100 text-gray-600">{project?.id}</div>
            </label>
            <label className="block mb-5">Name:
                <FormTextInput name="title" value={formData.title} onChange={handleChange} placeholder="title"/>
            </label>
            <label className="block mb-5">Description:
                <FormTextarea name="description" value={formData.description} onChange={handleChange}/>
            </label>
            <label className="block mb-5">Start date:
                <FormDateInput name="startDate" value={formData.startDate} onChange={handleChange}/>
            </label>
            <label className="block mb-5">End date:
                <FormDateInput name="endDate" value={formData.endDate} onChange={handleChange}/>
            </label>
            <label className="block mb-5">Status:
                <FormSelect<ProjectStatus> name="status" value={formData.status} onChange={handleChange} options={["planned", "in_progress", "completed"]}/>
            </label>
            <AsignMembers usersThemes={usersThemes || []} users={asignedMembers} setAddMembersActive={setIsAddMembersActive} maxIcons={2} />
            <div className="mt-[30px] flex flex-col items-center gap-5 w-full">
                <CustomButton text="Save changes" onClick={() => handleEdit()} customStyles={{ width: "100%" }}/>
                {currentUser?.role === "admin" &&
                <CustomButton text="Delete project" onClick={() => handleDelete()} customStyles={{ width: "100%", backgroundColor: "#D10000" }} />
                }
            </div>
            {isAddMembersActive &&
            <AddMember usersThemes={usersThemes} initiallyAssignedMembers={initiallyAssignedMembers} exitAction={() => setIsAddMembersActive(false)} selectedUsers={asignedMembers} handlerFilterUser={handleAsignUserClick} />
            }
        </div>
      );
}

export default LeftPanelSettingsBlock;