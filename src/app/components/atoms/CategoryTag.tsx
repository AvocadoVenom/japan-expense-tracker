export const CategoryTag = ({
  category,
  clickable,
}: {
  category: string | undefined;
  clickable?: boolean;
}) => {
  return (
    <label
      htmlFor={category}
      className="px-2 text-white rounded"
      style={{
        backgroundColor: getCategoryColor(category),
        cursor: clickable ? "pointer" : "hand",
      }}
    >
      {category ?? "NA"}
    </label>
  );
};

export const getCategoryColor = (category: string = "NA") => {
  const normalizeCategory = category.toUpperCase();
  if (normalizeCategory === "COMMUTATION") return "#007ACC";
  if (normalizeCategory === "FOOD") return "#FF6B6B";
  if (normalizeCategory === "LEASURE") return "#9D72FF";
};
