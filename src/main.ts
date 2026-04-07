import { logger } from "@infra/logger";
import HttpServer from "./http-server";
import fs from "fs";
import path from "path";
import { writeConfig } from "@app/configuration/controller";
import { isDbExists } from "./db";

import https from "https";
import pem from "pem";


enum ExitStatus {
  Failure = 1,
  Success = 0,
}

async function mainHttp() {
  try {
    const httpServer = new HttpServer();
    const port = 3000;
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    if (!fs.existsSync(path.resolve(__dirname, "./public/js", "configuration.js")) && await isDbExists() === true) writeConfig(); 
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          httpServer.stop();
          logger.info("Arret du serveur OK");
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`Arret du serveur avec l'erreur : ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );

    const app = await httpServer.createApp();
    app.listen(port, () => logger.info(`Serveur HTTP actif sur le port ${port}`));
  } catch (error) {
    logger.error(`Arret du serveur avec l'erreur : ${error}`);
    process.exit(ExitStatus.Failure);
  }





};

async function mainHttps() {
  try {
    const httpServer = new HttpServer();
    const port = 3000;
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    if (!fs.existsSync(path.resolve(__dirname, "./public/js", "configuration.js")) && await isDbExists() === true) writeConfig(); 
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          httpServer.stop();
          logger.info("Arret du serveur OK");
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`Arret du serveur avec l'erreur : ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );




    pem.createCertificate({ days: 1, selfSigned: true }, async function (err, keys) {
      if (err) {
        throw err
      }
      // const app = httpServer.createApp();
      const app = await httpServer.createApp();
      // var app = express()

      https.createServer({ key: keys.clientKey, cert: keys.certificate }, await app).listen(443)
    });

    const app = await httpServer.createApp();

    app.listen(port, () => logger.info(`Serveur HTTPS actif sur le port ${port}`));
  } catch (error) {
    logger.error(`Arret du serveur avec l'erreur : ${error}`);
    process.exit(ExitStatus.Failure);
  }

};

if (process.env.NODE_ENV === 'production') 
   mainHttps();
else 
  mainHttp();
  