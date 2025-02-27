import { Session } from "neo4j-driver";
export interface Evaluado {
  id_evaluado: string;
  name_evaluado: string;
  rol: string;
  carrera: string;
}
export class EvaluadoModel {
  private readonly session: Session;
  public constructor(sess: Session) {
    this.session = sess;
  }
  async createEvaluado(evaluado: Evaluado) {
    const query = `
            create (
                s:Evaluado {
                  id_evaluado: $id_evaluado,
                  name_evaluado: $name_evaluado,
                  rol: $rol,
                  carrera: $carrera
                }
              )
              return s
        `;
    try {
      const result = await this.session.run(query, evaluado);
      if (result.records.length) {
        return result.records[0].get("s").properties;
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

  async getEvaluadoById(id_evaluado: string) {
    const query = `
            MATCH (s:Evaluado {id_evaluado: $id_evaluado})
            RETURN s
        `;
    try {
      const result = await this.session.run(query, { id_evaluado });
      if (result.records.length) {
        return result.records[0].get("s").properties;
      } else {
        return undefined;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async getEvaluados() {
    const query = `MATCH (s:Evaluado) RETURN s`;

    try {
      const result = await this.session.run(query);
      if (result.records.length === 0) {
        return undefined;
      } else {
        const result2: Evaluado[] = result.records.map(
          (evaluado) => evaluado.get("s").properties
        );
        return result2;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateEvaluado(new_evaluado: Evaluado) {
    const query = `
            MATCH (s:Evaluado {id_evaluado: $id_evaluado})
            SET s.name_evaluado = $name_evaluado
            SET s.rol = $rol
            SET s.carrera = $carrera
            SET s.type = type
            RETURN u
        `;

    try {
      const result = await this.session.run(query, {
        id_evaluado: new_evaluado.id_evaluado,
        name_evaluado: new_evaluado.name_evaluado,
        rol: new_evaluado.rol,
        carrera: new_evaluado.carrera
      });
      return result.records[0].get("s").properties;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEvaluado(id_evaluado: string) {
    const query = `MATCH (s:Evaluado {id_evaluado: $id_evaluado}) DETACH DELETE u`;

    try {
      await this.session.run(query, { id_evaluado });
      return { message: "User deleted successfully" };
    } catch (error) {
      console.log(error);
    }
  }
}
