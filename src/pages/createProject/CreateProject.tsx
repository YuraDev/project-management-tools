import React, { useCallback, useState } from "react";
import AddMember from "../../modals/AddMember/AddMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../services/projectApi";
import { Project } from "../../types/project";
import FormTextInput from "../../ui/input/FormTextInput";
import FormSelect from "../../ui/select/FormSelect";
import FormDateInput from "../../ui/input/FormDateInput";
import AsignMembers from "../../components/asignMembers/AsignMembers";
import FormTextarea from "../../ui/textArea/FormTextarea";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";
import CustomForm from "../../ui/form/CustomForm";
import FormLayout from "../../layouts/formLayout/FormLayout";
import { useTaskUsers } from "../../hooks/task/useTaskUsers";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<Project, "id">>({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        assignedMembers: [],
        status: "planned",
    });
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);
    const [assignedMembers, setAssignedMembers] = useState<string[]>([]);
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
    });
    const { data: users } = useTaskUsers(assignedMembers);
    
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if ( !formData.title ) {
            alert("Please fill all the requered fields!");
            return;
        }
        mutation.mutate({
            ...formData,
            assignedMembers: assignedMembers,
        });
        navigate("/projects");
    };

    return (
        <FormLayout>
            <CustomForm onSubmit={handleSubmit}>
                <label>Title:
                    <FormTextInput  name={"title"} value={formData.title} onChange={handleChange} required/>
                </label>
                <label>Description:
                    <FormTextarea name={"description"} value={formData.description} onChange={handleChange} />
                </label>
                <label>Start Date:
                    <FormDateInput name={"startDate"} value={formData.startDate} onChange={handleChange}/>
                </label>
                <label>End Date:
                    <FormDateInput name={"endDate"} value={formData.endDate} onChange={handleChange} />
                </label>
                <AsignMembers users={users || []} setAddMembersActive={setAddMembersActive} />
                <label>Status:
                    <FormSelect name={"status"} value={formData.status} onChange={handleChange} options={["planned", "in_progress", "completed"]}/>
                </label>
                <FormButtonSubmit text={"Create Project"}/>
            </CustomForm>
            { addMembersActive && <AddMember exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> }
        </FormLayout>
    )
}

export default CreateProject;