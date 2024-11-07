import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorMessageProps {
  errorMessage: string | undefined;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  if (!errorMessage) {
    return null;
  }

  return (
    <Alert className="mt-4" variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
