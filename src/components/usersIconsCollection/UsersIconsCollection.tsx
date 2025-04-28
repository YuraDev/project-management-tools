import { User } from "../../types/user";
import { UserTheme } from "../../types/userTheme";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./UserIconCollection.module.css";

interface UserIconCollectionProps {
    users: User[],
    usersThemes?: UserTheme[],
    size?: number,
    fontSize?: number,
    maxIcons?: number,
}

const UserIconCollection = ({ users, size=34, maxIcons=4, fontSize, usersThemes }: UserIconCollectionProps) => {
    const visibleUsers = users.slice(0, maxIcons);
    const hiddenUsers = (users?.length || 0) - maxIcons;
    return(
        <div className={styles.iconsBlock}>
            {
                hiddenUsers > 0 && (
                    hiddenUsers < 9
                        ? <CustomUserIcon title={`+${hiddenUsers}`} totaly size={size} fontSize={fontSize}/>
                        : <CustomUserIcon title={"9+"} totaly size={size} fontSize={fontSize}/>
                )
            }
            { visibleUsers?.map((user) => <CustomUserIcon backgroundColor={usersThemes?.find((ut) => ut.userId === user.id)?.iconColor} title={user.name} size={size} key={user.id}  fontSize={fontSize}/>) }
        </div>
    )
}

export default UserIconCollection;