export const Tag = ({ text, color }: { text: string; color: string }) => {
  return (
    <label htmlFor={text} className={`${color} px-2 text-white rounded`}>
      {text}
    </label>
  );
};
