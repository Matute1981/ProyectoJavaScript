// Declaración de Variables e Incorporación de Arrays

let producto = 0;
let cantidadProducto = 0;
let precio = 0;
let carrito = []
const productos = [
    {producto:"Gorra", precio: 1200},
    {producto:"Remera", precio: 2500},
    {producto:"CD - El veneno de tu Soledad", precio: 1400},
    {producto:"CD - El momento Indicado", precio: 1700}
]

// Ordenar un Array de Objetos (de mayor a menor precio)
// Order is in-place!

productos.sort((a,b)=>{
    if (a.precio > b.precio){
        return -1;
    }
    if (a.precio < b.precio){
        return 1;
    }else{
        return 0;
    }
});

// Order class

class Orden{
    constructor(producto, precio, cantidad){
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.envio = 0;
        this.subTotal = 0;
        this.total = 0;
    }

    calcularSubTotal(){
        this.subTotal = this.precio * this.cantidad;
    }

    calcularIva(){
        return this.subTotal * 0.21;
    }

    calcularEnvio(){
        if (this.subTotal >= 3200){
            this.envio = 0;
        }else {
            this.envio = 600;
        }
    }

    calcularTotal(){
        this.total = this.subTotal + this.envio + this.calcularIva();
    }
}

function ordenColocada(){
    let inputValue, cantidadProducto;
    let promptText = "¿Qué producto desea sumar al carrito?\n";
    for( const [i, productoDisponible] of productos.entries()) {
        promptText += i + 1 + ": " + productoDisponible.producto + "(" + productoDisponible.precio + ")\n";
    }

    promptText += "0: Para finalizar la compra\n";

    while(inputValue === undefined || inputValue > productos.length){
        inputValue = parseInt(prompt(promptText))
        console.log("inputValue", inputValue)
    }

    console.log(inputValue);
    if(inputValue === 0) return;

    const productoSeleccionado = productos[inputValue-1]; // 0 index array

    while(!cantidadProducto || cantidadProducto == 0){
        cantidadProducto = parseInt(prompt("Producto seleccionado: " + productoSeleccionado.producto + "\n Indicar la cantidad requerida (sólo números):"));
    }
    const item = new Orden(productoSeleccionado.producto, productoSeleccionado.precio, cantidadProducto);
    carrito.push(item);

    // loop until 0
    ordenColocada();
}

function carritoConfirmado(){
    console.log("pase");
    let alertText = "Resumen de la Orden: \n";
    let totalCompra = 0;
    for(let i = 0; i < carrito.length; i++){
        carrito[i].calcularSubTotal()
        carrito[i].calcularEnvio();
        carrito[i].calcularTotal();
        totalCompra += carrito[i].total;
        alertText += "- " + carrito[i].producto + " x " + carrito[i].cantidad + ": $" + carrito[i].subTotal + "- " + "subTotal IVA: $" + carrito[i].calcularIva()  + "- " + "Costo de Envío: $" + carrito[i].envio + "\n";
    }

    alertText += "\nTotal de la compra final: $" + totalCompra;
    alert(alertText);
}

alert("Estamos listos para tu compra!!!");

ordenColocada();
carritoConfirmado();
