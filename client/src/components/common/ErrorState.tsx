import React from 'react';
import EmptyState from './EmptyState';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "We encountered an error while loading this content. Please try again.",
  onRetry
}) => {
  return (
    <EmptyState
      icon={<AlertTriangle className="w-full h-full" />}
      title={title}
      description={description}
      action={onRetry ? {
        label: "Try Again",
        onClick: onRetry
      } : undefined}
    />
  );
};

export default ErrorState;