import Pusher from "pusher";

const pusherConfig = {
  appId: String(process.env.APP_ID),
  key: String(process.env.PUSHER_KEY),
  secret: String(process.env.PUSHER_SECRET),
  cluster: String(process.env.CLUSTER),
  encrypted: true
}

const channel_email = new Pusher(pusherConfig);

export default channel_email
