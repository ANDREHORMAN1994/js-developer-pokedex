const bodyEl = document.querySelector('body');
const mainEl = document.querySelector('#main-content');
const headerEl = document.querySelector('.header');
const infosEl = document.querySelector('.infos-container');
const loadingElement = document.querySelector('.loading');

const createTitleEl = ({ order, name, types }) => {
  const header = `
    <div class="title">
      <h1 class="title">${name}</h1>
      <span class="order">${formatOrder(order)}</span>
    </div>
    <ol class="types">
      ${convertTypesToOl(types)}
    </ol>
  `;
  headerEl.innerHTML = header;
}

const createImgEl = ({ img }) => {
  const imgEl = `
    <div class="img-container">
      <img src="${img}" alt="Imagem do pokemon">
    </div>
  `;
  infosEl.innerHTML += imgEl;
}

const createAboutPokemonEl = ({ name, height, weight, abilities, status }) => {
  const formatAbilities = abilities.map((i) => (
    i === abilities.at(-1) ? `<span>${i}</span>` : `<span>${i},</span>`
  )).join('');

  const aboutPokemonEl = `
    <div class="about-container">
      <h3>Estatísticas do ${name}</h3>
      <hr />
      <p><span class="item">Altura:</span> ${height / 10} metros</p>
      <p><span class="item">Peso:</span> ${weight / 10} kg</p>
      <p><span class="item">HP:</span> ${status.hp}</p>
      <p><span class="item">Ataque:</span> ${status.attack}</p>
      <p><span class="item">Defesa:</span> ${status.defense}</p>
      <p><span class="item">Velocidade:</span> ${status.speed}</p>
      <p>
        <span class="item">Habilidades:</span>
        <span class="ability">${formatAbilities}</span>
      </p>

      <button type="button" class="btn-home">
        <img src="./assets/images/home.svg" alt="Tela inicial">
      </button>
    </div>
  `;
  infosEl.innerHTML += aboutPokemonEl;
}

const handleBtnHome = () => {
  const btnHomeEl = document.querySelector('.btn-home');
  btnHomeEl.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
}

const getPokemonDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await requestPokeDetails(endpoint);
  loadingElement.style.display = 'none';

  bodyEl.classList.add(pokemon.type);
  createTitleEl(pokemon);
  createImgEl(pokemon);
  createAboutPokemonEl(pokemon);
  handleBtnHome();
}

window.onload = () => {
  getPokemonDetails();
}
