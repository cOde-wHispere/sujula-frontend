export default function ErrorMessage({
  message,
  onRetry,
}) {
  return (
    <div className="error-message">

      <h2>{message}</h2>

      <button
        className="button button-primary"
        onClick={onRetry}
      >
        Try Again
      </button>

    </div>
  );
}