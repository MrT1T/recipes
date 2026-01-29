'use client';

import { FC } from 'react';

import { Modal } from '@/components/common';
import { RegistrationForm } from '@/components/UI/forms/Registration';

import type { RegistrationModalProps } from './types';

export const RegistrationModal: FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registration">
      <RegistrationForm onClose={onClose} />
    </Modal>
  );
};
