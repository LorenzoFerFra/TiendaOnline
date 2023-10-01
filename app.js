class Producto {
  constructor(id, nombre, precio, descripcion, img, alt, cantidad = 1) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.img = img;
    this.alt = alt;
  }
  aumentarCantidad() {
    //aumentar cantidad producto + 1
    this.cantidad++;
  }
  disminuirCantidad() {
    //this.cantidad = this.cantidad - 1
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  carritoHTML() {
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
                        <button class="btn borrar_Btn" id="borrarCompra-${this.id}">
                            <i class="fa-regular fa-trash-can"></i>
                    </button>
                    </div>
                </div>
            </div>
        </div>`;
  }
  descripcionProducto() {
    return `
        <div class="card" style="width: 32rem;">
        <img src="${this.img}" class="card-img-top" alt="${this.alt}">
        <div class="card-body producto_bg">
          <h2 class="card-title">${this.nombre}</h2>
          <p class="card-text">${this.descripcion}</p>
          <p class="card-text">Cantidad:
          <button class="btn btn-dark" id="disminuir_producto-${this.id}"><i class="fa-solid fa-minus"></i></button>
          ${this.cantidad}
          <button class="btn btn-dark" id="agregar_producto-${this.id}"><i class="fa-solid fa-plus"></i></button>
          </p>
          <p class="card-text">$${this.precio}</p>
          <button class="btn btn-primary" id="ap-${this.id}">Agregar al carrito</a>
        </div>
      </div>`;
  }
}
class Carrito {
  constructor() {
    this.listaCarrito = [];
    this.localStorageKey = "listaCarrito";
  }

  agregar(productoEntrante) {
    let existe = this.listaCarrito.some(
      (producto) => producto.id == productoEntrante.id
    );
    if (existe) {
      let producto = this.listaCarrito.find(
        (producto) => producto.id == productoEntrante.id
      );
      producto.aumentarCantidad();
    } else {
      if (productoEntrante instanceof Producto) {
        this.listaCarrito.push(productoEntrante);
      }
    }
  }
  //eliminar 1 producto del carrito
  eliminar(productoAeliminar) {
    let indice = this.listaCarrito.findIndex(
      (producto) => producto.id == productoAeliminar.id
    );
    this.listaCarrito.splice(indice, 1);
  }
  vaciarCarrito() {
    this.listaCarrito = [];
    //this.localStorageKey = "listaCarrito"
    //localStorage.setItem("carritoJSON", listaCarrito)
    //localStorage.clear();
  }
  //mostrar carrito en DOM
  mostrarCarrito() {
    let contenedor_carrito = document.getElementById("contenedor_carrito");
    contenedor_carrito.innerHTML = "";
    this.listaCarrito.forEach((producto) => {
      contenedor_carrito.innerHTML += producto.carritoHTML();
    });
    this.eliminarCompra();
    // this.eventoAumentarCantidad()
    // this.eventoDisminuirCantidad()
    this.mostrarTotal();
  }
  //Convertir a json y guardar el carrito en storage
  carritoStorage() {
    let listaCarritoJSON = JSON.stringify(this.listaCarrito);
    localStorage.setItem(this.localStorageKey, listaCarritoJSON);
  }
  //Volver a convertir los JSON a objetos
  carritoCargar() {
    let listaCarritoJSON = localStorage.getItem(this.localStorageKey);
    let listaCarritoJS = JSON.parse(listaCarritoJSON);
    let listaTemp = [];
    listaCarritoJS.forEach((producto) => {
      let nuevoProducto = new Producto(
        producto.id,
        producto.nombre,
        producto.precio,
        producto.descripcion,
        producto.img,
        producto.alt
      );
      listaTemp.push(nuevoProducto);
    });
    this.listaCarrito = listaTemp;
  }
  //eliminar producto del carrito
  eliminarCompra() {
    this.listaCarrito.forEach((producto) => {
      const eliminar_producto = document.getElementById(
        `borrarCompra-${producto.id}`
      );
      eliminar_producto.addEventListener("click", () => {
        this.eliminar(producto);
        this.carritoStorage();
        this.mostrarCarrito();
      });
    });
  }
  // eventoAumentarCantidad() {
  //     this.listaCarrito.forEach(producto => {
  //         const btn_aumentar = document.getElementById(`agregar_producto-${producto.id}`)
  //         btn_aumentar.addEventListener("click", () => {
  //             producto.aumentarCantidad()
  //             this.mostrarCarrito()
  //         })
  //     })
  // }

  // eventoDisminuirCantidad() {
  //     this.listaCarrito.forEach(producto => {
  //         const btn_disminuir = document.getElementById(`disminuir_producto-${producto.id}`)
  //         btn_disminuir.addEventListener("click", () => {
  //             producto.disminuirCantidad()
  //             this.mostrarCarrito()
  //         })
  //     })
  // }
  
  //lisenter del boton con operador ternario que cancela la compra si esta vacio el carrito
  confirmarCompraListener() {
    const comprarProductos = document.getElementById("confrimar_compra");
    comprarProductos.addEventListener("click", () => {
      this.listaCarrito.length > 0
        ? this.confirmarCompra()
        : this.carritoVacio();
    });
  }
  //Confirmar y realizar la compra de los productos en el carrito
  confirmarCompra() {
    localStorage.setItem(this.localStorageKey, "[]");
    this.vaciarCarrito();
    this.mostrarCarrito();
    let DateTime = luxon.DateTime;
    const now = DateTime.now();
    const entregaEstimada = now.plus({ days: 5 });
    Swal.fire({
      position: "center",
      icon: "success",
      title:
        "Compra finalizada, sus productos llegaran en 5 dias, el ... tal vez... no cuentes con ello. Fecha estimada:" +
        entregaEstimada.toFormat("dd/MM/yyyy"),
      timer: 3000,
    });
  }
  //alert si el carrito esta vacio
  carritoVacio() {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "¡Tu carrito esta vacio, como el corazon de obito",
      timer: 3000,
    });
  }

  calcularTotal() {
    return this.listaCarrito.reduce(
      (acumulador, producto) =>
        acumulador + producto.precio * producto.cantidad,
      0
    );
  }
  mostrarTotal() {
    const total = document.getElementById("precio_total");
    total.innerText = `Precio Total: $${this.calcularTotal()}`;
  }
  //final carrito
}

class ProductController {
  constructor() {
    this.listaProductos = [];
  }
  //agregar produdcto nuevo al dom
  agregar(producto) {
    if (producto instanceof Producto) {
      this.listaProductos.push(producto);
    }
  }

  //manejarContenedorP
  //agarra productos de la simulacion de la api, y los carcga asincronicamente
  async manejarContenedorP() {
    let listaProductosJSON = await fetch("../productos.json");
    let listaProductosJS = await listaProductosJSON.json();

    listaProductosJS.forEach((p) => {
      let nuevoProducto = new Producto(
        p.id,
        p.nombre,
        p.precio,
        p.descripcion,
        p.img,
        p.alt,
        p.cantidad
      );
      this.agregar(nuevoProducto);
    });
    this.mostrarProductos();
  }

  //mostrar productos en DOM
  mostrarProductos() {
    let tiendaContainer = document.getElementById("tiendaContainer");
    this.listaProductos.forEach((producto) => {
      tiendaContainer.innerHTML += producto.descripcionProducto();
    });
    this.listaProductos.forEach((producto) => {
      const btn_ap = document.getElementById(`ap-${producto.id}`);

      btn_ap.addEventListener("click", () => {
        carrito.agregar(producto);
        carrito.carritoStorage();
        carrito.carritoCargar();
        carrito.mostrarCarrito();
        this.toastifyAlert(producto);
      });
    });
  }
  buscarId(id) {
    return this.listaProductos.find((producto) => producto.id == id);
  }
  toastifyAlert(producto) {
    Toastify({
      text: `Se ha añadido ${producto.nombre} a tu carrito!, tienes un total de: ${producto.cantidad}  de este producto`,
      avatar: `${producto.img}`,
      duration: 2500,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        color: "black",
        background: "aqua",
      },
    }).showToast();
  }
}
//crear las instancias de productocontroller y carrito, y cargarlas
const CP = new ProductController();
const carrito = new Carrito();

carrito.carritoCargar();
carrito.mostrarCarrito();
carrito.confirmarCompraListener();

CP.manejarContenedorP();
