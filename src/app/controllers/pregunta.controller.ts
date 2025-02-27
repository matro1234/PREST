import { Request, Response } from "express";
import {
  createPreguntaSrv,
  getPreguntaByIdSrv,
  getPreguntasSrv,
  updatePreguntaSrv,
  deletePreguntaSrv,
} from "../services/pregunta.service";

export const createPregunta = async (req: Request, res: Response): Promise<void> => {
  const { texto, categoria, nivel_prestigio } = req.body;
  try {
    if (typeof texto === "string" && typeof categoria === "string" && typeof nivel_prestigio === "number") {
      const pregunta = await createPreguntaSrv(texto, categoria, nivel_prestigio);
      res.status(201).json(pregunta);
    } else {
      res.status(400).json({ error: "Invalid input data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating Pregunta" });
  }
};

export const getPreguntaById = async (req: Request, res: Response) => {
  try {
    const { id_pregunta } = req.params;
    const pregunta = await getPreguntaByIdSrv(id_pregunta);
    if (!pregunta) return res.status(404).json({ error: "Pregunta not found" });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Pregunta" });
  }
};

export const getPreguntas = async (req: Request, res: Response) => {
  try {
    const preguntas = await getPreguntasSrv();
    if (!preguntas || preguntas.length === 0) return res.status(404).json({ error: "No Preguntas found" });
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Preguntas" });
  }
};

export const updatePregunta = async (req: Request, res: Response) => {
  try {
    const { id_pregunta } = req.params;
    const { texto, categoria, nivel_prestigio } = req.body;
    const pregunta = await updatePreguntaSrv({
      id_pregunta,
      texto,
      categoria,
      nivel_prestigio,
    });
    if (!pregunta) return res.status(404).json({ error: "Pregunta not found" });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ error: "Error updating Pregunta" });
  }
};

export const deletePregunta = async (req: Request, res: Response) => {
  const { id_pregunta } = req.params;
  try {
    await deletePreguntaSrv(id_pregunta);
    res.json({ message: "Pregunta deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Pregunta" });
  }
};
