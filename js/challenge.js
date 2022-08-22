
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


