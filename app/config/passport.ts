import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";

import key from "./index";
import passport = require("passport");

const Users: mongoose.Model<mongoose.Document, {}> = mongoose.model("Users");
const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret || key.secret;

export default function (passport: any) {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      Users.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user);
          else return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}
