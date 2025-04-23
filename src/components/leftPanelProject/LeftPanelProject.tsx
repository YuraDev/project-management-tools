import { AlignJustify, Settings } from "lucide-react";
import { useProjectControlStore } from "../../store/projectControlStore";
import styles from "./LeftPanelProject.module.css";
import { useUserStore } from "../../store/userStore";
import { lazy, Suspense } from "react";

const LeftPanelInfoBlock = lazy(() => import("../leftPanelInfoBlock/LeftPanelInfoBlock"));
const LeftPanelSettings = lazy(() => import("../leftPanelSettingsBlock/LeftPanelSettingsBlock"));

const LeftPanelProject = () => {
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const setIsProjectSettingsActive = useProjectControlStore((state) => state.setIsProjectSettingsActive);
    const isProjectSettingsActive = useProjectControlStore((state) => state.isProjectSettingsActive);
    const currentUser = useUserStore((state) => state.currentUser);

    return(
        <div className={styles.main}>
            <div className={styles.headerLeftPanel}>
                <div onClick={() => setIsLeftPanelActive(false)}><AlignJustify size={28}/></div>
                { currentUser?.role !== "member" && <div onClick={setIsProjectSettingsActive}><Settings size={28}/></div> }
            </div>
            {/* todo - not sure is necessary lazy loading */}
            <Suspense> 
            {
                isProjectSettingsActive
                ? <LeftPanelSettings/>
                : <LeftPanelInfoBlock/>
            }
            </Suspense>
        </div>
    )
}

export default LeftPanelProject;