import { Request, Response } from "express";
import {
  createEvaluadorSrv,
  getEvaluadorByIdSrv,
  getEvaluadorSrv,
  deleteEvaluadorSrv,
  updateEvaluadorSrv,
} from "../services/evaluador.service";

// Crear Evaluador
export const createEvaluador = async (req: Request, res: Response): Promise<void> => {
  const { name_evaluador, rol, carrera } = req.body;
  try {
    if (
      typeof name_evaluador === "string" &&
      typeof rol === "string" &&
      typeof carrera === "string"
    ) {
      const evaluador = await createEvaluadorSrv(name_evaluador, rol, carrera);
      res.status(201).json(evaluador);
    } else {
      res.status(400).json({ error: "Invalid data format" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating Evaluador" });
  }
};

// Obtener Evaluador por ID
export const getEvaluadorById = async (req: Request, res: Response) => {
  try {
    const { id_evaluador } = req.params;
    const evaluador = await getEvaluadorByIdSrv(id_evaluador);
    if (!evaluador) return res.status(404).json({ error: "Evaluador not found" });
    res.json(evaluador);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Evaluador" });
  }
};

// Obtener todos los Evaluadores
export const getEvaluadores = async (req: Request, res: Response) => {
  try {
    const evaluadores = await getEvaluadorSrv();
    if (!evaluadores) return res.status(404).json({ error: "Evaluadores not found" });
    res.json(evaluadores);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Evaluadores" });
  }
};

// Actualizar Evaluador
export const updateEvaluador = async (req: Request, res: Response) => {
  try {
    const { id_evaluador } = req.params;
    const { name_evaluador, rol, area } = req.body;
    const evaluador = await updateEvaluadorSrv({
      id_evaluador,
      name_evaluador,
      rol,
      area,
    });
    if (!evaluador) return res.status(404).json({ error: "Evaluador not found" });
    res.json(evaluador);
  } catch (error) {
    res.status(500).json({ error: "Error updating Evaluador" });
  }
};

// Eliminar Evaluador
export const deleteEvaluador = async (req: Request, res: Response) => {
  const { id_evaluador } = req.params;
  try {
    await deleteEvaluadorSrv(id_evaluador);
    res.json({ message: "Evaluador deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Evaluador" });
  }
};
