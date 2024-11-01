import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailSerive } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailSerive();

export class Server {
  public static start() {
    console.log("Server started...");

    // Enviar email
    // new SendEmailLogs(emailService, logRepository).execute([
    //   "alfonso_gonzalezg@outlook.com",
    //   "heralgongu9409@hotmail.com",
    // ]);
    // emailService.sendEmailWithFSLogs([
    //   "alfonso_gonzalezg@outlook.com",
    //   "heralgongu9409@hotmail.com",
    // ]);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
