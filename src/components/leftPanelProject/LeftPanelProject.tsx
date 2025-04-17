import { AlignJustify, Settings } from "lucide-react";
import { useProjectControlStore } from "../../store/projectControlStore";
import styles from "./LeftPanelProject.module.css";
import LeftPanelInfoBlock from "../leftPanelInfoBlock/LeftPanelInfoBlock";
import LeftPanelSettings from "../leftPanelSettingsBlcok/LeftPanelSettingsBlock";

const LeftPanelProject = () => {
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const setIsProjectSettingsActive = useProjectControlStore((state) => state.setIsProjectSettingsActive);
    const isProjectSettingsActive = useProjectControlStore((state) => state.isProjectSettingsActive);

    return(
        <div className={styles.main}>
            <div className={styles.headerLeftPanel}>
                <div onClick={() => setIsLeftPanelActive(false)}><AlignJustify size={28}/></div>
                <div onClick={() => setIsProjectSettingsActive()}><Settings size={28}/></div>
            </div>
            {
                isProjectSettingsActive
                ? <LeftPanelSettings/>
                : <LeftPanelInfoBlock/>
            }
        </div>
    )
}

export default LeftPanelProject;