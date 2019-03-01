import { Request, Response, NextFunction } from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

import config from "../../config";

//Load User Model
import Users from "./users";

//Load Input Validation
import { validateRegisterInput, validateLoginInput } from "./inputValidation";

class User {
  /**
   * Register New User
   */
  register = (req: Request, res: Response) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Users.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors);
      } else {
        const { name, email, password } = req.body;
        let avatar: string = gravatar.url(email, {
          s: "200", //Size
          r: "R", //Rating
          d: "mm" //Default
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const newUser = new Users({
              name: name,
              email: email,
              avatar,
              password: hash
            });
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  };

  /**
   * Login by authenticated User
   */
  login = (req: Request, res: Response) => {
    let { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const { email, password } = req.body;
    //Find the User by email
    Users.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        res.status(400).json(errors);
      }
      //Check Password
      bcrypt
        // @ts-ignore
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User matched, create the jwt payload
            const payload = {
              //@ts-ignore
              id: user._id,
              //@ts-ignore
              name: user.name,
              //@ts-ignore
              avatar: user.avatar
            };
            //Sign the token
            jwt.sign(
              payload,
              config.secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            res.status(400).json({ password: "Password incorrect" });
          }
        })
        .catch(err => console.log(err));
    });
  };
}

export default new User();
