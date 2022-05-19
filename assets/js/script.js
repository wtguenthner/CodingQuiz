var time = 60;
var qi = -1;
var points = 0;
var clockID;



// var answer = document.getElementById
var main = document.querySelector("main");
var message = document.getElementById("message");
var highscores = document.getElementById("highscores");

//Sets an array for questions. Q stands for questions, A stands for available answers, C stands for correct answer
var questions = [
    {
        Q: "What does HTML stand for?",
        A: ["1. Hyper Text Madeup Linguistics", "2. Hyper Text Markup Language", "3. Higher Text Markup Language", "4. Hyper Trainer Marking Language"],
        C: "B"
    },
    {
        Q: "What are the two values that can be returned in a Boolean statement?",
        A: ["1. True/False", "2. Yes/No", "3. If/Then", "4. And/Or"],
        C: "A"
    },
    {
        Q: "What is the main purpose of APIs?",
        A: ["1. Enhancing the colors and styles of HTML", "2. To define the meaning and structure of web content", "3. Deliver user responses to a system and the systems response back to the user", "4. Resetting storage on a webpage to allow the user to start from scratch"],
        C: "C"
    },
    {
        Q: "What is the proper way to write an if/then statement?",
        A: ["1. if{condition()}", "2. if(condition)then(condition)", "3. if{condition}()", "4. if(condition){}"],
        C: "D"
    },
    {
        Q: "Which one of these loops will run forever?",
        A: ["1. for(var x=0, x < 5, x++)", "2. for(var x=0, x >= 0, x++)", "3. for(var x=0, x <= 8, x++)", "4. while(x > 5){x--;} "],
        C: "B"
    },
];

document.getElementById("start").addEventListener("click", handleQuiz);

//Starts the quiz and timer
function handleQuiz() {
    handleQuestion();
    clockID = setInterval(handleTime, 1000);
};

function handleQuestion() {
    qi++
    //Stops questions and ends the quiz once the iterator is larger than the number of questions available.
    if (qi > 4) {
        endQuiz();
        return
    }

    //Adds questions to the page
    let { Q, A, C } = questions[qi];
    main.innerHTML = `<h1>${Q}</h1>`;
    main.innerHTML += `<button value= "A" onclick="checkAnswer(event, qi)">${A[0]}</button>` + `<br></br>`;
    main.innerHTML += `<button value = "B" onclick="checkAnswer(event,qi)">${A[1]}</button>` + `<br></br>`;
    main.innerHTML += `<button value = "C" onclick="checkAnswer(event,qi)">${A[2]}</button>` + `<br></br>`;
    main.innerHTML += `<button value = "D" onclick="checkAnswer(event,qi)">${A[3]}</button>`;

};

//Checks the users guess and compares to the answer
function checkAnswer(event, qi) {

    //Clears correct/wrong message after 700ms
    setTimeout(function () {
        message.textContent = " ";
    }, 700);

    var element = event.target;
    let { Q, A, C } = questions[qi];
    var guess = element.getAttribute("value");

    //Adds 10 points to score if answer is correct
    if (guess == C) {
        qi++
        points = points + 10;
        handleQuestion();
        message.innerHTML = `<h4>Correct!</h4>`

        //Subtracts 10 seconds from the timer if guess is wrong 
    } else {
        message.innerHTML = `<h4>Wrong!</h4>`
        handleQuestion();
        time = time - 10;
    }
}

function handleTime() {
    time--;
    document.getElementById("time").innerHTML = time;
    //Ends quiz if timer is 0 or less
    if (time <= 0) {
        endQuiz();
        time = 0;
        document.getElementById("time").innerHTML = time;
        clearInterval(clockID);
    }
}

//Ends quiz and shows user their score. Creates input box for user's initials.
function endQuiz() {
    main.innerHTML = `<h4>Quiz Complete</h4>`
    main.innerHTML += `<h5>Your final score is: ` + points + `</h5>`;
    time = 0;
    main.innerHTML += `<input type="text" id="initials" placeholder = "Enter Initials" >
        <button id="submitScore" onClick = "addScore(points)">Submit</button>`
}

function addScore(points) {
    var initials = document.getElementById("initials").value;
    // main.textContent = " ";
    //Set initials and points to an array
    if (localStorage.getItem('initial') == null) {
        localStorage.setItem('initial', '[]')
    }
    if (localStorage.getItem('points') == null) {
        localStorage.setItem('points', '[]');
    }
    //Stores local storage of points into a variable and parses it
    var pointList = JSON.parse(localStorage.getItem('points'));
    //Add the new score to the array of points
    pointList.push(points);
    localStorage.setItem('points', JSON.stringify(pointList));

    //Stores local storage of initials into a variable and parses it
    var initialList = JSON.parse(localStorage.getItem('initial'));
    //Adds the new initials to the array of initials
    initialList.push(initials);
    localStorage.setItem('initial', JSON.stringify(initialList))
    showHighScores();
}

function showHighScores() {
    //Resets content content of the main tag and the highscore list
    main.textContent = " ";
    highscores.textContent = " ";
    //Displays the highscores
    highscores.setAttribute("class", "show");
    highscores.innerHTML += `<h2>High Scores</h2>`
    highscores.innerHTML += `<li>` + JSON.parse(localStorage.getItem('initial')) + `</li>`;
    highscores.innerHTML += `<br><li>` + JSON.parse(localStorage.getItem('points')) + `</li>`
    //Adds button to return to beginning of quiz
    highscores.innerHTML += `<br><button id="goBack"><a href="./index.html">Go Back</a></button>
        <button onclick="clearStorage()">Clear Highscore</button>`
}
function clearStorage() {

    localStorage.clear();
}