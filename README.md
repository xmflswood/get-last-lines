# Get Last N Lines

[![NPM](https://nodei.co/npm/get-last-lines.png?compact=true)](https://nodei.co/npm/get-last-lines/)

Get the last N lines of a file using node.js

## Installation

``` bash
npm install get-last-lines -S
```

## Usage

example reading last 5000 lines of a file
``` javascript
const gll = require('get-last-lines')
gll({
	path: './test.log',
	lines: 5000, //default 1
	encoding: 'utf-8', //default 'utf-8'
	newLineCharacters: ['\n'] // default ['\n']
}).then((lines) => console.log(lines));
```

