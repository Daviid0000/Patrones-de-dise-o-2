import { Config } from "./patrones/singleton/configurationBD/configurationManagement.js";
import { connectionDB } from "./patrones/singleton/configurationGlobal/connectionDB.js";
import { DeviceInputFactoryMethod } from "./patrones/factory/addDevices/addDevices.js";
import { PeripheralOutputFacthoryMethod } from "./patrones/factory/createOutput/createOutput.js";
import { Equipment, MaintenanceDepartament, } from "./patrones/observer/notify/notification.js";
import { InterfaceUser, Inventory, } from "./patrones/observer/updateInventory/updateInventory.js";
import { InvoicingAdapter, OldInvoicingSystem, } from "./patrones/adaptador/invoicesIntegrate/invoices.js";
import { ExternalSupplierAPI, SupplierAdapter, } from "./patrones/adaptador/externalsApis/externalsApis.js";

// Patrón Singleton
console.log("Management configuration:");
const config = Config.getInstanceConfig();
config.getConfigGlobal();

config.updateConfig({
  languague: "english",
  routeBD: "/path/to/db",
  levelRegister: "information",
});

console.log("Bd connection:");
const Connection = connectionDB.getInstaceConnection();
Connection.listen();
Connection.dbConnect();

// Patron Factory Method
console.log("Input factory method:");

const deviceInput = new DeviceInputFactoryMethod();

const Keyboard = deviceInput.createDevice("Keyboard", {
  connection: "cable",
  keyboardType: "Mechanic",
  buttonKeyboardCount: 81,
});

const Mouse = deviceInput.createDevice("Mouse", {
  DPI: 1000,
  mouseType: "Default",
  buttonMouseCount: 3,
});

const Scann = deviceInput.createDevice("Scann", {
  scannType: "Scann",
  resolution: 6100,
});

console.log(Keyboard);
console.log(Mouse);
console.log(Scann);

// Salida de factory
console.log("Output factory:");
const deviceOutput = new PeripheralOutputFacthoryMethod();

const Monitor = deviceOutput.createPeripheral("Monitor", {
  resolution: "1920x1080",
  sizeScreen: 18,
});

const Printer = deviceOutput.createPeripheral("Printer", {
  printerType: "Cardtridge",
  printingSpeed: 100,
});

const Projector = deviceOutput.createPeripheral("Projector", {
  resolution: "1080p, 8K",
  brightness: 100,
});

console.log(Monitor);
console.log(Printer);
console.log(Projector);

// Patron Observer
console.log("Notification:");

const maintenanceDepartament = new MaintenanceDepartament();

const maintenanceEquipment = new Equipment(
  "Lenovo",
  "Electronic",
  "Flawless",
  65
);

maintenanceEquipment.addObserver(maintenanceDepartament);

maintenanceEquipment.changeState("In good condition", 56);
maintenanceEquipment.changeState("preventive maintenance", 54);
maintenanceEquipment.changeState("In good condition", 40);
maintenanceEquipment.changeState("preventive maintenance", 60);
maintenanceEquipment.changeState("preventive maintenance", 102);

//update inventario
console.log("Inventory update:");
const userObserver = new InterfaceUser();
const inventory = new Inventory();
inventory.addObserver(userObserver);

inventory.addEquipment({ id: 1, name: "Lenovo", type: "Laptop" });
inventory.addEquipment({ id: 2, name: "Lenovo", type: "Desktop" });
inventory.updateEquipment(1, "Lenovo update", "Gaming");
inventory.deleteEquipment(2);

// Patrón Adaptador
console.log("Invoicing system");
const oldInvoice = new OldInvoicingSystem();
const newInvoice = new InvoicingAdapter(oldInvoice);

newInvoice.generateInvoice({
  client: "David",
  productQuantity: 132,
  total: 52513,
});

newInvoice.generateInvoice({
  client: "Valeria",
  productQuantity: 1332,
  total: 21213,
});

newInvoice.checkInvoices();

console.log("Externals API's");

const providerAPI = new ExternalSupplierAPI();
const externalAPI = new SupplierAdapter(providerAPI);

(async () => {
  await externalAPI.getProducts();
  await externalAPI.updateInventory({
    id: 10,
    title: "Champion",
    price: 115,
    rating: { rate: 2.9, count: 470 },
  });

  console.log("List of products after the update:", providerAPI.products);
})();
