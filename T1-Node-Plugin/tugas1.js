import chalk from "chalk";
import cowsay from "cowsay";
import figlet from "figlet";
import gradient from 'gradient-string';
import dayjs from 'dayjs';


const identity = process.argv[2] || "Teman Teman";

console.log();
console.log(chalk.yellow.underline("Halo,") + chalk.magenta(" " + identity));
console.log( chalk.yellow.bold("Perkenalkan, saya:"));

console.log();

console.log(chalk.green.bold("Nama : ") + chalk.red.bold("Rakasya Yoga Surya Pratama"));
console.log(chalk.green.bold("NIM  : ") + chalk.red.bold("F1D02310022"));

const myBday = dayjs("2005-12-02");
const myUmur = dayjs().diff(myBday, "year");

console.log(
    chalk.green.bold("Umur : ") +
    chalk.white(myUmur + " tahun")
);

console.log();

const Gradient = gradient(['#0000FF', '#00FF00']);
const String = Gradient('Kata Kata Hari ini maseh!!!');
console.log(String);

console.log(
    cowsay.say({
    text: "Terkadang hari yang melelahkan haya butuh nasi padang",
    eyes: "^^",
    tongue: "U",
    f:"vader",
    })
);

console.log();

console.log(
    chalk.cyan.bold("=================================================")
);

const coolGradient = gradient(['#FF0000', '#00FF00', '#0000FF']);

console.log(
    coolGradient(
    figlet.textSync("RAKASYA", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    })
)
);

console.log(
    chalk.cyan.bold("=================================================")
);

const coolString = coolGradient('Saya ga Gay Ya!');
console.log(coolString);