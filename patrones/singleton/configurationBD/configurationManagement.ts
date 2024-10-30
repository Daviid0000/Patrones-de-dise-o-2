import { Configuration, configurationManagement } from "./InterfaceManagement.js"
  
export class Config {
  //Se crea una instancia privada de la clase
  private static instancia: Config; 
  private languague: string;
  private routeBD: string;
  private levelRegister: string;

  // Inicialización por defecto para evitar que sea indefinida
  private constructor() {
    this.languague = configurationManagement.languague;
    this.routeBD = configurationManagement.routeBD;
    this.levelRegister = configurationManagement.levelRegister;
  }
  
  // Método estático para obtener la configuración actual
  public static getInstanceConfig() {
      if (!Config.instancia) {
          Config.instancia = new Config()
      }
      return Config.instancia
  }

  public getConfigGlobal() {
    const configuration = {
      languague: this.languague,
      routeBD: this.routeBD,
      levelRegister: this.levelRegister
    }
    console.log(configuration)
  }

  // Método estático para actualizar la configuración
  public updateConfig(nuevaConfig: Configuration): void {
    const configuration = {
      languague:nuevaConfig.languague,
      routeBD:nuevaConfig.routeBD,
      levelRegister:nuevaConfig.levelRegister
    }
    console.log("¡Configuration successfully updated!", configuration

    )
  }
  
}
  