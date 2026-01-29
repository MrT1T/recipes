'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react';

import { usePathname } from 'next/navigation';
import { RegistrationModal, LoginModal } from '@/components/UI';
import { signOutUser } from '@/actions/signOut';

import { useAuthStore } from '@/store/auth.store';

import { navbarItems, ROUTES, siteConfig, siteStyles } from './constants';

export const RecipesLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const Header = () => {
  const pathname = usePathname();

  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setAuthState('unauthenticated', null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getNavbarItems = () =>
    navbarItems
      .filter((item) => {
        if (item.authOnly) {
          return isAuth;
        }
        return true;
      })
      .map((item) => {
        const isActive = pathname === item.href;
        return (
          <NavbarItem key={item.href}>
            <Link
              className={`px-3 py-1
                ${isActive ? ' text-blue-500' : ' text-foreground'}
                hover:text-blue-300 hover:border hover:border-blue-300
                rounded-md transition-colors transition-border duration-200`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      });

  return (
    <Navbar style={{ height: siteStyles.headerHeight }}>
      <NavbarBrand>
        <Link href={ROUTES.RECIPES} className="flex items-center gap-2">
          <RecipesLogo />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavbarItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        {status === 'loading' ? null : isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">Привет, {session?.user?.email}!</NavbarItem>
            <NavbarItem>
              <Button color="secondary" variant="flat" onPress={handleSignOut}>
                Log out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button color="secondary" variant="flat" onPress={() => setLoginModalOpen(true)}>
                Log in
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat" onPress={() => setRegistrationModalOpen(true)}>
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </Navbar>
  );
};
