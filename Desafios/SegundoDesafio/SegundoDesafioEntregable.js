import fs from "fs";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.currentId = 1;
    this.path = "./products.json";
  }

  getProducts = async () => {
    try {
      const productsfile = await fs.promises.readFile(this.path, "utf-8");
      const products = await JSON.parse(productsfile);
      this.products = products;
      return this.products;
    } catch (error) {
      if (error.code == "ENOENT") {
        await fs.promises.writeFile(this.path, "[]");
        console.log("Se creo el archivo en la ruta " + this.path);
        return this.products;
      }
    }
  };

  async addProduct(title,description,price,thumbnail,code,stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock
    ) {
      return console.log("Falta agregar datos a este producto");
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
    await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, "\t"));
  }

  getProductoById(id) {
    const product = this.products.find(product =>product.id === id);
    if (product) {
      console.log("Producto encontrado");
      return product;
    }else {
        console.log("El producto fue encontrado");
    return null;
    }
  }

  async updateProduct(productId, change) {
    this.products = this.products.map((product) => {
      if (product.id === productId) {
        product = { ...product, ...change };
      }
      return product;
    });
    await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, "\t"));
  }


  async deleteProduct(productId) {
    const productIndex = this.products.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      console.log("Producto encontrado, será eliminado");
      this.products.splice(productIndex, 1);
      await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, "\t"));
      console.log("Producto eliminado con exito");
    } else {
      console.log(`No se encontró ningún producto con el ID ${productId} y no se puede eliminar`);
    }
  }
}

let changes = {
    thumbnail: "new_imagen_kimono_junior_azul",
    price: "59,99",
}; 
console.log("Producto modificado con exito");

async function probe() {
    const productManager = new ProductManager("./products.json");
  await productManager.getProducts();
  await productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Junior Azul", "69,99", "imagen_kimono_junior_azul","8542399","25");
  await productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Junior Blanco", "79,99", "imagen_kimono_junior_blanco","8542398","15");
  await productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Adulto Blanco", "89,99", "imagen_kimono_adulto_blanco","8542397","10");
  await productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Adulto Negro", "99,99", "imagen_kimono_adulto_negro","8542396","8");
  await productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz Adulto Negro", "imagen_kimono_adulto_negro","8542396","8");//Prueba error faltan datos del producto
  productManager.deleteProduct(3);//Prueba eliminar productos por ID
  productManager.deleteProduct(5);//Prueba eliminar productos inexistentes por ID
  productManager.updateProduct(1, changes);//Prueba cambios en productos por ID
}

probe();
