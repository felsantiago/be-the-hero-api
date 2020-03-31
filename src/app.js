import Youch from 'youch';
import './bootstrap';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import 'express-async-errors';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors()); // em ambiente de produção = this.server.use(cors({ origin: 'http://seu-dominio.com.br' }));
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(errors);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const erros = await new Youch(err, req).toJSON();

        return res.status(500).json(erros);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
