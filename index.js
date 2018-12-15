const fs = require('fs')
const initBufferSize = 1
const gll = {
  read (option) {
   const {
     path,
     lines = 1,
     encoding = 'utf-8',
     newLineCharacters = ['\n']
   } = option
   if (lines <= 0) throw new Error('lines must > 0')
   return new Promise((resolve, reject) => {
     fs.exists(path, (s) => {
       if (!s) throw Error('file does not exist')
       
       let stat = fs.statSync(path)
       let file = fs.openSync(path, 'r')

       let getedLines = 0
       let bufferSize = initBufferSize * lines
       let readSize = 0
       let flag = false
       let result = ''
       let bufferList = []
       while(true) {
         let container
         if (bufferSize + readSize < stat.size) {
           container = new Buffer(bufferSize)
           bufferList.push(container)
           fs.readSync(file, container, 0, bufferSize, stat.size - bufferSize - readSize)
         } else {
           bufferSize = stat.size - readSize
           container = new Buffer(bufferSize)
           bufferList.push(container)
           fs.readSync(file, container, 0, bufferSize)
           break
         }
         for(let c of container.toString(encoding)) {
           if (newLineCharacters.includes(c)) getedLines++
         }
         // >= lines + 1
         if (getedLines > lines) {
           flag = true
           break
         }
         readSize += bufferSize
         bufferSize = readSize
       }
       fs.closeSync(file)
       result = Buffer.concat(bufferList.reverse()).toString(encoding)
       if (!flag) {
         resolve(result)
       }
       resolve(result.substring(findNthStr(getedLines - lines, result, newLineCharacters) + 1))
     })
   })
  }
}
function findNthStr(n, s, newLineCharacters) {
  let count = 0
  for (let i = 0; i < s.length; i ++) {
    if (newLineCharacters.includes(s[i])) count ++
    if (count === n) return i
  }
}
module.exports = gll.read
