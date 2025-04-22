import React from "react";
import { User } from "../../types/user";
import UserIconCollection from "../usersIconsCollection/UsersIconsCollection";
import styles from "./AsignMembers.module.css";

interface AsignMembersProps {
    users: User[],
    // todo - possibly add this field to form zustand
    setAddMembersActive: (value: boolean) => void,
    uniqueText?: string,
    maxIcons?: number,
    iconSize?: number,
}

const AsignMembers = React.memo(({ users, setAddMembersActive, maxIcons, iconSize, uniqueText }: AsignMembersProps) => {
    return <div className={styles.asignBlock}>
        <label>Assigned Members:</label>
        <div className={styles.assignedMembers}>
            <button type="button" onClick={() => setAddMembersActive(true)}>{uniqueText ? uniqueText : "＋ Add Member"}</button>
        </div>
        { users  && <UserIconCollection users={users} maxIcons={maxIcons} size={iconSize}/> }
    </div>
});

export default AsignMembers;