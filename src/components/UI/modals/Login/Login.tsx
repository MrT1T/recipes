'use client';

import { FC } from 'react';

import { Modal } from '@/components/common';
import { LoginForm } from '@/components/UI/forms/Login';

import type { LoginModalProps } from './types';

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login">
      <LoginForm onClose={onClose} />
    </Modal>
  );
};
