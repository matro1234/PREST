import { Router } from "express";
import {
  createModelForm,
  createEvaluador,
  createEvaluadorAdmin,
} from "../controllers/evaluador.controller";
import { isAuthenticated } from '../middlewares/index'

export default (router: Router) => {
  router.post("/evaluador/model/:id_evaluador", isAuthenticated, createModelForm);
  router.post("/evaluador/respuesta/:id_evaluador", isAuthenticated, getResps);
  router.post("/evaluador/:id_evaluador", isAuthenticated, createEvaluador);
  router.post("/evaluador/admin", createEvaluadorAdmin);
};
