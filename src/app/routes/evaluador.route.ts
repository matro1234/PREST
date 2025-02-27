import { Router } from "express";
import {
  createEvaluador,
  getEvaluadorById,
  getEvaluadores,
  deleteEvaluador,
  updateEvaluador,
} from "../controllers/evaluador.controller";

export default (router: Router) => {
  router.get("/evaluador", getEvaluadores);
  router.get("/evaluador/:id_evaluador", getEvaluadorById);
  router.post("/evaluador", createEvaluador);
  router.delete("/evaluador/:id_evaluador", deleteEvaluador);
  router.put("/evaluador/:id_evaluador", updateEvaluador);
};
