let pedidos = [];
let pedidoEnCurso = 0;

function Comida(tipo, nombre, precioBase, ingredientesBase){
    this.tipo = tipo;
    this.nombre = nombre;
    this.precioBase = precioBase;
    this.precio = precioBase;
    this.ingredientesBase = ingredientesBase;
    this.ingredientesExtra = [];
    this.anadirExtra = function(ingrediente){
                            this.ingredientesExtra.push(ingrediente);
                            this.precio += 0.5
                            pintarVentanaModificar(this);
                        }
    this.quitarExtra = function(ingrediente){
                            let index = this.ingredientesExtra.indexOf(ingrediente);
                            if (index != -1) {
                                this.ingredientesExtra.splice(index, 1);
                                this.precio -= 0.5
                                pintarVentanaModificar(this);
                            }
                        }
}

let burger;
let perrito;
let bocadillo;
function anadirComida(comida){
    switch (comida){
        case 'burger':
            burger = new Comida('burger', 'The Luck Burger', 5, ['Pan', 'Carne', 'Lechuga', 'Tomate', 'Queso']);
            pintarVentanaModificar(burger)
            break;
        case 'perrito':
            perrito = new Comida('perrito', 'Hot Dog Rivas', 3.50, ['Pan', 'Salchicha', 'Kétchup', 'Mostaza']);
            pintarVentanaModificar(perrito)
            break;
        case 'bocadillo':
            bocadillo = new Comida('bocadillo', 'Panino Lucchetti Speciale', 4, ['Pan', 'Jamón', 'Queso', 'Tomate']);
            pintarVentanaModificar(bocadillo)
            break;
    }
}

function toggleExtras(idExpandable, header) {
    let expandable = document.getElementById(idExpandable);
    header.classList.toggle('extended');
    if (expandable.style.height == 0)
        expandable.style.height = expandable.scrollHeight + 'px';
    else
        expandable.style.height = null;
}

function pintarVentanaModificar(comida){
    document.getElementById('modifyWindow').style.display = 'flex';
    document.getElementById('modificarImg').src = `media/${comida.nombre}.png`;
    document.getElementById('modificarNombre').innerHTML = `${comida.nombre }`;
    document.getElementById('modificarIngBase').innerHTML = `Ingredientes: ${comida.ingredientesBase.join(', ') }`;
    document.getElementById('detailsNombre').innerHTML = `${comida.nombre }`;
    document.getElementById('detailsPrecioBase').innerHTML = `${comida.precioBase.toFixed(2)} €`;
    document.getElementById('precioTotalPedido').innerHTML = `${comida.precio.toFixed(2)} €`;

    // Quitar extra
    document.getElementById('quitarExtraBacon').setAttribute('onclick', `${comida.tipo}.quitarExtra('Bacon')`);
    document.getElementById('quitarExtraCebolla').setAttribute('onclick', `${comida.tipo}.quitarExtra('Cebolla caramelizada')`);
    document.getElementById('quitarExtraHuevo').setAttribute('onclick', `${comida.tipo}.quitarExtra('Huevo frito')`);
    document.getElementById('quitarExtraChampi').setAttribute('onclick', `${comida.tipo}.quitarExtra('Champiñones')`);
    document.getElementById('quitarExtraJalap').setAttribute('onclick', `${comida.tipo}.quitarExtra('Jalapeños')`);
    document.getElementById('quitarExtraMayo').setAttribute('onclick', `${comida.tipo}.quitarExtra('Mayonesa especial')`);

    //Añadir extra
    document.getElementById('anadirExtraBacon').setAttribute('onclick', `${comida.tipo}.anadirExtra('Bacon')`);
    document.getElementById('anadirExtraCebolla').setAttribute('onclick', `${comida.tipo}.anadirExtra('Cebolla caramelizada')`);
    document.getElementById('anadirExtraHuevo').setAttribute('onclick', `${comida.tipo}.anadirExtra('Huevo frito')`);
    document.getElementById('anadirExtraChampi').setAttribute('onclick', `${comida.tipo}.anadirExtra('Champiñones')`);
    document.getElementById('anadirExtraJalap').setAttribute('onclick', `${comida.tipo}.anadirExtra('Jalapeños')`);
    document.getElementById('anadirExtraMayo').setAttribute('onclick', `${comida.tipo}.anadirExtra('Mayonesa especial')`);

    // Cuenta extra
    document.getElementById('numeroBacon').innerHTML = numeroExtras(comida, 'Bacon');
    document.getElementById('numeroCebolla').innerHTML = numeroExtras(comida, 'Cebolla caramelizada');
    document.getElementById('numeroHuevo').innerHTML = numeroExtras(comida, 'Huevo frito');
    document.getElementById('numeroChampi').innerHTML = numeroExtras(comida, 'Champiñones');
    document.getElementById('numeroJalap').innerHTML = numeroExtras(comida, 'Jalapeños');
    document.getElementById('numeroMayo').innerHTML = numeroExtras(comida, 'Mayonesa especial');

    fillExtrasList(comida);
    document.getElementById('confirmarPedido').onclick = function () {anadirACarrito(comida);};
}

function anadirACarrito(comida){
    if (!pedidos[pedidoEnCurso]){
        pedidos[pedidoEnCurso] = [];
    }
    pedidos[pedidoEnCurso].push(comida);
    document.getElementById('modifyWindow').style.display = 'none';
    calcularPrecioTotalPedido();
    console.log(pedidos)
}

function numeroExtras(comida, extra){
    let total = 0;
    for (let i = 0; i < comida.ingredientesExtra.length; i++) {
        if (comida.ingredientesExtra[i] == extra) {
            total++;
        }
    }
    return total;
}

function fillExtrasList(comida){
    let precioExtras = 0;
    document.getElementById('ulExtras').innerHTML = '';
    for (let i=0; i<comida.ingredientesExtra.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `${comida.ingredientesExtra[i]} <span>0.50 €</span>`;
        document.getElementById('ulExtras').appendChild(li);
        precioExtras += 0.5;
    }
    document.getElementById('precioTotalExtras').innerHTML = `<div>Total: ${precioExtras.toFixed(2)} €</div>`
}


// Constructores Complementos y Bebidas

function Complemento(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

function Bebida(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

const preciosComplementos = {
    "Fresh & Fit Salad": 1.50,
    "Crunchy Fries": 2.00,
    "Onion Gold Rings": 2.50
};

const preciosBebidas = {
    "H2O Premium": 1.00,
    "Heineken Ice Gold Sin Alcohol": 2.00,
    "Soft Drinks Selection": 1.50
};


// Añadir y quitar complementos 

function anadirComplemento(complemento) {
    let precio = preciosComplementos[complemento];  // Busca el precio en el objeto
    let nuevoComplemento = new Complemento(complemento, precio);
    if (!pedidos[pedidoEnCurso]) {
        pedidos[pedidoEnCurso] = [];
    }
    pedidos[pedidoEnCurso].push(nuevoComplemento);
    console.log(pedidos)
    calcularPrecioTotalPedido();
    //pedidoEnCurso.precioTotal += precio;
    
}

function quitarComplemento(complemento) {
    for (let i = 0; i < pedidoEnCurso.complementos.length; i++) {
        if (pedidoEnCurso.complementos[i].nombre === complemento) {
            pedidoEnCurso.precioTotal -= pedidoEnCurso.complementos[i].precio;
            pedidoEnCurso.complementos.splice(i, 1);
        }
    }
}

// Añadir y quitar bebidas

function anadirBebida(bebida) {
    let precio = preciosBebidas[bebida];  // Busca el precio en el objeto
    let nuevaBebida = new Bebida(bebida, precio);
    if (!pedidos[pedidoEnCurso]) {
        pedidos[pedidoEnCurso] = [];
    }
    pedidos[pedidoEnCurso].push(nuevaBebida);
    calcularPrecioTotalPedido();
    console.log(pedidos)
}

function quitarBebida(bebida) {
    for (let i = 0; i < pedidoEnCurso.bebidas.length; i++) {
        if (pedidoEnCurso.bebidas[i].nombre === bebida) {
            pedidoEnCurso.precioTotal -= pedidoEnCurso.bebidas[i].precio;
            pedidoEnCurso.bebidas.splice(i, 1);
        }
    }
}

function calcularPrecioTotalPedido(){
    let precioTotal = 0;
    for (let i = 0; i < pedidos[pedidoEnCurso].length; i++) {
        precioTotal += pedidos[pedidoEnCurso][i].precio;
    }
    document.getElementById('precioPedidoTotal').innerHTML = `<strong>${precioTotal} € </strong>`;
}