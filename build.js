var fs = require('fs');
var path = require('path');
var cssmin = require('cssmin');
var css = ['examples/css/bootstrap.css', 'examples/css/font-awesome.css', 'examples/css/animate.css', 'examples/css/common.css'];
var code = [];

css.forEach(function(cs){
    code.push(fs.readFileSync(path.resolve(__dirname, cs), 'utf8'));
});

fs.writeFileSync(path.resolve(__dirname, 'build', 'css', 'webservice.css'), cssmin(code.join('\n')));
console.log('css compress success!');