import db from "../models/index.model";
import { Pregunta } from "../models/pregunta.model";
import { v4 as uuidv4 } from "uuid";

export const createPreguntaSrv = async (
  texto: string,
  categoria: string,
  nivel_prestigio: number
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
        nivel_prestigio,
      };
      const creada = await db.pregunta.createPregunta(pregunta);
      if (creada && creada.id_pregunta) {
        return "Pregunta created: " + creada.id_pregunta;
      } else {
        return "Pregunta no created";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPreguntasSrv = async (): Promise<Pregunta[] | undefined> => {
  try {
    return await db.pregunta.getPreguntas();
  } catch (error) {
    console.log(error);
  }
};

export const getPreguntaByIdSrv = async (
  id_pregunta: string
): Promise<Pregunta | undefined> => {
  try {
    const result = await db.pregunta.getPreguntaById(id_pregunta);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updatePreguntaSrv = async (
  pregunta: Pregunta
): Promise<string | undefined> => {
  try {
    const result = await db.pregunta.updatePregunta(pregunta);
    console.log(result);
    return result.id_pregunta;
  } catch (error) {
    console.log(error);
  }
};

export const deletePreguntaSrv = async (id_pregunta: string) => {
  try {
    const result = await db.pregunta.deletePregunta(id_pregunta);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
