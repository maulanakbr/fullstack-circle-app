import { logger } from './logger';

const handleIncomingNotification = (message: string) => {
  try {
    const parsedMessage = JSON.parse(message);
    logger.info(`Received notification: ${parsedMessage}`);

    return parsedMessage;
  } catch (error) {
    logger.error(error);
  }
};

export default handleIncomingNotification;
