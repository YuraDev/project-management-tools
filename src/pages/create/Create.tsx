import { FolderKanban, UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useUserThemeStore } from "../../store/userThemeStore";

const Create = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    
    const themeClassMap = {
        purple: "hover:bg-[#f5f3ff] hover:shadow-[0_4px_6px_rgba(0,_0,_0,_0.08)]",
        green: "hover:bg-[#dcfce7] hover:shadow-[0_4px_6px_rgba(0,_0,_0,_0.08)]",
        blue: "hover:bg-[#dbeafe] hover:shadow-[0_4px_6px_rgba(0,_0,_0,_0.08)]",
        orange: "hover:bg-[#ffedd5] hover:shadow-[0_4px_6px_rgba(0,_0,_0,_0.08)]",
    };

    return (
        <div className={`min-h-[calc(100vh-100px)] px-[36px] pt-[30px] pb-[130px] flex justify-center items-center gap-[80px] ${backgroundMode === "black" ? "bg-black text-black" : "bg-[#f9f9fb] text-black"}`}>
            <NavLink to={"/create/project"}>
                <article className={`w-[240px] h-[240px] rounded-[12px] bg-white text-[20px] cursor-pointer flex flex-col justify-center items-center gap-[10px] ${highlightMode && themeClassMap[highlightMode]}`}>
                    <h3 className={`${backgroundMode === "black" ? "text-black" : "text-black"}`}>New project</h3>
                    <FolderKanban size={40} />
                </article>
            </NavLink>
            {currentUser?.role === "admin" && (
                <NavLink to={"/create/user"}>
                    <article className={`w-[240px] h-[240px] rounded-[12px] bg-white text-[20px] cursor-pointer flex flex-col justify-center items-center gap-[10px] ${highlightMode && themeClassMap[highlightMode]}`}>
                        <h3 className={`${backgroundMode === "black" ? "text-black" : "text-black"}`}>New user</h3>
                        <UserPlus size={40} />
                    </article>
                </NavLink>
            )}
        </div>
    );
};



export default Create;