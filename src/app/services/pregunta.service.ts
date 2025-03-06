import db from "../models/index.model";
import { Pregunta } from "../models/pregunta.model";
import { v4 as uuidv4 } from "uuid";

export const createPreguntaSrv = async (
  texto: string,
  categoria: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.pregunta.getPreguntaById(uuid);
    if (exist) {
      return "ID exist";
    } else {
      const pregunta: Pregunta = {
        id_pregunta: uuid,
        texto,
        categoria,
      };
      const creada = await db.pregunta.createPregunta(pregunta);
      if (creada && creada.id_pregunta) {
        return creada.id_pregunta;
      } else {
        return "";
      }
    }
  } catch (error) {
    console.log(error);
  }
};