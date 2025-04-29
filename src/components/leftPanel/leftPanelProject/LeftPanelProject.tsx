import { AlignJustify, Settings } from "lucide-react";
import { useProjectControlStore } from "../../../store/projectControlStore";
import { useUserStore } from "../../../store/userStore";
import { lazy, Suspense } from "react";
import { useUserThemeStore } from "../../../store/userThemeStore";
const LeftPanelInfoBlock = lazy(() => import("../leftPanelInfoBlock/LeftPanelInfoBlock"));
const LeftPanelSettings = lazy(() => import("../leftPanelSettingsBlock/LeftPanelSettingsBlock"));

const LeftPanelProject = () => {
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const setIsProjectSettingsActive = useProjectControlStore((state) => state.setIsProjectSettingsActive);
    const isProjectSettingsActive = useProjectControlStore((state) => state.isProjectSettingsActive);
    const currentUser = useUserStore((state) => state.currentUser);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);

    return (
        <div
          className="w-[300px] box-border p-[35px_15px] bg-white border-r-[2px] border-[#f3f4f6] h-full overflow-y-auto leading-normal"
          style={{ backgroundColor: backgroundMode }}
        >
          <div className="flex items-center justify-between">
            <div onClick={() => setIsLeftPanelActive(false)}>
              <AlignJustify size={28} />
            </div>
            {currentUser?.role !== "member" && (
              <div onClick={setIsProjectSettingsActive}>
                <Settings size={28} />
              </div>
            )}
          </div>
          <Suspense>
            {isProjectSettingsActive ? <LeftPanelSettings /> : <LeftPanelInfoBlock />}
          </Suspense>
        </div>
      );
}

export default LeftPanelProject;