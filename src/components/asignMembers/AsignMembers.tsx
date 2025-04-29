import React from "react";
import { User } from "../../types/user";
import UserIconCollection from "../usersIconsCollection/UsersIconsCollection";
import { UserTheme } from "../../types/userTheme";
import { useUserThemeStore } from "../../store/userThemeStore";

interface AsignMembersProps {
    users: User[],
    setAddMembersActive: (value: boolean) => void,
    uniqueText?: string,
    maxIcons?: number,
    iconSize?: number,
    usersThemes: UserTheme[],
}

const AsignMembers = React.memo(({ users, setAddMembersActive, maxIcons, iconSize, uniqueText, usersThemes }: AsignMembersProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

    const themeClassMap: Record<string, string> = {
        purple: "bg-purple-100 border border-purple-300 text-purple-700 hover:bg-purple-200",
        green: "bg-green-100 border border-green-300 text-green-800 hover:bg-green-200",
        blue: "bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200",
        orange: "bg-orange-100 border border-orange-300 text-orange-900 hover:bg-orange-200",
    };

    return (
        <div className="grid [grid-template-areas:'label_label''button_icons'] auto-rows-auto items-center gap-y-0">
            <label className="w-full [grid-area:label]">Assigned Members:</label>
            <div className="[grid-area:button]">
                <button
                    type="button"
                    onClick={() => setAddMembersActive(true)}
                    className={`mt-[4px] px-[20px] py-[6px] rounded cursor-pointer text-[14px] 
                        ${highlightMode ? themeClassMap[highlightMode] : ""}
                    `}
                >
                    {uniqueText ? uniqueText : "＋ Add Member"}
                </button>
            </div>
            {users && (
            <div className="[grid-area:icons]">
                <UserIconCollection
                    usersThemes={usersThemes}
                    users={users}
                    maxIcons={maxIcons}
                    size={iconSize}
                />
            </div>
            )}
        </div>
    );
});


export default AsignMembers;