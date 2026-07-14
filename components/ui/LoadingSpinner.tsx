type LoadingSpinnerProps = {
  label?: string;
};

export default function LoadingSpinner({
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <span className="inline-flex items-center justify-center gap-3">
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
        aria-hidden="true"
      />

      <span>{label}</span>
    </span>
  );
}