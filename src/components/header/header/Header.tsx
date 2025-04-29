import HeaderModalAccout from "../headerModalAccout/HeaderModalAccout";
import { useUserStore } from "../../../store/userStore";
import CustomUserIcon from "../../../ui/icons/CustomUserIcon";
import { useUserThemeStore } from "../../../store/userThemeStore";
import CustomNavLink from "../../../ui/link/CustomNavLink";

const Header = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    const iconColor = useUserThemeStore((state) => state.iconColor);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return (
        <div
          className="w-full h-full flex justify-between items-center px-[40px]"
          style={{ backgroundColor: backgroundMode }}
        >
          <nav className="flex gap-[40px]">
            <CustomNavLink to="/projects" className="text-[22px] font-bold">Projects</CustomNavLink>
            <CustomNavLink to="/people" className="text-[22px] font-bold">People</CustomNavLink>
            {(currentUser?.role === "admin" || currentUser?.role === "manager") && (
              <CustomNavLink to="/create" className="text-[22px] font-bold">Create</CustomNavLink>
            )}
          </nav>
          <CustomUserIcon
            title={currentUser ? currentUser.name : "User"}
            size={36}
            onClick={() => setHeaderModalActive(!headerModalActive)}
            backgroundColor={iconColor}
          />
          {headerModalActive && <HeaderModalAccout />}
        </div>
      );
}

export default Header;