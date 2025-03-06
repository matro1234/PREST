import db from "../models/index.model";
import { Respuesta } from "../models/respuesta.model";
import { v4 as uuidv4 } from "uuid";

export const getTipoRespSrv = async (
  id_evaluado: string,
  tipologia: string
): Promise<string | undefined> => {
  try {
    const result = await db.respuesta.getTipoResp(id_evaluado,tipologia);
    if (result) {
      return result
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createRespuestaSrv = async (
  texto: string,
  tipologia: string,
  pregunta: string
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
      const relacion = await db.respuesta.createRespPreg(texto,pregunta)
      if (creada && creada.id_respuesta) {
        return creada.id_respuesta;
      } else {
        return undefined;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
