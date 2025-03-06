import { Router } from "express";
import {
  createModelForm,
  createEvaluador,
} from "../controllers/evaluador.controller";
import { isAuthenticated } from '../middlewares/index'

export default (router: Router) => {
  router.post("/evaluador/model/:id_evaluador", isAuthenticated, createModelForm);
  router.post("/evaluador", createEvaluador);
};
