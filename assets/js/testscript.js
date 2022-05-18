var clockID;

var quizQuestions = [
    {
        question: "Question 1",
        answers:{
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "c"
    },
    {
    question: "Question 2",
    answers:{
        a: "Answer 1",
        b: "Answer 2",
        c: "Answer 3",
        d: "Answer 4"
    },
    correctAnswer: "a"
},
{
    question: "Question 3",
    answers:{
        a: "Answer 1",
        b: "Answer 2",
        c: "Answer 3",
        d: "Answer 4"
    },
    correctAnswer: "d"
},
{
    question: "Question 4",
    answers:{
        a: "Answer 1",
        b: "Answer 2",
        c: "Answer 3",
        d: "Answer 4"
    },
    correctAnswer: "a"
},
{
    question: "Question 1",
    answers:{
        a: "Answer 1",
        b: "Answer 2",
        c: "Answer 3",
        d: "Answer 4"
    },
    correctAnswer: "b"
},
];

function handleTime(){

    time--;
    document.getElementById("time").innerHTML = time;
    if(time <= 0){
        time = 0;
        document.getElementById("time").innerHTML = time;
        clearInterval(clockID);
    }

}


document.getElementById("start").addEventListener("click", startQuiz);

function startQuiz(){

    showQuestion();
    clockID= setInterval(handleTime, 1000);

};