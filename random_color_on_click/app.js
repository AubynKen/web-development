const body = document.body;

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

for (let i = 0; i < 50; i++) {
    const newHeading = document.createElement('h1');
    newHeading.innerText = "What's up bro!";
    body.append(newHeading);
    newHeading.addEventListener('click', function () {
        this.style.color = randomRGB();
        this.style.backgroundColor = randomRGB();
    });
}