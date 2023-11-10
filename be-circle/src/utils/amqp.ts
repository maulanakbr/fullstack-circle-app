import { RABBITMQ_HTTP_PORT } from '@/config';
import client, { Channel, Connection } from 'amqplib';

import handleIncomingNotification from './handleIncomingNotification';
import { logger } from './logger';

class RabbitConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: boolean;

  public async connect() {
    if (!this.connected && !this.channel) return;
    else this.connected = true;

    try {
      this.connection = await client.connect(RABBITMQ_HTTP_PORT);
      this.channel = await this.connection.createChannel();
      this.connected = true;

      logger.info('🚀 Listening to Rabbit-MQ Server');
    } catch (error) {
      logger.error(error);
      logger.error('Not connected to Rabbit-MQ Server');
    }
  }

  public async startListeningToNewMessages() {
    const NOTIFICATION_QUEUE = '@nofification';

    await this.channel.assertQueue(NOTIFICATION_QUEUE, {
      durable: true,
    });

    this.channel.consume(
      NOTIFICATION_QUEUE,
      message => {
        {
          if (!message) {
            return logger.error('Invalid incoming message');
          }

          handleIncomingNotification(message.content?.toString());

          this.channel.ack(message);
        }
      },
      { noAck: false },
    );
  }

  public async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) {
        this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      logger.error(error);
    }
  }
}

const amqp = new RabbitConnection();

export default amqp;
