import { Server } from "../Server";

async function main() {
	const server = new Server({ port: 3000 });
	await server.registerRoutes(__dirname + "/routes/");
	await server.start();
}

main();
