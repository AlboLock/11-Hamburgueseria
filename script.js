let pedidos = [];
let pedidoEnCurso = {
    comida: [],
    complementos: [],
    bebidas: [],
    precioTotal: 0
};


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
function anadirComida(comida) {
    let nuevaComida;

    switch (comida) {
        case 'burger':
            nuevaComida = new Comida('burger', 'The Luck Burger', 5, ['Pan', 'Carne', 'Lechuga', 'Tomate', 'Queso']);
            break;
        case 'perrito':
            nuevaComida = new Comida('perrito', 'Hot Dog Rivas', 3.50, ['Pan', 'Salchicha', 'Kétchup', 'Mostaza']);
            break;
        case 'bocadillo':
            nuevaComida = new Comida('bocadillo', 'Panino Lucchetti Speciale', 4, ['Pan', 'Jamón', 'Queso', 'Tomate']);
            break;
    }

    pedidoEnCurso.comida.push(nuevaComida);
    pedidoEnCurso.precioTotal += nuevaComida.precioBase;
    actualizarPantallaPedido();
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
    document.getElementById('modificarImg').src = `media/${formatearNombreArchivo(comida.nombre)}.png`;
    document.getElementById('modificarNombre').innerHTML = `${comida.nombre}`;
    document.getElementById('modificarIngBase').innerHTML = `Ingredientes: ${comida.ingredientesBase.join(', ')}`;
    document.getElementById('detailsNombre').innerHTML = `${comida.nombre}`;
    document.getElementById('detailsPrecioBase').innerHTML = `${comida.precioBase.toFixed(2)} €`;
    document.getElementById('precioTotalPedido').innerHTML = `${comida.precio.toFixed(2)} €`;
    
    // Quitar extra
    document.getElementById('quitarExtraBacon').setAttribute('onclick', `comida.quitarExtra('Bacon')`);
    document.getElementById('quitarExtraCebolla').setAttribute('onclick', `comida.quitarExtra('Cebolla caramelizada')`);
    document.getElementById('quitarExtraHuevo').setAttribute('onclick', `comida.quitarExtra('Huevo frito')`);
    document.getElementById('quitarExtraChampi').setAttribute('onclick', `comida.quitarExtra('Champiñones')`);
    document.getElementById('quitarExtraJalap').setAttribute('onclick', `comida.quitarExtra('Jalapeños')`);
    document.getElementById('quitarExtraMayo').setAttribute('onclick', `comida.quitarExtra('Mayonesa especial')`);

    //Añadir extra
    document.getElementById('anadirExtraBacon').setAttribute('onclick', `comida.anadirExtra('Bacon')`);
    document.getElementById('anadirExtraCebolla').setAttribute('onclick', `comida.anadirExtra('Cebolla caramelizada')`);
    document.getElementById('anadirExtraHuevo').setAttribute('onclick', `comida.anadirExtra('Huevo frito')`);
    document.getElementById('anadirExtraChampi').setAttribute('onclick', `comida.anadirExtra('Champiñones')`);
    document.getElementById('anadirExtraJalap').setAttribute('onclick', `comida.anadirExtra('Jalapeños')`);
    document.getElementById('anadirExtraMayo').setAttribute('onclick', `comida.anadirExtra('Mayonesa especial')`);

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
    document.getElementById('precioTotalExtras').innerHTML = `<div>Total: ${precioExtras.toFixed(2)} €</div>`;
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
    let precio = preciosComplementos[complemento];
    pedidoEnCurso.complementos.push(new Complemento(complemento, precio));
    pedidoEnCurso.precioTotal += precio;
    actualizarPantallaPedido();
}

function quitarComplemento(complemento) {
    for (let i = 0; i < pedidoEnCurso.complementos.length; i++) {
        if (pedidoEnCurso.complementos[i].nombre === complemento) {
            pedidoEnCurso.precioTotal -= pedidoEnCurso.complementos[i].precio;
            pedidoEnCurso.complementos.splice(i, 1);
            break;
        }
    }
    actualizarPantallaPedido();
}

// Añadir y quitar bebidas

function anadirBebida(bebida) {
    let precio = preciosBebidas[bebida];
    pedidoEnCurso.bebidas.push(new Bebida(bebida, precio));
    pedidoEnCurso.precioTotal += precio;
    actualizarPantallaPedido();
}

function quitarBebida(bebida) {
    for (let i = 0; i < pedidoEnCurso.bebidas.length; i++) {
        if (pedidoEnCurso.bebidas[i].nombre === bebida) {
            pedidoEnCurso.precioTotal -= pedidoEnCurso.bebidas[i].precio;
            pedidoEnCurso.bebidas.splice(i, 1);
            break;
        }
    }
    actualizarPantallaPedido();
}

function calcularPrecioTotalPedido(){
    let precioTotal = 0;

    pedidoEnCurso.comida.forEach(comida => precioTotal += comida.precio);
    pedidoEnCurso.complementos.forEach(complemento => precioTotal += complemento.precio);
    pedidoEnCurso.bebidas.forEach(bebida => precioTotal += bebida.precio);

    document.getElementById('precioPedidoTotal').innerHTML = <strong>${precioTotal.toFixed(2)} € </strong>;
}




function actualizarPantallaPedido() {
    let listaPedido = document.getElementById("listaPedido");
    let contenidoPedido = document.getElementById("contenidoPedido");
    let logo = document.getElementById("logoEmpresa");
    let mensajeBienvenida = document.getElementById("mensajeBienvenida");
    let mensajeHacerPedido = document.getElementById("mensajeHacerPedido");

    // Verificar si hay algo en el pedido
    if (pedidoEnCurso.comidas.length > 0 || pedidoEnCurso.complementos.length > 0 || pedidoEnCurso.bebidas.length > 0) {
        listaPedido.innerHTML = "";
        contenidoPedido.style.display = "block";
        logo.style.display = "none";
        mensajeBienvenida.style.display = "none";
        mensajeHacerPedido.style.display = "none";

        // Mostrar todas las comidas
        for (let i = 0; i < pedidoEnCurso.comida.length; i++) {
            let comida = pedidoEnCurso.comida[i];
            let li = document.createElement("li");
            li.classList.add("itemPedido");
            li.innerHTML = `
                <img src="media/${formatearNombreArchivo(comida.nombre)}.png" class="miniaturaProducto" alt="${comida.nombre}">
                <span>${comida.nombre} - ${comida.precio.toFixed(2)} €</span>
                <img src="media/papelera.png" alt="Eliminar" class="iconoEliminar" onclick="quitarComida(${i})">
            `;
            listaPedido.appendChild(li);
        }
        

        // Mostrar complementos
        for (let i = 0; i < pedidoEnCurso.complementos.length; i++) {
            let complemento = pedidoEnCurso.complementos[i];
            let li = document.createElement("li");
            li.classList.add("itemPedido");
            li.innerHTML = `
                <img src="media/${complemento.nombre}.png" class="miniaturaProducto" alt="${complemento.nombre}">
                <span>${complemento.nombre} - ${complemento.precio.toFixed(2)} €</span>
                <img src="media/papelera.png" alt="Eliminar" class="iconoEliminar" onclick="quitarComplemento(${i})">
            `;
            listaPedido.appendChild(li);
        }
        
        // Mostrar bebidas
        for (let i = 0; i < pedidoEnCurso.bebidas.length; i++) {
            let bebida = pedidoEnCurso.bebidas[i];
            let li = document.createElement("li");
            li.classList.add("itemPedido");
            li.innerHTML = `
                <img src="media/${bebida.nombre}.png" class="miniaturaProducto" alt="${bebida.nombre}">
                <span>${bebida.nombre} - ${bebida.precio.toFixed(2)} €</span>
                <img src="media/papelera.png" alt="Eliminar" class="iconoEliminar" onclick="quitarBebida(${i})">
            `;
            listaPedido.appendChild(li);
        }
        
        calcularPrecioTotalPedido();
        } else {
            // Si el pedido está vacío, volver a mostrar el logo y los mensajes
            contenidoPedido.style.display = "none";
            logo.style.display = "block";
            mensajeBienvenida.style.display = "block";
            mensajeHacerPedido.style.display = "block";
        }
    } 

function quitarComida(indice) {
    pedidoEnCurso.precioTotal -= pedidoEnCurso.comida[indice].precio; 
    pedidoEnCurso.comida.splice(indice, 1); 
    actualizarPantallaPedido();
}


function quitarComplemento(indice) {
    pedidoEnCurso.precioTotal -= pedidoEnCurso.complementos[indice].precio;
    pedidoEnCurso.complementos.splice(indice, 1);
    actualizarPantallaPedido();
}

function quitarBebida(indice) {
    pedidoEnCurso.precioTotal -= pedidoEnCurso.bebidas[indice].precio;
    pedidoEnCurso.bebidas.splice(indice, 1);
    actualizarPantallaPedido();
}

function formatearNombreArchivo(nombre) {
    return nombre.replace(/\s+/g, "").replace(/[^\w.-]/g, ""); // Elimina espacios y caracteres especiales
}
