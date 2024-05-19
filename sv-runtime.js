// PACKAGES
const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()
const port = 3000

// MIDDLEWARES
app.use('/dist' , express.static('./dist'))

// SETS
app.set('view engine', 'ejs') 
app.set('views', './views');

// SV SCRIPTS INIT
async function __main(){
  let sv_scripts_col = {};
  async function __init_sv_scripts(path__){
    const sv_scripts_read = fs.opendirSync(path__); let dirent;
    while ((dirent = sv_scripts_read.readSync()) !== null) {
        const entryPath = path.join(dirent.path, dirent.name);
        const stats = fs.statSync(entryPath);
        if (stats.isFile()) {
            let script_class = require(path.join(dirent.path, dirent.name));
            await script_class.start();
            sv_scripts_col[dirent.name] = script_class;
        }else{
            await __init_sv_scripts(path.join(dirent.path, dirent.name));
        }
    }
    sv_scripts_read.closeSync();
  } await __init_sv_scripts(path.join(__dirname , 'sv_scripts'));
  for(const script_classname in sv_scripts_col){
    sv_scripts_col[script_classname].init(app , sv_scripts_col);
  }
} __main();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})