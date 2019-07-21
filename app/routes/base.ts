import { Router } from "express";
// import Mailer from '../controller/Mailer'
// import email_channel from '../config/pusher'

const router: Router = Router();

router.get("/", function (req: any, res: any) {
  // const mailer = new Mailer();
  // mailer.setListofEmails(['abi.sthapit@gmail.com'])
  // mailer.setMailTemplate({
  //   subject: "Test Email"
  // })
  // mailer.invokeOperation();

  // email_channel.trigger('my-channel', 'my-event', {
  //   message: 'hello world'
  // })

  res.send(`Blog Backend Running in env: ${process.env.NODE_ENV}`);
});

export default router;