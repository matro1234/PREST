import { Router } from "express";
import { loginEvaluador } from "../controllers/auth.controller";

export default (router: Router) => {
	router.post("/auth/login", loginEvaluador);
};
