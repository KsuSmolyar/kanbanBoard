import type { TagKey } from "../../types/tags";

export interface TagPickerProps {
    value?: TagKey[];
    onChange: (tags: TagKey[]) => void;
}
