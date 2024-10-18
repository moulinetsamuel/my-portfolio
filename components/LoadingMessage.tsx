interface LoadingMessageProps {
  isLoading: boolean;
}

export default function LoadingMessage({ isLoading }: LoadingMessageProps) {
  if (!isLoading) {
    return null;
  }
  return (
    <div className="text-center text-gray-500 dark:text-gray-400">Chargement...</div>
  );
}
