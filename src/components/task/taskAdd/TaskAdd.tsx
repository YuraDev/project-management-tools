import React, { useCallback, useState } from "react";
import { Task } from "../../../types/task";
import AddMember from "../../../modals/AddMember/AddMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../../services/taskApi";
import { useParams } from "react-router-dom";
import CustomForm from "../../../ui/form/CustomForm";
import FormTextInput from "../../../ui/input/FormTextInput";
import FormTextarea from "../../../ui/textArea/FormTextarea";
import RightPanelHeader from "../../rightPanel/rightPanelHeader/RightPanelHeader";
import { useProjectControlStore } from "../../../store/projectControlStore";
import AsignMembers from "../../asignMembers/AsignMembers";
import FormSelect from "../../../ui/select/FormSelect";
import FormButtonSubmit from "../../../ui/button/FormButtonSubmit";
import styles from "./TaskAdd.module.css";
import { useTaskUsers } from "../../../hooks/task/useTaskUsers";
import FormDateInput from "../../../ui/input/FormDateInput";

const TaskAdd = React.memo(() => {
    const { projectId } = useParams();

    const [formData, setFormData] = useState<Omit<Task, "id" | "projectId" | "assignedMembers">>({
        title: "",
        description: "",
        status: "todo",
        startDate: "",
        endDate: "",
        priority: "none",
    });
    const [assignedMembers, setAssignedMembers] = useState<string[]>([]);
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);

    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);

    const { data: users } = useTaskUsers(assignedMembers);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if ( !formData.title || !projectId) {
            alert("Please fill all the requered fields!");
            return;
        }
        mutation.mutate({
            projectId: projectId as string,
            assignedMembers: assignedMembers,
            ...formData,
        });
    };

    return(
        <CustomForm onSubmit={handleSubmit} customStyles={{ margin: 15, height: "calc(100vh - 130px)" }}>
            <RightPanelHeader taskTitle={"Add task"} setIsRightPanelActive={setIsRightPanelActive}/>
            <div className={styles.rightPanelChild}>
            <label>Title
                <FormTextInput name="title"  value={formData.title} onChange={handleChange} required />
            </label>
            <label>Description:
                <FormTextarea name="description" value={formData.description} onChange={handleChange}/>
            </label>
            <AsignMembers users={users || []} setAddMembersActive={setAddMembersActive} maxIcons={1} />
            <label>Status:
                <FormSelect name="status" value={formData.status} onChange={handleChange} options={["todo", "in_progress", "done"]}/>
            </label>
            <label>Priority:
                <FormSelect name="priority" value={formData.priority} onChange={handleChange} options={["low", "medium", "high", "none"]}/>
            </label>
            <label>Start date:
                <FormDateInput name={"startDate"} value={formData.startDate || ""} onChange={handleChange}/>
            </label>
            <label>End date:
                <FormDateInput name={"endDate"} value={formData.endDate || ""} onChange={handleChange}/>
            </label>
            <FormButtonSubmit text={"Save changes"} customStyles={{width: "100%", marginTop: 16}}/>
            { addMembersActive && <AddMember exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> }
            </div>
        </CustomForm>
    )
});

export default TaskAdd;