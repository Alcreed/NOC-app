import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailSerive } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    // Enviar email
    const emailService = new EmailSerive();
    emailService.sendEmail({
      to: "alfonso_gonzalezg@outlook.com",
      subject: "Logs de sistema",
      htmlBody: `
        <h3>Logs de ssitema - NOC</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis mollis risus viverra convallis. Maecenas eu turpis vehicula, maximus nulla at, iaculis mi.</p>
        <p>Ver logs adjuntos</p>
      `,
    });

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
