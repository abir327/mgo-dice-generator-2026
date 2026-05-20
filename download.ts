import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://i.ibb.co/LzF9L4TP/Untitled-design-47.png';
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

const dest = path.join(publicDir, 'preview.png');
const file = fs.createWriteStream(dest);

https.get(url, function(response) {
   response.pipe(file);
   file.on('finish', function() {
       file.close();  // close() is async, call cb after close completes.
       console.log('Downloaded image to public/preview.png');
   });
}).on('error', function(err) { // Handle errors
    fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
    console.error('Error downloading:', err.message);
});
