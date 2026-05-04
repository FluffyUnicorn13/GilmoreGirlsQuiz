const validCharacters =[
    "Lorelai",
    "Rory",
    "Luke",
    "Lane",
    "Richard", 
    "Emily",
    "Kirk",
    "Ms. Patty",
    "Gypsy",
    "Jess",
    "Mrs. Kim",
    "Zach",
    "Sophie",
    "Logan",
    "Honor",
    "Babette",
    "Morey",
    "Christopher",
    "Taylor",
    "Dean",
    "Paris",
    "Janet",
    "Tawna",
    "Jason",
    "Floyd",
    "Mitchum",
    "Liz",
    "TJ",
    "Carrie",
    "Mr. Forrester",
    "Mrs. Forrester",
    "Clara",
    "Madeline",
    "Louise",
    "Max",
    "Headmaster Charlston",
    "Shira",
    "Lindsey",
    "Rachel",
    "Nicole",
    "Gigi",
    "Sherry",
    "Straub",
    "Francine",
    "Tristin",
    "Colin",
    "Finn",
    "Gil",
    "Brian",
    "Town Troubadour",
    "April",
    "Dwight",
    "Ana",
    "Kyon",
    "Kyle",
    "Josh",
    "Alexandra",
    "Walker",
    "Megan",
    "Claude",
    "Sookie",
    "Jackson",
    "Roon",
    "Michele",
    "Ms. Celine",
    "Drella",
    "Trix",
    "Marilyn",
    "Dave",
    "Marty",
    "Doyle",
    "Lucy",
    "Francie",
    "Lulu",
    "Mia",
    "Alex",
    "Shane",
    "Olivia",
    "Henry",
    "Tom",
    "Bill",
    "Althea",
    "Matthew",
    "Aunt Jun",
    "Beau",
    "Jamie",
    "Ascher Fleming",
    "Juliet",
    "Rosemary",
    "Stephanie",
    "Robert",
    "Glenn",
    "Brad",
    "Lem",
    "Ivy",
    "Lisa",
    "Cesar",
    "Young Chui",
    "Mrs. Cassini",
    "Archie",
    "David",
    "Bootsy",
    "Fran",
    "Andrew",
    "Joe",
    "Harry", 
    "AK",
    "Allen",
    "Brandi",
    "Brennon",
    "Burt",
    "Christine",
    "Davey",
    "Derek",
    "Todd",
    "Gisele",
    "Graham",
    "Joe",
    "Tobin",
    "Trevor",
    "Terrance",
    "Summer",
    "Sasha",
    "Sheila",
    "Raj",
    "Rich"
];

let userAnswers= [];

document.getElementById("add-btn").addEventListener("click", () =>
{
    const input = document.getElementById("character-input");
    const value = input.value.trim();

    if (value && !userAnswers.includes(value))
    {
        userAnswers.push(value);

        const li = document.createElement("li");
        li.textContent = value;
        document.getElementById("answers-list").appendChild(li);
    }

    input.value="";
});

document.getElementById("submit-btn").addEventListener("click", () =>
{
    let score = 0;

    userAnswers.forEach(name =>
    {
        if(validCharacters.includes(name))
        {
            score++;
        }
    });

    alert(`You got ${score}!`);
});