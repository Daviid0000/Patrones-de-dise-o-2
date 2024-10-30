interface ISupplier {
    getProducts(): void;
    updateInventory(data: Product): void;
}

interface Product {
    id: number;
    title: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
}

export class ExternalSupplierAPI {
    public products: Product[] = [];

    constructor() {}

    async fetchProducts(): Promise<void> {
        try {
            const response = await fetch('https://fakestoreapi.com/products/category/electronics');
            const data: Product[] = await response.json();
       
            const filteredData = data.map((product: any) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                rating: product.rating
            }));
   
            this.products.push(...filteredData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async updateStock(updatedData: Product): Promise<void> {
        if (this.products.length === 0) {
            console.log('Products not loaded. Loading products...');
            await this.fetchProducts();
        }

        const product = this.products.find(product => product.id === updatedData.id);
       
        if (product) {
            product.title = updatedData.title;
            product.price = updatedData.price;
            product.rating = updatedData.rating;

            console.log(`Stock updated for product ${updatedData.title}: ${updatedData.price} : ${updatedData.rating.count}`);
        } else {
            console.log(`Product with ID ${updatedData.id} not found.`);
        }
    }
}

export class SupplierAdapter implements ISupplier {
    private externalSupplierAPI: ExternalSupplierAPI;
   
    constructor(externalSupplierAPI: ExternalSupplierAPI) {
        this.externalSupplierAPI = externalSupplierAPI;
    }

    async getProducts() {
        await this.externalSupplierAPI.fetchProducts();
    }

    async updateInventory(updatedProduct: Product) {
        this.externalSupplierAPI.updateStock(updatedProduct);
    }
}
