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
                        <h3 class="card-title">${this.nombre}</h3>
                        <p class="card-text">Cantidad: ${this.cantidad}</p>
                        <p class="card-text">Precio: ${this.precio}</p>
                        <button class="btn borrar_Btn" id="borrar_compra-${this.id}">
                            <i class="fa-regular fa-trash-can"></i>
                    </button>
                    </div>
                </div>
            </div>
        </div>`
    }

    descripcionProducto(){
        return `
        <div class="card" style="width: 32rem;">
        <img src="${this.img}" class="card-img-top" alt="${this.alt}">
        <div class="card-body producto_bg">
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
    mostrarCarrito() {
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += producto.descripcionCarrito();
        })
    }
        //Convertir a json y guardar el carrito en storage
    carritoStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("carritoJSON", listaCarritoJSON)
    }
        //Volver a convertir los JSON a objetos
    carritoCargar(){
        let listaCarritoJSON = localStorage.getItem("carritoJSON")
        let listaCarritoJS = JSON.parse(listaCarritoJSON)
        let listaTemp = []
        listaCarritoJS.forEach( producto => {
            let nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.descripcion, producto.img, producto.alt)
            listaTemp.push(nuevoProducto)
        })
        this.listaCarrito = listaTemp
    }
        
    }
 
    // calcularTotal(){
    //     return this.listaCarrito.reduce( (total,producto) => total + producto.precio * producto.cantidad ,0)
    // }


class ProductController{
    constructor(){
        this.listaProductos = []
    }
    //agregar produdcto nuevo al dom
    agregar(producto) {
        if( producto instanceof Producto){
            this.listaProductos.push(producto)
        }
    }
    //cargar productos al dom
    cargarProductos(){
        this.agregar( new Producto(1,"fumo", 50000, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/peluche.webp", "koishi fumo") )
        this.agregar(new Producto(2,"Spinner", 600, "Un spinner dorado ", "../assets/img/spinner.webp", "spinner dorado") )
        this.agregar(new Producto(3, "ryzen 7", 250, " gama alta", "https://m.media-amazon.com/images/I/51D3DrDmwkL.__AC_SX300_SY300_QL70_ML2_.jpg", "un microprocesador amd") )
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
                carrito.carritoStorage()
                carrito.mostrarCarrito()
            })
        })
        
    }
    buscarId(id){
        return this.listaProductos.find(producto => producto.id == id)
    }
}



// let carritoStorage = [
//      new Producto(1,"fumo", 50000, "Muñeco de peluche fumo de koishi de touhou proyect", "../assets/img/peluche.webp", "koishi fumo"),
//      new Producto(2,"Spinner", 600, "Un spinner dorado ", "../assets/img/spinner.webp", "spinner dorado") ,
//      new Producto(3,"Sasdasdas", 600, "Un spinner dorado ", "../assets/img/spinner.webp", "spinner dorado") ,
// ]

// let carritoStorageJSON = JSON.stringify(carritoStorage)
// localStorage.setItem("carritoJSON", carritoStorageJSON)

// let listaCarritoJSON = localStorage.getItem("carritoJSON")
// let listaCarritoJS = JSON.parse(listaCarritoJSON)
// let listaTemp = []
// listaCarritoJS.forEach( producto => {
//     let nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.descripcion, producto.img, producto.alt)
//     listaTemp.push(nuevoProducto)
// })
// carritoJSON = listaTemp
// console.log(carritoJSON)

const CP = new ProductController()
const carrito = new Carrito()

carrito.carritoCargar()
carrito.mostrarCarrito()

CP.cargarProductos()
CP.mostrarProductos()


