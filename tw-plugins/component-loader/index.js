const plugin = require('tailwindcss/plugin');
const path = require('path')
const fs = require('fs');

module.exports = plugin(async function({ addComponents }) {
    async function __init_components(path__){
      const component_read = fs.opendirSync(path__); let dirent;
      while ((dirent = component_read.readSync()) !== null) {
          const entryPath = path.join(dirent.path, dirent.name);
          const stats = fs.statSync(entryPath);
          if (stats.isFile()){
            const fileContent = fs.readFileSync(path.join(dirent.path , dirent.name), 'utf-8');
            console.log('File Content:', fileContent); // Log file content
            addComponents(JSON.parse(fileContent));
          }else{
            await __init_components(path.join(dirent.path, dirent.name));
          }
      }
      component_read.closeSync();
    } await __init_components(path.join(__dirname , 'components'));
});
