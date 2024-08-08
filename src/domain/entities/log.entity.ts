export enum LogSevevityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSevevityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSevevityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
}
