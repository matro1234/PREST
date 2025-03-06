import { Driver, Neo4jError } from "neo4j-driver";
import Neo4jDatabase from "../../database/database";

export interface Respuesta {
  id_respuesta: string;
  texto: string;
  tipologia: string;
}

export class RespuestaModel {
  private readonly driver: Driver;

  public constructor(driver: Neo4jDatabase) {
    this.driver = driver.getDriver();
  }

  async getTipoResp(id_evaluado: string, tipologia: string) {
    const session = this.driver.session();
    const query = `
      MATCH (e:Evaluado {id_evaluado:$id_evaluado})-[:RESPONDIO]->(r:Respuesta)
      WHERE r.tipologia = $tipologia
      RETURN r
    `;
    try {
      const result = await session.run(query, { id_evaluado, tipologia });
      return result.records.length ? result.records[0].get("r").properties : undefined;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }

  async createRespuesta(respuesta: Respuesta) {
    const session = this.driver.session();
    const query = `
      MERGE (r:Respuesta {
        id_respuesta: $id_respuesta,
        texto: $texto,
        tipologia: $tipologia
      })
      RETURN r
    `;
    try {
      const result = await session.run(query, respuesta);
      return result.records.length ? result.records[0].get("r").properties : undefined;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }

  async getRespuestaById(id_respuesta: string) {
    const session = this.driver.session();
    const query = `
      MATCH (r:Respuesta {id_respuesta: $id_respuesta})
      RETURN r
    `;
    try {
      const result = await session.run(query, { id_respuesta });
      return result.records.length ? result.records[0].get("r").properties : undefined;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async getRespuestas() {
    const session = this.driver.session();
    const query = `MATCH (r:Respuesta) RETURN r`;
    try {
      const result = await session.run(query);
      return result.records.length === 0 ? undefined : result.records.map((record: any) => record.get("r").properties);
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async updateRespuesta(updatedRespuesta: Respuesta) {
    const session = this.driver.session();
    const query = `
      MATCH (r:Respuesta {id_respuesta: $id_respuesta})
      SET r.texto = $texto,
          r.tipologia = $tipologia
      RETURN r
    `;
    try {
      const result = await session.run(query, updatedRespuesta);
      return result.records.length ? result.records[0].get("r").properties : undefined;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async deleteRespuesta(id_respuesta: string) {
    const session = this.driver.session();
    const query = `
      MATCH (r:Respuesta {id_respuesta: $id_respuesta})
      DETACH DELETE r
    `;
    try {
      await session.run(query, { id_respuesta });
      return { message: "Respuesta eliminada correctamente" };
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async createRespPreg(texto: string, pregunta: string) {
    const session = this.driver.session();
    const query = `
      MATCH (p:Pregunta {texto: $pregunta}),
            (r:Respuesta {texto: $texto})
      MERGE (p)-[:TIENE_RESPUESTA]->(r)
      RETURN p, r
    `;
    try {
      const result = await session.run(query, { texto, pregunta });
      return result.records.length > 0;
    } catch (error) {
      console.error("Error en createRespPreg:", error);
      return false;
    } finally {
      session.close();
    }
  }

  async linkEvaluadoToRespuesta(name_evaluado: string, text: string) {
    const session = this.driver.session();
    const query = `
      MATCH (e:Evaluado {name_evaluado: $name_evaluado}),
            (r:Respuesta {texto: $text})
      MERGE (e)-[:RESPONDIO]->(r)
      RETURN e, r
    `;
    try {
      const result = await session.run(query, { name_evaluado, text });
      return result.records.length > 0;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }
}
