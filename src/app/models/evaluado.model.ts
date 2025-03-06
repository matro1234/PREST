import { Driver, Session } from "neo4j-driver";
import Neo4jDatabase from "../../database/database";

export interface Evaluado {
  id_evaluado: string;
  name_evaluado: string;
  telefono: number;
  genero: string;
  estado_cibil: string;
  email_institucional: string;
  rol: string;
  carrera: string;
}

export class EvaluadoModel {
  private readonly driver: Driver;

  public constructor(driver: Neo4jDatabase) {
    this.driver = driver.getDriver();
  }

  // Método para crear un evaluado
  async createEvaluado(evaluado: Evaluado) {
    const query = `
                    MERGE (s:Evaluado {email_institucional: $email_institucional})
                    ON CREATE SET s.id_evaluado = $id_evaluado,
                                  s.name_evaluado = $name_evaluado,
                                  s.telefono = $telefono,
                                  s.genero = $genero,
                                  s.estado_cibil = $estado_cibil,
                                  s.rol = $rol,
                                  s.carrera = $carrera
                    RETURN s
`;

    const session: Session = this.driver.session(); // Crear una nueva sesión

    try {
      const result = await session.run(query, evaluado);
      return result.records.length
        ? result.records[0].get("s").properties
        : undefined;
    } catch (error: any) {
      console.log(error); // Imprime el error en consola
    } finally {
      await session.close(); // Cerrar la sesión
    }
  }

  // Método para obtener un evaluado por su ID
  async getEvaluadoById(id_evaluado: string) {
    const query = `
      MATCH (s:Evaluado {id_evaluado: $id_evaluado})
      RETURN s
    `;

    const session: Session = this.driver.session(); // Crear una nueva sesión

    try {
      const result = await session.run(query, { id_evaluado });
      return result.records.length
        ? result.records[0].get("s").properties
        : undefined;
    } catch (error) {
      console.log(error); // Imprime el error en consola
    } finally {
      await session.close(); // Cerrar la sesión
    }
  }
  async getEvaluadosForResp(texto: string) {
    const query = `
      MATCH (e:Evaluado)-[:RESPONDIO]->(r:Respuesta {texto: $texto})
      RETURN e
    `;

    const session: Session = this.driver.session(); // Crear una nueva sesión

    try {
      const result = await session.run(query, { texto });
      return result.records.length
        ? result.records.map((evaluado: any) => evaluado.get("e").properties)
        : undefined;
    } catch (error) {
      console.log(error); // Imprime el error en consola
    } finally {
      await session.close(); // Cerrar la sesión
    }
  }

  // Método para obtener evaluados con filtros opcionales
  async getEvaluados(search?: string, carrera?: string, rol?: string) {
    let query = `MATCH (s:Evaluado)`;
    let conditions: string[] = [];
    let params: any = {};

    if (search) {
      conditions.push(
        `(s.name_evaluado CONTAINS $search OR s.rol CONTAINS $search OR s.carrera CONTAINS $search)`
      );
      params.search = search;
    }

    if (carrera) {
      conditions.push(`s.carrera = $carrera`);
      params.carrera = carrera;
    }

    if (rol) {
      conditions.push(`s.rol = $rol`);
      params.rol = rol;
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += ` RETURN s`;

    const session: Session = this.driver.session(); // Crear una nueva sesión

    try {
      const result = await session.run(query, params);
      return result.records.length
        ? result.records.map((evaluado: any) => evaluado.get("s").properties)
        : undefined;
    } catch (error) {
      console.log(error); // Imprime el error en consola
    } finally {
      await session.close(); // Cerrar la sesión
    }
  }

  // Método para actualizar un evaluado
  async updateEvaluado(new_evaluado: Evaluado) {
    const query = `
      MATCH (s:Evaluado {id_evaluado: $id_evaluado})
      SET s.name_evaluado = $name_evaluado,
          s.rol = $rol,
          s.carrera = $carrera
      RETURN s
    `;

    const session: Session = this.driver.session(); // Crear una nueva sesión

    try {
      const result = await session.run(query, {
        id_evaluado: new_evaluado.id_evaluado,
        name_evaluado: new_evaluado.name_evaluado,
        rol: new_evaluado.rol,
        carrera: new_evaluado.carrera,
      });
      return result.records[0].get("s").properties;
    } catch (error) {
      console.log(error); // Imprime el error en consola
    } finally {
      await session.close(); // Cerrar la sesión
    }
  }

  // Método para eliminar un evaluado
  async deleteEvaluado(id_evaluado: string) {
    const query = `MATCH (s:Evaluado {id_evaluado: $id_evaluado}) DETACH DELETE s`;

    const session: Session = this.driver.session(); // Crear una nueva sesión

    try {
      await session.run(query, { id_evaluado });
      return { message: "Evaluado deleted successfully" };
    } catch (error) {
      console.log(error); // Imprime el error en consola
    } finally {
      await session.close(); // Cerrar la sesión
    }
  }
}
