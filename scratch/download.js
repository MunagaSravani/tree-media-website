const fs = require('fs');

async function download() {
  try {
    const res = await fetch("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop");
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync('scratch/test-img.jpg', buffer);
    console.log('Saved image successfully, size:', buffer.length);
  } catch (err) {
    console.error('Download error:', err);
  }
}

download();
