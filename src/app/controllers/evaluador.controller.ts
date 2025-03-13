import { Request, Response } from "express";
import {
  createEvaluadorSrv,
  getEvaluadorByIdSrv,
} from "../services/evaluador.service";
import { createPreguntaSrv } from "../services/pregunta.service";
import { createRespuestaSrv } from "../services/respuesta.service";

export const createModelForm = async (req: Request, res: Response): Promise<void> => {
  const { formulario } = req.body; //formulario:[texto:"dsad",categoria:"dads",respuestas:[texto:"dsa",tipologia:"das"]]
  try {
    const newPregunta = await Promise.all(formulario.map(async(pregunta:any)=>{
      const newPregunta = await createPreguntaSrv(pregunta.texto,pregunta.categoria);
      const newRespuestas = await Promise.all(pregunta.respuestas.map((respuesta:any)=>{
        const newRespuesta = createRespuestaSrv(respuesta.texto,respuesta.tipologia,pregunta.texto);
        return newRespuesta;
      }));
      return {newPregunta, newRespuestas};
    }));
    const result = newPregunta
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error creating Evaluador" });
  }
};

export const createEvaluador = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {name_evaluador,email,password,area} = req.body;

    const result = await createEvaluadorSrv(name_evaluador,password,email,"viewer",area);

    return res.status(201).json({ success: true, result });
  } catch (error:any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvaluadorAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {id_evaluador} = req.params;
    const {name_evaluador,email,password,area} = req.body;
    const evaluador = await getEvaluadorByIdSrv(id_evaluador);
    const result = await createEvaluadorSrv(name_evaluador,password,email,"admin",area);

    return res.status(201).json({ success: true, result });
  } catch (error:any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
