import { Request, Response, NextFunction } from "express";
import async from 'async'
import nodemailer from 'nodemailer'
import email_channel from '../../config/pusher'

interface Message_template {
    from?: string,
    to?: string,
    subject: string,
    text?: string,
    html?: string
}

/**
 * Mailer Controller
 */
class Mailer {
    private transporter: any
    private listofEmails: Array<string> = []
    private successEmails: Array<string> = []
    private failedEmails: Array<string> = []
    private mailOptions: Message_template = {
        from: 'karishma0001o@gmail.com', // sender address
        to: 'abi.sthapit@gmail.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
    };
    private status: Boolean = false

    constructor() {
        this.initMailer()
    }

    setListofEmails = (list: Array<string>) => {
        this.listofEmails = list
    }

    setMailTemplate = (template: Message_template) => {
        this.mailOptions = template
    }

    invokeOperation = () => {
        async.each(this.listofEmails, this.sendEmails, () => {
            console.log(this.successEmails)
            console.log(this.failedEmails)
            return {
                successEmails: this.successEmails,
                failedEmails: this.failedEmails
            }
        })
    }

    private initMailer = () => {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            debug: true,
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASS
            }
        });
    }

    private sendEmails = (email: string, Maincallback: Function) => {
        console.log("Sending Email To:" + email)
        async.waterfall([
            (callback: any) => {
                this.mailOptions.to = email
                this.mailOptions.html = "The New ID is ===> " + this.makeid(7)
                console.log(this.mailOptions)
                this.transporter.sendMail(this.mailOptions, (err: any, info: any) => {
                    if (err) {
                        this.failedEmails.push(email)
                        email_channel.trigger('BLOG', 'sub-event', err)
                        console.log(err)
                    } else {
                        email_channel.trigger('BLOG', 'sub-event', info)
                        console.log(info);
                        this.successEmails.push(email)
                    }
                    callback(null, this.status, email)
                })
            },
            (statusCode: any, Email: any, callback: any) => {
                console.log("Will update DB here for " + Email + "With " + statusCode);
                callback();
            }
        ], function () { Maincallback() })
    }

    private makeid = (length: Number) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export default Mailer