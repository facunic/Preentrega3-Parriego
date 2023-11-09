// Variables para gestionar favoritos
const favoritos = [];
const favoritosList = document.getElementById("favoritos-list");

// Función para agregar un elemento a favoritos
function agregarAFavoritos(elemento) {
    favoritos.push(elemento);
    // Guardar en LocalStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    // Mostrar la lista actualizada
    mostrarFavoritos();
}

// Función para mostrar favoritos en la lista
function mostrarFavoritos() {
    favoritosList.innerHTML = "";

    // Ordenar favoritos por nombre en orden ascendente
    favoritos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    favoritos.forEach(elemento => {
        const favoritoCard = document.createElement("div");
        favoritoCard.className = "favorito-card"; // Puedes ajustar las clases según tu CSS
        favoritoCard.innerHTML = `
            <h2>${elemento.nombre}</h2>
            <!-- Aquí puedes agregar más información sobre el elemento -->
            <button class="remove-favorite-button" data-name="${elemento.nombre}">Eliminar</button>
        `;
        favoritosList.appendChild(favoritoCard);
    });
}

// Función para eliminar un elemento de favoritos
function eliminarDeFavoritos(nombre) {
    const indice = favoritos.findIndex(elemento => elemento.nombre === nombre);
    if (indice !== -1) {
        favoritos.splice(indice, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    }
}

// Función para eliminar todas las tarjetas favoritas
function eliminarTodosLosFavoritos() {
    favoritos.length = 0;
    localStorage.removeItem("favoritos");
    favoritosList.innerHTML = ""; // Limpia la lista
}

// Event listener para el botón "Eliminar de Favoritos"
favoritosList.addEventListener("click", event => {
    if (event.target.classList.contains("remove-favorite-button")) {
        const nombre = event.target.getAttribute("data-name");
        eliminarDeFavoritos(nombre);
    }
});

// Cargar elementos favoritos desde LocalStorage al cargar la página de Favoritos
window.addEventListener("load", () => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    if (favoritosGuardados) {
        favoritos = JSON.parse(favoritosGuardados);
        mostrarFavoritos();
    }
});

// Event listener para el botón "Eliminar Todos"
document.getElementById("eliminar-todos").addEventListener("click", () => {
    eliminarTodosLosFavoritos();
});

// Event listener para el botón "Ordenar Ascendente"
document.getElementById("ordenar-ascendente").addEventListener("click", () => {
    favoritos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarFavoritos();
});

// Event listener para el botón "Ordenar Descendente"
document.getElementById("ordenar-descendente").addEventListener("click", () => {
    favoritos.sort((a, b) => b.nombre.localeCompare(a.nombre));
    mostrarFavoritos();
});


