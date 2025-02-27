import { Session } from "neo4j-driver";

export interface Pregunta {
  id_pregunta: string;
  texto: string;
  categoria: string;
  nivel_prestigio: number;
}

export class PreguntaModel {
  private readonly session: Session;
  
  public constructor(sess: Session) {
    this.session = sess;
  }

  async createPregunta(pregunta: Pregunta) {
    const query = `
      CREATE (p:Pregunta {
        id_pregunta: $id_pregunta,
        texto: $texto,
        categoria: $categoria,
        nivel_prestigio: $nivel_prestigio
      })
      RETURN p
    `;
    try {
      const result = await this.session.run(query, pregunta);
      return result.records.length ? result.records[0].get("p").properties : undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async getPreguntaById(id_pregunta: string) {
    const query = `MATCH (p:Pregunta {id_pregunta: $id_pregunta}) RETURN p`;
    try {
      const result = await this.session.run(query, { id_pregunta });
      return result.records.length ? result.records[0].get("p").properties : undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async getPreguntas() {
    const query = `MATCH (p:Pregunta) RETURN p`;
    try {
      const result = await this.session.run(query);
      return result.records.map(record => record.get("p").properties);
    } catch (error) {
      console.error(error);
    }
  }

  async updatePregunta(updatedPregunta: Pregunta) {
    const query = `
      MATCH (p:Pregunta {id_pregunta: $id_pregunta})
      SET p.texto = $texto,
          p.categoria = $categoria,
          p.nivel_prestigio = $nivel_prestigio
      RETURN p
    `;
    try {
      const result = await this.session.run(query, updatedPregunta);
      return result.records.length ? result.records[0].get("p").properties : undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async deletePregunta(id_pregunta: string) {
    const query = `MATCH (p:Pregunta {id_pregunta: $id_pregunta}) DETACH DELETE p`;
    try {
      await this.session.run(query, { id_pregunta });
      return { message: "Pregunta eliminada correctamente" };
    } catch (error) {
      console.error(error);
    }
  }
}
