const { fstat } = require("fs");
const quote = "Live more,Worry Less🤩🤩";
for (let i = 1; i <= 10; i++) {
    fstat.writeFile(`./backup/text-${i}.html`, quote, (err) => {
        console.log(`Complete Writing text-${i}.html`);
    });
}