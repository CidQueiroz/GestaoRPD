import { default as React } from 'react';
interface NotificationToastProps {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClose: (id: string) => void;
}
export declare const NotificationToast: React.FC<NotificationToastProps>;
export {};
//# sourceMappingURL=NotificationToast.d.ts.map