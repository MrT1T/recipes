'use client';

import { ReactNode, FC } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export const Providers: FC<{ children: ReactNode; session: Session | null }> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
};
