import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderModalAccout from "../headerModalAccout/HeaderModalAccout";
import { useUserStore } from "../../../store/userStore";
import CustomUserIcon from "../../../ui/icons/CustomUserIcon";

const Header = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    return(
        <div className={styles.main}>
            <nav>
                <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ""}>Projects</NavLink>
                <NavLink to="/people" className={({ isActive }) => isActive ? styles.active : ""}>People</NavLink>
                { currentUser?.role !== "member" && <NavLink to="/create" className={({ isActive }) => isActive ? styles.active : ""}>Create</NavLink> }
            </nav>
            <CustomUserIcon title={currentUser ? currentUser.name : "User"} size={36} onClick={() => setHeaderModalActive(!headerModalActive)}/>
            { headerModalActive && <HeaderModalAccout/> }
        </div>
    )
}

export default Header;