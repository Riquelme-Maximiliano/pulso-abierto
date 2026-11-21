interface CryptoStatusProps {
  message: string;
  loading: boolean;
}

function CryptoStatus({ message, loading }: CryptoStatusProps) {
  return (
    <div role="status" aria-live="polite">
      {loading && <span>⏳ </span>}
      {message}
    </div>
  );
}

export default CryptoStatus;