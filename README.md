# Lambert-server
An express.js Route Handler

## Installation
```
npm i lambert-server
```

## Usage
ES5 Import
```js
const { Server, HTTPError } = require("lambert-server");
```

or ES6 Import
```ts
import { Server, HTTPError } from "lambert-server"
```

## Server
Server options:
```ts
const server = new Server({
	port        : number  = 8080;       // the port to listen on
	host        : string  = "0.0.0.0";  // the interface to listen on
	production  : boolean = false;      // enable in production mode - this will hide internal server errors
	errorHandler: boolean = true;       // Automatically register an error handler that displays JSON errors
})
```

## Register Routes
```ts
server.registerRoutes(root: string): Promise<any[]>; // root is the root directory of all routes
```

## Body checking
JSON body can be checked with a schema, that you pass to the check function.
A Schema is a Object Structure with key-value objects that checks if the key is an instance of the value (class).
You can specify optional parameters if you prefix the key with a $
e.g.: ``{ $captcha: String }``, this will make the ``captcha`` property in the body optional.
```js
import { check } from "lambert-server";
const SCHEMA = { username: String, age: Number, $posts: [{ title: String }] }
app.post("/", check(SCHEMA), (req, res) => {});
```

## Examples
### Example Server
In /index.js
```ts
import { Server } from "lambert-server";
// const { Server } = require("lambert-server");

async function main() {
	const server = new Server();
	await server.registerRoutes(__dirname + "/routes/");
	await server.start();
}

main().catch(console.error)
```

## Example Route
In /routes/index.js
```js
import { Router } from "express";
import { HTTPError, check } from "lambert-server";
// const { Router } = require("express")
// const { HTTPError } = require("lambert-server")

const router = Router();

router.get("/", (req, res) => {
	res.send("Hello World");
});

router.get("/test", (req, res) => {
	throw new HTTPError("You don't have access to this ressource", 401);
});
 
// JSON body parser
router.post("/", check({ username: String, age: Number, $posts: [{ title: String }] }), (req, res) => {});

export default router;
// module.exports = router
```
