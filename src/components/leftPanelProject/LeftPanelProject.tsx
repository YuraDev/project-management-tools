import { AlignJustify, Settings } from "lucide-react";
import { useProjectControlStore } from "../../store/projectControlStore";
import styles from "./LeftPanelProject.module.css";
import LeftPanelInfoBlock from "../leftPanelInfoBlock/LeftPanelInfoBlock";
import LeftPanelSettings from "../leftPanelSettingsBlcok/LeftPanelSettingsBlock";
import { useUserStore } from "../../store/userStore";

const LeftPanelProject = () => {
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const setIsProjectSettingsActive = useProjectControlStore((state) => state.setIsProjectSettingsActive);
    const isProjectSettingsActive = useProjectControlStore((state) => state.isProjectSettingsActive);
    const currentUser = useUserStore((state) => state.currentUser);

    return(
        <div className={styles.main}>
            <div className={styles.headerLeftPanel}>
                <div onClick={() => setIsLeftPanelActive(false)}><AlignJustify size={28}/></div>
                { currentUser?.role !== "member" && <div onClick={() => setIsProjectSettingsActive()}><Settings size={28}/></div> }
            </div>
            {
                isProjectSettingsActive
                ? <div style={{lineHeight: "normal"}}><LeftPanelSettings/></div>
                : <div style={{lineHeight: "normal"}}><LeftPanelInfoBlock/></div>
            }
        </div>
    )
}

export default LeftPanelProject;