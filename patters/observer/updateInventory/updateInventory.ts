interface Equipment {
  id: number;
  name: string;
  type: string;
}

interface Observer {
  notification(
    equipment: Equipment,
    action: string,
    listEquipments: Equipment[]
  ): any;
}

export class InterfaceUser implements Observer {
  public notification(
    equipment: Equipment,
    action: string,
    listEquipments: Equipment[]
  ): void {
    if (action === "add") {
      console.log(`Equipment successfully added: ${equipment.name} with its type ${equipment.type},
            our inventory would currently look like this: ${listEquipments}`);
    } else if (action === "update") {
      console.log(`Equipment successfully updated: ${equipment.name},
            our inventory would currently look like this: ${listEquipments}`);
    } else if (action === "delete") {
      console.log(`Equipment successfully deleted: ${equipment.name},
                our inventory would currently look like this: ${listEquipments}`);
    }
  }
}

export class Inventory {
  private listEquipments: Equipment[] = [];
  private observers: Observer[] = [];

  public addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  public addEquipment(equipment: Equipment): void {
    this.listEquipments.push(equipment);
    this.notifyAllObservers(equipment, "add");
  }

  updateEquipment(id: number, name: string, type: string): void {
    const equipment = this.listEquipments.find((e) => e.id === id);
    if (equipment) {
      equipment.name = name;
      equipment.type = type;
      this.notifyAllObservers(equipment, "update");
    } else {
      console.log("Equipment not found to update.");
    }
  }

  deleteEquipment(id: number): void {
    const index = this.listEquipments.findIndex((e) => e.id === id);
    if (index !== -1) {
      const deletedEquipment = this.listEquipments.splice(index, 1)[0];
      this.notifyAllObservers(deletedEquipment, "delete");
    } else {
      console.log("Equipment not found to remove.");
    }
  }

  private notifyAllObservers(equipment: Equipment, action: string): void {
    for (const observer of this.observers) {
      observer.notification(equipment, action, this.listEquipments);
      console.log(this.listEquipments);
    }
  }
}
