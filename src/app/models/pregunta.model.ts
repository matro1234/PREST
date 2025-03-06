import { Driver } from "neo4j-driver";
import Neo4jDatabase from "../../database/database";

export interface Pregunta {
  id_pregunta: string;
  texto: string;
  categoria: string;
}

export class PreguntaModel {
  private readonly driver: Driver;

  public constructor(driver: Neo4jDatabase) {
    this.driver = driver.getDriver();
  }

  async createPregunta(pregunta: Pregunta) {
    const session = this.driver.session();
    const query = `
      MERGE (p:Pregunta {
        id_pregunta: $id_pregunta,
        texto: $texto,
        categoria: $categoria
      })
      RETURN p
    `;
    try {
      const result = await session.run(query, pregunta);
      return result.records.length ? result.records[0].get("p").properties : undefined;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async getPreguntaById(id_pregunta: string) {
    const session = this.driver.session();
    const query = `MATCH (p:Pregunta {id_pregunta: $id_pregunta}) RETURN p`;
    try {
      const result = await session.run(query, { id_pregunta });
      return result.records.length ? result.records[0].get("p").properties : undefined;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async getPreguntas() {
    const session = this.driver.session();
    const query = `MATCH (p:Pregunta) RETURN p`;
    try {
      const result = await session.run(query);
      return result.records.map((record: any) => record.get("p").properties);
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async updatePregunta(updatedPregunta: Pregunta) {
    const session = this.driver.session();
    const query = `
      MATCH (p:Pregunta {id_pregunta: $id_pregunta})
      SET p.texto = $texto,
          p.categoria = $categoria
      RETURN p
    `;
    try {
      const result = await session.run(query, updatedPregunta);
      return result.records.length ? result.records[0].get("p").properties : undefined;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }

  async deletePregunta(id_pregunta: string) {
    const session = this.driver.session();
    const query = `MATCH (p:Pregunta {id_pregunta: $id_pregunta}) DETACH DELETE p`;
    try {
      await session.run(query, { id_pregunta });
      return { message: "Pregunta eliminada correctamente" };
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }
}
