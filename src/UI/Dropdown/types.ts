export interface Option <T> {
  label: string;
  value: T;
};

export interface IDropdownProps<T> {
    value: string | null,
    onChange: (value: T) => void,
    options: Option<T>[],
    placeholder?: string
}
