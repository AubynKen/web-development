/* jshint esversion: 9 */

// var axios = require('axios');

/* res.data.ticker.price */

const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
        const price = res.data.ticker.price;
        console.log('Current bitcoin price: ', price);
    } catch (err) {
        console.log("Error occured", err);
    }
}



const getDadJoke = async () => {
    const dadJokeUrl = "https://icanhazdadjoke.com/";
    const config = {
        headers: {
            accept: 'application/json'
        }
    };
    const res = await axios.get(dadJokeUrl, config);
    return res;
};


const getJokeButton = document.querySelector('button');
getJokeButton.addEventListener('click', async function () {
    const newJokeElement = document.createElement('li');
    const newJoke = await getDadJoke();
    newJokeElement.innerText = newJoke.data.joke;
    const jokeList = document.querySelector('#jokes');
    jokeList.append(newJokeElement);
});