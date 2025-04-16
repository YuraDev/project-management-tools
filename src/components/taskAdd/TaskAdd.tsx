import { useState } from "react";
import { Task } from "../../types/task";
import AddMember from "../../modals/AddMember/AddMember";
import { useTaskUsers } from "../../hooks/useTaskUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/taskApi";
import { useParams } from "react-router-dom";
import CustomForm from "../../ui/form/CustomForm";
import FormTextInput from "../../ui/input/FormTextInput";
import FormTextarea from "../../ui/textArea/FormTextarea";
import RightPanelHeader from "../rightPanelHeader/RightPanelHeader";
import { useProjectControlStore } from "../../store/projectControlStore";
import AsignMembers from "../asignMembers/AsignMembers";
import FormSelect from "../../ui/select/FormSelect";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";

const TaskAdd = () => {
    const { projectId } = useParams();

    const [formData, setFormData] = useState<Omit<Task, "id" | "projectId" | "assignedMembers">>({
        title: "",
        description: "",
        status: "todo",
    });
    const [assignedMembers, setAssignedMembers] = useState<string[]>([]);
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);

    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);

    const { data: users } = useTaskUsers(assignedMembers);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            formData.title !== "" &&
            formData.description !== "" &&
            projectId
        ) {
            mutation.mutate({
                projectId: projectId,
                title: formData.title,
                description: formData.description,
                assignedMembers: assignedMembers,
                status: formData.status
            });
        } else {
            alert("Please fill all the requered fields!");
        }
    };


    return(
        <CustomForm onSubmit={handleSubmit} customStyles={{ margin: 15, minHeight: "calc(100vh - 130px)" }}>
            <RightPanelHeader taskTitle={"Add task"} setIsRightPanelActive={setIsRightPanelActive}/>
            <label>Title
                <FormTextInput name="title"  value={formData.title} onChange={handleChange} required />
            </label>
            <label>Description:
                <FormTextarea name="description" value={formData.description} onChange={handleChange}/>
            </label>
            <AsignMembers users={users || []} setAddMembersActive={setAddMembersActive} maxIcons={3} />
            <label>Status:
                <FormSelect name="status" value={formData.status} onChange={handleChange} options={["todo", "in_progress", "done"]}/>
            </label>
            <FormButtonSubmit text={"Save chenges"}/>
            { addMembersActive && <AddMember exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> }
        </CustomForm>
    )
}

export default TaskAdd;