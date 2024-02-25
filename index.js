const inquirer = require("inquirer");
const fs = require("fs");

const returnBadge = (license) => {
    let badge;
    switch (license) {
        case "Apache License 2.0":
            badge =
                "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "GNU General Public License v3.0":
            badge =
                "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "MIT License":
            badge =
                "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "BSD 2-Clause 'Simplified' License":
            badge =
                "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            break;
        case "BSD 3-Clause 'New' or 'Revised' License":
            badge =
                "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            break;
        case "Boost Software License 1.0":
            badge =
                "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            break;
        case "Creative Commons Zero v1.0 Universal":
            badge =
                "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
            break;
        case "Eclipse Public License 2.0":
            badge =
                "[![License](https://img.shields.io/badge/License-EPL_2.0-red.svg)](https://opensource.org/licenses/EPL-2.0)";
            break;
    }
    return badge;
};

// Function to prompt the user with questions
const promptUser = async () => {
    try {
        const answers = await inquirer.prompt(questions);
        const readmeText = makeReadMe(answers);
        fs.writeFile("README.md", readmeText, (error) => {
            error ? console.error(error) : console.log("Success!");
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

// Array containing questions for the user
const questions = [
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title",
    },
    {
        type: "input",
        message: "Please provide a description of your project.",
        name: "description",
    },
    {
        type: "input",
        message: "Please provide installation instructions for your project.",
        name: "installation",
    },
    {
        type: "input",
        message: "Please provide instructions and examples for use.",
        name: "usage",
    },
    {
        type: "input",
        message: "Please provide the path to your screenshot.",
        name: "scPath",
    },
    {
        type: "input",
        message: "Please provide alternate text for your screenshot.",
        name: "scAlt",
    },
    {
        type: "input",
        message: "Please provide a link to your video if you have one.",
        name: "video",
    },
    {
        type: "input",
        message:
            "Please provide a list of credits, including collaborators, 3rd party assets, or tutorials used in the making of this project.",
        name: "credits",
    },
    {
        type: "list",
        message: "Please select a license agreement.",
        choices: [
            "Apache License 2.0",
            "GNU General Public License v3.0",
            "MIT License",
            "BSD 2-Clause 'Simplified' License",
            "BSD 3-Clause 'New' or 'Revised' License",
            "Boost Software License 1.0",
            "Creative Commons Zero v1.0 Universal",
            "Eclipse Public License 2.0",
        ],
        name: "license",
    },
    {
        type: "input",
        message: "Please provide contribution guidelines.",
        name: "guidelines",
    },
    {
        type: "input",
        message: "Please provide testing instructions.",
        name: "tests",
    },
    {
        type: "input",
        message: "What is your GitHub handle?",
        name: "gitHub",
    },
    {
        type: "input",
        message:
            "Please provide your email address for people to send questions to.",
        name: "email",
    },
];
// Function to generate README markdown based on user answers
const makeReadMe = ({
    title,
    description,
    installation,
    usage,
    scPath,
    scAlt,
    video,
    credits,
    license,
    guidelines,
    tests,
    gitHub,
    email,
}) => {
    let badge = returnBadge(license);
    let videoText;
    video ? (videoText = `[Demo Video](${video})`) : (videoText = "");

    let mdText = `
# ${title}

${badge}

## Description
${description}  

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [How to Contribute](#guidelines)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

![alt ${scAlt}](${scPath})
${videoText}

## Credits

${credits}

## License

This application is covered under the ${license}.

<a id="guidelines"></a>
## How To Contribute

${guidelines}

## Tests

${tests}

## Questions

[GitHub Profile](https://github.com/${gitHub})

For questions, please contact ${email}.
`;
    return mdText;
};

// Initialize the prompt process
promptUser();