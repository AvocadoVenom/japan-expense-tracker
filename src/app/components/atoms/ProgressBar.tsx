export const ProgressBar = ({
  progress = 0,
  colors = {
    main: "blue",
    text: "white",
  },
  text = "",
  className = "",
}) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`relative w-full bg-gray-200 rounded h-6 overflow-hidden border border-stone-300 ${className}`}
    >
      <div
        className={`h-full transition-all duration-300 ${colors.main}`}
        style={{ width: `${safeProgress}%` }}
      />
      {text && (
        <p className={`absolute top-[-1px] right-[6px] ${colors.text}`}>
          {text}
        </p>
      )}
    </div>
  );
};
