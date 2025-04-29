import { User } from "../../types/user";
import { UserTheme } from "../../types/userTheme";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";

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
    return (
        <div className="w-full flex justify-end gap-x-[2px]">
          {
            hiddenUsers > 0 && (
              hiddenUsers < 9
                ? <CustomUserIcon title={`+${hiddenUsers}`} totaly size={size} fontSize={fontSize} />
                : <CustomUserIcon title={"9+"} totaly size={size} fontSize={fontSize} />
            )
          }
          {
            visibleUsers?.map((user) => (
              <CustomUserIcon
                key={user.id}
                title={user.name}
                backgroundColor={usersThemes?.find((ut) => ut.userId === user.id)?.iconColor}
                size={size}
                fontSize={fontSize}
              />
            ))
          }
        </div>
      );
}

export default UserIconCollection;