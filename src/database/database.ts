import neo4j, { Driver, Session } from "neo4j-driver";
import { DatabaseConfig } from "../config/database.config";
import Debug from "debug";

const debug = Debug("testNeo4j:db");

export default class Neo4jDatabase {
    private static instance: Neo4jDatabase | undefined;
    private readonly driver: Driver;

    // Constructor privado
    private constructor(config: DatabaseConfig) {
        debug(`Connecting to Neo4j at ${config.neo4jUri}`);
        this.driver = neo4j.driver(
            config.neo4jUri,
            neo4j.auth.basic(config.neo4jUser, config.neo4jPassword)
        );
    }

    // Método para obtener la instancia del singleton
    public static getInstance(): Neo4jDatabase {
        if (!Neo4jDatabase.instance) {
            Neo4jDatabase.instance = new Neo4jDatabase(new DatabaseConfig());
        }
        return Neo4jDatabase.instance;
    }

    // Método para conectar, creando una sesión temporal solo para este método
    public async connect(): Promise<void> {
        const session: Session = this.driver.session(); // Crear nueva sesión aquí
        try {
            await session.run("RETURN 1");
            debug("✅ Connected to Neo4j");
        } catch (error) {
            debug("❌ Error connecting to Neo4j:", error);
            throw error;
        } finally {
            await session.close(); // Cerrar la sesión después de usarla
        }
    }

    // Método para cerrar la conexión a la base de datos
    public close(): Promise<void> {
        debug("Closing Neo4j connection...");
        return this.driver.close();
    }

    // Método para obtener el driver, que se compartirá entre varias sesiones
    public getDriver(): Driver {
        return this.driver;
    }

    // Método para crear una nueva sesión cada vez que se necesite
    public createSession(): Session {
        return this.driver.session(); // Crear y devolver una nueva sesión
    }
}
