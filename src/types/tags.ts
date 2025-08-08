export type TagKey = "bug" | "feature" | "urgent";

export const AVAILABLE_TAGS: { key: TagKey; label: string }[] = [
  { key: "bug", label: "Bug" },
  { key: "feature", label: "Feature" },
  { key: "urgent", label: "Urgent" },
];

export const TAG_COLOR_MAP: Record<TagKey, string> = {
  bug: "bg-red-100 text-red-700 border-red-200",
  feature: "bg-green-100 text-green-700 border-green-200",
  urgent: "bg-yellow-100 text-yellow-700 border-yellow-200",
};
