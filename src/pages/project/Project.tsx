import { useParams } from "react-router-dom";
import styles from"./Project.module.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useProjectUsers } from "../../hooks/useProjectUsers";
import { useProjectTasks } from "../../hooks/useProjectTasks";
import KanbanCard from "../../components/kanbanCard/KanbanCard";
import { useProjectControlStore } from "../../store/projectControlStore";
import RightPanelPorject from "../../components/rightPanelProject/RightPanelProject";
import { Task, TaskStatus } from "../../types/task";
import { AlignJustify } from "lucide-react";
import LeftPanelProject from "../../components/leftPanelProject/LeftPanelProject";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "../../components/drag/KanbanColumn";
import { updateTask } from "../../services/taskApi";
import kanbanStyles from "./KanbanBoard.module.css";
import { DroppableColumnBody } from "../../components/drag/DroppableColumnBody";
import { KanbanDraggableCard } from "../../components/drag/KanbanDraggableCard";
import { useProject } from "../../hooks/useProject";


const Project = () => {

    const { projectId } = useParams();
    // const setSelectedProject = useProjectControlStore((state) => state.setSelectedProject);
    // const { data: project, isLoading: isProjectLoading, isError: isProjectError } = useProject(projectId || "1");
    // setSelectedProject(project || null);

    const [isAddTaskModalActive, setIsAddTaskModalActive] = useState<boolean>(false);

    // @ts-ignore
    // const { data: project, isLoading: isProjectLoading, isError: isProjectError } = useProjectUsers(projectId);
    // @ts-ignore
    const { data: projectUsers, isLoading: isProjectUsersLoading, isError: isProjectUsersError } = useProjectUsers(projectId);
    // @ts-ignore
    const { data: projectTasks, isLoading: isProjectTasksLoading, isError: isProjectTasksError } = useProjectTasks(projectId);

    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const setSelectedTask = useProjectControlStore((state) => state.setSelectedTask);

    const isRightPanelActive = useProjectControlStore((state) => state.isRightPanelActive);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const isLeftPanelActive = useProjectControlStore((state) => state.isLeftPanelActive);
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    
    const isAddTaskActive = useProjectControlStore((state) => state.isAddTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);

    const statusFilter = useProjectControlStore((state) => state.statusFilter);
    const usersFilter = useProjectControlStore((state) => state.usersFilter);

    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: updateTask,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    });



    const sortValue = useProjectControlStore((state) => state.sortValue);


    const startDateFilter = useProjectControlStore((state) => state.startDateFilter);
    const endDateFilter = useProjectControlStore((state) => state.endDateFilter);
    const priorityFilter = useProjectControlStore((state) => state.priorityFilter);

    const controlPanelFilters = (status: TaskStatus): Task[] => {
      return projectTasks?.filter(task => 
        task.status === status &&
        (usersFilter.length === 0 || usersFilter.some(user => task.assignedMembers?.includes(user.id))) &&
        (!task.startDate || startDateFilter === "" || task.startDate >= startDateFilter) &&
        (!task.endDate || endDateFilter === "" || task.endDate <= endDateFilter) &&
        (!priorityFilter.length || task.priority && priorityFilter.includes(task.priority))
      ) || [];
    };
    const controlPanelSort = (tasks: Task[]): Task[] => {
      const returnTime = (date: string) => new Date(date || "").getTime();
      const sortCollection = {
        ["Start date dec"]: () => [...tasks].sort( (a, b) => returnTime(b.startDate as string) - returnTime(a.startDate as string) ),
        ["Start date inc"]: () => [...tasks].sort( (a, b) => returnTime(a.startDate as string) - returnTime(b.startDate as string) ),
        ["End date dec"]: () => [...tasks].sort( (a, b) => returnTime(b.endDate as string) - returnTime(a.endDate as string) ),
        ["End date inc"]: () => [...tasks].sort( (a, b) => returnTime(a.endDate as string) - returnTime(b.endDate as string) ),
        ["none"]: () => tasks,
      };
      return sortValue && sortCollection[sortValue] ? sortCollection[sortValue]() : tasks;
    }


    // const todoTasks = controlPanelFilters("todo");
    // const inProgressTasks = controlPanelFilters("in_progress");
    // const doneTasks = controlPanelFilters("done");

    const todoTasks = controlPanelSort(controlPanelFilters("todo"));
    const inProgressTasks = controlPanelSort(controlPanelFilters("in_progress"));
    const doneTasks = controlPanelSort(controlPanelFilters("done"));

    // const todoTasks = projectTasks?.filter(task => 
    //   task.status === "todo" &&
    //   (usersFilter.length === 0 || usersFilter.some(user => task.assignedMembers?.includes(user.id))) &&
    //   (!task.startDate || startDateFilter === "" || task.startDate >= startDateFilter) &&
    //   (!task.endDate || endDateFilter === "" || task.endDate <= endDateFilter) &&
    //   (!priorityFilter.length || priorityFilter.includes(task.priority))
    // ) || [];
  

    // const inProgressTasks = projectTasks?.filter(task =>
    //   task.status === "in_progress" &&
    //   (usersFilter.length === 0 || usersFilter.some(user => task.assignedMembers?.includes(user.id))) &&
    //   (!task.startDate || startDateFilter === "" || task.startDate >= startDateFilter) &&
    //   (!task.endDate || endDateFilter === "" || task.endDate <= endDateFilter) &&
    //   (!priorityFilter.length || priorityFilter.includes(task.priority))
    // ) || [];
    
    // const doneTasks = projectTasks?.filter(task =>
    //   task.status === "done" &&
    //   (usersFilter.length === 0 || usersFilter.some(user => task.assignedMembers?.includes(user.id))) &&
    //   (!task.startDate || startDateFilter === "" || task.startDate >= startDateFilter) &&
    //   (!task.endDate || endDateFilter === "" || task.endDate <= endDateFilter) &&
    //   (!priorityFilter.length || priorityFilter.includes(task.priority))
    // ) || [];


    // const todoTasks = projectTasks?.filter((task) => task.status === "todo"
    // && usersFilter.length === 0 || usersFilter.find((u) => u.id === task.id)
    // ) || [];
    // const inProgressTasks = projectTasks?.filter((task) => task.status === "in_progress"
    // && usersFilter.length === 0 || usersFilter.find((u) => u.id === task.id)
    // ) || [];
    // const doneTasks = projectTasks?.filter((task) => task.status === "done"
    // && usersFilter.length === 0 || usersFilter.find((u) => u.id === task.id)
    // ) || [];



    const handleOnTaskClick = (task: Task) => {
      setIsAddTaskActive(false);
      setIsEditTaskActive(false);
      setSelectedTask(task);
      setIsRightPanelActive(true);
    }

    const handleDragEnd = async (result: DropResult) => {
      const { source, destination, draggableId } = result;
      // if drop hsppened outer columns 
      if (!destination) return;
      // if drop hsppened in the same column
      if (source.droppableId === destination.droppableId) return;

      try {
        const selectedTask = projectTasks?.find((t) => t.id === draggableId);
        if ( !selectedTask ) return;

        mutation.mutate({
          ...selectedTask,
          status: destination.droppableId as TaskStatus,
        });

      } catch( error ) {
        console.error("Failed to update task status:", error);
      }
    }



    const shouldShowColumn = (status: TaskStatus): boolean => {
      return statusFilter.length === 0 || statusFilter.includes(status);
    }

    const visibleColumnsCount = [
      shouldShowColumn("todo"),
      shouldShowColumn("in_progress"),
      shouldShowColumn("done"),
    ].filter(Boolean).length;


    const gridTemplateColumns =  `repeat(${visibleColumnsCount}, 1fr)`;


        // useEffect(() => {
        //   console.log("usersFilter", usersFilter);
        // }, [usersFilter]);

        useEffect(() => {
          console.log("usersFilter project", usersFilter);
        }, [usersFilter]);

    return(
        <div className={styles.main}>
          {
            isLeftPanelActive 
            ? <LeftPanelProject/>
            : <div style={{padding: "35px 0 0 15px"}} onClick={() => setIsLeftPanelActive(true)}><AlignJustify size={28}/></div>
          }


<DragDropContext onDragEnd={handleDragEnd}>

<div className={styles.kanbanBoard} style={{ gridTemplateColumns }}>
  

  
{ shouldShowColumn("todo") && 
<div className={`${styles.columnHeader} ${styles.todoHeader}`} >Todo</div>
}
{ shouldShowColumn("in_progress") &&
  <div className={`${styles.columnHeader} ${styles.inProgressHeader}`} >In Progress</div>
}
{ shouldShowColumn("done") &&
    <div className={`${styles.columnHeader} ${styles.doneHeader}`} >Done</div>
}


{ shouldShowColumn("todo") &&
  <DroppableColumnBody droppableId="todo">
    <div className={styles.statusColumn}>
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
}

{ shouldShowColumn("in_progress") &&
  <DroppableColumnBody droppableId="in_progress">
    <div className={styles.statusColumn}>
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
}

{ shouldShowColumn("done") &&
  <DroppableColumnBody droppableId="done">
    <div className={styles.statusColumn}>
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
}


</div>
</DragDropContext>

          {
            ( 
              isAddTaskActive 
              ||
              (selectedTask !== null && isRightPanelActive)
            ) 
            && <RightPanelPorject/>
          }

        </div>
    )
}

export default Project;