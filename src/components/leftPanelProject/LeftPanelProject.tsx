import { AlignJustify } from "lucide-react";
import { useProjectControlStore } from "../../store/projectControlStore";
import styles from "./LeftPanelProject.module.css";
import CheckBoxStatus from "../../ui/checkbox/CheckBoxStatus";
import AsignMembers from "../asignMembers/AsignMembers";
import { useProjectUsers } from "../../hooks/useProjectUsers";
import { useParams } from "react-router-dom";
import AddMemberTwo from "../../modals/AddMember/AddMemberTwo";
import DateInput from "../../ui/input/DateInput";
import CustomSelect, { sortOptions } from "../../ui/select/CustomSelect";
import { TaskPriority, TaskStatus } from "../../types/task";
import CustomButton from "../../ui/button/CustomButton";

const LeftPanelProject = () => {
    const { projectId } = useParams();
    const {data: initiallyAsignedMembers} = useProjectUsers(projectId || "");
    
    const isAddMembersActive = useProjectControlStore((state) => state.isAddMembersActive);
    const setIsAddMembersActive = useProjectControlStore((state) => state.setIsAddMembersActive);
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const setStatusFilter = useProjectControlStore((state) => state.setStatusFilter);
    const usersFilter = useProjectControlStore((state) => state.usersFilter);
    const setUserFilter = useProjectControlStore((state) => state.setUserFilter);
    const startDateFilter = useProjectControlStore((state) => state.startDateFilter);
    const setStartDateFilter = useProjectControlStore((state) => state.setStartDateFilter);
    const endDateFilter = useProjectControlStore((state) => state.endDateFilter);
    const setEndDateFilterr = useProjectControlStore((state) => state.setEndDateFilterr);
    const setPriorityFilter = useProjectControlStore((state) => state.setPriorityFilter);
    const sortValue = useProjectControlStore((state) => state.sortValue);
    const setSortValue = useProjectControlStore((state) => state.setSortValue);

    const handleAddTaskOpen = () => {
        setIsEditTaskActive(false);
        setIsAddTaskActive(true);
    }

    return(
        <div className={styles.main}>
            <div onClick={() => setIsLeftPanelActive(false)}><AlignJustify size={28}/></div>
            <CustomButton text={"Add task"} onClick={() => handleAddTaskOpen()} customStyles={{width: "100%", marginTop: 35}}/>
                <label>Status
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <CheckBoxStatus<TaskStatus> status={"todo"} setStatusFilter={setStatusFilter}/>
                        <CheckBoxStatus<TaskStatus> status={"in_progress"} setStatusFilter={setStatusFilter}/>
                        <CheckBoxStatus<TaskStatus> status={"done"} setStatusFilter={setStatusFilter}/>
                    </div>
                </label>
                <label>Priority
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <CheckBoxStatus<TaskPriority> status={"low"} setStatusFilter={setPriorityFilter}/>
                        <CheckBoxStatus<TaskPriority>  status={"medium"} setStatusFilter={setPriorityFilter}/>
                        <CheckBoxStatus<TaskPriority>  status={"high"} setStatusFilter={setPriorityFilter}/>
                    </div>
                </label>
                
                <AsignMembers 
                     users={usersFilter} setAddMembersActive={setIsAddMembersActive} 
                    uniqueText={"Select members"} maxIcons={3} iconSize={24}
                />
                <label>From
                    <DateInput value={startDateFilter} onChange={setStartDateFilter} />
                </label>
                <label>To
                    <DateInput value={endDateFilter} onChange={setEndDateFilterr} />
                </label>
                <label>Sort by
                    <CustomSelect value={sortValue} onChange={setSortValue} options={sortOptions}/>
                </label>
            { isAddMembersActive && 
            <AddMemberTwo 
            initiallyAsignedMembers={initiallyAsignedMembers} 
            exitAction={() => setIsAddMembersActive(false)} 
            selectedUsers={usersFilter} 
            handlerFilterUser={setUserFilter} 
            />
            }

        </div>
    )
}

export default LeftPanelProject;