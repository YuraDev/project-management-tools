import { User } from "../../types/user";
import UserIconCollection from "../usersIconsCollection/usersIconsCollection";
import styles from "./AsignMembers.module.css";

interface AsignMembersProps {
    users: User[],
    // todo - possibly add this field to form zustand
    setAddMembersActive: (value: boolean) => void,
    uniqueText?: string,
    maxIcons?: number,
    iconSize?: number,
}

const AsignMembers = ({ users, setAddMembersActive, maxIcons, iconSize, uniqueText }: AsignMembersProps) => {
    
    return <div className={styles.asignBlock}>
        {/* <label>
            Assigned Members:
            <div className={styles.assignedMembers}>
                <button type="button" onClick={() => setAddMembersActive(true)}>＋ Add Member</button>
            </div>
        </label>
        { users  && <UserIconCollection users={users} maxIcons={maxIcons}/> } */}


        <label>
            Assigned Members:
        </label>
        <div className={styles.assignedMembers}>
            <button type="button" onClick={() => setAddMembersActive(true)}>{uniqueText ? uniqueText : "＋ Add Member"}</button>
        </div>
        { users  && <UserIconCollection users={users} maxIcons={maxIcons} size={iconSize}/> }
    </div>
}

export default AsignMembers;