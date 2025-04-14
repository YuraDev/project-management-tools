import styles from "./Header.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <div className={styles.main}>
            <nav>
                <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ""}>Projects</NavLink>
                <NavLink to="/people" className={({ isActive }) => isActive ? styles.active : ""}>People</NavLink>
                <NavLink to="/create" className={({ isActive }) => isActive ? styles.active : ""}>Create</NavLink>
            </nav>
            <CustomUserIcon title={"Yura"} size={36}/>
        </div>
    )
}

export default Header;