const fs = require('fs'); // File System

const data = "My name is aniket";
fs.writeFile("name.txt", data, (err) => {
    console.log("Completed Writing!");
});