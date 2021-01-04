# Lambert-server
An express.js Route Handler

## Installation
```
npm i github:Trenite/Lambert-server
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
import { HTTPError } from "lambert-server";
// const { Router } = require("express")
// const { HTTPError } = require("lambert-server")

const router = Router();

router.get("/", (req, res) => {
	res.send("Hello World");
});

router.get("/test", (req, res) => {
	throw new HTTPError(401, "You don't have access to this ressource");
});


export default router;
// module.exports = router
```
