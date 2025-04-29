import { LogOut, Paintbrush, UserRoundCog, X } from "lucide-react";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserThemeStore } from "../../../store/userThemeStore";

const HeaderModalAccout = () => {
    const navigate = useNavigate();
    const setLogoutUser = useUserStore((state) => state.setLogoutUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    const currentUser = useUserStore((state) => state.currentUser);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const clearTheme = useUserThemeStore((state) => state.clearTheme);

    const [hasCopied, setHasCopied] = useState<boolean>(false);

     const handleCopy = async(id: string) => {
        await navigator.clipboard.writeText(id);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
     }

     const handleClickPesonalisation = () => {
        navigate("/personalisation");
        setHeaderModalActive(false);
    }
    const handleClickAccount = () => {
        navigate(`/edit/user/${currentUser?.id}`);
        setHeaderModalActive(false);
    }

    const handleLogout = () => {
        setLogoutUser();
        setHeaderModalActive(!headerModalActive);
        clearTheme();
        navigate("/login");
    }

    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const themeClassMap: Record<string, string> = {
        purple: "hover:bg-[#f5f3ff] hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)]",
        green: "hover:bg-[#dcfce7] hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)]",
        blue: "hover:bg-[#dbeafe] hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)]",
        orange: "hover:bg-[#ffedd5] hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)]",
    };

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" onClick={() => setHeaderModalActive(false)}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="fixed right-0 top-[calc((100px-36px)/2+36px)] flex flex-col items-end justify-center rounded-[8px] border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            style={{
              backgroundColor: backgroundMode === "black" ? "black" : "white",
            }}
          >
            <div className="p-[12px_8px] self-end justify-self-end" onClick={() => setHeaderModalActive(!headerModalActive)} >
              <X size={24} />
            </div>
            <div
              className="w-[240px] cursor-pointer flex justify-between items-center p-[12px_8px] rounded-[8px] hover:bg-[#f5f3ff] hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)] hover:text-black"
              onClick={() => handleCopy(currentUser?.id ?? "")}
            >
              <h2 className="text-[18px]">id:</h2>
              <h2 className="text-[18px] pr-[7px]">{currentUser?.id}</h2>
            </div>
            {currentUser?.role === "admin" && (
              <div
                className={`w-[240px] cursor-pointer flex justify-between items-center p-[12px_8px] rounded-[8px] text-black ${themeClassMap[highlightMode ?? "purple"]}`}
                onClick={handleClickAccount}
              >
                <h2 className="text-[18px]">Account</h2>
                <UserRoundCog size={20} />
              </div>
            )}
            <div
              className={`w-[240px] cursor-pointer flex justify-between items-center p-[12px_8px] rounded-[8px] text-black ${themeClassMap[highlightMode ?? "purple"]}`}
              onClick={handleClickPesonalisation}
            >
              <h2 className="text-[18px]">Personalisation</h2>
              <Paintbrush size={20} />
            </div>
            <div
              className={`w-[240px] cursor-pointer flex justify-between items-center p-[12px_8px] rounded-[8px] text-black ${themeClassMap[highlightMode ?? "purple"]}`}
              onClick={handleLogout}
            >
              <h2 className="text-[18px]">Logout</h2>
              <LogOut size={20} />
            </div>   
            {hasCopied && (
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#333] text-white px-[10px] py-[5px] rounded-[5px] text-[14px]">
                Copied!
              </div>
            )}
          </div>
        </div>
      );
}

export default HeaderModalAccout;