import { Router } from "express";
import base from "./base";
import post from "./post";

const routes: { [key: string]: Router } = {
  base,
  post
};

export default routes;
