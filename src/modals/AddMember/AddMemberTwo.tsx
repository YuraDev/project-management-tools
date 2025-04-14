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
    assignedMembers: User[],
    setAssignedMembers: React.Dispatch<React.SetStateAction<User[]>>,
}

const AddMemberTwo: React.FC<AddMemberTwoProps> = ({ initiallyAsignedMembers, exitAction, assignedMembers, setAssignedMembers }) => {




    // let { data: users, isLoading, isError } = useUsers();

    // const users = initiallyAsignedMembers;
    // todo - change for getting initialValues only outside
    
    // const handleOnClickMember = (id: string) => {
    //     setAssignedMembers( (prev) => 
    //         prev.includes(id)
    //         ? prev.filter((el) => el !== id)
    //         : [...prev, id]
    //     );
    // }

    const handleOnClickMember = (chosenUser: User) => {
        setAssignedMembers( (prev) => {
            if( prev.find((u) => u.id === chosenUser.id) ) {
                return prev.filter((u) => u.id !== chosenUser.id);
            } else {
                return [...prev, chosenUser];
            }
        }
            // prev.includes(id)
            // ? prev.filter((el) => el !== id)
            // : [...prev, id]
        );
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
            // assignedMembers
        };
    }, []);

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {isError}</div>;

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
                                <div onClick={() => handleOnClickMember(user)}>
                                    <SquarePlus size={30} color={ assignedMembers.find((u) => u.id === user.id) ? "green" : "black" }/>
                                </div>
                            </div> 
                        )
                }
            </div>
        </div>
    )
}

export default AddMemberTwo;