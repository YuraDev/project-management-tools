import React, { useEffect } from "react";
import styles from "./AddMember.module.css";
import { useUsers } from "../../hooks/useUsers";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { SquarePlus } from "lucide-react";
import { User } from "../../types/user";
import { useProjectControlStore } from "../../store/projectControlStore";

interface AddMemberTwoProps {
    initiallyAsignedMembers?: User[],
    exitAction: () => void,
    selectedUsers: User[],
    handlerFilterUser: (value: User) => void,
}
const AddMemberTwo: React.FC<AddMemberTwoProps> = ({ initiallyAsignedMembers, exitAction, selectedUsers, handlerFilterUser }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return(
        <div className={styles.mainOverlay} onClick={exitAction}>
            <div className={styles.main} onClick={(event) => event.stopPropagation()}>
                {
                    initiallyAsignedMembers && initiallyAsignedMembers
                        .map((user) =>  
                            <div className={styles.element} key={user.id}>
                                <div className={styles.iconAndTitle}>
                                    <CustomUserIcon title={user.name[0]} />
                                    <h3>{user.name}</h3>
                                </div>
                                <div onClick={() => handlerFilterUser(user)}>
                                    <SquarePlus size={30} color={ selectedUsers.find((u) => u.id === user.id) ? "green" : "black" }/>
                                </div>
                            </div> 
                        )
                }
            </div>
        </div>
    )
}

export default AddMemberTwo;