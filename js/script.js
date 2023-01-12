// criando a comunicação entre o arquivo js e os elementos que irão mostrar os dados do pokemon
const nomePokemon = document.querySelector('.pokemon__nome');
const numeroPokemon = document.querySelector('.pokemon_codigo');
const imagemPokemon = document.querySelector('.pokemon__imagem');

// criando a comunicação entre o arquivo js e os elementos de pesquisa
const form = document.querySelector('.form');
const input = document.querySelector('.campo_pesquisa');
const buttonPrev = document.querySelector('.btn-anterior');
const buttonNext = document.querySelector('.btn-proximo');

// variavel local para armazenar o valor de um id fixo
let procuraPokemon = 1;

// criando uma função para encontrar o pokemon usando a api 'PokeAPI'
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// criando uma função para renderizar um pokemon pesquisado ou fixo
const renderPokemon = async (pokemon) => {

  // enquanto estiver procurando, devemos mostrar uma mensagem de 'buscando' dentro da tela
  nomePokemon.innerHTML = 'Buscando...';
  numeroPokemon.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  // se a variavel criada acima para encontrar o pokemon digitado for igual a 200 (valor dado para dados encontrados)
  if (data) {
    imagemPokemon.style.display = 'block';
    nomePokemon.innerHTML = data.name;
    numeroPokemon.innerHTML = data.id;
    imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    procuraPokemon = data.id;
  } 
  
  else {
    imagemPokemon.style.display = 'none';
    nomePokemon.innerHTML = 'Não encontrado';
    numeroPokemon.innerHTML = '';
  }
}

// eventos do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// eventos do botao prev
buttonPrev.addEventListener('click', () => {
  if (procuraPokemon > 1) {
    procuraPokemon -= 1;
    renderPokemon(procuraPokemon);
  }
});

// eventos do botao proximo
buttonNext.addEventListener('click', () => {
  procuraPokemon += 1;
  renderPokemon(procuraPokemon);
});

// chamando a função de renderizar o pokémon
renderPokemon(procuraPokemon);