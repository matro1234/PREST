import db from "../models/index.model";
import { Evaluado } from "../models/evaluado.model";
import { v4 as uuidv4 } from "uuid";

export const evaluadorEvaluadoSrv = async (
  id_evaluador: string,
  id_evaluado: string
): Promise<boolean | undefined> => {
  try {
    const evaluador = await db.evaluador.getEvaluadorById(id_evaluador);
    const evaluado = await db.evaluado.getEvaluadoById(id_evaluado);
    if (!evaluador || !evaluado) {
      return false;
    }

    const link = await db.evaluador.linkEvaluadorToEvaluado(
      id_evaluador,
      id_evaluado
    );
    return link ? true : false;
  } catch (error) {
    console.log(error);
  }
};

export const createEvaluadoSrv = async (
  name_evaluado: string,
  telefono: number,
  genero: string,
  estado_cibil: string,
  email_institucional: string,
  rol: string,
  carrera: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.evaluado.getEvaluadoById(uuid);
    if (exist) {
      return "ID exist";
    } else {
      /**{
        id_evaluado,
        name_evaluado,
        telefono,
        genero,
        estado_cibil,
        email_institucional,
        rol,
        carrera,
      }**/
      const evaluado: Evaluado = {
        id_evaluado: uuid,
        name_evaluado,
        telefono,
        genero,
        estado_cibil,
        email_institucional,
        rol,
        carrera,
      };
      const creado = await db.evaluado.createEvaluado(evaluado);
      if (creado && creado.id_evaluado) {
        return creado.id_evaluado;
      } else {
        return "Evaluado no created";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getEvaluadoSrv = async (
  search?: string,
  carrera?: string,
  rol?: string
): Promise<Evaluado[] | undefined> => {
  try {
    const evaluados = await db.evaluado.getEvaluados(search, carrera, rol);
    const result = await Promise.all(evaluados.map((evaluado:any)=>{
      const apostol = getTipoRespSrv(evaluado.id_evaluado, "apostol")||[];
      const reen = getTipoRespSrv(evaluado.id_evaluado, "reen")||[];
      const mercenario = getTipoRespSrv(evaluado.id_evaluado, "mercenario")||[];
      const terrorista = getTipoRespSrv(evaluado.id_evaluado, "terrorista")||[];
      const maxArray = arrays.reduce((max, current) => (current.length > max.length ? current : max), []);
      return {evaluado, maxArra[0].tipologia};
    }));
    return result
  } catch (error) {
    console.log(error);
  }
};

export const getEvaluadosForRespSrv = async (
  texto: string
): Promise<Evaluado[] | undefined> => {
  try {
    return await db.evaluado.getEvaluadosForResp(texto);
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
