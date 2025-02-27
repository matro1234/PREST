import neo4j, { Driver, Session } from "neo4j-driver";
import { DatabaseConfig } from "../config/database.config";
import Debug from "debug";

const debug = Debug("testNeo4j:db");

export default class Neo4jDatabase {
    private static instance: Neo4jDatabase | undefined;
    private readonly driver: Driver;

    private constructor(config: DatabaseConfig) {
        debug(`Connecting to Neo4j at ${config.neo4jUri}`);
        this.driver = neo4j.driver(
            config.neo4jUri,
            neo4j.auth.basic(config.neo4jUser, config.neo4jPassword)
        );
    }

    public static getInstance(): Neo4jDatabase {
        if (!Neo4jDatabase.instance) {
            Neo4jDatabase.instance = new Neo4jDatabase(new DatabaseConfig());
        }
        return Neo4jDatabase.instance;
    }

    public async connect(): Promise<void> {
        try {
            const session: Session = this.driver.session();
            await session.run("RETURN 1");
            await session.close();
            debug("✅ Connected to Neo4j");
        } catch (error) {
            debug("❌ Error connecting to Neo4j:", error);
            throw error;
        }
    }

    public close(): Promise<void> {
        debug("Closing Neo4j connection...");
        return this.driver.close();
    }

    public getDriver(): Driver {
        return this.driver;
    }

    // Nuevo método para obtener una sesión
    public getSession(): Session {
        return this.driver.session();
    }
}
