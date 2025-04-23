import { UserMinus, UserPen, UserPlus } from "lucide-react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./People.module.css";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { updateReservedMembers } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/users/useUser";
import { useReservedUsers } from "../../hooks/users/useReservedUsers";

const People = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [shouldSearch, setShouldSearch] = useState<boolean>(false);
    const [debouncerTimer, setDebouncerTimer] = useState<number | null>(null);

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


    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if ( debouncerTimer ) clearTimeout(debouncerTimer);
        const timer = setTimeout(() => {
            setShouldSearch(true);
        }, 2000);
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
            setUser({
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                reservedMembers: updatedUser.reservedMembers,
            });
        } catch(error) {
            console.error("Error reserving user:", error);
        }
    }

    const handleRemoveReservedUser = async (userId: string) => {
        if (!currentUser) return;
        try {
            const updatedReservedMembers = currentUser.reservedMembers.filter((id) => id !== userId);
            const updatedUser = await updateReservedMembers({
                id: currentUser.id,
                reservedMembers: updatedReservedMembers,
            });
            setUser({
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                reservedMembers: updatedUser.reservedMembers,
            });
        } catch(error) {
            console.error("Error reserving user:", error);
        }
    }

    if ( isLoading ) return <h3>Loading...</h3>
    if ( isError ) return <h3>Failed to fetch users!</h3>
    
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
                        <div className={styles.searchElement}>
                            <CustomUserIcon title={searchedUser.name}/>
                            <h3>{searchedUser.name}</h3>
                            <UserPlus size={30} onClick={() => handleReserveUser(searchedUser.id)}/>
                        </div>
                }
            </div>
            <ul className={styles.list}>
                {
                    users && users.map((user) => 
                        <li key={user.id} className={styles.element}>
                            <CustomUserIcon title={user.name}/>
                            <h3>{user.name}</h3>
                            <div style={{display: "flex", gap: 24}}>
                                { currentUser?.role === "admin" && <UserPen size={30} onClick={() => navigate(`/edit/user/${user.id}`)}/> }
                                <UserMinus size={30} onClick={() => handleRemoveReservedUser(user.id)}/>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default People;