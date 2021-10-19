const fs = require("fs");
const path = require("path");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./src/htmlTemplate");


//manager role questions
const managerQuestions = [
    {
        type: "input",
        message: "What is the team manager's name?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is the team manager's id?",
        name: "managerID"
    },
    {
      type: "input",
      message: "What is the team manager's email?",
      name: "managerEmail"
    },
    {
      type: "input",
      message: "What is the team manager's office number?",
      name: "managerOffice"
    }
]

//engineer role questions
const engineerQuestions = [
  {
      type: "input",
      message: "What is the engineer's name?",
      name: "engName"
  },
  {
      type: "input",
      message: "What is the engineer's id?",
      name: "engID"
  },
  {
    type: "input",
    message: "What is the engineer's email?",
    name: "engEmail"
  },
  {
    type: "input",
    message: "What is the engineer's GitHub username?",
    name: "engGithub"
  }
]

//intern role questions
const internQuestions = [
  {
      type: "input",
      message: "What is the intern's name?",
      name: "internName"
  },
  {
      type: "input",
      message: "What is the intern's id?",
      name: "internID"
  },
  {
    type: "input",
    message: "What is the intern's email?",
    name: "internEmail"
  },
  {
    type: "input",
    message: "What is the intern's school?",
    name: "internSchool"
  }
]

//empty array used to render the HTML
var employees = [];

//new Manager function 
newManager = () => {
  
  inquirer.prompt(managerQuestions).then(res => {
    
    employees.push(new Manager(res.managerName, res.managerID, res.managerEmail, res.managerOffice));
    newEmp();
    
  });
}

//new engineer or intern
newEmp = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What type of employee would you like to create? ",
      name: "empType",
      choices: [
        "Engineer",
        "Intern",
        "Finished building my team"
      ]
    }
  ]).then(res => {
    if (res.empType === "Engineer") {
      newEngineer();
    } else if (res.empType === "Intern") {
      newIntern();
    } else {
      if (!fs.existsSync(OUTPUT_DIR)) {
        console.log("Creating output directory..");
        fs.mkdirSync(OUTPUT_DIR);
      }
      
      //renders function 
      fs.writeFile(outputPath, render(employees), "utf8", function() {
        console.log("File successfully created!");
      })
    }
  }).catch(error => {
    console.log("Could not create file.");
    console.log(error);
  });  
}

//new engineer role function
newEngineer = () => {
  inquirer.prompt(engineerQuestions).then(res => {
    employees.push(new Engineer(res.engName, res.engID, res.engEmail, res.engGithub));
    newEmp();
  })
}

//new intern role function
newIntern = () => {
  inquirer.prompt(internQuestions).then(res => {
    employees.push(new Intern(res.internName, res.internID, res.internEmail, res.internSchool));
    newEmp();
  })
}


//call newmanager function 
newManager();