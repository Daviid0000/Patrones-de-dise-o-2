export interface Sequelize{
    port: number,
    db: string, 
    user: string, 
    pass: string, 
    host: string
}

export const configurationDB: Sequelize = {
    port: 3000,
    db: "inventory",
    user: "postgres",
    pass: "valdav", 
    host: "localhost"
}