const os = require("os"); //Inbuilt Package
console.log("Free memory", os.freemem() / 1024 / 1024 / 1024);
console.log("Total memory", os.totalmem() / 1024 / 1024 / 1024);

console.log("Version", os.version());
console.log("Processor", os.cpus());