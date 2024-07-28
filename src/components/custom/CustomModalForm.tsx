import { Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react';
import React from 'react';
import { CustomForm } from './CustomForm';

export const CustomModalForm: React.FC<{
  onSubmit: (values: Object) => void | Promise<any>;
  onClose: () => void;
  isOpen: boolean;
  initialValues: Object;
}> = ({ initialValues, onSubmit, onClose, isOpen }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <CustomForm initialValues={initialValues} onSubmit={onSubmit} />
      </ModalBody>
    </ModalContent>
  </Modal>
);
