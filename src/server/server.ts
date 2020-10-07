import express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import ApiRoutes   from "./routes/api/api";

export class Server {
  private basedir: string;
  app: express.Application;
  router: any

  public static bootStrap(): Server {
    return new Server();
  }

  constructor() {
    this.basedir = path.join(__dirname, '../..');
    this.app = express();
    this.configureApplication();
    this.establishRoutes();
  }

  public configureApplication() {
    // Parsers for POST data
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Point static path to dist
    this.app.use(express.static(path.join(this.basedir, 'dist')));
  }

  public establishRoutes() {
    this.router = Router({ mergeParams: true });
    this.router.use(function(req: Request, res: Response, next: NextFunction) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.router.use('/api', ApiRoutes);

    this.app.use(this.router);
  }
}
