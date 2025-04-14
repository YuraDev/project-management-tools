import { CalendarCheck, FolderKanban, UserPlus } from "lucide-react";
import styles from "./Create.module.css";
import { NavLink } from "react-router-dom";

const Create = () => {
    return(
        <div className={styles.main}>
            <NavLink to={"/create/project"}>
                <div className={styles.card}>
                    <h3>New project</h3>
                    <FolderKanban size={40}/>
                </div>
            </NavLink>
            <div  className={styles.card}>
                <h3>New task</h3>
                <CalendarCheck size={40}/>
            </div>
            <NavLink to={"/create/user"}>
                <div  className={styles.card}>
                    <h3>New user</h3>
                    <UserPlus size={40}/>
                </div>
            </NavLink>
        </div>
    )
}

export default Create;