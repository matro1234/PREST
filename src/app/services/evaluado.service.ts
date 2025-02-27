import db from "../models/index.model";
import { Evaluado } from "../models/evaluado.model";
import { v4 as uuidv4 } from "uuid";

export const createEvaluadoSrv = async (
  name_evaluado: string,
  rol: string,
  carrera: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.evaluado.getEvaluadoById(uuid);
    if (exist) {
      return "ID exist";
    } else {
      const evaluado: Evaluado = {
        id_evaluado: uuid,
        name_evaluado,
        rol,
        carrera,
      };
      const creado = await db.evaluado.createEvaluado(evaluado);
      if (creado && creado.id_evaluado) {
        return "Evaluado created: " + creado.id_evaluado;
      } else {
        return "Evaluado no created";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getEvaluadoSrv = async (): Promise<Evaluado[] | undefined> => {
  try {
    return await db.evaluado.getEvaluados();
  } catch (error) {
    console.log(error);
  }
};

export const getEvaluadoByIdSrv = async (
  id_evaluado: string
): Promise<Evaluado | undefined> => {
  try {
    const result = await db.evaluado.getEvaluadoById(id_evaluado);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateEvaluadoSrv = async (
  evaluado: Evaluado
): Promise<string | undefined> => {
  try {
    const result = await db.evaluado.updateEvaluado(evaluado);
    console.log(result);
    return result.id_Evaluado;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvaluadoSrv = async (id_evaluado: string) => {
  try {
    const result = await db.evaluado.deleteEvaluado(id_evaluado);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
