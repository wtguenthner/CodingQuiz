var time = 60;
var qi=-1;
var points =0;
var clockID;



// var answer = document.getElementById
var main = document.querySelector("main");
var message = document.getElementById("message");
var highscores = document.getElementById("highscores");


var questions = [
    {
        Q: "What does HTML stand for?",
        A: ["Hyper Text Madeup Linguistics", "Hyper Text Markup Language", "Higher Text Markup Language", "Hyper Trainer Marking Language"],
        C: "B"
    },
    {
        Q: "What are the two values that can be returned in a Boolean statement?",
        A: ["True/False", "Yes/No", "If/Then", "And/Or"],
        C: "A"
    },
    {
        Q: "Question 3",
        A: ["A", "B", "C", "D"],
        C: "C"
    },
    {
        Q: "Question 4",
        A: ["A", "B", "C", "D"],
        C: "A"
    },
    {
        Q: "Question 5",
        A: ["A", "B", "C", "D"],
        C: "B"
    },
];

document.getElementById("start").addEventListener("click", handleQuiz);

//Starts the quiz and timer
function handleQuiz(){

    handleQuestion();
    clockID= setInterval(handleTime, 1000);

};

function handleQuestion(){
    
    qi++
    //Stops questions and ends the quiz once the iterator is larger than the number of questions available.
    if(qi >4){
        endQuiz();
        return
    }
    //Adds questions to the page
    let {Q,A,C} = questions[qi];
    main.innerHTML = `<h1>${Q}</h1>`;
    main.innerHTML += `<button value= "A" onclick="checkAnswer(event, qi)">${A[0]}</button>` + `<br></br>`;
    main.innerHTML += `<button value = "B" onclick="checkAnswer(event,qi)">${A[1]}</button>`+ `<br></br>`;
    main.innerHTML += `<button value = "C" onclick="checkAnswer(event,qi)">${A[2]}</button>`+ `<br></br>`;
    main.innerHTML += `<button value = "D" onclick="checkAnswer(event,qi)">${A[3]}</button>`; 
   
};

//Checks the users guess and compares to the answer
 function checkAnswer(event, qi){

     //Clears correct/wrong message after 700ms
    setTimeout(function(){
        message.textContent= " ";
    },700);

    var element = event.target;
    let {Q,A,C} = questions[qi];
    var guess = element.getAttribute("value");
    
    //Adds 10 points to score if answer is correct
   if(guess==C){
        qi++
        points = points + 10;
        handleQuestion();
       message.innerHTML= `<h4>Correct!</h4>`
       
       //Subtracts 10 seconds from the timer if guess is wrong 
   }else{
       message.innerHTML= `<h4>Wrong!</h4>`
        handleQuestion();
       time = time-10;
   }
   
}

function handleTime(){

    time--;
   
    document.getElementById("time").innerHTML = time;
//Ends quiz if timer is 0 or less
    if(time <= 0){    
        endQuiz();
        time = 0;
        document.getElementById("time").innerHTML = time;
        clearInterval(clockID);
    }

}

//Ends quiz and shows user their score. Creates input box for user's initials.
function endQuiz(){
        main.innerHTML = `<h4>Quiz Complete</h4>`
        main.innerHTML += `<h5>Your final score is: ` + points + `</h5>`;
        time=0;
        main.innerHTML += `<input type="text" id="initials" placeholder = "Enter Initials" >
        <button id="submitScore" onClick = "addScore(points)">Submit</button>`
}

function addScore(points){
let initials = document.getElementById("initials").value; 
//  window.localStorage.setItem("hsInitials", initials);
//  window.localStorage.setItem("hsPoints", points);
main.textContent = " ";
var listInitials=[initials];
var listScore = [points]
window.localStorage.setItem("hsInitials", JSON.stringify(listInitials));
window.localStorage.setItem("hsPoints", JSON.stringify(listScore));
console.log(listInitials + listScore)
// highscores.innerHTML+= `<br></br> <li>` + window.localStorage.getItem("hsInitials", JSON.parse(initials)) + window.localStorage.getItem("hsPoints", JSON.parse(points)) + `</li>`

highscores.setAttribute("class", "show");
highscores.innerHTML += `<br><button id="goBack"><a href="./index.html">Go Back</a></button>`
}