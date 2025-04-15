import { AlignJustify } from "lucide-react";
import { useProjectControlStore } from "../../store/projectControlStore";
import styles from "./LeftPanelProject.module.css";
import StatusText from "../../ui/statusText/StatusText";
import CheckBoxStatus from "../../ui/checkbox/CheckBoxStatus";
import { useEffect, useState } from "react";
import AsignMembers from "../asignMembers/AsignMembers";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../types/user";
import AddMember from "../../modals/AddMember/AddMember";
import { useProjectUsers } from "../../hooks/useProjectUsers";
import { useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import AddMemberTwo from "../../modals/AddMember/AddMemberTwo";
import FormDateInput from "../../ui/input/FormDateInput";
import DateInput from "../../ui/input/DateInput";

const LeftPanelProject = () => {
    const { projectId } = useParams();

    // console.log("projectId", projectId);
    // @ts-ignore
    const {data: initiallyAsignedMembers} = useProjectUsers(projectId);
    // console.log("initiallyAsignedMembers", initiallyAsignedMembers);
    const [assignedMembers, setAssignedMembers] = useState<User[]>(initiallyAsignedMembers || []);
    // const usersFilter = useProjectControlStore((state) => state.usersFilter);
    // const setUserFilter = useProjectControlStore((state) => state.setUserFilter);
    // setUserFilter(initiallyAsignedMembers || []);

    // const handleFilterUser = (chosenUser: User) => {
    //     if( usersFilter.find((u) => u.id === chosenUser.id) ) {
    //         setUserFilter( usersFilter.filter((u) => u.id !== chosenUser.id) );
    //     } else {
    //         setUserFilter( [...usersFilter, chosenUser] );
    //     }
    // }

    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);

    // const { data: users } = useUsers();

    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const isAddTaskActive = useProjectControlStore((state) => state.isAddTaskActive);

    const statusFilter = useProjectControlStore((state) => state.statusFilter);
    const setStatusFilter = useProjectControlStore((state) => state.setStatusFilter);


    const selectedTask = useProjectControlStore((state) => state.selectedTask);

    const usersFilter = useProjectControlStore((state) => state.usersFilter);



    const handleAddTaskOpen = () => {
        setIsEditTaskActive(false);
        setIsAddTaskActive(true);
        // console.log("handleAddTaskOpen", isAddTaskActive);
    }

    const setUserFilter = useProjectControlStore((state) => state.setUserFilter);
    // useEffect(() => {
    //     // console.log("assignedMembers: ", assignedMembers);
    //     setUserFilter(assignedMembers);
    // }, [assignedMembers]);


    // const handlerFilterUser = (chosenUser: User) => {
    //     // @ts-ignore
    //     setUserFilter((prev: User[]) => {
    //         if ( prev.find((u) => u.id === chosenUser.id) ) {
    //             return prev.filter((u) => u.id !== chosenUser.id);
    //         } else {
    //             return [...prev, chosenUser];
    //         }
    //     })
    // }

    const startDateFilter = useProjectControlStore((state) => state.startDateFilter);
    const setStartDateFilter = useProjectControlStore((state) => state.setStartDateFilter);
    const endDateFilter = useProjectControlStore((state) => state.endDateFilter);
    const setEndDateFilterr = useProjectControlStore((state) => state.setEndDateFilterr);
    

    return(
        <div className={styles.main}>
            <div onClick={() => setIsLeftPanelActive(false)}><AlignJustify size={28}/></div>
            <div onClick={() => handleAddTaskOpen()}>Add task</div>

            <div>
                <h3>Status</h3>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <CheckBoxStatus status={"todo"} setStatusFilter={setStatusFilter}/>
                    <CheckBoxStatus status={"in_progress"} setStatusFilter={setStatusFilter}/>
                    <CheckBoxStatus status={"done"} setStatusFilter={setStatusFilter}/>
                </div>
                <div>
                    {/* <AsignMembers users={assignedMembers} setAddMembersActive={setAddMembersActive} maxIcons={3} iconSize={24}/> */}

                    <AsignMembers
                    uniqueText={"Select members"}
                    users={usersFilter} 
                    setAddMembersActive={setAddMembersActive} 
                    maxIcons={3} iconSize={24}
                    />

                </div>
                <div>
                    <h3>Date</h3>
                    <label>From
                        <DateInput value={startDateFilter} onChange={setStartDateFilter} />
                    </label>
                    <label>To
                        <DateInput value={endDateFilter} onChange={setEndDateFilterr} />
                    </label>
                </div>
            </div>
            {/* { addMembersActive && <AddMemberTwo initiallyAsignedMembers={initiallyAsignedMembers} exitAction={() => setAddMembersActive(false)} assignedMembers={usersFilter} handleFilterUser={handleFilterUser} /> } */}
            {/* { addMembersActive && <AddMemberTwo initiallyAsignedMembers={initiallyAsignedMembers} exitAction={() => setAddMembersActive(false)} assignedMembers={assignedMembers} setAssignedMembers={setAssignedMembers} /> } */}

            { addMembersActive && 
            <AddMemberTwo 
            initiallyAsignedMembers={initiallyAsignedMembers} 
            exitAction={() => setAddMembersActive(false)} 
            selectedUsers={usersFilter} 
            handlerFilterUser={setUserFilter} 
            /> 
            }

        </div>
    )
}

export default LeftPanelProject;