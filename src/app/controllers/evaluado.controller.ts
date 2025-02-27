import { Request, Response } from "express";
import {
  createEvaluadoSrv,
  getEvaluadoByIdSrv,
  getEvaluadoSrv,
  deleteEvaluadoSrv,
  updateEvaluadoSrv,
} from "../services/evaluado.service";
export const createEvaluado = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name_evaluado, rol, carrera } = req.body;
  try {
    if (
      typeof name_evaluado === "string" &&
      typeof rol === "string" &&
      typeof carrera === "string"
    ) {
      const evaluado = await createEvaluadoSrv(
        name_evaluado,
        rol,
        carrera
      );
      res.status(201).json(evaluado);
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating Evaluado" });
  }
};

export const getEvaluadoById = async (req: Request, res: Response) => {
  try {
    const { id_evaluado } = req.params;
    const evaluado = await getEvaluadoByIdSrv(id_evaluado);
    if (!evaluado) return res.status(404).json({ error: "Evaluado not found" });
    res.json(evaluado);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Evaluado" });
  }
};

export const getEvaluados = async (req: Request, res: Response) => {
  try {
    const evaluado = await getEvaluadoSrv();
    if (!evaluado) return res.status(404).json({ error: "Evaluado not found" });
    res.json(evaluado);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Evaluado" });
  }
};

export const updateEvaluado = async (req: Request, res: Response) => {
  try {
    const { id_evaluado } = req.params;
    const { name_evaluado, rol, carrera } = req.body;
    const evaluado = await updateEvaluadoSrv({
      id_evaluado,
      name_evaluado,
      rol,
      carrera,
    });
    if (!evaluado) return res.status(404).json({ error: "Evaluado not found" });
    res.json(evaluado);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Evaluado" });
  }
};

export const deleteEvaluado = async (req: Request, res: Response) => {
  const { id_evaluado } = req.params;
  try {
    await deleteEvaluadoSrv(id_evaluado);
    res.json({ message: "Evaluado deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Evaluado" });
  }
};
