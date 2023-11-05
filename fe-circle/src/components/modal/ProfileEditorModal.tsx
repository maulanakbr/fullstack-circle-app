import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react';

import { ProfileEditorForm } from '../form';

interface ProfileEditorProps extends Omit<ModalProps, 'children'> {}

export default function ProfileEditor(props: ProfileEditorProps) {
  return (
    <Modal
      finalFocusRef={props.finalFocusRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProfileEditorForm auth="signup" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
