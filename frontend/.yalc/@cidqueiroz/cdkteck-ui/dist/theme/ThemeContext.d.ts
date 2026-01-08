import { ReactNode } from 'react';
type Theme = 'dark' | 'light';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeContextType;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map