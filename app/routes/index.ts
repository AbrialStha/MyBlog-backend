import { Router } from "express";
import base from "./base";
import posts from "./posts";
import users from "./users";
import categories from './categories'


// Note Routes will appear as {Base_URL}/{key}/..
const routes: { [key: string]: Router } = {
  base,
  users,
  posts,
  categories
};

export default routes;
