interface ErrorMessageProps {
  errorMessage: string | null;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  if (!errorMessage) {
    return null;
  }

  return <div className="text-center text-red-500 dark:text-red-400">{errorMessage}</div>;
}
