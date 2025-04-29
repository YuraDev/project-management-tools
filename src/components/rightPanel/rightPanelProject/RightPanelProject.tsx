import { memo } from "react";
import { useProjectControlStore } from "../../../store/projectControlStore";
import TaskAdd from "../../task/taskAdd/TaskAdd";
import TaskEdit from "../../task/taskEdit/TaskEdit";
import TaskDetails from "../../task/taskDetails/TaskDetails";
import { useUserThemeStore } from "../../../store/userThemeStore";

const RightPanelProject = memo(() => {
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const isEditTaskActive = useProjectControlStore((state) => state.isEditTaskActive);
    const isAddTaskActive = useProjectControlStore((state) => state.isAddTaskActive);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);

    return (
        <div
          className="w-[340px] h-full min-h-[calc(100vh-100px)]"
          style={{ backgroundColor: backgroundMode === "black" ? "black" : "#f3f4f6" }}
        >
          {isAddTaskActive 
          ? <TaskAdd /> 
          : selectedTask &&
            (isEditTaskActive ? <TaskEdit /> : <TaskDetails />)
          }
        </div>
      );
})

export default RightPanelProject;