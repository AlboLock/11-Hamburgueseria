function Comida(nombre, precio, ingredientes){
    this.nombre = nombre;
    this.precio = precio;
    this.ingredientes = ingredientes;
}

function anadirComida(comida){
    switch (comida){
        case 'burger':
            let burger = new Comida('burger', 5, ['Pan', 'carne', 'lechuga', 'tomate', 'queso']);
            break;
        case 'perritoCaliente':
            let perrito = new Comida('perrito', 3.50, ['Pan', 'salchicha', 'kétchup', 'mostaza']);
            break;
        case 'bocadillo':
            let bocadillo = new Comida('bocadillo', 4, ['Pan', 'jamón', 'queso', 'tomate']);
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

function abrirVentanaModificar(){
    document.getElementById('modifyWindow').style.display = 'flex';
}

