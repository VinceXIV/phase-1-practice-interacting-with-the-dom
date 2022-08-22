
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
function subtractOne (){
    counter.textContent = parseInt(counter.textContent) - 1;
}

function addOne () {
    counter.textContent = parseInt(counter.textContent) + 1;
}


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

function updateClickCount() {
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
}


// Start listening and stop listening

function startListening(){
    
    document.getElementById('minus').addEventListener('click', subtractOne)
    document.getElementById('plus').addEventListener('click', addOne)
    document.getElementById('heart').addEventListener('click', updateClickCount)
    document.getElementById('comment-form').addEventListener('submit', processCommentInput)
}

function stopListening(){
    
    document.getElementById('minus').removeEventListener('click', subtractOne)
    document.getElementById('plus').removeEventListener('click', addOne)
    document.getElementById('heart').removeEventListener('click', updateClickCount)
    document.getElementById('comment-form').removeEventListener('submit', processCommentInput)
}


startListening();


// process stuff related to the pause button

function disableButtons(){
    const btns = Array.from(document.querySelectorAll('button'))
    for(const btn of btns){
        btn.classList.add('inactive')
        btn.classList.remove('active')
    }
}

function enableButtons(){
    const btns = Array.from(document.querySelectorAll('button'))
    for(const btn of btns){
        btn.classList.add('active')
        btn.classList.remove('inactive')
    }
}


function changeButtonStyle(){
    const inactiveBtns = Array.from(document.getElementsByClassName('inactive'))
    const activeBtns = Array.from(document.getElementsByClassName('active'))

    for(const btn of inactiveBtns){
        if(btn.id == 'pause'){
            continue;
        }
        btn.style.opacity = '0.5'
    }

    for(const btn of activeBtns){
        btn.style.opacity = '1'
    }
}


const pauseButton = document.getElementById('pause')

pauseButton.addEventListener('click', event =>{    
    if(pauseButton.textContent == ' pause '){
        pauseCounter();
        pauseButton.textContent = ' resume '
        stopListening();
        disableButtons();
        changeButtonStyle()
    }else {
        resumeCounter();
        pauseButton.textContent = ' pause '
        startListening()
        enableButtons()
        changeButtonStyle()
    }
})


// process stuff to do with the submission of the comments

const commentForm = document.getElementById('comment-form')

function createAListThatWillHoldComments(){
    let commentsHeader = document.querySelector('#list + h3')
    let commentsHeaderParent = document.querySelector('body div');
    let commentsContainer = document.createElement('div')
    commentsContainer.id = 'user-inputted-comments'

    commentsHeader.parentNode.insertBefore(commentsContainer, commentsHeader.nextSibling)
}

createAListThatWillHoldComments();

function processCommentInput(event){
    const newComment = document.createElement('p')
    newComment.textContent = commentForm.querySelector('#comment-input').value

    const commentsContainer = document.getElementById('user-inputted-comments')
    commentsContainer.appendChild(newComment)

    event.target.reset();
}


commentForm.addEventListener('submit', event => event.preventDefault())
commentForm.addEventListener('submit', processCommentInput)
