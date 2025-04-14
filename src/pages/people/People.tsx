import { UserMinus, UserPlus } from "lucide-react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./People.module.css";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useReservedUsers } from "../../hooks/useReservedUsers";
import { useUserStore } from "../../store/userStore";
import { updateReservedMembers } from "../../services/userApi";

const People = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [shouldSearch, setShouldSearch] = useState<boolean>(false);
    const [debouncerTimer, setDebouncerTimer] = useState(null);

    const currentUser = useUserStore((state) => state.currentUser);
    const setUser = useUserStore((state) => state.setLoggedInUser);
    
    // change for reserved users of the user
    const { data: users, isLoading, isError } = useReservedUsers(currentUser?.reservedMembers ?? []);
    const { data: searchedUser, refetch } = useUser(searchTerm, { enabled: false }); // call manually

    useEffect(() => {
        if ( shouldSearch && searchTerm !== "" ) {
            refetch();
            setShouldSearch(false);
        }
    }, [shouldSearch, searchTerm, refetch]);


    if ( isLoading ) return <h3>Is logading</h3>
    if ( isError ) return <h3>Error!</h3>

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if ( debouncerTimer ) clearTimeout(debouncerTimer);
        const timer = setTimeout(() => {
            setShouldSearch(true);
        }, 2000);
        // @ts-ignore
        setDebouncerTimer(timer);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if ( debouncerTimer ) 
                clearTimeout(debouncerTimer);
            setShouldSearch(true);
        }
    }

    const handleReserveUser = async (userId: string) => {
        if (!currentUser) return;
        if (currentUser.reservedMembers.includes(userId)) return;
        try {
            const updatedUser = await updateReservedMembers({
                id: currentUser.id,
                reservedMembers: [...currentUser.reservedMembers, userId],
            });
            
            const updatedAuthUser = {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                reservedMembers: updatedUser.reservedMembers,
            };
            setUser(updatedAuthUser);

        } catch(error) {
            console.error("Error reserving user:", error);
        }
    }

    const handleRemoveReservedUser = async (userId: string) => {
        if (!currentUser) return;
        const updatedReservedMembers = currentUser.reservedMembers.filter((id) => id !== userId);
        try {
            const updatedUser = await updateReservedMembers({
                id: currentUser.id,
                reservedMembers: updatedReservedMembers,
            });
            const updatedAuthUser = {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                reservedMembers: updatedUser.reservedMembers,
            };
            setUser(updatedAuthUser);
        } catch(error) {
            console.error("Error reserving user:", error);
        }
    }


    return(
        <div className={styles.main}>
            <div>
                <input 
                    type="text"
                    value={searchTerm}
                    className={styles.searchInput}
                    placeholder="Add user by ID..."
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                />
                {
                    searchedUser &&
                    <div>
                        <div className={styles.searchElement}>
                        {/* @ts-ignore */}
                            <CustomUserIcon title={searchedUser.name}/>
                            {/* @ts-ignore */}
                            <h3>{searchedUser.name}</h3>
                            <UserPlus size={36} onClick={() => handleReserveUser(searchedUser.id)}/>
                        </div>
                    </div>

                }
            </div>
            <ul className={styles.list}>
                {
                    users && users.map((user) => 
                        <li key={user.id} className={styles.element}>
                            <CustomUserIcon title={user.name}/>
                            <h3>{user.name}</h3>
                            <UserMinus size={36} onClick={() => handleRemoveReservedUser(user.id)}/>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default People;