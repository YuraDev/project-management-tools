import { UserMinus, UserPen, UserPlus } from "lucide-react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./People.module.css";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { updateReservedMembers } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/users/useUser";
import { useReservedUsers } from "../../hooks/users/useReservedUsers";
import { useUsersThemes } from "../../hooks/usersThemes/useUserThemes";
import { useUserThemeStore } from "../../store/userThemeStore";

const People = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [shouldSearch, setShouldSearch] = useState<boolean>(false);
    const [debouncerTimer, setDebouncerTimer] = useState<number | null>(null);

    const currentUser = useUserStore((state) => state.currentUser);
    const setUser = useUserStore((state) => state.setLoggedInUser);

    const { data: users } = useReservedUsers(currentUser?.reservedMembers ?? []);
    const { data: searchedUser, refetch, isLoading, isError} = useUser(searchTerm, { enabled: false }); // call manually
    const { data: usersThemes } = useUsersThemes(currentUser?.reservedMembers || []);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

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
        }, 1000);
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
        if (currentUser.id === userId) return;
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

    return(
        <div className={styles.main}>
            <div>
                <input 
                    type={"text"}
                    value={searchTerm}
                    className={styles.searchInput}
                    placeholder={"Add user by ID..."}
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                />
                {   isLoading && <h1 className={styles.searchElement}>Loading...</h1> }
                {   isError && <h1 className={styles.searchElement}>No search results</h1> }
                {
                    !isLoading && !isError && searchedUser &&
                        <div className={styles.searchElement} style={{borderColor: highlightMode}}>
                            <CustomUserIcon title={searchedUser.name}/>
                            <h3>{searchedUser.name}</h3>
                            <div style={{ width: 84 }}>
                                <UserPlus size={30} onClick={() => handleReserveUser(searchedUser.id)} style={{ justifySelf: "end" }}/>
                            </div>
                        </div>
                }
            </div>
            <ul className={styles.list}>
                {
                    users && users.map((user) => 
                        <li key={user.id} className={styles.element}>
                            <CustomUserIcon backgroundColor={usersThemes?.find((ut) => ut.userId === user.id)?.iconColor} title={user.name}/>
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