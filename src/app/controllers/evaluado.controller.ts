import { Request, Response } from "express";
import {
  createEvaluadoSrv,
  getEvaluadoSrv,
  evaluadorEvaluadoSrv,
  getEvaluadosForRespSrv,
} from "../services/evaluado.service";
import { getTipoRespSrv } from "../services/respuesta.service";
import { linkEvaluadoToRespuestaSrv, getEvaluadorByIdSrv } from "../services/evaluador.service";

export const getRespTipo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id_evaluado } = req.body;
  try {
    const apostol = await getTipoRespSrv(id_evaluado, "apostol")||[];
    const reen = await getTipoRespSrv(id_evaluado, "reen")||[];
    const mercenario = await getTipoRespSrv(id_evaluado, "mercenario")||[];
    const terrorista = await getTipoRespSrv(id_evaluado, "terrorista")||[];
    const result = { apostol, reen, mercenario, terrorista };
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error creating Evaluado" });
  }
};

export const getEvaluadosForResp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id_respuesta } = req.body;
  try {
    const result = await getEvaluadosForRespSrv(id_respuesta)
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al encontrar evaluados" });
  }
};

export const getResp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getRespSrv()
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al encontrar evaluados" });
  }
};

export const getEvaluados = async (req: Request, res: Response) => {
  const { search, carrera, rol } = req.query; // Obtener filtros de la consulta

  try {
    // Llamamos al servicio pasándole los filtros
    const evaluados = await getEvaluadoSrv(
      search as string,
      carrera as string,
      rol as string
    );

    if (!evaluados || evaluados.length === 0) {
      return res.status(404).json({ error: "No evaluados found" });
    }

    res.json(evaluados);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Evaluados" });
  }
};

export const createEvaluadoRespuesta = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id_evaluador } = req.params;
  const { evaluado, text_respuestas } = req.body; //evaluado:{name_eva}
  const { name_evaluado, telefono, genero, estado_cibil, email_institucional, rol, carrera } = evaluado;
  try {
    const evaluador = await getEvaluadorByIdSrv(id_evaluador);
    if (evaluador.rol === "admin"){
      const newEvaluado = await createEvaluadoSrv(name_evaluado, telefono, genero, estado_cibil, email_institucional, rol, carrera);
      console.log(newEvaluado);
      if (newEvaluado) {
        const evaluadorEvaluado = await evaluadorEvaluadoSrv(
          id_evaluador,
          newEvaluado
        );
        if (evaluadorEvaluado) {
          const result = await Promise.all(
            text_respuestas.map((text: string) =>
              linkEvaluadoToRespuestaSrv(name_evaluado as string, text)
            )
          );
          if (result) {
            return res.status(201).json({mensaje:"El evaluado se registro correctamente"});
          }
          return res.status(400).json({mensaje:"no se logro crear el evaluado"});
        } else {
          return res.status(400).json({mensaje:"no se logro crear el evaluado"});
        }
      }else{
        return res.status(400).json({mensaje:"no se logro crear el evaluado"});
      }
    }else{
      return res.status(400).json({mensaje:"usuario no autorizado"});
    }
  } catch (error) {
    return res.status(500).json({ error: "Error creating Evaluador" });
  }
};
