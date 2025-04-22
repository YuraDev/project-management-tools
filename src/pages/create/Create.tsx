import { FolderKanban, UserPlus } from "lucide-react";
import styles from "./Create.module.css";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const Create = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    return(
        <div className={styles.main}>
            <NavLink to={"/create/project"}>
                <article className={styles.card}>
                    <h3>New project</h3>
                    <FolderKanban size={40}/>
                </article>
            </NavLink>
            { currentUser?.role === "admin" &&
            <NavLink to={"/create/user"}>
                <article  className={styles.card}>
                    <h3>New user</h3>
                    <UserPlus size={40}/>
                </article>
            </NavLink>
            }

        </div>
    )
}

export default Create;