import { createTransport, SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import config from '../assets/config.json';

export class MailService {
  private transporter: Mail<SentMessageInfo>;

  constructor() {
    this.transporter = createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: true,
      auth: {
        user: config.mailUser,
        pass: config.mailPass
      }
    });
  }

  public async sendActivationMail(email: string, link: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: config.mailUser,
        to: email,
        subject: 'Acount activation',
        text: '',
        html: `
          <div>
            <h1>Use this <a href="${link}">link</a> for your acount activation</h1>
          </div>
        `
      });
    } catch (e) {
      console.error(e);
    }
  }
}
