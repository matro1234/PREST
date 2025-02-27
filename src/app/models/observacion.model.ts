import { Session } from "neo4j-driver";

export interface Observacion {
  id_observacion: string;
  descripcion: string;
  fecha: Date;
  id_evaluado: string;
}

export class ObservacionModel {
  private readonly session: Session;
  public constructor(sess: Session) {
    this.session = sess;
  }

  async createObservacion(observacion: Observacion) {
    const query = `
      CREATE (o:Observacion {
        id_observacion: $id_observacion,
        descripcion: $descripcion,
        fecha: $fecha,
        id_evaluado: $id_evaluado
      })
      RETURN o
    `;
    try {
      const result = await this.session.run(query, observacion);
      if (result.records.length) {
        return result.records[0].get("o").properties;
      } else {
        return undefined;
      }
    } catch (error: any) {
      if (error.code === "Neo.ClientError.Schema.ConstraintValidationFailed") {
        return null;
      }
      throw error;
    }
  }

  async getObservacionById(id_observacion: string) {
    const query = `
      MATCH (o:Observacion {id_observacion: $id_observacion})
      RETURN o
    `;
    try {
      const result = await this.session.run(query, { id_observacion });
      if (result.records.length) {
        return result.records[0].get("o").properties;
      } else {
        return undefined;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async getObservaciones() {
    const query = `MATCH (o:Observacion) RETURN o`;
    try {
      const result = await this.session.run(query);
      if (result.records.length === 0) {
        return undefined;
      } else {
        const result2: Observacion[] = result.records.map(
          (observacion) => observacion.get("o").properties
        );
        return result2;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateObservacion(new_observacion: Observacion) {
    const query = `
      MATCH (o:Observacion {id_observacion: $id_observacion})
      SET o.descripcion = $descripcion
      SET o.fecha = $fecha
      SET o.id_evaluado = $id_evaluado
      RETURN o
    `;
    try {
      const result = await this.session.run(query, {
        id_observacion: new_observacion.id_observacion,
        descripcion: new_observacion.descripcion,
        fecha: new_observacion.fecha,
        id_evaluado: new_observacion.id_evaluado,
      });
      return result.records[0].get("o").properties;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteObservacion(id_observacion: string) {
    const query = `MATCH (o:Observacion {id_observacion: $id_observacion}) DETACH DELETE o`;
    try {
      await this.session.run(query, { id_observacion });
      return { message: "Observacion deleted successfully" };
    } catch (error) {
      console.log(error);
    }
  }
}
