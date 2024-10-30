import { configurationDB } from "./configurationDB.js"

export class connectionDB {
    private static instance:connectionDB
    public user: string;
    private port: number;
    public db: string;
    public pass: string;
    private host: string;

    private constructor() {
        this.port = configurationDB.port;
        this.user = configurationDB.user;
        this.db = configurationDB.db;
        this.pass = configurationDB.pass;
        this.host = configurationDB.host;
    }
    
    public static getInstaceConnection() {
        if (!connectionDB.instance) {
            connectionDB.instance = new connectionDB()
        }
        return connectionDB.instance
    }

    public listen() {
        console.log(`Server in listening on port: http://${this.host}:${this.port}`)
    }

    public dbConnect() {
        console.log("¡BD Connected!")
    }

}