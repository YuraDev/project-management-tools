import React, { useCallback, useEffect } from "react";
import styles from "./AddMember.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { SquarePlus } from "lucide-react";
import { User } from "../../types/user";
import { useUsers } from "../../hooks/users/useUsers";

interface AddMemberProps {
// todo - change for initiallyAssignedMembers
    initiallyAssignedMembers?: User[],
    exitAction: () => void,
    assignedMembers: string[],
    setAssignedMembers: React.Dispatch<React.SetStateAction<string[]>>,
}

const AddMember: React.FC<AddMemberProps> = React.memo(({ initiallyAssignedMembers, exitAction, assignedMembers, setAssignedMembers }) => {

    let { data: users, isLoading, isError } = useUsers();

    if (initiallyAssignedMembers) users = initiallyAssignedMembers;
    // todo - change for getting initialValues only outside
    
    const handleOnClickMember = useCallback((id: string) => {
        setAssignedMembers( (prev) => 
            prev.includes(id)
            ? prev.filter((el) => el !== id)
            : [...prev, id]
        );
    }, [setAssignedMembers]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Problem during getting members!</div>;

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
                                <div onClick={() => handleOnClickMember(user.id)}>
                                    <SquarePlus size={30} color={ assignedMembers.includes(user.id) ? "green" : "black"}/>
                                </div>
                            </div> 
                        )
                }
            </div>
        </div>
    )
});

export default AddMember;