import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderModalAccout from "../headerModalAccout/HeaderModalAccout";
import { useUserStore } from "../../../store/userStore";
import CustomUserIcon from "../../../ui/icons/CustomUserIcon";
import { useUserThemeStore } from "../../../store/userThemeStore";

const Header = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    const iconColor = useUserThemeStore((state) => state.iconColor);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

    return(
        <div className={styles.main}>
            <nav>
                <NavLink to="/projects" style={({ isActive }) => ({color: isActive ? highlightMode : "black"})}>Projects</NavLink>
                <NavLink to="/people"  style={({ isActive }) => ({color: isActive ? highlightMode : "black"})}>People</NavLink>
                { currentUser?.role !== "member" && <NavLink to="/create"  style={({ isActive }) => ({color: isActive ? highlightMode : "black"})}>Create</NavLink> }
            </nav>
            <CustomUserIcon title={currentUser ? currentUser.name : "User"} size={36} onClick={() => setHeaderModalActive(!headerModalActive)} backgroundColor={iconColor} />
            { headerModalActive && <HeaderModalAccout/> }
        </div>
    )
}

export default Header;