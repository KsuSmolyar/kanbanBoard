export type TaskPanelProps = {
  onSuccess?: () => void;
  successMsg: string;
  buttonLabel: string;
  type?: TaskPanelTypes
  taskId?: string,
  taskTitle?: string,
  taskDescription?: string,
  taskDeadline?: string
};

export const taskPanelTypes = {
  add: "add",
  edit: "edit"
} as const;

export type TaskPanelTypes = keyof typeof taskPanelTypes;
