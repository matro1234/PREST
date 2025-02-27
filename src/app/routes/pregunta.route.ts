import { Router } from "express";
import {
  createPregunta,
  getPreguntaById,
  getPreguntas,
  deletePregunta,
  updatePregunta,
} from "../controllers/pregunta.controller";

export default (router: Router) => {
  router.get("/preguntas", getPreguntas);
  router.get("/preguntas/:id_pregunta", getPreguntaById);
  router.post("/preguntas", createPregunta);
  router.delete("/preguntas/:id_pregunta", deletePregunta);
  router.put("/preguntas/:id_pregunta", updatePregunta);
};