import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUserStore } from "../types/auth";

interface UserState {
    currentUser: AuthUserStore | null;
    setLoggedInUser: (user: AuthUserStore) => void;
    setLogoutUser: () => void; 
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            currentUser: null,
            setLoggedInUser: (user) => set({ currentUser: user }),
            setLogoutUser: () => set({ currentUser: null }),
        }),
        {
            name: "auth-storage", // save data to localStorage
        }
    )
);