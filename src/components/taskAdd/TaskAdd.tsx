import { useState } from "react";
import { Task } from "../../types/task";
import styles from "./TaskAdd.module.css";
import UserIconCollection from "../usersIconsCollection/usersIconsCollection";
import AddMember from "../../modals/AddMember/AddMember";
import { useTaskUsers } from "../../hooks/useTaskUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/taskApi";
import { useParams } from "react-router-dom";

const TaskAdd = () => {

    const { projectId } = useParams();

    const [formData, setFormData] = useState<Omit<Task, "id" | "projectId" | "assignedMembers">>({
        title: "",
        description: "",
        status: "todo",
    });
    const [assignedMembers, setAssignedMembers] = useState<string[]>([]);
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);
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
        <div className={styles.main}>
            <form onSubmit={handleSubmit}>
                <label>
                        Title
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                </label>
                <div className={styles.asignBlock}>
                        <label>
                            Assigned Members:
                            <div className={styles.assignedMembers}>
                                <button type="button" onClick={() => setAddMembersActive(true)}>＋ Add Member</button>
                            </div>
                        </label>
                        { users && <UserIconCollection users={users}/> }
                </div>
                <label>
                        Status:
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                </label>
                <button type="submit">Save chenges</button>
            </form>
            
            { addMembersActive && <AddMember exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> }

        </div>
    )
}

export default TaskAdd;