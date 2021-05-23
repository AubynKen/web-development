/* Modules */
const franc = require('franc');
const langs = require('langs');

/* Sample Text -> Language Code */
//let sampleEnglish = "Wolof is a language of Senegal, the Gambia and Mauritania, and the native language of the Wolof people. Like the neighbouring languages Serer and Fula, it belongs to the Senegambian branch of the Niger–Congo language family. Unlike most other languages of the Niger-Congo family, Wolof is not a tonal language.";
const sampleText = process.argv[2];
const langCode = franc(sampleText);

if (langCode === "und") {
    throw "Undetermined language";
}

const langNames = langs.all();
const langToBeFound = langNames.find(obj => obj['2B'] === langCode);
if (!langToBeFound) {
    throw "Name code not in database";
}

console.log(langToBeFound.name);