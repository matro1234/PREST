import Database from "../../database/database";
import { EvaluadoModel } from "./evaluado.model";
import { ObservacionModel } from "./observacion.model";
import { PreguntaModel } from './pregunta.model';
import { RespuestaModel } from './respuesta.model';
import { EvaluadorModel } from './evaluador.model'

const session = Database.getInstance().getSession();

const db = {
  evaluado: new EvaluadoModel(session),
  pregunta: new PreguntaModel(session),
  respuesta: new RespuestaModel(session),
  evaluador: new EvaluadorModel(session),
  observacion: new ObservacionModel(session),
  // Aquí puedes agregar otros modelos como `missions` y `characters`
};

export { session };
export default db;
