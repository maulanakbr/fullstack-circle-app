import 'reflect-metadata';

import { Route } from '@interfaces/router.interface';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from './config';
import { dbConnection } from './database';
import { ErrorMiddleware } from './middlewares/error.middleware';
import amqp from './utils/amqp';
import { logger, stream } from './utils/logger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 5000;

    this.databaseConnection();
    this.amqpConnection();
    this.executeMiddlewares();
    this.executeRoutes(routes);
    this.executeErrorHandler();
  }

  public listening() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Listening on port ${this.port}`);
    });
  }

  public useServer() {
    return this.app;
  }

  private async databaseConnection() {
    await dbConnection.initialize();
  }

  private async amqpConnection() {
    await amqp.connect();
  }

  private executeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private executeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/api/v1', route.router);
    });
  }

  private executeErrorHandler() {
    this.app.use(ErrorMiddleware);
  }
}
