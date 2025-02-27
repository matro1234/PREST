import { Session } from "neo4j-driver";

export interface Evaluador {
  id_evaluador: string;
  name_evaluador: string;
  rol: string;
  area: string;
}

export class EvaluadorModel {
  private readonly session: Session;

  public constructor(sess: Session) {
    this.session = sess;
  }

  async createEvaluador(evaluador: Evaluador) {
    const query = `
            CREATE (
                e:Evaluador {
                  id_evaluador: $id_evaluador,
                  name_evaluador: $name_evaluador,
                  rol: $rol,
                  area: $area
                }
              )
              RETURN e
        `;
    try {
      const result = await this.session.run(query, evaluador);
      if (result.records.length) {
        return result.records[0].get("e").properties;
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

  async getEvaluadorById(id_evaluador: string) {
    const query = `
            MATCH (e:Evaluador {id_evaluador: $id_evaluador})
            RETURN e
        `;
    try {
      const result = await this.session.run(query, { id_evaluador });
      if (result.records.length) {
        return result.records[0].get("e").properties;
      } else {
        return undefined;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async getEvaluadores() {
    const query = `MATCH (e:Evaluador) RETURN e`;

    try {
      const result = await this.session.run(query);
      if (result.records.length === 0) {
        return undefined;
      } else {
        const evaluadores: Evaluador[] = result.records.map(
          (evaluador) => evaluador.get("e").properties
        );
        return evaluadores;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateEvaluador(new_evaluador: Evaluador) {
    const query = `
            MATCH (e:Evaluador {id_evaluador: $id_evaluador})
            SET e.name_evaluador = $name_evaluador
            SET e.rol = $rol
            SET e.area = $area
            RETURN e
        `;

    try {
      const result = await this.session.run(query, {
        id_evaluador: new_evaluador.id_evaluador,
        name_evaluador: new_evaluador.name_evaluador,
        rol: new_evaluador.rol,
        area: new_evaluador.area
      });
      return result.records[0].get("e").properties;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEvaluador(id_evaluador: string) {
    const query = `MATCH (e:Evaluador {id_evaluador: $id_evaluador}) DETACH DELETE e`;

    try {
      await this.session.run(query, { id_evaluador });
      return { message: "Evaluador deleted successfully" };
    } catch (error) {
      console.log(error);
    }
  }
}
