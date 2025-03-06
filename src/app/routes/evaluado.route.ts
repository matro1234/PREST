import { Router } from "express";
import { createEvaluadoRespuesta, getEvaluados, getEvaluadosForResp, getRespTipo } from "../controllers/evaluado.controller";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/evaluado/:id_evaluador", isAuthenticated,getEvaluados);
  router.get("/evaluado/resp/:id_evaluador", isAuthenticated,getEvaluadosForResp);
  router.get("/evaluado/tipo/:id_evaluador", isAuthenticated, getRespTipo);
  router.post("/evaluado/:id_evaluador", isAuthenticated, createEvaluadoRespuesta);
};
