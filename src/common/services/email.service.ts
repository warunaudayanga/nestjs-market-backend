import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import SMTPTransport, { MailOptions } from "nodemailer/lib/smtp-transport";

@Injectable()
export class EmailService {

    private transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        this.configuration();
    }

    private configuration(): void {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // noinspection JSUnusedGlobalSymbols
    public sendMail = (from: string, to: string, subject: string, html: string)
        : Promise<SMTPTransport.SentMessageInfo> => new Promise((resolve, reject) => {

        const mailOptions: MailOptions = { from: { name: from, address: process.env.EMAIL_USER }, to, subject, html };

        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            }
            if (info) {
                resolve(info);
            }
            reject(Error(undefined));
        });
    });
}
