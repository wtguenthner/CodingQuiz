var time = 60;
var qi =0;
var clockID;
// var answer = document.getElementById
var main = document.querySelector("main");

var questions = [
    {
        Q: "Question 1",
        A: ["A", "B", "C", "D"],
        C: "B"
    },
    {
        Q: "Question 2",
        A: ["A", "B", "C", "D"],
        C: "B"
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


document.getElementById("start").addEventListener("click", handleStart);

function handleStart(){

    handleQuestion();
    clockID= setInterval(handleTime, 1000);

};

function handleQuestion(){
    
    let {Q,A,C} = questions[qi];
    main.innerHTML = `<h1>${Q}</h1>`;
    
    A.forEach(answer => {
        var i=0;
        main.innerHTML+= `<button name = A[i]>${answer}</button>` + `<br></br>`;
        i++;
        
    });
    
};
function checkAnswer(){

}
function handleTime(){

    time--;
    document.getElementById("time").innerHTML = time;
    if(time <= 0){
        time = 0;
        document.getElementById("time").innerHTML = time;
        clearInterval(clockID);
    }

}