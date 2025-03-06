import { Session, Driver } from "neo4j-driver";
import Neo4jDatabase from "../../database/database";

export interface Observacion {
  id_observacion: string;
  descripcion: string;
  fecha: Date;
  id_evaluado: string;
}

export class ObservacionModel {
  private readonly driver: Driver;

  public constructor(driver: Neo4jDatabase) {
    this.driver = driver.getDriver();
  }

  async createObservacion(observacion: Observacion) {
    const session = this.driver.session();
    const query = `
      MERGE (o:Observacion {
        id_observacion: $id_observacion,
        descripcion: $descripcion,
        fecha: $fecha,
        id_evaluado: $id_evaluado
      })
      RETURN o
    `;
    try {
      const result = await session.run(query, observacion);
      return result.records.length ? result.records[0].get("o").properties : undefined;
    } catch (error: any) {
      console.log(error);
    } finally {
      session.close();
    }
  }

  async getObservacionById(id_observacion: string) {
    const session = this.driver.session();
    const query = `MATCH (o:Observacion {id_observacion: $id_observacion}) RETURN o`;
    try {
      const result = await session.run(query, { id_observacion });
      return result.records.length ? result.records[0].get("o").properties : undefined;
    } catch (error: any) {
      console.log(error);
    } finally {
      session.close();
    }
  }

  async getObservaciones() {
    const session = this.driver.session();
    const query = `MATCH (o:Observacion) RETURN o`;
    try {
      const result = await session.run(query);
      return result.records.length === 0 ? undefined : result.records.map((observacion: any) => observacion.get("o").properties);
    } catch (error) {
      console.log(error);
    } finally {
      session.close();
    }
  }

  async updateObservacion(new_observacion: Observacion) {
    const session = this.driver.session();
    const query = `
      MATCH (o:Observacion {id_observacion: $id_observacion})
      SET o.descripcion = $descripcion,
          o.fecha = $fecha,
          o.id_evaluado = $id_evaluado
      RETURN o
    `;
    try {
      const result = await session.run(query, new_observacion);
      return result.records[0].get("o").properties;
    } catch (error) {
      console.log(error);
    } finally {
      session.close();
    }
  }

  async deleteObservacion(id_observacion: string) {
    const session = this.driver.session();
    const query = `MATCH (o:Observacion {id_observacion: $id_observacion}) DETACH DELETE o`;
    try {
      await session.run(query, { id_observacion });
      return { message: "Observacion deleted successfully" };
    } catch (error) {
      console.log(error);
    } finally {
      session.close();
    }
  }
}
