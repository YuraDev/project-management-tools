import { Settings, X } from "lucide-react";
import { memo } from "react";

interface RightPanelHeaderProps {
    taskTitle: string,
    setIsEditTaskActive?: (value: boolean) => void,
    setIsRightPanelActive: (value: boolean) => void,
}

const RightPanelHeader = memo(({ taskTitle, setIsEditTaskActive, setIsRightPanelActive }: RightPanelHeaderProps) => {
    return (
        <div className="flex justify-between items-center text-[30px] h-[45px] w-[calc(310px-50px)] box-border">
          <h1 className="font-bold break-words overflow-hidden text-ellipsis line-clamp-1 w-full">
            {taskTitle}
          </h1>
          <div className="flex items-center gap-[2px]">
            {setIsEditTaskActive && <Settings size={30} onClick={() => setIsEditTaskActive(false)} />}
            <X size={34} onClick={() => setIsRightPanelActive(false)} />
          </div>
        </div>
    );
});

export default RightPanelHeader;