const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('pokemonName');
const searchButton = document.getElementById('search');
let pokemon = []; // Declare the pokemon array as a global variable

const fetchPokemon = async () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    const results = await Promise.all(promises);
    pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
    }));
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const searchPokemon = (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = pokemon.filter((pokeman) =>
        pokeman.name.toLowerCase().includes(searchTerm)
    );
    displayPokemon(filteredPokemon);
};

searchButton.addEventListener('click', searchPokemon);

fetchPokemon();
