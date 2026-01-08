import { default as React, ReactNode } from 'react';
interface ModalContextType {
    showModal: (content: ReactNode, title?: string) => void;
    hideModal: () => void;
}
export declare const useModal: () => ModalContextType;
export declare const ModalProvider: React.FC<{
    children: ReactNode;
}>;
export {};
//# sourceMappingURL=ModalContext.d.ts.map