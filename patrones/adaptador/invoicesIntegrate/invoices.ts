interface InvoiceInterface {
    client: string;
    productQuantity: number;
    total: number;
}

interface IInvoicing {
    generateInvoice(invoice: InvoiceInterface): void;
    checkInvoices(): void;
}

export class OldInvoicingSystem {
    invoices: { client: string; productQuantity: number; total: number }[];

    constructor() {
        this.invoices = [];
    }

    createInvoice(client: string, productQuantity: number, total: number) {
        const invoice = {
            client,
            productQuantity,
            total
        };
        this.invoices.push(invoice);
    }

    getInvoices() {
        console.log("All generated invoices are: ", this.invoices);
    }
}

export class InvoicingAdapter implements IInvoicing {
    private oldInvoicingSystem: OldInvoicingSystem;

    constructor(oldInvoicingSystem: OldInvoicingSystem) {
        this.oldInvoicingSystem = oldInvoicingSystem;
    }

    generateInvoice(invoice: InvoiceInterface): void {
        this.oldInvoicingSystem.createInvoice(invoice.client, invoice.productQuantity, invoice.total);
        console.log(`Invoice created for: ${invoice.client} with ${invoice.productQuantity} products. Total: ${invoice.total}`);
    }

    checkInvoices(): void {
        this.oldInvoicingSystem.getInvoices();
    }
}
