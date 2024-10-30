interface deviceMonitor {
  resolution: string;
  sizeScreen: number;
}

interface devicePrinter {
  printerType: string;
  printingSpeed: number;
}

interface deviceProjector {
  resolution: string;
  brightness: number;
}

class Monitor implements deviceMonitor {
  public resolution: string;
  public sizeScreen: number;

  constructor(resolution: string, sizeScreen: number) {
    (this.resolution = resolution), (this.sizeScreen = sizeScreen);
  }
}

class Printer implements devicePrinter {
  public printerType: string;
  public printingSpeed: number;

  constructor(printerType: string, printingSpeed: number) {
    this.printerType = printerType;
    this.printingSpeed = printingSpeed;
  }
}

class Projector implements deviceProjector {
  public resolution: string;
  public brightness: number;

  constructor(resolution: string, brightness: number) {
    (this.resolution = resolution), (this.brightness = brightness);
  }
}

export class PeripheralOutputFacthoryMethod {
  createPeripheral(type: string, propertys: any) {
    
    if (type === "Monitor") {
      const { resolution, sizeScreen } = propertys;
      return new Monitor(resolution, sizeScreen);
    } else if (type === "Printer") {
      const { printerType, printingSpeed } = propertys;
      return new Printer(printerType, printingSpeed);
    } else if (type === "Projector") {
      const { resolution, brightness } = propertys;
      return new Projector(resolution, brightness);
    } else {
      throw new Error(`Tipo de periférico no soportado:  ${type}`);
    }
  }
}
