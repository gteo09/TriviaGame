$("#start").on("click",function(){  
    game.start();
    
})

$(document).on("click","#end",function(){
    game.done();
})

$(document).on("click","#again", function(){
    game.start();
})

var questions =[{
    question:"What was the first full length CGI movie?",
    answers:["A Bugs Life","Monsters Inc", "Toy Story"],
    correctAnswer:"Toy Story"
}, {
    question:"Which of these was not a Spice Girl?",
    answers:["Sporty Spice","Scary Spice", "Fred Spice"],
    correctAnswer:"Fred Spice"
}, {
    question:"Who wrote Smells Like Teen Spirit?",
    answers:["Nirvana", "N'Sync", "Britney Spears"],
    correctAnswer:"Nirvana"
}, {
    question:"Which movie does the song the Circle of Life come from?",
    answers:["Cinderella","Lion King", "Toy Story"],
    correctAnswer:"Lion King"
}];

var game = {
    correct: 0,
    incorrect: 0,
    counter: 120,
    countdown: function(){
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter<=0){
            console.log("no more time");
            game.done();
        }
    },
    start: function(){
        timer=setInterval(game.countdown,1000);
        $("#subwrapper").html("");
        game.correct=0;
        game.incorrect=0;
        $(document).html("#noanswer").html("")

        $("#subwrapper").prepend("<h2>Time Remaining: <span id='counter'>120</span> Seconds </h2>")
        $("#start").remove();
        for(var i=0; i<questions.length;i++){
        $("#subwrapper").append("<h2>"+questions[i].question+"</h2>");
        for(var j=0;j<questions[i].answers.length;j++){
            $("#subwrapper").append("<input type='radio' name='question-"+i+"' value='"+questions[i].answers[j]+"'>"+questions[i].answers[j])
        }
      }
      $("#subwrapper").append("<br><button id='end'>Done</button>")
    },
    done: function(){

    var inputs = $("#subwrapper").children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
    },

    result: function(){
        clearInterval(timer);
        $("#subwrapper h2").remove();

        $("#subwrapper").html("<h2>Done</h2>");
        $("#subwrapper").append("<h3>Correct Answers: "+this.correct+"</h3>")
        $("#subwrapper").append("<h3>Incorrect Answers: "+this.incorrect+"</h3>")
        $("#subwrapper").append("<h3 id='noanswer'>Unanswered: "+(questions.length-(this.incorrect+this.correct))+"</h3>");
        $("#subwrapper").append("<button id='again'>Play Again</button>")
    }
}
