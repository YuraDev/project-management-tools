import { UserMinus, UserPen, UserPlus } from "lucide-react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
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
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

    const { data: users } = useReservedUsers(currentUser?.reservedMembers ?? []);
    const { data: searchedUser, refetch, isLoading, isError} = useUser(searchTerm, { enabled: false });
    const { data: usersThemes } = useUsersThemes(currentUser?.reservedMembers || []);

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

    useEffect(() => {
        if ( shouldSearch && searchTerm !== "" ) {
            refetch();
            setShouldSearch(false);
        }
    }, [shouldSearch, searchTerm, refetch]);

    return (
        <div className="p-10">
            <>
                <input 
                    type="text"
                    value={searchTerm}
                    className="p-2.5 px-3 border border-gray-300 rounded-lg mb-4 w-full text-lg"
                    placeholder="Add user by ID..."
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                />
                { isLoading && <h1 className="p-2.5 px-1 border-b border-gray-400 mb-11 flex justify-between items-center">Loading...</h1> }
                { isError && <h1 className="p-2.5 px-1 border-b border-gray-400 mb-11 flex justify-between items-center">No search results</h1> }
                { !isLoading && !isError && searchedUser &&
                    <div
                        className="p-2.5 px-1 border-b mb-11 flex justify-between items-center"
                        style={{ borderColor: highlightMode }}
                    >
                        <CustomUserIcon title={searchedUser.name} />
                        <h3>{searchedUser.name}</h3>
                        <div style={{ width: 84 }}>
                            <UserPlus size={30} onClick={() => handleReserveUser(searchedUser.id)} className="justify-self-end" />
                        </div>
                    </div>
                }
            </>
            <ul className="flex flex-col">
                { users && users.map((user) => (
                        <li key={user.id} className="my-1 py-2 px-1 flex justify-between items-center border-b border-gray-400">
                            <CustomUserIcon backgroundColor={ usersThemes?.find((ut) => ut.userId === user.id)?.iconColor } title={user.name} />
                            <h3>{user.name}</h3>
                            <div className="flex gap-6">
                                {currentUser?.role === "admin" && (
                                    <UserPen size={30} onClick={() => navigate(`/edit/user/${user.id}`)} />
                                )}
                                <UserMinus size={30} onClick={() => handleRemoveReservedUser(user.id)} />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default People;