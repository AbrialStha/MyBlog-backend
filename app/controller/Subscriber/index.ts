import { Request, Response, NextFunction, response } from "express";
import Subscribers from './Subscribers'

import { validateAddSubscriberInput } from './inputValidation'
import Conflict from "../../Exceptions/Conflict";
import HttpException from "../../Exceptions/HttpException";

/**
 * Subscriber Controller
 */
class Subscriber {
    /**
     * Subscribe to the next updates
     */
    subscribe = (req: Request, res: Response, nxt: NextFunction) => {
        const { errors, isValid } = validateAddSubscriberInput(req.body);
        if (!isValid) {
            nxt(new Conflict(errors))
        }
        Subscribers.findOne({ email: req.body.email, Author: req.params.id }).then(sub => {
            if (sub)
                nxt(new Conflict({ email: "Already subscribed" }))
            else {
                //Create new subscriber
                const newSub = new Subscribers({
                    email: req.body.email,
                    Author: req.params.id
                })
                //Save the new Subscriber
                newSub
                    .save()
                    .then(sub => res.json(sub))
                    .catch(err => {
                        console.error(err)
                        nxt(new HttpException(err))
                    })
            }
        }).catch(err => nxt(new HttpException(err)))
    }

    /**
     * get All subscribers of the user
     */
    get = (req: Request, res: Response, nxt: NextFunction) => {
        Subscribers.find({ Author: req.user._id }).then(subscribers => {
            if (subscribers)
                res.json(subscribers)
        })
    }

    /**
     * Unsubscribe from the posts
     */
    unsubscribe = (req: Request, res: Response, nxt: NextFunction) => {
        Subscribers.findOneAndUpdate({ _id: req.params.id }, { send_email: false }, { new: true }).select('email').then(sub => {
            if (sub)
                res.json({ email: sub.get("email"), message: "Unsubscribed sucessfully" })
        }).catch(err => new HttpException(err))
    }
}

export default new Subscriber()