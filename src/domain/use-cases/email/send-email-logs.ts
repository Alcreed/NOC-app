import { EmailSerive } from "../../../presentation/email/email.service";
import { LogEntity, LogSevevityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailSerive,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFSLogs(to);

      if (!sent) {
        throw new Error("Email log not sent");
      }

      const log = new LogEntity({
        level: LogSevevityLevel.low,
        message: `Log email sent`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSevevityLevel.high,
        message: `${error}`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
