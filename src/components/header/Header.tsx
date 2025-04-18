import styles from "./Header.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const Header = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    
    return(
        <div className={styles.main}>
            <nav>
                <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ""}>Projects</NavLink>
                <NavLink to="/people" className={({ isActive }) => isActive ? styles.active : ""}>People</NavLink>
                { currentUser?.role !== "member" && <NavLink to="/create" className={({ isActive }) => isActive ? styles.active : ""}>Create</NavLink> }
            </nav>
            <CustomUserIcon title={"Yura"} size={36}/>
        </div>
    )
}

export default Header;