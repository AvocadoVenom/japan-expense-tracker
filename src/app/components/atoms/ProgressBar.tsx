"use client";

export const ProgressBar = ({ progress = 0, color = "blue" }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full bg-gray-200 rounded h-6 overflow-hidden border border-stone-300">
      <div
        className={`h-full transition-all duration-300 ${color}`}
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};
