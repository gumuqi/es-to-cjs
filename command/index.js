const path = require('path')
const fs = require('fs')

module.exports = {
  run (pathname) {
    fs.readdir(pathname, (err, files) => {
      files.forEach(file => {
        const location = path.join(pathname,file);
        const info = fs.statSync(location);
        if (info.isDirectory()) {
          // 如果是文件夹，递归读取
          this.run(location)
        } else {
          // 如果是文件，读取文件，并将 es6 模块标准修改成 cjs 模块标准
          this.translate(location)
        }
      })
    })
  },
  translate (filepath) {
    fs.readFile(location, 'utf8', (eread, data) => {
      let result = data.replace(/import\s(.*)\sfrom\s(.*);/g,'const $1 = require($2);')
          result = result.replace(/export\sdefault\s/, 'module.exports = ')
          result = result.replace(/export\sfunction\s(.*)\s\(/g, 'module.exports.$1 = function (')
      fs.writeFile(location, result, 'utf8', ewrite => {
  
      })
    })
  }
} 


