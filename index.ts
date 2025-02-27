import express from "express";
import bodyParser from "body-parser";
import Debug from "debug";
import cors from "cors";
import compression from "compression";
import { cfg } from "./src/config";
import router from "./src/app/routes/index.route";

const debug = Debug("testNeo4j:index");

const app = express();

app.use(
	cors({
		// origin: ["*"],
		// origin: ["http://localhost:5173"],
		credentials: true,
	})
);
app.use(compression());
app.use(bodyParser.json({ limit: "1gb" }));


/**
 * let's make visible my reports
 */

app.get("/ping", (req, res) => {
	let d = new Date();
	res.send(`pong - ${d.toLocaleTimeString()} `);
});

app.use("/api", router());

app.listen(cfg.PORT, () => {
	debug(`listening & debugging on port ${cfg.PORT}`);
});
