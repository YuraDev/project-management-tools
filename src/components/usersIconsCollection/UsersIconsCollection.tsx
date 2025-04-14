import { User } from "../../types/user";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./UserIconCollection.module.css";

interface UserIconCollectionProps {
    users: User[],
    size?: number,
    maxIcons?: number,
}

const UserIconCollection = ({ users, size=34, maxIcons=4 }: UserIconCollectionProps) => {
    // const visibleUsers = users?.slice(0, 3) || 0;
    // const hiddenUsers = (users?.length || 0) - 3;
    const visibleUsers = users?.slice(0, maxIcons) || 0;
    const hiddenUsers = (users?.length || 0) - maxIcons;

    return(
        <div className={styles.iconsBlock}>
            {
                hiddenUsers > 0 && (
                    hiddenUsers < 9
                        ? <CustomUserIcon title={`+${hiddenUsers}`} totaly size={size}/>
                        : <CustomUserIcon title={"9+"} totaly size={size}/>
                )
            }
            { visibleUsers?.map((user) => <CustomUserIcon title={user.name} size={size} key={user.id}/>) }
        </div>
    )
}

export default UserIconCollection;