export interface Configuration {
  languague: string;
  routeBD: string;
  levelRegister: string;
}

export const configurationManagement: Configuration = {
  languague: "spanish",
  routeBD: "/path/to/db",
  levelRegister: "info"
};