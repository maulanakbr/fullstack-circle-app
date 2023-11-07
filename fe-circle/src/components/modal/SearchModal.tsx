import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react';

import { InputForm } from '../form';

interface SearchModalProps extends Omit<ModalProps, 'children'> {}

export default function SearchModal(props: SearchModalProps) {
  return (
    <Modal
      blockScrollOnMount={false}
      finalFocusRef={props.finalFocusRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody bg="pigments.secondary">
          <InputForm label="Search" />
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
