const pokemonName = document.querySelector('.pokemon__nome');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');
const typeButtons = document.querySelectorAll('.pokemon-type-button');

const form = document.querySelector('.form');
const input = document.querySelector('.pesquise');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonHeight.innerHTML = '';
  pokemonWeight.innerHTML = '';
  pokemonImage.style.display = 'none';
  
  const data = await fetchPokemon(pokemon);
  
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${data.id}`;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
    pokemonHeight.innerHTML = `Height: ${data.height / 10} m`;
    pokemonWeight.innerHTML = `Weight: ${data.weight / 10} kg`;

    // Reset all type buttons
    typeButtons.forEach(button => button.style.display = 'none');
    
    // Display relevant type buttons
    data.types.forEach(typeInfo => {
      const button = document.querySelector(`.pokemon-type-button.${typeInfo.type.name}`);
      if (button) {
        button.style.display = 'inline-block';
      }
    });

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonHeight.innerHTML = '';
    pokemonWeight.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
