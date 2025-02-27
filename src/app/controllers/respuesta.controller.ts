import { Request, Response } from "express";
import {
  createRespuestaSrv,
  getRespuestaByIdSrv,
  getRespuestasSrv,
  deleteRespuestaSrv,
  updateRespuestaSrv,
  linkEvaluadoToRespuestaSrv,
} from "../services/respuesta.service";

export const createRespuesta = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { texto, tipologia } = req.body;
  try {
    if (typeof texto === "string" && typeof tipologia === "string") {
      const respuesta = await createRespuestaSrv(texto, tipologia);
      res.status(201).json(respuesta);
    } else {
      res.status(400).json({ error: "Invalid input data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating Respuesta" });
  }
};

export const getRespuestaById = async (req: Request, res: Response) => {
  try {
    const { id_respuesta } = req.params;
    const respuesta = await getRespuestaByIdSrv(id_respuesta);
    if (!respuesta) return res.status(404).json({ error: "Respuesta not found" });
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Respuesta" });
  }
};

export const getRespuestas = async (req: Request, res: Response) => {
  try {
    const respuestas = await getRespuestasSrv();
    if (!respuestas) return res.status(404).json({ error: "Respuestas not found" });
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Respuestas" });
  }
};

export const updateRespuesta = async (req: Request, res: Response) => {
  try {
    const { id_respuesta } = req.params;
    const { texto, tipologia } = req.body;
    const respuesta = await updateRespuestaSrv({
      id_respuesta,
      texto,
      tipologia,
    });
    if (!respuesta) return res.status(404).json({ error: "Respuesta not found" });
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: "Error updating Respuesta" });
  }
};

export const deleteRespuesta = async (req: Request, res: Response) => {
  const { id_respuesta } = req.params;
  try {
    await deleteRespuestaSrv(id_respuesta);
    res.json({ message: "Respuesta deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Respuesta" });
  }
};

export const linkEvaluadoToRespuesta = async (req: Request, res: Response) => {
  const { id_evaluado, id_respuesta } = req.body;
  try {
    const success = await linkEvaluadoToRespuestaSrv(id_evaluado, id_respuesta);
    if (success) {
      res.json({ message: "Evaluado linked to Respuesta successfully" });
    } else {
      res.status(404).json({ error: "Failed to link Evaluado to Respuesta" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error linking Evaluado to Respuesta" });
  }
};
