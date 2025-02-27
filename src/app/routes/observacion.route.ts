import { Router } from "express";
import {
  createObservacion,
  getObservacionById,
  getObservaciones,
  deleteObservacion,
  updateObservacion,
} from "../controllers/observacion.controller";

export default (router: Router) => {
  router.get("/observaciones", getObservaciones);
  router.get("/observacion/:id_observacion", getObservacionById);
  router.post("/observacion", createObservacion);
  router.delete("/observacion/:id_observacion", deleteObservacion);
  router.put("/observacion/:id_observacion", updateObservacion);
};
