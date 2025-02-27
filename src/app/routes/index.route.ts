import { Router } from "express";
import user from "./evaluado.route";
const router = Router();

export default (): Router => {
	user(router);
	return router;
};
