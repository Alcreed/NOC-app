import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename?: string;
  path?: string;
}

export class EmailSerive {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(
        "🚀 ~ EmailSerive ~ sendEmail ~ sentInformation:",
        sentInformation
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFSLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h3>Logs de ssitema - NOC</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis mollis risus viverra convallis. Maecenas eu turpis vehicula, maximus nulla at, iaculis mi.</p>
      <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
