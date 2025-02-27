import { cfg } from ".";

export class DatabaseConfig {
	public readonly neo4jUri: string;
	public readonly neo4jUser: string;
	public readonly neo4jPassword: string;

	public constructor() {
		this.neo4jUri = cfg.NEO4J_URI;
		this.neo4jUser = cfg.NEO4J_USER;
		this.neo4jPassword = cfg.NEO4J_PASSWORD;
	}
}
