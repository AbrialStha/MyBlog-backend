import validator from "validator";
import { isEmpty } from "../../utils/helper";

interface create_post {
  title: string;
  description: string;
  summary: string;
  featured_image: string;
  category: string;
  tags: string[];
  url_slug: string;
  seo_title: string;
  meta_description: string;
}

export const validateCreatePostInput = (data: create_post) => {
  let errors: { [key: string]: string } = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.url_slug = !isEmpty(data.url_slug) ? data.url_slug : "";

  if (validator.isEmpty(data.title)) errors.title = "Title cannot be empty";
  else if (!validator.isLength(data.title, { min: 2 })) {
    errors.name = "Title must have minimum 2 charecter";
  }

  if (validator.isEmpty(data.url_slug))
    errors.url_slug = "Slug cannot be empty";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
