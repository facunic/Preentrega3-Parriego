const modoOscuroBtn = document.getElementById("modo-oscuro-btn");
const body = document.body;
const nav = document.querySelector("nav");
const busquedaInput = document.getElementById("busqueda-input");
const cardsContainer = document.getElementById("cards-container");

function showCharacters() {
    const cardsContainer = document.getElementById("cards-container");

    // Limpia el contenedor antes de mostrar los personajes
    cardsContainer.innerHTML = "";

    characters.forEach(character => {
        // Crea una tarjeta para cada personaje y muestra la información
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <button class="add-favorite-button" data-name="${character.name}">Agregar a Favoritos</button>
        `;

        cardsContainer.appendChild(card);
    });
}

function getRickAndMortyData() {
    // Aquí colocas el código para obtener los datos de la API de Rick and Morty
    fetch("https://rickandmortyapi.com/api/character/")
        .then(response => response.json())
        .then(data => {
            // Procesa los datos obtenidos de la API según tus necesidades
            // Por ejemplo, puedes almacenarlos en una variable como "characters"
            characters = data.results;
            // Llama a la función para mostrar los personajes una vez que se cargan
            showCharacters();
        })
        .catch(error => {
            console.log("Error al obtener los datos:", error);
        });
}


document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");

    modoOscuroBtn.addEventListener("click", () => {
        body.classList.toggle("modo-oscuro");
        nav.classList.toggle("modo-oscuro");

        if (body.classList.contains("modo-oscuro")) {
            modoOscuroBtn.src = "../multimedia/bx-moon.png";
            localStorage.setItem("modo-oscuro", "activo");
        } else {
            modoOscuroBtn.src = "../multimedia/bxs-moon.png";
            localStorage.setItem("modo-oscuro", "inactivo");
        }
    });

    const modoOscuroGuardado = localStorage.getItem("modo-oscuro");
    if (modoOscuroGuardado === "activo") {
        body.classList.add("modo-oscuro");
        nav.classList.add("modo-oscuro");
        modoOscuroBtn.src = "../multimedia/bxs-moon.png";
    }

    document.addEventListener("DOMContentLoaded", () => {
        const searchButton = document.getElementById("search-button");

        // ...

        // Event listener para el botón de búsqueda
        searchButton.addEventListener("click", buscarElementos);
    });

    function buscarElementos() {
        const searchTerm = document.getElementById("busqueda-input").value;

        const personajeEncontrado = characters.find(character => character.name.toLowerCase() === searchTerm.toLowerCase());

        if (personajeEncontrado) {
            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = ""; // Limpia el contenedor antes de mostrar el personaje encontrado

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h2>${personajeEncontrado.name}</h2>
                <img src="${personajeEncontrado.image}" alt="${personajeEncontrado.name}">
                <p>Status: ${personajeEncontrado.status}</p>
                <p>Species: ${personajeEncontrado.species}</p>
                <button class="add-favorite-button" data-name="${personajeEncontrado.name}">Agregar a Favoritos</button>
            `;

            cardsContainer.appendChild(card);
        } else {
            // Si el personaje no se encuentra, muestra un mensaje de error
            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = "Personaje no encontrado.";
        }
    }

    let characters = [];

    function mostrarPersonaje(personaje) {
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = "";

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${personaje.name}</h2>
            <img src="${personaje.image}" alt="${personaje.name}">
            <p>Status: ${personaje.status}</p>
            <p>Species: ${personaje.species}</p>
            <button class="add-favorite-button" data-name="${personaje.name}">Agregar a Favoritos</button>
        `;

        cardsContainer.appendChild(card);
    }

    function buscarPersonaje() {
        const searchTerm = document.getElementById("busqueda-input").value.toLowerCase();
        const personajeEncontrado = characters.find(character => character.name.toLowerCase() === searchTerm);

        if (personajeEncontrado) {
            mostrarPersonaje(personajeEncontrado);
        } else {
            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = "Personaje no encontrado.";
        }
    }

    function getRickAndMortyData() {
        fetch("https://rickandmortyapi.com/api/character/")
            .then(response => response.json())
            .then(data => {
                // Almacena los datos en la variable "characters"
                characters = data.results;
            })
            .catch(error => {
                console.log("Error al obtener los datos:", error);
            });
    }

    // Llama a la función para cargar los datos desde la API al cargar la página
    getRickAndMortyData();

    document.getElementById("search-button").addEventListener("click", buscarPersonaje);
}
)

// Variables para gestionar favoritos
const favoritos = [];
const favoritosList = document.getElementById("favoritos-list");

// Agregar un personaje a favoritos
function agregarAFavoritos(personaje) {
    favoritos.push(personaje);
    // Guardar en LocalStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    // Notificar al usuario
    alert("Agregado a favoritos");
}

// Función para agregar un elemento a favoritos
function agregarAFavoritos(elemento) {
    favoritos.push(elemento);
    // Guardar en LocalStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Mostrar un mensaje de confirmación
    alert(`Se ha añadido "${elemento.nombre}" a tus Favoritos.`);

    // Redirigir a la página de Favoritos
    window.location.href = "favoritos.html";
}


// Eliminar un personaje de favoritos
function eliminarDeFavoritos(nombre) {
    const indice = favoritos.findIndex(personaje => personaje.name === nombre);
    if (indice !== -1) {
        favoritos.splice(indice, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    }
}

// Event listener para el botón "Agregar a Favoritos" en las tarjetas
document.addEventListener("click", event => {
    if (event.target.classList.contains("add-favorite-button")) {
        const nombre = event.target.getAttribute("data-name");
        const personaje = characters.find(character => character.name === nombre);
        if (personaje) {
            agregarAFavoritos(personaje);
        }
    }
});


