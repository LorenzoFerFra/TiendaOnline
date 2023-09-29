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
        <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
        <div class="card-body">
          <h2 class="card-title">${producto.nombre}</h2>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-primary">Agregar al carrito</a>
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
        let tiendaContainer = document.getElementById("tiendaContainer")
        tiendaContainer.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            tiendaContainer.innerHTML += producto.descripcionCarrito();
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
        this.agregar( new producto(1,"Peluche", 50000, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/peluche.webp", "koishi fumo"))
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

// //instanciar productos
// const p1 = new Producto(1,"Peluche", 50000, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/peluche.webp", "koishi fumo") 
// const p2 = new Producto(2,"Spinner", 600, "Muñeco de peluche fumo de koishi de touhou proyect", "img", "koishi fumo") 
// const p3 = new Producto(3,"Joystick", 15000, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/peluche.webp", "koishi fumo") 
// const p4 = new Producto(4,"Peluche", 40000, "Muñeco de peluche fumo de koishi de touhou proyect", "img", "koishi fumo") 
// const p5 = new Producto(5,"Kazoo", 600, "Muñeco de peluche fumo de koishi de touhou proyect", "img", "koishi fumo") 

// //mostrar los productos
// controladorP.agregar(p1)
// controladorP.agregar(p2)
// controladorP.agregar(p3)
// controladorP.agregar(p4)
// controladorP.agregar(p5)

const CP = new ProductController()
const carrito = new Carrito()


CP.cargarProductos()
CP.mostrarProductos()


