// import { Draggable } from "@hello-pangea/dnd"
// import { Task } from "../../types/task"
// import KanbanCard from "../kanbanCard/KanbanCard"

// interface KanbanDraggableCardProps {
//     task: Task,
//     index: number,
//     handleOnTaskClick: (task: Task) => void,
// }

// export const KanbanDraggableCard = ({ task, index, handleOnTaskClick }: KanbanDraggableCardProps) => (
//     <Draggable draggableId={task.id} index={index}>
//         {(provided) => (
//             <div
//                 ref={provided.innerRef}
//                 {...provided.draggableProps}
//                 {...provided.dragHandleProps}
//             >
//                 <KanbanCard task={task} handleOnTaskClick={handleOnTaskClick}/>
//             </div>  
//         )}
//     </Draggable>
// );







import { Draggable } from '@hello-pangea/dnd';
import { ReactNode } from 'react';
import { Task } from '../../types/task';
import KanbanCard from '../kanbanCard/KanbanCard';

type Props = {
  task: Task;
  index: number;
  handleOnTaskClick?: (task: Task) => void;
};

export const KanbanDraggableCard = ({ task, index, handleOnTaskClick }: Props) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-full"
        >
            {/* @ts-ignore */}
          <KanbanCard task={task} handleOnTaskClick={handleOnTaskClick} />
        </div>
      )}
    </Draggable>
  );
};
