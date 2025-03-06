import db from "../models/index.model";
import { Evaluador } from "../models/evaluador.model";
import { v4 as uuidv4 } from "uuid";
import { authentication, random } from "../helpers/security";

export const linkEvaluadoToRespuestaSrv = async (name_evaluado:string,respuesta:string):Promise<number|undefined> => {
  try {
    const relacion = await db.respuesta.linkEvaluadoToRespuesta(name_evaluado,respuesta);
    if (relacion) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateFullEvaluadorSrv = async (
  evaluador: Evaluador,
  updatePass: boolean = false
): Promise<boolean> => {
  const id_evaluador = evaluador.id_evaluador;
  const salt = random();
  let newEvaluador: Evaluador = {
    id_evaluador: evaluador.id_evaluador,
    sessionToken: evaluador.sessionToken,
  };

  if (updatePass) {
    newEvaluador.salt = salt;
    newEvaluador.password = authentication(salt, evaluador.password || "PASSWORD");
    newEvaluador.sessionToken = authentication(
      salt,
      evaluador.id_evaluador?.toString() || "DEFAULT_EVALUADOR"
    );
  }
  const prueba = await db.evaluador.updateEvaluador(newEvaluador);
  const updatedRowsCount = await db.evaluador.updateEvaluador(newEvaluador);

  if (!updatedRowsCount) {
    return false;
  } else {
    return true;
  }
};

export const getEvaluadorByTokenSrv = async (
  token: string
): Promise<Evaluador | null> => {
  const evaluador = await db.evaluador.getEvaluadorByToken(token);

  return evaluador;
};

export const createEvaluadorSrv = async (
  name_evaluador: string,
  password: string,
  email:string,
  rol: string,
  area: string
): Promise<string | undefined> => {
  try {
    const uuid = uuidv4();
    const exist = await db.evaluador.getEvaluadorById(uuid);
    const pwd = password ? password : "NO PASSWORD";
    const salt = random();
    if (exist) {
      return "ID exists"; // Si ya existe el ID
    } else {
      const evaluador: Evaluador = {
        id_evaluador: uuid,
        name_evaluador,
        password:authentication(salt, pwd),
        email,
        salt,
        rol,
        area,
        sessionToken:""
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
