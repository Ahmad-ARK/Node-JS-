import inquirer from "inquirer";
import qr from 'qr-image';
import fs, { writeFile } from 'fs';


inquirer
    .prompt([
        {
            type: 'input',
            name: 'url',
            message: "Enter your url: "
        }

    ])
    .then((answers) => {
        console.log(`You entered ${answers.url}`);
        const url = answers.url;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream("QR_image.png"));

        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The input have been saved to the file.")
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Error: Prompt couldn't be rendered in the current environment.");
        }
        else {
            console.log("An unexpected error occurred", error);
        }
    });

