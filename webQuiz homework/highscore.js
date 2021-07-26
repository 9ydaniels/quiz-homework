const highScoreList = document.querySelector('#highScoreList')
const highscore = JSON.parse(localStorage.getItem('highScore')) || []

highScoreList.innerHTML = highscore.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')