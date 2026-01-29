'use client';

import { usePathname } from 'next/navigation';

import { navbarItems } from '@/components/Layout/Header/constants';

export const Title = () => {
  const pathname = usePathname();

  const currentNavItem = navbarItems.find((item) => item.href === pathname);

  const title = currentNavItem ? currentNavItem.label : null;

  return (
    <div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};
