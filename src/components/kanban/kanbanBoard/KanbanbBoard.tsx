import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styles from "./KanbanBoard.module.css";
import { DroppableColumnBody } from "../drag/DroppableColumnBody";
import { KanbanDraggableCard } from "../drag/KanbanDraggableCard";
import { Task, TaskStatus } from "../../../types/task";

interface KanbanBoardProps {
    handleDragEnd: (dropValue: DropResult) => void,
    shouldShowColumn: (status: TaskStatus) => boolean,
    gridTemplateColumns: string,
    handleOnTaskClick: (task: Task) => void,
    todoTasks: Task[],
    inProgressTasks: Task[],
    doneTasks: Task[],
}

const KanbanBoard = ({ handleDragEnd, shouldShowColumn, gridTemplateColumns, handleOnTaskClick, todoTasks, inProgressTasks, doneTasks  }: KanbanBoardProps) => {
    
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            className="flex-grow grid [grid-template-rows:70px_1fr] gap-y-0 gap-x-[0.7rem] p-[15px]"
            style={{ gridTemplateColumns }}
          >
            {shouldShowColumn("todo") && (
              <div className="flex justify-center items-center font-bold text-[1.2rem] text-white h-[70px] rounded-t-[16px] bg-[#3b82f6]">
                Todo
              </div>
            )}
            {shouldShowColumn("in_progress") && (
              <div className="flex justify-center items-center font-bold text-[1.2rem] text-white h-[70px] rounded-t-[16px] bg-[#facc15]">
                In Progress
              </div>
            )}
            {shouldShowColumn("done") && (
              <div className="flex justify-center items-center font-bold text-[1.2rem] text-white h-[70px] rounded-t-[16px] bg-[#10b981]">
                Done
              </div>
            )}
      
            {shouldShowColumn("todo") && (
              <DroppableColumnBody droppableId="todo">
                <div className="bg-[#f3f4f6] rounded-b-[16px] p-[10px] h-[calc(100vh-200px)] flex flex-col justify-start gap-[0.5rem] overflow-y-auto w-full box-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {todoTasks.map((task, index) => (
                    <KanbanDraggableCard
                      key={task.id}
                      task={task}
                      index={index}
                      handleOnTaskClick={handleOnTaskClick}
                    />
                  ))}
                </div>
              </DroppableColumnBody>
            )}
      
            {shouldShowColumn("in_progress") && (
              <DroppableColumnBody droppableId="in_progress">
                <div className="bg-[#f3f4f6] rounded-b-[16px] p-[10px] h-[calc(100vh-200px)] flex flex-col justify-start gap-[0.5rem] overflow-y-auto w-full box-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {inProgressTasks.map((task, index) => (
                    <KanbanDraggableCard
                      key={task.id}
                      task={task}
                      index={index}
                      handleOnTaskClick={handleOnTaskClick}
                    />
                  ))}
                </div>
              </DroppableColumnBody>
            )}
      
            {shouldShowColumn("done") && (
              <DroppableColumnBody droppableId="done">
                <div className="bg-[#f3f4f6] rounded-b-[16px] p-[10px] h-[calc(100vh-200px)] flex flex-col justify-start gap-[0.5rem] overflow-y-auto w-full box-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {doneTasks.map((task, index) => (
                    <KanbanDraggableCard
                      key={task.id}
                      task={task}
                      index={index}
                      handleOnTaskClick={handleOnTaskClick}
                    />
                  ))}
                </div>
              </DroppableColumnBody>
            )}
          </div>
        </DragDropContext>
      );
}

export default KanbanBoard;