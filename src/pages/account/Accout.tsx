import AccountPersonalisation from "../personalisation/Personalisation";
import { useUserStore } from "../../store/userStore";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./Account.module.css";

const Account = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    

    if ( !currentUser ) return <div>No user`s data found.</div>
    return(
        <div className={styles.main}>
            {/* <div className={styles.headerBlock}>
                <CustomUserIcon title={currentUser?.name} size={50} fontSize={30}/>
                <h1>{currentUser?.name}</h1>

            </div>
            <AccountPersonalisation/> */}
        </div>
    )
}

export default Account;