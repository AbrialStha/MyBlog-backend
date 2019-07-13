import { Router } from "express";
import base from "./base";
import posts from "./posts";
import users from "./users";

const routes: { [key: string]: Router } = {
  base,
  users,
  posts
};

export default routes;
