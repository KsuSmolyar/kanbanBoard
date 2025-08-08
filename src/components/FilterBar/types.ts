import type { TasksFilter } from "../../types/filters";

export interface FilterBarProps  {
  onChange: (filters: TasksFilter) => void;
};
