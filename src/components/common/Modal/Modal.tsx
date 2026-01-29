'use client';

import { FC } from 'react';
import { Modal as HerouiModal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';

import type { ModalProps } from './types';

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  return (
    <HerouiModal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className="border-b">
          <h3 className="text-xl text-background font-semibold text-black">{title}</h3>
        </ModalHeader>
        <ModalBody className="space-y-4 py-6">{children}</ModalBody>
      </ModalContent>
    </HerouiModal>
  );
};
