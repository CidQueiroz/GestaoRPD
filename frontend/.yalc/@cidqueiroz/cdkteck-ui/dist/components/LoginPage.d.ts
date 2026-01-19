import { default as React } from 'react';
interface LoginPageProps {
    onLogin: (credentials: {
        email: string;
        password: string;
    }) => void;
    onRegister: (credentials: {
        email: string;
        password: string;
    }) => void;
    onGoogleLogin?: () => void;
    onFacebookLogin?: () => void;
    onGitHubLogin?: () => void;
    recoveryPath?: string;
    imageSrc?: string;
    title?: string;
    appName?: string;
    isLoading?: boolean;
    error?: string | null;
}
declare const LoginPage: React.FC<LoginPageProps>;
export default LoginPage;
//# sourceMappingURL=LoginPage.d.ts.map