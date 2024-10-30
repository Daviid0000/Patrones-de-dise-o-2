interface equipmentValue {
  name: string;
  type: string;
  state: string;
  usageTime: number;
}

interface Observer {
  notify(equipment: equipmentValue, state: string, usage_time: number): void;
}

export class MaintenanceDepartament implements Observer {
  public notify(equipment: Equipment, state: string, usage_time: number): void {
    if (state === "Preventive maintenance" && usage_time > 100) {
      console.log(
        `Notification: The equipment ${equipment.name} of type ${equipment.type} needs preventive maintenance and exceeded 100 hours of use of the equipment, in this case you have used ${usage_time}hs`
      );
    } else if (state === "Preventive maintenance") {
      console.log(
        `The equipment ${equipment.name} of type ${equipment.type} needs preventive maintenance`
      );
    } else if (usage_time > 100) {
      console.log(
        `The equipment ${equipment.name} of type ${equipment.type}, has exceeded the 100hs usage time have you used ${usage_time}hs`
      );
    }
  }
}

export class Equipment implements equipmentValue {
  private observers: Observer[] = [];
  public name: string;
  public type: string;
  public state: string;
  public usageTime: number;
  public threshold: number;

  constructor(
    name: string,
    type: string,
    state: string,
    usageTime: number,
    threshold = 100
  ) {
    (this.name = name),
      (this.type = type),
      (this.state = state),
      (this.usageTime = usageTime);
    this.threshold = threshold;
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  changeState(new_state: string, new_usage_time: number): void {
    this.state = new_state;
    this.usageTime = new_usage_time;

    if (
      new_state === "Preventive maintenance" ||
      new_usage_time > this.threshold
    ) {
      this.notifyAllObserver();
    } else if (new_usage_time <= 100 && new_state != "Preventive maintenance") {
      console.log(
        `The equipment ${this.name} of type ${this.type} maintenance free and not exceeded time of use`
      );
    }
  }

  notifyAllObserver() {
    for (const observer of this.observers) {
      observer.notify(this, this.state, this.usageTime);
    }
  }
}
