const fs = require('fs');
const path = 'src/app/shared/mocks/lesson-contents-mock.constant.ts';
let s = fs.readFileSync(path, 'utf8');
const before = /QuestionType\.MCQ/g;
const after = "'MCQ'";
const replaced = s.replace(before, after);
fs.writeFileSync(path, replaced, 'utf8');
console.log('replaced QuestionType.MCQ -> \"MCQ\"');
