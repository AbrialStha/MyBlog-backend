import { Request, Response, NextFunction, response } from "express";
import Categories from './categories'

import { validateCreateCategoryInput } from './inputValidation'
import Conflict from "../../Exceptions/Conflict";
import HttpException from "../../Exceptions/HttpException";
/**
 * Category Controller
 */
class Category {
    /**
     * Create new category
     */
    create = (req: Request, res: Response, nxt: NextFunction) => {
        const { errors, isValid } = validateCreateCategoryInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Categories.findOne({ name: req.body.name }).then(category => {
            if (category) {
                errors.name =
                    "Category already exist!";
                nxt(new Conflict(errors))
                // return res.status(400).json(errors);
            } else {
                //create mew category
                const newCat = new Categories({
                    name: req.body.name,
                    Author: req.user._id
                });
                //save the new category
                newCat
                    .save()
                    .then(cat => res.json(cat))
                    .catch(err => {
                        console.error(err)
                        res.status(500).json('Internal Server Error')
                    });
            }
        }).catch(err => nxt(new HttpException(err)));
    };

    /**
     * get All category owned by user
     */
    get = (req: Request, res: Response, nxt: NextFunction) => {
        Categories.find({ Author: req.user._id }).then(categories => {
            if (categories)
                res.json(categories)
        })
    }

    /**
     * delete category
     */
    delete = (req: Request, res: Response, nxt: NextFunction) => {
        Categories.findOne({ _id: req.params.id, Author: req.user._id }).then(category => {
            if (!category) {
                nxt(new Conflict({ category: "Category doesn't exist" }))
                // return res.status(400).json({ message: "Category doesn't exist" });
            } else {
                Categories.findByIdAndDelete(req.params.id).then(cat => {
                    res.json(cat)
                }).catch(err => {
                    console.error(err)
                    nxt(new HttpException(err))
                })
            }
        }).catch(err => {
            console.log('################', err)
            nxt(new HttpException(err))
        })
    }

}

export default new Category()