export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
    id: string,
    projectId: string,
    title: string,
    description: string,
    assignedMembers: string[],
    status: TaskStatus,
}