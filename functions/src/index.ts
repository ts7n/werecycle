import * as functions from 'firebase-functions';
import * as jimp from 'jimp';

export const generateCertificate = functions.https.onRequest(async (req, res) => {
  if(!req.query.name) {
    res.send('No name provided.');
    return;
  }
  const template = await jimp.read('https://i.gyazo.com/390240cdb6ca44ef37b104e9d0205287.png');
  const font = await jimp.loadFont(jimp.FONT_SANS_64_BLACK)
  template.print(font, 450, 575, req.query.name);

  await template.writeAsync('../tmp/certificate.png');
  res.type('image/png');
  res.download('../tmp/certificate.png');
});
