import { default as React } from 'react';
interface HeaderProps {
    LinkComponent?: React.ComponentType<{
        href: string;
        className?: string;
        children: React.ReactNode;
        [key: string]: any;
    }>;
    usePathname?: () => string;
    theme?: 'light' | 'dark';
    appName?: string;
    logoHref?: string;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
//# sourceMappingURL=Header.d.ts.map