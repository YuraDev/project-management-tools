import React, { useCallback, useState } from "react";
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
import styles from "../rightPanelProject/RightPanelProject.module.css";

const TaskAdd = React.memo(() => {
    const { projectId } = useParams();

    const [formData, setFormData] = useState<Omit<Task, "id" | "projectId" | "assignedMembers">>({
        title: "",
        description: "",
        status: "todo",
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
        if ( !formData.title || formData.description || !projectId)
            alert("Please fill all the requered fields!");
        mutation.mutate({
            projectId: projectId as string,
            title: formData.title,
            description: formData.description,
            assignedMembers: assignedMembers,
            status: formData.status
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
            <AsignMembers users={users || []} setAddMembersActive={setAddMembersActive} maxIcons={3} />
            <label>Status:
                <FormSelect name="status" value={formData.status} onChange={handleChange} options={["todo", "in_progress", "done"]}/>
            </label>
            <FormButtonSubmit text={"Save changes"} customStyles={{width: "100%", marginTop: 16}}/>
            { addMembersActive && <AddMember exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> }
            </div>
        </CustomForm>
    )
});

export default TaskAdd;