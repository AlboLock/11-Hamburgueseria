let pedidos = [];
let pedidoCurriente = 0;

function Comida(tipo, nombre, precioBase, ingredientesBase){
    this.tipo = tipo;
    this.nombre = nombre;
    this.precioBase = precioBase;
    this.precioTotal = precioBase;
    this.ingredientesBase = ingredientesBase;
    this.ingredientesExtra = [];
    this.complementos = [];
    this.anadirExtra = function(ingrediente){
                            this.ingredientesExtra.push(ingrediente);
                            this.precioTotal += 0.5
                            pintarVentanaModificar(this);
                        }
    this.quitarExtra = function(ingrediente){
                            let index = this.ingredientesExtra.indexOf(ingrediente);
                            if (index != -1) {
                                this.ingredientesExtra.splice(index, 1);
                                this.precioTotal -= 0.5
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
    document.getElementById('precioTotalPedido').innerHTML = `${comida.precioTotal.toFixed(2)} €`;

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
    document.getElementById('confirmarPedido').setAttribute('onclick', `anadirACarrito(${comida})`);
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