import db from "../models/index.model";
import { Respuesta } from "../models/respuesta.model";
import { v4 as uuidv4 } from "uuid";

export const createRespuestaSrv = async (
  texto: string,
  tipologia: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.respuesta.getRespuestaById(uuid);
    if (exist) {
      return "ID exist";
    } else {
      const respuesta: Respuesta = {
        id_respuesta: uuid,
        texto,
        tipologia,
      };
      const creada = await db.respuesta.createRespuesta(respuesta);
      if (creada && creada.id_respuesta) {
        return "Respuesta created: " + creada.id_respuesta;
      } else {
        return "Respuesta not created";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRespuestasSrv = async (): Promise<Respuesta[] | undefined> => {
  try {
    return await db.respuesta.getRespuestas();
  } catch (error) {
    console.log(error);
  }
};

export const getRespuestaByIdSrv = async (
  id_respuesta: string
): Promise<Respuesta | undefined> => {
  try {
    const result = await db.respuesta.getRespuestaById(id_respuesta);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateRespuestaSrv = async (
  respuesta: Respuesta
): Promise<string | undefined> => {
  try {
    const result = await db.respuesta.updateRespuesta(respuesta);
    console.log(result);
    return result.id_respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRespuestaSrv = async (id_respuesta: string) => {
  try {
    const result = await db.respuesta.deleteRespuesta(id_respuesta);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const linkEvaluadoToRespuestaSrv = async (
  id_evaluado: string,
  id_respuesta: string
): Promise<boolean> => {
  try {
    const evaluado = await db.evaluado.getEvaluadoById(id_evaluado);
    const respuesta = await db.respuesta.getRespuestaById(id_respuesta);
    
    if (!evaluado || !respuesta) {
      return false;
    }

    const link = await db.respuesta.linkEvaluadoToRespuesta(id_evaluado, id_respuesta);
    return link ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
