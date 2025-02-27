import { Router } from "express";
import {
  createEvaluado,
  getEvaluadoById,
  getEvaluados,
  deleteEvaluado,
  updateEvaluado,
} from "../controllers/evaluado.controller";

export default (router: Router) => {
  router.get("/student", getEvaluados);
  router.get("/student/:id_student", getEvaluadoById);
  router.post("/student", createEvaluado);
  router.delete("/student/:id_student", deleteEvaluado);
  router.put("/student/:id_student", updateEvaluado);
};
