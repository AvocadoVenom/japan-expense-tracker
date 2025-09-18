export const SummaryStatement = ({
  allowed,
  consumed,
  isPast,
}: {
  allowed: number;
  consumed: number;
  isPast?: boolean;
}) => {
  return allowed - consumed > 0 ? (
    <strong className="text-green-600">
      {isPast ? "Remained" : "Remaining"}: ¥{allowed - consumed}
    </strong>
  ) : (
    <strong className="text-red-400">
      Exceeded by ¥{Math.abs(allowed - consumed)}
    </strong>
  );
};
