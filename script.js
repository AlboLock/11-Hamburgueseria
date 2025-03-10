let pedidos = [];
let numeroPedido = 0;
window.onload = function () {
    pedidos = JSON.parse(localStorage.getItem('pedidos'));
    numeroPedido = localStorage.getItem('numeroPedido');
    pedidos[numeroPedido] = null;
    if (pedidos == null){
        pedidos = [];
        numeroPedido = 0;
    } else {
        for (let i=0; i<pedidos.length; i++){
            if (pedidos[i] != null && pedidos[i].alimentos != null){
                for (let j = 0; j < pedidos[i].alimentos.length; j++) {
                    let item = pedidos[i].alimentos[j];
                    if (item.tipo == 'burger' || item.tipo == 'perrito' || item.tipo == 'bocadillo') {
                        Object.setPrototypeOf(item, Comida.prototype);
                    }
                    if (item.tipo == 'ensalada' || item.tipo == 'patatas' || item.tipo == 'arosCebolla') {
                        Object.setPrototypeOf(item, Complemento.prototype);
                    }
                    if (item.tipo == 'agua' || item.tipo == 'cerveza' || item.tipo == 'refrescos') {
                        Object.setPrototypeOf(item, Bebida.prototype);
                    }
                }
                anadirAPedidoRealizado(pedidos[i], i, pedidos[i].tiempo, 'old');
            }
        }
    }
}

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
    if (!pedidos[numeroPedido]) {
        pedidos[numeroPedido] = { alimentos: [], tiempo: 0 };
    }
    if (pedidos[numeroPedido].alimentos.length < 50){
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
    } else {
        document.getElementById('error-backgound').style.display = 'flex';
        setTimeout(closeError, 2000);
    }
    
}

function closeError(){
    document.getElementById('error-backgound').style.display = 'none';
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
    document.body.style.overflow = 'hidden';
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
    pedidos[numeroPedido].alimentos.push(comida);
    document.getElementById('modifyWindow').style.display = 'none';
    document.body.style.overflow = 'auto';
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
            pedidos[numeroPedido] = { alimentos: [], tiempo: 0 };
        }
        if (pedidos[numeroPedido].alimentos.length < 50){
            pedidos[numeroPedido].alimentos.push(nuevoComplemento);
            calcularPrecioTotalPedido();
            actualizarPantallaPedido();
        } else {
            document.getElementById('error-backgound').style.display = 'flex';
            setTimeout(closeError, 2000);
        }
}

// Añadir y quitar bebidas

function anadirBebida(tipo, bebida) {
        let precio = preciosBebidas[bebida];  // Busca el precio en el objeto
        let nuevaBebida = new Bebida(tipo, bebida, precio);
        if (!pedidos[numeroPedido]) {
            pedidos[numeroPedido] = { alimentos: [], tiempo: 0 };
        }
        if (pedidos[numeroPedido].alimentos.length < 50){
            pedidos[numeroPedido].alimentos.push(nuevaBebida);
        calcularPrecioTotalPedido();
        actualizarPantallaPedido();
    } else {
        document.getElementById('error-backgound').style.display = 'flex';
        setTimeout(closeError, 2000);
    }
}

function calcularPrecioTotalPedido() {
    let precioTotal = 0;
    for (let i = 0; i < pedidos[numeroPedido].alimentos.length; i++) {
        precioTotal += pedidos[numeroPedido].alimentos[i].precio;
    }
    document.getElementById('precioPedidoTotal').innerHTML = `<strong>${precioTotal.toFixed(2)} € </strong>`;
}

function terminarPedido() {
    let tiempoTotal = calcularTiempoPedido(pedidos[numeroPedido].alimentos);
    pedidos[numeroPedido].tiempo =  tiempoTotal;
    anadirAPedidoRealizado(pedidos[numeroPedido], numeroPedido, tiempoTotal, 'new');
    
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    localStorage.setItem('numeroPedido', numeroPedido);
    console.log(pedidos)
    numeroPedido++;
    actualizarPantallaPedido();
}

function anadirAPedidoRealizado(pedido, numeroPedido, tiempoTotal, status) {
    let tiempoBase = 0;
    if (status == 'new'){
        let totalElementos = 0;
        for (let i = 0; i < pedido.alimentos.length; i++) {
            if (pedido.alimentos[i].constructor.name === "Comida" || pedido.alimentos[i].constructor.name === "Complemento") {
                totalElementos++;
            }
        }
        tiempoBase = totalElementos * 30;
    } else {
        tiempoBase = Math.abs(tiempoTotal - tiempoBase);
    }
        let textoPedido = `
        <div class="pedidoDisplay" id="pedido-${numeroPedido}">
            <p><strong>Pedido #${numeroPedido}</strong></p>
            <p>Productos: ${function () {
                let listaComidas = [];
                for (let i = 0; i < pedido.alimentos.length; i++) {
                    if (pedido.alimentos[i].constructor.name == 'Comida')
                        listaComidas.push(pedido.alimentos[i].nombre);
                }
                return listaComidas.length > 0 ? listaComidas.join(', ') : 'N/A';
            }()}
            </p>
            <p>Complementos: ${function () {
                let listaComplementos = [];
            for (let i = 0; i < pedido.alimentos.length; i++) {
                if (pedido.alimentos[i].constructor.name == 'Complemento')
                    listaComplementos.push(pedido.alimentos[i].nombre);
                }
                return listaComplementos.length > 0 ? listaComplementos.join(', ') : 'N/A';
            }()}
            </p>
            <p>Bebidas: ${function () {
                let listaBebidas = [];
            for (let i = 0; i < pedido.alimentos.length; i++) {
                    if (pedido.alimentos[i].constructor.name == 'Bebida')
                        listaBebidas.push(pedido.alimentos[i].nombre);
                }
                return listaBebidas.length > 0 ? listaBebidas.join(', ') : 'N/A';
            }()}
            </p>
            <p id="estado-${numeroPedido}">Estado: Realizado</p>
            <p class="tiempoPedido" id="tiempo-${numeroPedido}">
                <strong>Tiempo restante: ${formatearTiempo(tiempoBase)}</strong>
            </p>
        </div>`;
        document.getElementById('listaPedidosRealizados').innerHTML += textoPedido;
        iniciarCuentaAtras(numeroPedido, tiempoTotal, tiempoBase); // Iniciar temporizador con tiempo total 
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
        for (let i = 0; i < pedidos[numeroPedido].alimentos.length; i++) {
            if (pedidos[numeroPedido].alimentos[i].constructor.name == 'Comida'){
                let comida = pedidos[numeroPedido].alimentos[i];
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
        for (let i = 0; i < pedidos[numeroPedido].alimentos.length; i++) {
            if (pedidos[numeroPedido].alimentos[i].constructor.name == 'Complemento') {
                let complemento = pedidos[numeroPedido].alimentos[i];
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
        for (let i = 0; i < pedidos[numeroPedido].alimentos.length; i++) {
            if (pedidos[numeroPedido].alimentos[i].constructor.name == 'Bebida') {
                let bebida = pedidos[numeroPedido].alimentos[i];
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


function quitarComida(indice) {
    pedidos[numeroPedido].splice(indice, 1);
    calcularPrecioTotalPedido();
    actualizarPantallaPedido();
}

function quitarComplemento(indice) {
    pedidos[numeroPedido].splice(indice, 1);
    calcularPrecioTotalPedido();
    actualizarPantallaPedido();
}

function quitarBebida(indice) {
    pedidos[numeroPedido].splice(indice, 1);
    calcularPrecioTotalPedido();
    actualizarPantallaPedido();
}

// Tiempo preparación


function calcularTiempoPedido(pedido) {
    let totalElementos = 0;
    for (let i = 0; i < pedido.length; i++) {
        if (pedido[i].constructor.name === "Comida" || pedido[i].constructor.name === "Complemento") {
            totalElementos++;
        }
    }
    let tiempoBase = totalElementos * 30; // 30s por alimento
    let tiempoAleatorio = Math.floor(Math.random() * 21) - 10; // ±10s
    return Math.max(30, tiempoBase + tiempoAleatorio); // Mínimo 30s
}


function iniciarCuentaAtras(numeroPedido, tiempoTotal, tiempoBase) {
    let tiempoRestante = tiempoTotal;
    let estadoActual = 'Realizado';
    const tiempoMitad = Math.floor(tiempoTotal / 2);
    let actualizacionContador = 0;
    const intervalo = setInterval(() => {
        tiempoRestante--;
        tiempoBase--;
        actualizacionContador++;
        pedidos[numeroPedido].tiempo = tiempoRestante;
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        const tiempoElement = document.getElementById(`tiempo-${numeroPedido}`);
        const estadoElement = document.getElementById(`estado-${numeroPedido}`);
        const pedidoElement = document.getElementById(`pedido-${numeroPedido}`);

        if (!pedidoElement) {
            clearInterval(intervalo);
            return;
        }

        // Update HTML every 10 seconds
        if (actualizacionContador % 10 === 0) {
            tiempoElement.innerHTML = `<strong>Tiempo restante: ${formatearTiempo(tiempoRestante)}</strong>`;
        }

        if (estadoActual === 'Realizado' && tiempoRestante <= tiempoMitad) {
            estadoActual = 'En proceso';
            estadoElement.textContent = 'Estado: En proceso';
            document.getElementById('listaPedidosEnProceso').appendChild(pedidoElement);
        } else if (estadoActual === 'En proceso' && tiempoRestante <= 0) {
            estadoActual = 'Listo para recoger';
            estadoElement.textContent = 'Estado: Listo para recoger';
            pedidoElement.innerHTML += `<button onclick="recogerPedido(${numeroPedido})">Recoger pedido</button>`;
            document.getElementById('listaPedidosListos').appendChild(pedidoElement);
            document.getElementById(`tiempo-${numeroPedido}`).innerHTML = '';
            clearInterval(intervalo);
        }

        // Manejar retrasos
        if (tiempoRestante > tiempoBase && estadoActual === 'En proceso') {
            clearInterval(intervalo);
            let retraso = 0;
            let calculoRetraso = tiempoRestante - tiempoBase;
            document.getElementById(`tiempo-${numeroPedido}`).innerHTML = `<strong style="color: red">Retraso: ${formatearTiempo(retraso)}</strong>`;
            const retrasoIntervalo = setInterval(() => {
                retraso++;
                document.getElementById(`tiempo-${numeroPedido}`).innerHTML = `<strong style="color: red">Retraso: ${formatearTiempo(retraso)}</strong>`;
                if (retraso == calculoRetraso){
                    estadoActual = 'Listo para recoger';
                    estadoElement.textContent = 'Estado: Listo para recoger';
                    pedidoElement.innerHTML += `<button onclick="recogerPedido(${numeroPedido})">Recoger pedido</button>`;
                    document.getElementById('listaPedidosListos').appendChild(pedidoElement);
                    document.getElementById(`tiempo-${numeroPedido}`).innerHTML = '';
                    clearInterval(retrasoIntervalo);
                }
            }, 1000);
        }
    }, 1000);
}

function formatearTiempo(tiempoEnSegundos) {
    let minutos = Math.floor(tiempoEnSegundos / 60);
    let segundos = tiempoEnSegundos % 60;
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
}

// Función para recoger pedido (ya estaba bien)
function recogerPedido(numeroPedido) {
    const pedidoElement = document.getElementById(`pedido-${numeroPedido}`);
    if (pedidoElement) pedidoElement.remove();
    pedidos[numeroPedido] = null;
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}
