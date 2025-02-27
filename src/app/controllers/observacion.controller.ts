import { Request, Response } from "express";
import {
  createObservacionSrv,
  getObservacionByIdSrv,
  getObservacionesSrv,
  deleteObservacionSrv,
  updateObservacionSrv,
} from "../services/observacion.service";

export const createObservacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { descripcion, fecha, id_evaluado } = req.body;
  try {
    if (
      typeof descripcion === "string" &&
      fecha instanceof Date &&
      typeof id_evaluado === "string"
    ) {
      const observacion = await createObservacionSrv(
        descripcion,
        fecha,
        id_evaluado
      );
      res.status(201).json(observacion);
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating Observacion" });
  }
};

export const getObservacionById = async (req: Request, res: Response) => {
  try {
    const { id_observacion } = req.params;
    const observacion = await getObservacionByIdSrv(id_observacion);
    if (!observacion) return res.status(404).json({ error: "Observacion not found" });
    res.json(observacion);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Observacion" });
  }
};

export const getObservaciones = async (req: Request, res: Response) => {
  try {
    const observaciones = await getObservacionesSrv();
    if (!observaciones) return res.status(404).json({ error: "Observaciones not found" });
    res.json(observaciones);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Observaciones" });
  }
};

export const updateObservacion = async (req: Request, res: Response) => {
  try {
    const { id_observacion } = req.params;
    const { descripcion, fecha, id_evaluado } = req.body;
    const observacion = await updateObservacionSrv({
      id_observacion,
      descripcion,
      fecha,
      id_evaluado,
    });
    if (!observacion) return res.status(404).json({ error: "Observacion not found" });
    res.json(observacion);
  } catch (error) {
    res.status(500).json({ error: "Error updating Observacion" });
  }
};

export const deleteObservacion = async (req: Request, res: Response) => {
  const { id_observacion } = req.params;
  try {
    await deleteObservacionSrv(id_observacion);
    res.json({ message: "Observacion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Observacion" });
  }
};
