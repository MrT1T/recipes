'use client';

import { usePathname } from 'next/navigation';

import { content } from './constants';

export const PageContent = () => {
  const pathname = usePathname();

  const pageContent = content[pathname] || 'Content not found.';

  return <p>{pageContent}</p>;
};
