# Express with TypeScript Implementation

> A experiment for diving in depth with ts and express
Live Demo at [here](https://deltadevblog.herokuapp.com/api/v1/)
Hosted in heroku (Heroku is great for free hosting and not always that easy to host but its for free and thats what it matters)

## Running the project

```
npm run dev
npm run prod
```

The dev run is actually prety neat, i am using ts-node-dev.

> It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts and transpileOnly:true to disable typescript's symantic checker for faster compilation.

```
ts-node-dev --respawn --transpileOnly ./app/bin/WWW.ts
```

The prod run will create a build file by using tsc and after that it is similar to the express-generator which we run by simply node www, in our case node www.ts

```
tsc && node ./build/bin/WWW.js
```

## Folder structure

The folder strucutre a similar to the express-generator

```
|   .gitignore
|   package.json
|   Readme.md
|   tsconfig.json
+---app
|   |   app.ts
|   |
|   +---bin
|   |       WWW.ts
|   |
|   +---config
|   |       index.ts
|   |       passport.ts
|   |
|   +---controller
|   |   +---Category
|   |   |       categories.ts
|   |   |       index.ts
|   |   |       inputValidation.ts
|   |   |
|   |   +---Post
|   |   |       index.ts
|   |   |       inputValidation.ts
|   |   |       posts.ts
|   |   |
|   |   \---User
|   |           index.ts
|   |           inputValidation.ts
|   |           users.ts
|   |
|   +---routes
|   |       base.ts
|   |       index.ts
|   |       posts.ts
|   |       users.ts
|   |
|   \---utils
|           helper.ts
|
+---public
|       favicon.ico
|
\---views
        error.jade
        index.jade
        layout.jade
```

## config

For config i am using dotenv

```
npm install dotenv --save
```

```
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```

```
set NODE_ENV=production && tsc && node ./build/bin/WWW.js
```

> You should not use .env files in your production environment and always set the values directly on the respective host.

## Routes

The routes are layout is preety simple, it is similar to the routes in express-generator

```
import { Router } from "express";

const router: Router = Router();

router.get("/", function(req: any, res: any) {
  res.send("Hello Worlddd!");
});

export default router;
```

The only different part is, one doesn't need to go and change the app.ts file for adding sub routes, by using app.use(...), this part is dynamically handle by the code and all you need to do is add your routes name as an object to index.ts routes.

> i.e the posts route will be under `{BASE_URL}/posts` and users route will be under `{BASE_URL}/users`

```
const routes: { [key: string]: Router } = {
  base,
  posts,
  users
};
```

### Controller

```
+---controller
|   |   +---Category
|   |   |       categories.ts
|   |   |       index.ts
|   |   |       inputValidation.ts
|   |   |
|   |   +---Post
|   |   |       index.ts
|   |   |       inputValidation.ts
|   |   |       posts.ts
|   |   |
|   |   \---User
|   |           index.ts
|   |           inputValidation.ts
|   |           users.ts
```

In here the same name ts file is a model and index is the main controller as the file suggest by top,
it made more sense to call controller.post and controller.user, just a naming convention.

> The part where i am putting the model under respective controller folder is still in experimental phase, for now i find it easier to bind the model and controller under the same folder as it is easier to access and debug later, but there may be case where i need to use more than one model for a controller to provide data.
