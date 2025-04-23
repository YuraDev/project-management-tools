import { LogOut, X } from "lucide-react";
import styles from "./HeaderModalAcccout.module.css";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderModalAccout = () => {
    const navigate = useNavigate();
    const setLogoutUser = useUserStore((state) => state.setLogoutUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    const currentUser = useUserStore((state) => state.currentUser);

    const [hasCopied, setHasCopied] = useState<boolean>(false);

     const handleCopy = async(id: string) => {
        await navigator.clipboard.writeText(id);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
     }

    const handleLogout = () => {
        setLogoutUser();
        navigate("/login");
        setHeaderModalActive(!headerModalActive);
    }
    
    return (
        <div className={styles.main}>
            <div className={styles.exitBlock} style={{justifyContent: "end"}} onClick={() => setHeaderModalActive(!headerModalActive)}>
                <X size={24}/>
            </div>
            <div className={styles.item} onClick={() => handleCopy(currentUser?.id ?? "")}>
                <h2>id:</h2>
                <h2>{currentUser?.id}</h2>
            </div>
            <div className={styles.item} onClick={handleLogout}>
                <h2>Logout</h2>
                <LogOut size={20}/>
            </div>
            {hasCopied && (
                <div className={styles.copyAlert}>
                    Copied!
                </div>
            )}
        </div>
    )
}

export default HeaderModalAccout;