let container = document.querySelector('.container');

function pokemonURL(number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/${number}.png`;
}

for (let i = 1; i <= 150; i++) {
    let pokeDiv = document.createElement('div');
    let pokeImg = document.createElement('img');
    let pokeCaption = document.createElement('span');
    pokeImg.src = pokemonURL(i);
    pokeCaption.innerText = `#${i}`;
    pokeDiv.append(pokeImg, pokeCaption);
    container.append(pokeDiv);
}