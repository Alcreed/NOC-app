import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailSerive } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailSerive();

export class Server {
  public static start() {
    console.log("Server started...");

    // Enviar email
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      "alfonso_gonzalezg@outlook.com",
      "heralgongu9409@hotmail.com",
    ]);
    // emailService.sendEmailWithFSLogs([
    //   "alfonso_gonzalezg@outlook.com",
    //   "heralgongu9409@hotmail.com",
    // ]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000/");
    // });
  }
}
