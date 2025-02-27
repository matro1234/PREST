import db from "../models/index.model";
import { Evaluador } from "../models/evaluador.model";
import { v4 as uuidv4 } from "uuid";

// Crear Evaluador
export const createEvaluadorSrv = async (
  name_evaluador: string,
  rol: string,
  area: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.evaluador.getEvaluadorById(uuid);
    if (exist) {
      return "ID exists"; // Si ya existe el ID
    } else {
      const evaluador: Evaluador = {
        id_evaluador: uuid,
        name_evaluador,
        rol,
        area,
      };
      const creado = await db.evaluador.createEvaluador(evaluador);
      if (creado && creado.id_evaluador) {
        return "Evaluador created: " + creado.id_evaluador;
      } else {
        return "Evaluador not created";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// Obtener todos los Evaluadores
export const getEvaluadorSrv = async (): Promise<Evaluador[] | undefined> => {
  try {
    return await db.evaluador.getEvaluadores();
  } catch (error) {
    console.log(error);
  }
};

// Obtener Evaluador por ID
export const getEvaluadorByIdSrv = async (
  id_evaluador: string
): Promise<Evaluador | undefined> => {
  try {
    const result = await db.evaluador.getEvaluadorById(id_evaluador);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Actualizar Evaluador
export const updateEvaluadorSrv = async (
  evaluador: Evaluador
): Promise<string | undefined> => {
  try {
    const result = await db.evaluador.updateEvaluador(evaluador);
    console.log(result);
    return result.id_evaluador;
  } catch (error) {
    console.log(error);
  }
};

// Eliminar Evaluador
export const deleteEvaluadorSrv = async (id_evaluador: string) => {
  try {
    const result = await db.evaluador.deleteEvaluador(id_evaluador);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
