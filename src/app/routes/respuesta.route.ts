import { Router } from "express";
import {
  createRespuesta,
  getRespuestaById,
  getRespuestas,
  deleteRespuesta,
  updateRespuesta,
  linkEvaluadoToRespuesta
} from "../controllers/respuesta.controller";

export default (router: Router) => {
  router.get("/respuesta", getRespuestas);
  router.get("/respuesta/:id_respuesta", getRespuestaById);
  router.post("/respuesta", createRespuesta);
  router.put("/respuesta/:id_respuesta", updateRespuesta);
  router.delete("/respuesta/:id_respuesta", deleteRespuesta);

  // Ruta para vincular un evaluado con una respuesta
  router.post("/respuesta/link", linkEvaluadoToRespuesta);
};
