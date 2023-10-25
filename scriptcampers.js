let clientes = [];

function generarID() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function actualizarLista() {
    const lista = document.getElementById("clientesLista");
    lista.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const listItem = document.createElement("div");
        listItem.className = "cliente-item";
        listItem.innerHTML = `
            <strong>ID:</strong> ${cliente.id}<br>
            <strong>Nombre:</strong> ${cliente.nombre}<br>
            <strong>Apellido:</strong> ${cliente.apellido}<br>
            <strong>Edad:</strong> ${cliente.edad}<br>
            <strong>Correo:</strong> ${cliente.correo}<br>
            <strong>CampCoins:</strong> ${cliente.puntos}<br>
            <button type="button" onclick="eliminarCliente(${index})">Eliminar</button>
        `;
        lista.appendChild(listItem);
    });
}

function buscarClientePorNombre(nombre) {
    return clientes.find(cliente => cliente.nombre === nombre);
}

function agregarCliente() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const correo = document.getElementById("correo").value;
    const puntos = document.getElementById("puntos").value;

    const correoValido = /^\S+@\S+\.(com|es)$/.test(correo);

    if (!nombre || !apellido || !edad || !correoValido) {
        alert("Por favor, complete todos los campos y verifique el formato del correo.");
        return;
    }

    if (buscarClientePorNombre(nombre)) {
        alert("El nombre de cliente ya existe.");
        return;
    }

    const cliente = {
        id: generarID(),
        nombre,
        apellido,
        edad,
        correo,
        puntos
    };

    clientes.push(cliente);
    actualizarLista();
    guardarClientesEnLocalStorage();
    document.getElementById("clienteForm").reset();
}

function eliminarCliente(index) {
    if (confirm("¿Seguro que deseas eliminar este camper?")) {
        clientes.splice(index, 1);
        actualizarLista();
        guardarClientesEnLocalStorage();
    }
}

function cargarClienteParaModificar(index) {
    const cliente = clientes[index];
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("edad").value = cliente.edad;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("puntos").value = cliente.puntos;
    document.getElementById("clienteIndex").value = index;
}

function guardarClientesEnLocalStorage() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Cargar clientes del Local Storage al iniciar la página
if (localStorage.getItem("clientes")) {
    clientes = JSON.parse(localStorage.getItem("clientes"));
    actualizarLista();
}