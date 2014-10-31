window.quiz = {};
quiz.questions = [
    [
        {id: 1, difficulty: "Easy", name: "Any and all the gifts that are to be given to a Government Official must have received a prior written approval of...", opta: "The HOD of the department you are part of", optb: "The CGC", optc: "Both of the above", optd: "None of the above" }
    ],
    [
        {id: 2, difficulty: "Normal", name: "A Client gives you a watch worth Rs. 3,000/- for your wedding. What would you do?", opta: "Accept but get approval from the HOD of your department", optb: "Accept but get prior approval from the CGC", optc: "It's your wedding! You don't need permission to accept gifts.", optd: "None of the above." }
    ],
    [
        {id: 3, difficulty: "Difficult", name: "What should you do if you find out that your colleague has accepted a gift worth Rs. 10,000/- from one of Star TV's vendors?", opta: "Do nothing! It's not your business.", optb: "Speak to your colleague and ask for a share of the gift.", optc: "Report the case to the CGC", optd: "Speak to yor boss about it hoping that your colleague will get reprimanded" }
    ],
    [
        {id: 4, difficulty: "Difficult", name: "A representative of a charitable organization has requested you for a donation of Rs. 1,000/- on behalf of Star India. Would you need approvals to do so?", opta: "Of course not! It's only a thousand rupee", optb: "Yes. Prior approval from the HOD and the CEO or CFO", optc: "Yes. Prior approval from the CFO only", optd: "No approvals are required for charity as long as they are less than Rs. 5,000/-" }
    ]
];

quiz.answers = [
    {id: 1, correct: "optc", payoff: 5, correct_answer: "Both of the above"},
    {id: 2, correct: "opta", payoff: 10, correct_answer: "Accept but get approval from the HOD of your department"},
    {id: 3, correct: "optc", payoff: 15, correct_answer: "Report the case to the CGC"},
    {id: 3, correct: "optb", payoff: 20, correct_answer: "Yes. Prior approval from the HOD and the CEO or CFO"}
];

function getAnswer(id, answer) {

    var result = $.grep(quiz.answers, function (e) {
        return e.id == id;
    });
    if (result.length == 0) {
        alert("Error");
    } else {
        if (answer == result[0].correct) {
            return result[0].payoff + "|| Awesome! That's right ||" + result[0].correct_answer;
        } else {
            return "0|| Uh-oh, that's wrong! ||" + result[0].correct_answer;
        }
    }
}