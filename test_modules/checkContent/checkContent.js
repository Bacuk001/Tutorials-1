'use strict';

var path = require('path');
var fs = require('fs');

var regexs = [
    new RegExp('\\[\\]\\((.*?)\\)'), //require alt tag for images
    new RegExp('^(# )\\w+'), // check for H1
    new RegExp('\\!\\[(.*\\.png.*)\\]\\(.*\\)'), // check for .png namings
    new RegExp('[^!]\\[.*?(here|there|file|folder|this|page)\\]\\((.*?)\\)'), // avoid useless url names
    new RegExp('\\[(.{1,2}|\\s{1,})\\]\\(.*\\)'), // conventions of alt-text for images are not observed (at least 3 characters, not only spaces)
    new RegExp('\\>###'), // avoid message box typo //(^\s*(\>){1,})\s*(\w){1,}
    new RegExp('\\[.*\]\\(.*\\.exe\\)'), // prohibit suspicious filetypes
    new RegExp('\\[.*\\]\\(\\)'), //\[.*\]\(\)
    new RegExp('\u201C'), //left double quote
    new RegExp('\u201D'), //right double quote
    new RegExp('\u2018'), //left single quote
    new RegExp('\u2019'), //right single quote
];

//messages for regular expressions
var msg = [
    "empty alt-text tag for link/image",
    "no H1 (single #) allowed",
    "no filenames in alt-text for images allowed",
    "no useless hyperlinked terms",
    "conventions of alt-text for link/image are not observed (at least 3 characters, not only spaces)",
    "no message box typo",
    "no suspicious file types in links",
    "empty URL field",
    "curly quotes found. change to straight using quotes key",
    "curly quotes found. change to straight using quotes key",
    "curly single quotes found. change to straight using apostrophe key",
    "curly single quotes found. change to straight using apostrophe key",
];

const linkRegExp = new RegExp('(?<![`\\(\\[]|(href=")|(link=")|(src="))(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])\\/?(?=([^`]*`[^`]*`)*[^`]*$)(?!(([^\\[]*\\])|([^\\<]*\\>)|([^\\(]*\\))))');
const markdownImageRegExp = new RegExp('\\!\\[[^\\]]+\\]\\((?!http)(.+?)\\)');

const MB = Math.pow(2, 20);

const fileExistsSyncCS = (filePath) => {
    var dir = path.dirname(filePath);
    var fileNames = fs.readdirSync(dir);
    return fileNames.includes(path.basename(filePath));
};

module.exports = {
    check: function(file, line, callback) {
        //test only files in tutorials and wip folder
        if (path.parse(file).dir.split(path.sep)[0] == "tutorials" || path.parse(file).dir.split(path.sep)[0] == "work-in-progress") {  
    
            //check line with every regex
            regexs.forEach(function(regex, index) {
                var matchResult = line.match(regex); 
                //if there is a match return error message and infos
                if (matchResult !== null) {
                    if (index >= 2 && index <= 4) {
                        callback(msg[index] + " -> " + matchResult[0].split("[", 2)[1].split("]", 2)[0]);
                    } else {
                        callback(msg[index] + " -> " + matchResult[0]);
                    }
    
                } else {
                    callback(null);
                }
            });
        } else {
            callback(null);
        }
    
    },
    checkLinksAndImages: (file, lines) => {
        if (path.parse(file).dir.split(path.sep)[0] == "tutorials" || path.parse(file).dir.split(path.sep)[0] == "work-in-progress") {
            let isCodeBlock = false;
            const result = [];
            const dir = path.dirname(file);
            lines.forEach((line, index) => {
                if(line.includes('```')) {
                    isCodeBlock = !isCodeBlock;
                }
                if(!isCodeBlock) {
                    const match = line.match(linkRegExp);
                    if(match) {
                        result.push({
                            line: index + 1,
                            msg: `plain text URL -> ${match[0]}`
                        });
                    }
                }
                const match = line.match(markdownImageRegExp);
                if(match) {
                    const filePath = path.join(dir, match[1]);
                    const exists = fileExistsSyncCS(filePath);
                    if(exists) {
                        const { size } = fs.statSync(filePath);
                        if(size > MB) {
                            result.push({
                                line: index + 1,
                                msg: `file size is more than 1 MB -> ${match[1]}`
                            });
                        }
                    } else {
                        result.push({
                            line: index + 1,
                            msg: `missed local image -> ${match[1]}`
                        });
                    }
                }
            });
            return result;
        }     
    }
};

