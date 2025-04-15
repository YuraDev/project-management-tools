import { useProjectControlStore } from "../../store/projectControlStore";
import { useState } from "react";
import { Task } from "../../types/task";
import AddMember from "../../modals/AddMember/AddMember";
import { useTaskUsers } from "../../hooks/useTaskUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../services/taskApi";
import FormTextInput from "../../ui/input/FormTextInput";
import FormTextarea from "../../ui/textArea/FormTextarea";
import AsignMembers from "../asignMembers/AsignMembers";
import FormSelect from "../../ui/select/FormSelect";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";
import CustomForm from "../../ui/form/CustomForm";
import RightPanelHeader from "../rightPanelHeader/RightPanelHeader";
import FormDateInput from "../../ui/input/FormDateInput";

const TaskEdit = () => {
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    
    const [formData, setFormData] = useState<Omit<Task, "id" | "projectId" | "assignedMembers">>({
        title: selectedTask?.title || "",
        description: selectedTask?.description || "",
        status: selectedTask?.status || "todo",
        startDate: selectedTask?.startDate || "",
        endDate: selectedTask?.endDate || "", 
        priority: selectedTask?.priority || "none",
    });
    const [assignedMembers, setAssignedMembers] = useState<string[]>(selectedTask?.assignedMembers || []);
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });
    const { data: users } = useTaskUsers(assignedMembers);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            formData.title !== "" &&
            formData.description !== "" &&
            selectedTask
        ) {
            mutation.mutate({
                id: selectedTask?.id,
                projectId: selectedTask?.projectId,
                title: formData.title,
                description: formData.description,
                assignedMembers: assignedMembers,
                status: formData.status,
                startDate: formData.startDate,
                endDate: formData.endDate,
                priority: formData.priority,
            });
        } else { alert("Please fill all the requered fields!"); }
    };

    return(
        <CustomForm onSubmit={handleSubmit} customStyles={{ margin: 15, minHeight: "calc(100vh - 130px)" }}>
            <RightPanelHeader taskTitle={selectedTask?.title || ""} setIsEditTaskActive={setIsEditTaskActive} setIsRightPanelActive={setIsRightPanelActive}/>
            <label>Title
                <FormTextInput name={"title"} value={formData.title} onChange={handleChange} required/>
            </label>
            <label>Description:
                <FormTextarea name={"description"} value={formData.description} onChange={handleChange} />                </label>
            <AsignMembers users={users || []} setAddMembersActive={setAddMembersActive} maxIcons={1}/>
            <label>Status:
                <FormSelect name={"status"} value={formData.status} onChange={handleChange} options={["todo", "in_progress", "done"]}/>
            </label>
            <label>From:
                <FormDateInput name={"startDate"} value={formData.startDate} onChange={handleChange} />
            </label>
            <label>To:
                <FormDateInput name={"endDate"} value={formData.endDate} onChange={handleChange} />
            </label>
            <label>Priority
                <FormSelect name={"priority"} value={formData.priority} onChange={handleChange} options={["low", "medium", "high", "none"]}/>
            </label>
            <FormButtonSubmit text={"Save chenges"}/>
            { addMembersActive && <AddMember exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> }
        </CustomForm>
    )
}

export default TaskEdit;