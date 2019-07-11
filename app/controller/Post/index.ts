import { Request, Response, NextFunction } from "express";
import Posts from "./posts";

import { validateCreatePostInput } from "./inputValidation";

/**
 * Post Controller
 */
class Post {
  /**
   * Create New Post
   * Response.body =
   *       @param title: String,
   *       @param description: String,
   *       @param summary: String,
   *       @param featured_image: URL as String,
   *       @param category: id as String,
   *       @param tags: Array of String,
   *       @param url_slug: String and unique,
   *       @param seo_title: String,
   *       @param meta_description: String
   */
  create = (req: Request, res: Response, nxt: NextFunction) => {
    const { errors, isValid } = validateCreatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Posts.findOne({ url_slug: req.body.url_slug }).then(post => {
      if (post) {
        errors.url_slug =
          "Slug already exist!, Enter new unique slug for this post";
        return res.status(400).json(errors);
      } else {
        const {
          title,
          description,
          summary,
          featured_image,
          category,
          tags,
          url_slug,
          seo_title,
          meta_description
        } = req.body;
        const Author = req.user._id;
        //create mew post
        const newPost = new Posts({
          title,
          description,
          summary,
          featured_image,
          category,
          tags,
          url_slug,
          seo_title,
          meta_description,
          Author
        });
        //save the new post
        newPost
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.log(err)
            res.status(500).json('Internal Server Error')
          });
      }
    }).catch(err => res.status(500).json(err));
  };

  get = (req: Request, res: Response, nxt: NextFunction) => {
    Posts.find({ Author: req.user._id }).then(posts => {
      if (posts)
        res.json(posts)
    })
  }
}

export default new Post();
