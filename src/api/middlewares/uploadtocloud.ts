// const stream = require('stream');
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { google } = require('googleapis');
// const uploadRouter = express.Router();

// const KEYFILEPATH = path.join(__dirname, 'credentials.json');
// const SCOPES = ['https://www.googleapis.com/auth/drive'];
// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });
// const UploadtoCloud = async (req, res, next) => {
//   const { file, body, files } = req;

//   try {
//     if (!!file) {
//       const bufferStream = new stream.PassThrough();
//       bufferStream.end(file.buffer);
//       const { data } = await google.drive({ version: 'v3', auth }).files.create({
//         media: {
//           mimeType: file.mimetype,
//           body: bufferStream,
//         },
//         requestBody: {
//           name: file.originalname,
//           parents: ['1-F1TINtReGAeDQMsuBKWZV-GHnlKcHX-'],
//         },
//         fields: 'id,name',
//       });
//       req.body[file.fieldname] = data.id;
//     } else if (files) {
//       let filedata = Array.isArray(files) ? files : Object.keys(files);
//       for (let filename of filedata) {
//         let arrayimagepath = [];
//         for (let singleFile of files[filename]) {
//           const bufferStream = new stream.PassThrough();
//           bufferStream.end(singleFile.buffer);
//           const { data } = await google.drive({ version: 'v3', auth }).files.create({
//             media: {
//               mimeType: singleFile.mimetype,
//               body: bufferStream,
//             },
//             requestBody: {
//               name: singleFile.originalname,
//               parents: ['1-F1TINtReGAeDQMsuBKWZV-GHnlKcHX-'],
//             },
//             fields: 'id,name',
//           });
//           arrayimagepath.push(data.id);
//         }
//         if (arrayimagepath.length <= 1) {
//           req.body[filename] = arrayimagepath[0];
//         } else {
//           req.body[filename] = arrayimagepath;
//         }
//       }
//     }
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// };
// export default UploadtoCloud;

const express = require('express');
const path = require('path');
const fs = require('fs').promises; // Use fs.promises for async/await

// const publicFolder = path.join(__dirname, 'public');
// console.log(publicFolder,"publicFolderpublicFolder")
const writeToPublicFolder = async (fileBuffer, filename) => {
let folderpath="upload"
let currdate=new Date()

let newfilename=`${currdate.getDate()}${currdate.getTime()}${currdate.getSeconds()}_${filename}`
let filepath=`${folderpath}/${newfilename}`

  await fs.writeFile(filepath, fileBuffer);
  return newfilename;
};

const UploadtoCloud = async (req, res, next) => {
  const { file, body, files } = req;

  try {
    if (!!file) {
      const filename = file.originalname;
      const filePath = await writeToPublicFolder(file.buffer, filename);
      req.body[file.fieldname] = filePath;
    } else if (files) {
      let filedata = Array.isArray(files) ? files : Object.keys(files);
      for (let filename of filedata) {
        let arrayimagepath = [];
        for (let singleFile of files[filename]) {
          const filename = singleFile.originalname;
          const filePath = await writeToPublicFolder(singleFile.buffer, filename);
          arrayimagepath.push(filePath);
        }
        if (arrayimagepath.length <= 1) {
          req.body[filename] = arrayimagepath[0];
        } else {
          req.body[filename] = arrayimagepath;
        }
      }
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error writing files to public folder' });
  }
};

export  default UploadtoCloud 
