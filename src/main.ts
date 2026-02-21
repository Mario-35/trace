import { logger } from "@infra/logger";
import HttpServer from "./http-server";
import fs from "fs";
import path from "path";
import { writeConfig } from "@app/configuration/controller";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

async function main() {
  try {
    const httpServer = new HttpServer();
    const port = 3000;
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    // if (!fs.existsSync(path.resolve(__dirname, "../../public/js", "configuration.js"))) writeConfig(); 
    
    
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

    app.listen(port, () => logger.info(`Serveur actif sur le port ${port}`));
  } catch (error) {
    logger.error(`Arret du serveur avec l'erreur : ${error}`);
    process.exit(ExitStatus.Failure);
  }
}

main();
  