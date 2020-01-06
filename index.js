const fs = require('fs');
const pathModule = require('path');
const path = '/Users/benjamin/Books/ForMoveTest';
const receiverPath = '/Users/benjamin/Books/newReceiver';

let bookFolders;
let bookPaths = [];
let recBookPath = [];

const reg = /Letmeread/

function getFullFolderName(folder) {
    return path + '/' + folder;
}

const extnameReg = /.pdf|.epub|.azw3/i;

function dealWithFolders(folders, filesPath, recFilesPath, callback) {
    folders.forEach((folder, index) => {
        fs.readdir(folder, (err, data) => {
            if (err) return err;

            data.forEach(item => {
                if (extnameReg.test(pathModule.extname(item))) {
                    filesPath.push(folder + '/' + item);
                    recFilesPath.push(receiverPath + '/' + item);
                }
            });

            console.log('filesPath.length === ', filesPath.length);
            console.log(filesPath);

            console.log('recFilesPath.length === ', filesPath.length);
            console.log(recFilesPath);

            if (index === folders.length - 1) {
                callback(filesPath, recFilesPath);
            }
        });        
    });
}

function moveFiles(from, to) {
    console.log('Begin moving files!!!!');
    for (let i = 0; i < from.length; i++) {
        fs.rename(from[i], to[i], (err) => {
            if (err) throw err;
            console.log(`
                Successfully moved ${from[i]} to ${to[i]}
            `);
        })
    }
}

fs.readdir(path, (err, data) => {
    if (err) return err;

    bookFolders = data
                    .filter(ele => reg.test(ele))
                    .map(ele => getFullFolderName(ele));

    console.log('bookFolders.length === ', bookFolders.length);
    console.log(bookFolders);

    dealWithFolders(bookFolders, bookPaths, recBookPath, moveFiles);
});

