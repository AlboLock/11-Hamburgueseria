let pedidos = [];
let numeroPedido = 0;

function Comida(tipo, nombre, precioBase, ingredientesBase) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.precioBase = precioBase;
    this.precio = precioBase;
    this.ingredientesBase = ingredientesBase;
    this.ingredientesExtra = [];
    this.anadirExtra = function (ingrediente) {
        this.ingredientesExtra.push(ingrediente);
        this.precio += 0.5
        pintarVentanaModificar(this);
    }
    this.quitarExtra = function (ingrediente) {
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
    switch (comida) {
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

function pintarVentanaModificar(comida) {
    document.getElementById('modifyWindow').style.display = 'flex';
    document.getElementById('modificarImg').src = `media/${comida.tipo}.png`;
    document.getElementById('modificarNombre').innerHTML = `${comida.nombre}`;
    document.getElementById('modificarIngBase').innerHTML = `Ingredientes: ${comida.ingredientesBase.join(', ')}`;
    document.getElementById('detailsNombre').innerHTML = `${comida.nombre}`;
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
    document.getElementById('confirmarPedido').onclick = function () { anadirACarrito(comida); };
}

function anadirACarrito(comida) {
    if (!pedidos[numeroPedido]) {
        pedidos[numeroPedido] = [];
    }
    pedidos[numeroPedido].push(comida);
    document.getElementById('modifyWindow').style.display = 'none';
    calcularPrecioTotalPedido();
    actualizarPantallaPedido()
}

function numeroExtras(comida, extra) {
    let total = 0;
    for (let i = 0; i < comida.ingredientesExtra.length; i++) {
        if (comida.ingredientesExtra[i] == extra) {
            total++;
        }
    }
    return total;
}

function fillExtrasList(comida) {
    let precioExtras = 0;
    document.getElementById('ulExtras').innerHTML = '';
    for (let i = 0; i < comida.ingredientesExtra.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `${comida.ingredientesExtra[i]} <span>0.50 €</span>`;
        document.getElementById('ulExtras').appendChild(li);
        precioExtras += 0.5;
    }
    document.getElementById('precioTotalExtras').innerHTML = `<div>Total: ${precioExtras.toFixed(2)} €</div>`
}


// Constructores Complementos y Bebidas

function Complemento(tipo, nombre, precio) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio = precio;
}

function Bebida(tipo, nombre, precio) {
    this.tipo = tipo;
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

function anadirComplemento(tipo, complemento) {
    let precio = preciosComplementos[complemento];  // Busca el precio en el objeto
    let nuevoComplemento = new Complemento(tipo, complemento, precio);
    if (!pedidos[numeroPedido]) {
        pedidos[numeroPedido] = [];
    }
    pedidos[numeroPedido].push(nuevoComplemento);
    calcularPrecioTotalPedido();
    actualizarPantallaPedido();
    //numeroPedido.precioTotal += precio;

}

// Añadir y quitar bebidas

function anadirBebida(tipo, bebida) {
    let precio = preciosBebidas[bebida];  // Busca el precio en el objeto
    let nuevaBebida = new Bebida(tipo, bebida, precio);
    if (!pedidos[numeroPedido]) {
        pedidos[numeroPedido] = [];
    }
    pedidos[numeroPedido].push(nuevaBebida);
    calcularPrecioTotalPedido();
    actualizarPantallaPedido();
}

function calcularPrecioTotalPedido() {
    let precioTotal = 0;
    for (let i = 0; i < pedidos[numeroPedido].length; i++) {
        precioTotal += pedidos[numeroPedido][i].precio;
    }
    document.getElementById('precioPedidoTotal').innerHTML = `<strong>${precioTotal} € </strong>`;
}

function terminarPedido() {
    anadirAPedidoRealizado(pedidos[numeroPedido], numeroPedido);
    numeroPedido++;
    actualizarPantallaPedido();
}

function anadirAPedidoRealizado(pedido, numeroPedido) {
    let textoPedido = '';
    textoPedido += `<div class="pedidoDisplay">
                        <p><strong>Pedido #${numeroPedido}</strong></p>
                        <p>Productos: ${function () {
                                        let listaComidas = [];
                                        for (let i = 0; i < pedido.length; i++) {
                                            if (pedido[i].constructor.name == 'Comida')
                                                listaComidas.push(pedido[i].nombre);
                                        }
                                        return listaComidas.join(', ');
                                    }()}
                        </p>
                        <p>Complementos: ${function () {
                                            let listaComplementos = [];
                                            for (let i = 0; i < pedido.length; i++) {
                                                if (pedido[i].constructor.name == 'Complemento')
                                                    listaComplementos.push(pedido[i].nombre)
                                            }
                                            return listaComplementos.join(', ');
                                        }()}
                        </p>
                        <p>Bebidas: ${function () {
                                        let listaBebidas = [];
                                        for (let i = 0; i < pedido.length; i++) {
                                            if (pedido[i].constructor.name == 'Bebida')
                                                listaBebidas.push(pedido[i].nombre);
                                        }
                                        return listaBebidas.join(', ');
                                    }()}
                        </p>
                        <p>Estado: Realizado</p>
                    </div>`;
    document.getElementById('listaPedidosRealizados').innerHTML += textoPedido;
}

function actualizarPantallaPedido() {
    let listaPedido = document.getElementById("listaPedido");
    let contenidoPedido = document.getElementById("contenidoPedido");
    let logo = document.getElementById("logoEmpresa");
    let mensajeBienvenida = document.getElementById("mensajeBienvenida");
    let mensajeHacerPedido = document.getElementById("mensajeHacerPedido");

    // Verificar si hay algo en el pedido
    if (pedidos[numeroPedido]) {
        listaPedido.innerHTML = "";
        contenidoPedido.style.display = "block";
        logo.style.display = "none";
        mensajeBienvenida.style.display = "none";
        mensajeHacerPedido.style.display = "none";

        // Mostrar todas las comidas
        for (let i = 0; i < pedidos[numeroPedido].length; i++) {
            if (pedidos[numeroPedido][i].constructor.name == 'Comida'){
                let comida = pedidos[numeroPedido][i];
                let li = document.createElement("li");
                li.classList.add("itemPedido");
                li.innerHTML = `
                                <img src="media/${comida.tipo}.png" class="miniaturaProducto">
                                <span>${comida.nombre} - ${comida.precio.toFixed(2)} €</span>
                                <img src="media/papelera.png" alt="Eliminar" class="iconoEliminar" onclick="quitarComida(${i})">
                                `;
                listaPedido.appendChild(li);
            }
        }

        // Mostrar complementos
        for (let i = 0; i < pedidos[numeroPedido].length; i++) {
            if (pedidos[numeroPedido][i].constructor.name == 'Complemento') {
                let complemento = pedidos[numeroPedido][i];
                let li = document.createElement("li");
                li.classList.add("itemPedido");
                li.innerHTML = `
                                <img src="media/${complemento.tipo}.png" class="miniaturaProducto" alt="${complemento.nombre}">
                                <span>${complemento.nombre} - ${complemento.precio.toFixed(2)} €</span>
                                <img src="media/papelera.png" alt="Eliminar" class="iconoEliminar" onclick="quitarComplemento(${i})">
                            `;
                listaPedido.appendChild(li);
            }
        }
        
        // Mostrar bebidas
        for (let i = 0; i < pedidos[numeroPedido].length; i++) {
            if (pedidos[numeroPedido][i].constructor.name == 'Bebida') {
                let bebida = pedidos[numeroPedido][i];
                let li = document.createElement("li");
                li.classList.add("itemPedido");
                li.innerHTML = `
                <img src="media/${bebida.tipo}.png" class="miniaturaProducto" alt="${bebida.nombre}">
                <span>${bebida.nombre} - ${bebida.precio.toFixed(2)} €</span>
                <img src="media/papelera.png" alt="Eliminar" class="iconoEliminar" onclick="quitarBebida(${i})">
            `;
                listaPedido.appendChild(li);
            }
        }
        } else {
            // Si el pedido está vacío, volver a mostrar el logo y los mensajes
            contenidoPedido.style.display = "none";
            logo.style.display = "block";
            mensajeBienvenida.style.display = "block";
            mensajeHacerPedido.style.display = "block";
        }
    } 

// function quitarComida(indice) {
//     numeroPedido.precioTotal -= numeroPedido.comida[indice].precio; 
//     numeroPedido.comida.splice(indice, 1); 
//     actualizarPantallaPedido();
// }


// function quitarComplemento(indice) {
//     numeroPedido.precioTotal -= numeroPedido.complementos[indice].precio;
//     numeroPedido.complementos.splice(indice, 1);
//     actualizarPantallaPedido();
// }

// function quitarBebida(indice) {
//     numeroPedido.precioTotal -= numeroPedido.bebidas[indice].precio;
//     numeroPedido.bebidas.splice(indice, 1);
//     actualizarPantallaPedido();
// }

// function formatearNombreArchivo(nombre) {
//     return nombre.replace(/\s+/g, "").replace(/[^\w.-]/g, ""); // Elimina espacios y caracteres especiales
// }
