interface deviceKeyboard {
  connection: string;
  keyboardType: string;
  buttonKeyboardCount: number;
}

interface deviceMouse {
  DPI: number;
  mouseType: string;
  buttonMouseCount: number;
}

interface deviceScann {
  scannType: string;
  resolution: number;
}

class Keyboard implements deviceKeyboard {
  public connection: string;
  public keyboardType: string;
  public buttonKeyboardCount: number;

  constructor(
    keyboardType: string,
    connection: string,
    buttonKeyboardCount: number
  ) {
    this.keyboardType = keyboardType;
    this.connection = connection;
    this.buttonKeyboardCount = buttonKeyboardCount;
  }
}

class Mouse implements deviceMouse {
  public DPI: number;
  public mouseType: string;
  public buttonMouseCount: number;

  constructor(DPI: number, mouseType: string, buttonMouseCount: number) {
    this.DPI = DPI;
    this.mouseType = mouseType;
    this.buttonMouseCount = buttonMouseCount;
  }
}

class Scann implements deviceScann {
  public scannType: string;
  public resolution: number;

  constructor(scannType: string, resolution: number) {
    this.scannType = scannType;
    this.resolution = resolution;
  }
}

export class DeviceInputFactoryMethod {
  createDevice(tipo: string, propiedades: any) {
    if (tipo === "Keyboard") {
      const { keyboardType, connection, buttonKeyboardCount } = propiedades;
      return new Keyboard(keyboardType, connection, buttonKeyboardCount);
    } else if (tipo === "Mouse") {
      const { DPI, mouseType, buttonMouseCount } = propiedades;
      return new Mouse(DPI, mouseType, buttonMouseCount);
    } else if (tipo === "Scann") {
      const { scannType, resolution } = propiedades;
      return new Scann(scannType, resolution);
    } else {
      throw new Error("Error: Device type");
    }
  }
}
