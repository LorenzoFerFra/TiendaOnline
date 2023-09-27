class Producto{
    constructor(id,nombre,precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = 0
    }

    agregarCantidad(cantidadDeseada){
        this.cantidad = this.cantidad + cantidadDeseada
    }

    descripcion(){
        return "id: "+this.id+ " nombre: "+this.nombre+ " precio: $"+this.precio+"\n"
    }

    descripcionCarrito(){
        return "id: "+this.id+ " nombre: "+this.nombre+ " precio: $"+this.precio+ " cantidad: "+this.cantidad+"\n"
    }
}

class Carrito{
    constructor(){
        this.listaCarrito = []
    }

    agregar(productoNuevo){
        let existe = this.listaCarrito.some(producto => producto.id == productoNuevo.id)
        if(!existe){
            this.listaCarrito.push(productoNuevo)
        }
    }

    mostrar(){
        let descripcionListaCompra = "Carrito: \n\n"
        this.listaCarrito.forEach( producto => {
            descripcionListaCompra = descripcionListaCompra + producto.descripcionCarrito()
        })
        return descripcionListaCompra
    }

    calcularTotal(){
        return this.listaCarrito.reduce( (total,producto) => total + producto.precio * producto.cantidad ,0)
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = []
    }

    agregar(producto){
        this.listaProductos.push(producto)
    }

    mostrar(){
        let descripcionListaProductos = "Recuerde el ID del producto que desea comprar\n\n"
        this.listaProductos.forEach( producto => {
            //descripcionListaProductos = descripcionListaProductos + " id: "+producto.id+ " nombre: "+producto.nombre+ " precio: $"+producto.precio+"\n"
            descripcionListaProductos = descripcionListaProductos + producto.descripcion()
        })
        return descripcionListaProductos
    }

    buscarId(id){
        return this.listaProductos.find(producto => producto.id == id)
    }
}

//creamos productos
const p1 = new Producto(1,"Spinner", 300)
const p2 = new Producto(2,"Kazoo", 600) 
const p3 = new Producto(3,"Auriculares", 5000) 
const p4 = new Producto(4,"Monitor", 40000) 
const p5 = new Producto(5,"Joystick", 15000) 



const carrito = new Carrito()
const controladorP = new ProductoController()

controladorP.agregar(p1)
controladorP.agregar(p2)
controladorP.agregar(p3)
controladorP.agregar(p4)
controladorP.agregar(p5)

let rta

do{
    alert( controladorP.mostrar() )
    let id = Number(prompt("Ingrese el ID del producto que desea comprar!"))
    const producto = controladorP.buscarId(id)
    let cantidadDeseada = Number(prompt("Ingrese la cantidad que desea"))
    producto.agregarCantidad(cantidadDeseada)
    carrito.agregar(producto)
    alert( carrito.mostrar() )


    rta = prompt("¿Desea finalizar la compra? (escriba 'SI' para finalizar)").toLowerCase()
}while(rta != "si")

//mostrar total
alert( "El total es de: $"+carrito.calcularTotal() )