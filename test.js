const pedirProductos = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(productos)
        }, 3000)
    })
}
// asincrónicamente pedimos los datos y generamos la vista
pedirProductos()
    .then( res =>{
        listaProductos = res
        renderProductos(listaProductos)
    })
