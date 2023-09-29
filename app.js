class Producto{
    constructor(id, nombre, precio, descripcion, img, alt){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = 1;
        this.img = img;
        this.alt = alt;
        
    }

    descripcionCarrito(){
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad: ${this.cantidad}</p>
                        <p class="card-text">Precio: ${this.precio}</p>
                    </div>
                </div>
            </div>
        </div>`
    }

    descripcionProducto(){
        return `
        <div class="card" style="width: 32rem;">
        <img src="${this.img}" class="card-img-top" alt="${this.alt}">
        <div class="card-body">
          <h2 class="card-title">${this.nombre}</h2>
          <p class="card-text">${this.descripcion}</p>
          <p class="card-text">$${this.precio}</p>
          <button class="btn btn-primary" id="ap-${this.id}">Agregar al carrito</a>
        </div>
      </div>` 
    }
}

class Carrito{
    constructor() {
        this.listaCarrito = []
    }

    agregar(producto) {
        if( producto instanceof Producto){
            this.listaCarrito.push(producto)
        }
    }
    mostrarProductos() {
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += producto.descripcionCarrito();
        })
    }
    // calcularTotal(){
    //     return this.listaCarrito.reduce( (total,producto) => total + producto.precio * producto.cantidad ,0)
    // }
}

class ProductController{
    constructor(){
        this.listaProductos = []
    }

    agregar(producto) {
        if( producto instanceof Producto){
            this.listaProductos.push(producto)
        }
    }
    cargarProductos(){
        this.agregar( new Producto(1,"Peluche", 50000, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/peluche.webp", "koishi fumo") )
        this.agregar(new Producto(2,"Spinner", 600, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/spinner.webp", "koishi fumo") )
        this.agregar(new Producto(3, "ryzen 7", 250, "Un microprocesador de gama alta", "https://m.media-amazon.com/images/I/51D3DrDmwkL.__AC_SX300_SY300_QL70_ML2_.jpg", "un microprocesador amd") )
     }

    //mostrar productos en DOM
    mostrarProductos(){
        let tiendaContainer = document.getElementById("tiendaContainer")

        this.listaProductos.forEach(producto => {
            tiendaContainer.innerHTML += producto.descripcionProducto() 
        })
        
        this.listaProductos.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`)

            btn_ap.addEventListener("click",()=>{
                carrito.agregar(producto)
                carrito.mostrarProductos()
            })
        })
        
    }
    buscarId(id){
        return this.listaProductos.find(producto => producto.id == id)
    }
}

const CP = new ProductController()
const carrito = new Carrito()


CP.cargarProductos()
CP.mostrarProductos()


