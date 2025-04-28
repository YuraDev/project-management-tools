import React, { useEffect } from "react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { SquarePlus } from "lucide-react";
import { User } from "../../types/user";
import { UserTheme } from "../../types/userTheme";
import { useUserThemeStore } from "../../store/userThemeStore";

interface AddMemberProps {
    initiallyAssignedMembers?: User[],
    exitAction: () => void,
    selectedUsers: User[],
    handlerFilterUser: (value: User) => void,
    usersThemes?: UserTheme[],
}
const AddMember: React.FC<AddMemberProps> = ({ initiallyAssignedMembers, exitAction, selectedUsers, handlerFilterUser, usersThemes }) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div 
            className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center" 
            style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }} 
            onClick={exitAction}
        >            
            <div className="bg-white w-4/5 h-4/5 overflow-auto rounded-lg p-14 flex flex-col gap-4" onClick={(event) => event.stopPropagation()} style={{backgroundColor: backgroundMode}}>
                {
                    initiallyAssignedMembers && initiallyAssignedMembers
                        .map((user) =>  
                            <div className="py-2 flex items-center justify-between gap-5 border-b border-gray-300" key={user.id}>
                                <div className="flex items-center gap-5">
                                    <CustomUserIcon 
                                        title={user.name[0]} 
                                        backgroundColor={usersThemes?.find((ut) => ut.userId === user.id)?.iconColor} 
                                    />
                                    <h3>{user.name}</h3>
                                </div>
                                <div onClick={() => handlerFilterUser(user)}>
                                    <SquarePlus 
                                        size={30} 
                                        color={ selectedUsers.find((u) => u.id === user.id) ? "green" : backgroundMode === "black" ? "white" : "black" }
                                    />
                                </div>
                            </div> 
                        )
                }
            </div>
        </div>
    )
    
}

export default AddMember;