import { create } from "zustand";
import { Task, TaskPriority, TaskStatus } from "../types/task";
import { Project, ProjectStatus } from "../types/project";
import { User } from "../types/user";
import { SortOption } from "../ui/select/CustomSelect";

export type TestAndProjectStatuses = TaskStatus | ProjectStatus;

interface ProjectControlState {
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
    selectedTask: Task | null;
    setSelectedTask: (task: Task) => void;
    clearSelectedTask: () => void;
    isRightPanelActive: boolean;
    setIsRightPanelActive: (value: boolean) => void;
    isLeftPanelActive: boolean;
    setIsLeftPanelActive: (value: boolean) => void;
    isEditTaskActive: boolean;
    setIsEditTaskActive: (value: boolean) => void;
    isAddTaskActive: boolean;
    setIsAddTaskActive: (value: boolean) => void;
    statusFilter: TestAndProjectStatuses[];
    setStatusFilter: (value: TestAndProjectStatuses) => void;
    usersFilter: User[];
    setUserFilter: (value: User) => void;
    startDateFilter: string;
    setStartDateFilter: (value: string) => void;
    endDateFilter: string;
    setEndDateFilterr: (value: string) => void;
    priorityFilter: TaskPriority[];
    setPriorityFilter: (value: TaskPriority) => void;
    sortValue: SortOption;
    setSortValue: (value: SortOption) => void;
}

export const useProjectControlStore = create<ProjectControlState>((set, get) => ({
    selectedProject: null,
    setSelectedProject: (project) => set({ selectedProject: project }),
    selectedTask: null,
    setSelectedTask: (task) => set({ selectedTask: task }),
    clearSelectedTask: () => set({ selectedTask: null }),
    isRightPanelActive: false,
    setIsRightPanelActive: (value) => set({ isRightPanelActive: value }),
    isLeftPanelActive: false,
    setIsLeftPanelActive: (value) => set({ isLeftPanelActive: value }),
    isEditTaskActive: false,
    setIsEditTaskActive: (value) => set({ isEditTaskActive: value }),
    isAddTaskActive: false,
    setIsAddTaskActive: (value) => set({ isAddTaskActive: value }),
    statusFilter: [],
    setStatusFilter: (value) => {
        const currentStatuses = get().statusFilter;
        const isAlreadyFiltered = currentStatuses.includes(value);
        if ( isAlreadyFiltered ) {
            set({ statusFilter: currentStatuses.filter((el) => el != value) });
        } else {
            set({ statusFilter: [...currentStatuses, value] })
        }
    },
    usersFilter: [],
    setUserFilter: (chosenUser) => {
        const currentUsers = get().usersFilter;
        const isAlreadyFiltered = currentUsers.some((u) => u.id === chosenUser.id);
        if ( isAlreadyFiltered ) {
            set({ usersFilter: currentUsers.filter((el) => el.id != chosenUser.id) });
        } else {
            set({ usersFilter: [...currentUsers, chosenUser] })
        }
    },
    startDateFilter: "",
    setStartDateFilter: (value) => set({ startDateFilter: value }),
    endDateFilter: "",
    setEndDateFilterr: (value) => set({ endDateFilter: value }),
    priorityFilter: [],
    setPriorityFilter: (value) => {
        const currentPriorities = get().priorityFilter;
        const isAlreadyFiltered = currentPriorities.includes(value);
        if ( isAlreadyFiltered ) {
            set({ priorityFilter: currentPriorities.filter((el) => el != value) });
        } else {
            set({ priorityFilter: [...currentPriorities, value] })
        }
    },
    sortValue: "none",
    setSortValue: (value) => set({ sortValue: value }),
}));