var fs = require('fs');
function copyIt(from, to) {
	fs.writeFileSync(to, fs.readFileSync(from));
	//fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}
copyIt('./patches/app.js', './node_modules/@vue/cli-service/lib/config/app.js');