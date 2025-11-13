import React from 'react';
import { useApp } from '../../context/AppContext';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '../ui/toast';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContainer: React.FC = () => {
  const { state, removeNotification } = useApp();
  const { notifications } = state;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <ToastProvider>
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          duration={notification.duration || 5000}
          onOpenChange={(open) => {
            if (!open) {
              removeNotification(notification.id);
            }
          }}
        >
          <div className="flex items-start space-x-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <ToastTitle className="capitalize">{notification.type}</ToastTitle>
              <ToastDescription>{notification.message}</ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export default NotificationContainer;