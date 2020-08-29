const startingMinutes = 50;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');
setInterval(updateCountDown,1000);

function updateCountDown() {
    const minutes = Math.floor(time/60);
    let seconds =time % 60;
    countdownEl.innerHTML= ` Time remaining - ${minutes}:${seconds} `;
    time--;
}