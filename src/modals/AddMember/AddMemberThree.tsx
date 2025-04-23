import React, { useCallback, useEffect } from "react";
import styles from "./AddMember.module.css";
import { useUsers } from "../../hooks/useUsers";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { SquarePlus } from "lucide-react";
import { User } from "../../types/user";

interface AddMemberThreeProps {
    initiallyAsignedMembers?: User[],
    exitAction: () => void,
    assignedMembers: User[],
    setAssignedMembers: React.Dispatch<React.SetStateAction<User[]>>,
}

const AddMemberThree: React.FC<AddMemberThreeProps> = ({ initiallyAsignedMembers, exitAction, assignedMembers, setAssignedMembers }) => {

    let { data: users, isLoading, isError } = useUsers();

    if (initiallyAsignedMembers) users = initiallyAsignedMembers;
    // todo - change fo getting initialValues only outside
    
    const handleOnClickMember = useCallback((chosenUser: User) => {
        setAssignedMembers( (prev) => {
            return prev.find((u) => u.id === chosenUser.id) 
                ? prev.filter((u) => u.id !== chosenUser.id)
                : [...prev, chosenUser];
        });
    }, [setAssignedMembers]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError}</div>;

    return(
        <div className={styles.mainOverlay} onClick={exitAction}>
            <div className={styles.main} onClick={(event) => event.stopPropagation()}>
                {
                    users && users
                        .map((user) =>  
                            <div className={styles.element} key={user.id}>
                                <div className={styles.iconAndTitle}>
                                    <CustomUserIcon title={user.name[0]} />
                                    <h3>{user.name}</h3>
                                </div>
                                <div onClick={() => handleOnClickMember(user)}>
                                    <SquarePlus size={30} color={ assignedMembers.find((u) => u.id === user.id) ? "green" : "black"}/>
                                </div>
                            </div> 
                        )
                }
            </div>
        </div>
    )
}

export default AddMemberThree;