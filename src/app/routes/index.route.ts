import { Router } from "express";
import evaluador from "./evaluador.route";
import auth from './auth.route';
import evaluado from './evaluado.route';
const router = Router();

export default (): Router => {
	evaluador(router);
	auth(router);
	evaluado(router);
	return router;
};
