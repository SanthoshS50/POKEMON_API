var div = document.createElement('div');

var div1 = document.createElement('div');
div1.setAttribute('id', 'header-container');
div1.classList.add('ui', 'inverted', 'segment', 'text-center'); // Added text-center class for center alignment

var img = document.createElement('img');
img.setAttribute('class', 'img');
img.setAttribute('src', './assets/pokemon.png');

var div3 = document.createElement('div');
div3.setAttribute('id', 'container');

var div4 = document.createElement('div');
div4.setAttribute('id', 'poke-container');
div4.classList.add('ui', 'cards');

var button1 = document.createElement('button');
button1.setAttribute('id', 'create-pokemon');
button1.classList.add('ui', 'primary', 'button');
button1.innerText = 'Display Pokemons';

div4.append(button1);
div3.append(div4);
div1.appendChild(img); // Append the image to the header container
div.append(div1, div3);
document.body.append(div);

document.addEventListener("DOMContentLoaded", () => {
    let generateBtn = document.querySelector('#create-pokemon');
    generateBtn.addEventListener('click', renderEverything);
})

function renderEverything() {
    let allPokemonContainer = document.querySelector('#poke-container');
    allPokemonContainer.innerText = "";
    fetchallPokemon();
}

function fetchallPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=600')
        .then(response => response.json())
        .then(function (allpokemon) {
            allpokemon.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}

function fetchPokemonData(pokemon) {
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {
            renderPokemon(pokeData);
        })
}

function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div");
    pokeContainer.style.backgroundColor = "black";
    pokeContainer.style.border = "3px solid black";
    pokeContainer.style.borderRadius = "10px";
    pokeContainer.classList.add('ui', 'card');

    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4');
    pokeName.innerText = `Name : ${pokeData.name}`;

    let pokeNumber = document.createElement('h4');
    pokeNumber.innerText = `ID : ${pokeData.id}`;

    let abi = document.createElement('h4');
    abi.innerText = "Ability";

    let move = document.createElement('h4');
    move.innerText = "Moves";

    let pokemoves = document.createElement('ul');

    let weight = document.createElement('h4');
    weight.setAttribute('class', 'id')
    weight.innerText = `Weight : ${pokeData.weight}`

    let pokeability = document.createElement('ul');

    createmoves(pokeData.moves, pokemoves);

    createability(pokeData.abilities, pokeability);

    pokeContainer.append(pokeName, pokeNumber, abi, pokeability, move, pokemoves, weight);
    allPokemonContainer.appendChild(pokeContainer);
}

function createability(abilities, ul) {
    abilities.forEach(function (ability) {
        let abilityLi = document.createElement('li');
        abilityLi.innerText = ability['ability']['name'];
        ul.append(abilityLi);
    })
}

function createmoves(moves, ul) {
    for (let i = 0; i < 5; i++) {
        let moveLi = document.createElement('li');
        moveLi.innerText = moves[i].move.name;
        ul.append(moveLi);
    }
}

function createPokeImage(pokeID, containerDiv) {
    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add('image');

    let pokeImage = document.createElement('img');
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeID}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}
