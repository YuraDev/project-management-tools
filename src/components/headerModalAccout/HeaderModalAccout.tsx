import { LogOut, X } from "lucide-react";
import styles from "./HeaderModalAcccout.module.css";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const HeaderModalAccout = () => {
    const navigate = useNavigate();
    const setLogoutUser = useUserStore((state) => state.setLogoutUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);

    const handleLogout = () => {
        setLogoutUser();
        navigate("/login");
        setHeaderModalActive(!headerModalActive);
    }
    return (
        <div className={styles.main}>
            <div className={styles.exitBlock} style={{justifyContent: "end"}} onClick={() => setHeaderModalActive(!headerModalActive)}>
                <X/>
            </div>
            <div className={styles.item} onClick={handleLogout}>
                <h2>Logout</h2>
                <LogOut/>
            </div>
        </div>
    )
}

export default HeaderModalAccout;