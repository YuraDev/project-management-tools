import React from "react";
import { User } from "../../types/user";
import UserIconCollection from "../usersIconsCollection/UsersIconsCollection";
import styles from "./AsignMembers.module.css";
import { UserTheme } from "../../types/userTheme";

interface AsignMembersProps {
    users: User[],
    setAddMembersActive: (value: boolean) => void,
    uniqueText?: string,
    maxIcons?: number,
    iconSize?: number,
    usersThemes: UserTheme[],
}

const AsignMembers = React.memo(({ users, setAddMembersActive, maxIcons, iconSize, uniqueText, usersThemes }: AsignMembersProps) => {
    return <div className={styles.asignBlock}>
        <label>Assigned Members:</label>
        <div className={styles.assignedMembers}>
            <button type="button" onClick={() => setAddMembersActive(true)}>{uniqueText ? uniqueText : "＋ Add Member"}</button>
        </div>
        { users  && <UserIconCollection usersThemes={usersThemes} users={users} maxIcons={maxIcons} size={iconSize}/> }
    </div>
});

export default AsignMembers;