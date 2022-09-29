const fs = require('fs')

fs.copyFileSync('./index.html', './dist/gcode-parser/index.html')
console.log("File coppied!")