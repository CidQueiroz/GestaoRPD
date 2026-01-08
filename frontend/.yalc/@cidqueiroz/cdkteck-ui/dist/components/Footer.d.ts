import { default as React } from 'react';
interface FooterProps {
    openContactModal: () => void;
    LinkComponent?: React.ComponentType<{
        href: string;
        className?: string;
        children: React.ReactNode;
    }>;
}
declare const Footer: React.FC<FooterProps>;
export default Footer;
//# sourceMappingURL=Footer.d.ts.map