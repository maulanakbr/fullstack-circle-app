import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  type ModalProps,
} from '@chakra-ui/react';

import { FollowCard } from '../card';

interface FollowModalProps extends Omit<ModalProps, 'children'> {}

export default function FollowModal(props: FollowModalProps) {
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
          <Tabs
            isFitted
            variant="enclosed"
            color="brands.primary"
          >
            <TabList mb="1em">
              <Tab
                _selected={{
                  bg: 'brands.primary',
                  color: 'suits.primary',
                  border: 'none',
                }}
              >
                Following
              </Tab>
              <Tab
                _selected={{
                  bg: 'brands.primary',
                  color: 'suits.primary',
                  border: 'none',
                }}
              >
                Followers
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FollowCard passthrough="following" />
              </TabPanel>
              <TabPanel>
                <FollowCard passthrough="followers" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
