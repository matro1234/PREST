import { config } from "dotenv";
config()

const environment = process.env.NODE_ENV

if(environment === "development"){
    config({
        path:"./.env.development"
    })
} else {
    config({
        path:"./.env.production"
    })
}

export const cfg = {
    PORT: process.env.PORT || 3325,
    SECRET_KEY: process.env.SECRET_KEY || "clave",
    // Neo4j
    NEO4J_URI: process.env.NEO4J_URI || "bolt://localhost:7685",
    NEO4J_USER: process.env.NEO4J_USER || "neo4j",
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD || "@Qwert454"
};
