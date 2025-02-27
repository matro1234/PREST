import Database from "../../database/database";
import { Session } from "neo4j-driver";

export interface Respuesta {
  id_respuesta: string;
  texto: string;
  tipologia: string;
}

export class RespuestaModel {
  private readonly session: Session;

  public constructor(sess: Session) {
    this.session = sess;
  }

  async createRespuesta(respuesta: Respuesta) {
    const query = `
      CREATE (r:Respuesta {
        id_respuesta: $id_respuesta,
        texto: $texto,
        tipologia: $tipologia
      })
      RETURN r
    `;
    try {
      const result = await this.session.run(query, respuesta);
      if (result.records.length) {
        return result.records[0].get("r").properties;
      } else {
        return undefined;
      }
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async getRespuestaById(id_respuesta: string) {
    const query = `
      MATCH (r:Respuesta {id_respuesta: $id_respuesta})
      RETURN r
    `;
    try {
      const result = await this.session.run(query, { id_respuesta });
      if (result.records.length) {
        return result.records[0].get("r").properties;
      } else {
        return undefined;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  async getRespuestas() {
    const query = `MATCH (r:Respuesta) RETURN r`;
    try {
      const result = await this.session.run(query);
      if (result.records.length === 0) {
        return undefined;
      } else {
        const respuestas: Respuesta[] = result.records.map(
          (record) => record.get("r").properties
        );
        return respuestas;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateRespuesta(updatedRespuesta: Respuesta) {
    const query = `
      MATCH (r:Respuesta {id_respuesta: $id_respuesta})
      SET r.texto = $texto,
          r.tipologia = $tipologia
      RETURN r
    `;
    try {
      const result = await this.session.run(query, updatedRespuesta);
      return result.records[0].get("r").properties;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRespuesta(id_respuesta: string) {
    const query = `
      MATCH (r:Respuesta {id_respuesta: $id_respuesta})
      DETACH DELETE r
    `;
    try {
      await this.session.run(query, { id_respuesta });
      return { message: "Respuesta deleted successfully" };
    } catch (error) {
      console.error(error);
    }
  }
  async linkEvaluadoToRespuesta(id_evaluado: string, id_respuesta: string) {
    const query = `
      MATCH (e:Evaluado {id_evaluado: $id_evaluado}),
            (r:Respuesta {id_respuesta: $id_respuesta})
      CREATE (e)-[:RESPONDIO]->(r)
      RETURN e, r
    `;
    try {
      const result = await this.session.run(query, { id_evaluado, id_respuesta });
      return result.records.length > 0 ? true : false;
    } catch (error) {
      console.error(error);
    }
  }
}
