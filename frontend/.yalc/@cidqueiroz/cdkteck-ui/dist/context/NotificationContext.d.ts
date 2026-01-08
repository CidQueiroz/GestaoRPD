import { default as React } from 'react';
interface NotificationContextData {
    notify: {
        success: (msg: string) => void;
        error: (msg: string) => void;
        info: (msg: string) => void;
        warning: (msg: string) => void;
    };
}
export declare const NotificationProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useNotification: () => NotificationContextData;
export {};
//# sourceMappingURL=NotificationContext.d.ts.map