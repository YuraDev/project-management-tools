import { FolderKanban, UserPlus } from "lucide-react";
import styles from "./Create.module.css";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const Create = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    
    return(
        <div className={styles.main}>
            <NavLink to={"/create/project"}>
                <div className={styles.card}>
                    <h3>New project</h3>
                    <FolderKanban size={40}/>
                </div>
            </NavLink>
            { currentUser?.role === "admin" &&
            <NavLink to={"/create/user"}>
                <div  className={styles.card}>
                    <h3>New user</h3>
                    <UserPlus size={40}/>
                </div>
            </NavLink>
            }

        </div>
    )
}

export default Create;