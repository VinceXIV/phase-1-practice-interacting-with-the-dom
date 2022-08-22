
// Process stuff related to the counter

let counter = document.getElementById('counter')

function startCounter(){
    return setInterval(()=>{
        let counterValue = parseInt(counter.textContent) + 1;
        counter.textContent = counterValue;
    }, 1000)
}

let counterId = startCounter()

function pauseCounter(){
    clearInterval(counterId)
}

function resumeCounter(){
    counterId = startCounter();
}


// process stuff related to the minus and the plus

document.getElementById('minus')
.addEventListener('click', event => {
    counter.textContent = parseInt(counter.textContent) - 1;
})

document.getElementById('plus')
.addEventListener('click', event => {
    counter.textContent = parseInt(counter.textContent) + 1;
})


// process stuff related to the heart button

const numberAndClickCount = {}

function getClickCount(number){
    if(Object.keys(numberAndClickCount).includes(number)){
        numberAndClickCount[number] += 1;
    }else{
        numberAndClickCount[number] = 1;
    }

    return `${number} has been liked ${numberAndClickCount[number]} times`
}

document.getElementById('heart')
.addEventListener('click', event => {
    const likedNumbers = document.querySelector('ul.likes')

    let currLikedNumber = document.getElementById(`number-${counter.textContent}`)
    if(currLikedNumber){
        currLikedNumber.textContent = getClickCount(counter.textContent)
    }else {
        currLikedNumber = document.createElement('li')
        currLikedNumber.id = `number-${counter.textContent}`
        currLikedNumber.textContent = getClickCount(counter.textContent)

        likedNumbers.appendChild(currLikedNumber)
    }
})


