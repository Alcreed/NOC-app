import { LogEntity, LogSevevityLevel } from "../entities/log.entity";

export abstract class LogRepository {
  // abstract --> No permite crear instancias
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSevevityLevel): Promise<LogEntity[]>;
}
