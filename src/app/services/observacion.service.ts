import db from "../models/index.model";
import { Observacion } from "../models/observacion.model";
import { v4 as uuidv4 } from "uuid";

export const createObservacionSrv = async (
  descripcion: string,
  fecha: Date,
  id_evaluado: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.observacion.getObservacionById(uuid);
    if (exist) {
      return "ID exist";
    } else {
      const observacion: Observacion = {
        id_observacion: uuid,
        descripcion,
        fecha,
        id_evaluado,
      };
      const creada = await db.observacion.createObservacion(observacion);
      if (creada && creada.id_observacion) {
        return "Observacion created: " + creada.id_observacion;
      } else {
        return "Observacion no created";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getObservacionesSrv = async (): Promise<Observacion[] | undefined> => {
  try {
    return await db.observacion.getObservaciones();
  } catch (error) {
    console.log(error);
  }
};

export const getObservacionByIdSrv = async (
  id_observacion: string
): Promise<Observacion | undefined> => {
  try {
    const result = await db.observacion.getObservacionById(id_observacion);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateObservacionSrv = async (
  observacion: Observacion
): Promise<string | undefined> => {
  try {
    const result = await db.observacion.updateObservacion(observacion);
    console.log(result);
    return result.id_observacion;
  } catch (error) {
    console.log(error);
  }
};

export const deleteObservacionSrv = async (id_observacion: string) => {
  try {
    const result = await db.observacion.deleteObservacion(id_observacion);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
