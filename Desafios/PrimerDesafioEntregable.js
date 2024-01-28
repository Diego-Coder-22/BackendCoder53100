class ProductManager {
    constructor (products=[]){
        this.products =products;
        this.currentId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Falta agregar datos a este producto");
            return;
        }

        if(this.products.some(product => product.code === code)) {
            console.log ("El código ya existe. Debe ser único.");
            return
        }

        const newProduct = {
            id: this.currentId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
    }

    getProductById(id) {
        const product = this.products.find(product =>product.id === id);

        if (product) {
            return product;
        } else {
            console.log ("Producto no encontrado con el ID")
        }
    }

    getProduct(){
        return this.products;
    }
}

const productManager = new ProductManager ();

console.log(productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Junior Azul", "69,99", "imagen_kimono_junior_azul","8542399","25"));
console.log(productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Junior Blanco", "59,99", "imagen_kimono_junior_blanco","8542398","18"));
console.log(productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Adulto Blanco", "89,99", "imagen_kimono_adulto_blanco","8542397","10"));
console.log(productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Junior Blanco", "99,99", "imagen_kimono_junior_negro",));//Prueba error faltan datos del producto
console.log(productManager.getProductById(1)); //Prueba traer Productos por ID
console.log(productManager.getProductById(6)); //Prueba error traer Productos Inexistentes
console.log(productManager.getProductById()); //Prueba traer todos los Productos
