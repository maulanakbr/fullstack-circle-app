import { AMQPLIB_PORT } from '@/config';
import amqplib from 'amqplib';

const server = `amqp://localhost:${AMQPLIB_PORT || 5011}`;

export const amqplibConnection = async () => {
  const connection = await amqplib.connect(server);
  const channel = await connection.createChannel();
  await channel.assertQueue('POSTTHREAD');

  return {
    connection,
    channel,
  };
};
