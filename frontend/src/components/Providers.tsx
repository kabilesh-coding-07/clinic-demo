'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '@/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <SessionProvider>{children}</SessionProvider>
        </LanguageProvider>
    );
}
