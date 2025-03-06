import { Session, Driver } from "neo4j-driver";
import Neo4jDatabase from "../../database/database";

export interface Evaluador {
  id_evaluador: string;
  name_evaluador?: string;
  password?: string;
  email?: string;
  rol?: string;
  area?: string;
  sessionToken?: string;
  salt?: string;
}

export class EvaluadorModel {
  private readonly driver: Driver;

  public constructor(driver: Neo4jDatabase) {
    this.driver = driver.getDriver();
  }

  async getEvaluadorByToken(token: string) {
    const session = this.driver.session();
    const query = `MATCH (e:Evaluador {sessionToken: $token}) RETURN e`;
    try {
      const result = await session.run(query, { token });
      return result.records.length > 0 ? result.records[0].get("e").properties : null;
    } catch (error) {
      console.error("Error al obtener evaluador por token:", error);
      throw error;
    } finally {
      session.close();
    }
  }

  async getEvaluadorByemail(email: string) {
    const session = this.driver.session();
    const query = `MATCH (e:Evaluador {email: $email}) RETURN e`;
    try {
      const result = await session.run(query, { email });
      return result.records.length > 0 ? result.records[0].get("e").properties : null;
    } catch (error) {
      console.error("Error al obtener evaluador por email:", error);
      throw error;
    } finally {
      session.close();
    }
  }

  async getEvaluadorById(id_evaluador: string) {
    const session = this.driver.session();
    const query = `MATCH (e:Evaluador {id_evaluador: $id_evaluador}) RETURN e`;
    try {
      const result = await session.run(query, { id_evaluador });
      return result.records.length > 0 ? result.records[0].get("e").properties : null;
    } catch (error) {
      console.error("Error al obtener evaluador por ID:", error);
      throw error;
    } finally {
      session.close();
    }
  }

  async createEvaluador(evaluador: Evaluador) {
    const session = this.driver.session();
    const query = `
      MERGE (e:Evaluador {
        id_evaluador: $id_evaluador,
        name_evaluador: $name_evaluador,
        password: $password,
        email: $email,
        sessionToken: $sessionToken,
        salt: $salt,
        rol: $rol,
        area: $area
      }) RETURN e
    `;
    try {
      const result = await session.run(query, evaluador);
      return result.records.length > 0 ? result.records[0].get("e").properties : null;
    } catch (error) {
      console.error("Error al crear evaluador:", error);
      throw error;
    } finally {
      session.close();
    }
  }

  async updateEvaluador(evaluador: Evaluador) {
    const session = this.driver.session();
    const query = `
      MATCH (e:Evaluador {id_evaluador: $id_evaluador})
      SET e.sessionToken = $sessionToken
      RETURN e
    `;
    try {
      const result = await session.run(query, evaluador);
      return result.records.length > 0 ? result.records[0].get("e").properties : null;
    } catch (error) {
      console.error("Error al actualizar evaluador:", error);
      throw error;
    } finally {
      session.close();
    }
  }

  async deleteEvaluador(id_evaluador: string) {
    const session = this.driver.session();
    const query = `MATCH (e:Evaluador {id_evaluador: $id_evaluador}) DETACH DELETE e`;
    try {
      await session.run(query, { id_evaluador });
      return { message: "Evaluador eliminado con éxito" };
    } catch (error) {
      console.error("Error al eliminar evaluador:", error);
      throw error;
    } finally {
      session.close();
    }
  }

  async getEvaluadores() {
    const session = this.driver.session();
    const query = `MATCH (e:Evaluador) RETURN e`;
    try {
      const result = await session.run(query);
      return result.records.map((record: any) => record.get("e").properties);
    } catch (error) {
      console.error("Error al obtener evaluadores:", error);
      throw error;
    } finally {
      session.close();
    }
  }
  async linkEvaluadorToEvaluado(id_evaluador: string, id_evaluado: string) {
    const session = this.driver.session();
    const query = `
      MATCH (e:Evaluador {id_evaluador: $id_evaluador}),
            (r:Evaluado {id_evaluado: $id_evaluado})
      MERGE (e)-[:RESPONDIO]->(r)
      RETURN e, r
    `;
    try {
      const result = await session.run(query, { id_evaluador, id_evaluado });
      return result.records.length > 0;
    } catch (error) {
      console.error(error);
    } finally {
      session.close();
    }
  }
}
