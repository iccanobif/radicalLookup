const fs = require("fs")
const readline = require("readline")

// http://kanjicafe.com/downloads/kradfile-u.gz
console.log("Starting...")
const radicalToKanji = {}
const lineReaderKradfile = readline.createInterface({
    input: fs.createReadStream("../../datasets/kradfile-u")
})

lineReaderKradfile.on("line", (line) =>
{
    if (line.charAt(0) == "#")
        return

    const splits = line.split(" ")
    const kanji = splits[0]
    const radicals = splits.slice(2)

    radicals.forEach(radical =>
    {
        if (radical in radicalToKanji)
            radicalToKanji[radical].push(kanji)
        else
            radicalToKanji[radical] = [kanji]
    })
})
lineReaderKradfile.on("close", () =>
{
    const writeStream = fs.createWriteStream("radicalToKanji.js")
    writeStream.write("module.exports.radicalToKanji = ")
    writeStream.write(JSON.stringify(radicalToKanji).replace(" ", ""))
    writeStream.end(";")
    console.log("Finished kradfile.")
})

const radicalDescriptions = []

const lineReaderRadicalCatalogue = readline.createInterface({
    input: fs.createReadStream("../../datasets/radicals.utf8")
})

lineReaderRadicalCatalogue.on("line", (line) =>
{
    if (line.charAt(0) == "#")
        return
    const splits = line.split("\t")
    const radical = splits[0]
    const descriptions = splits[1]
    radicalDescriptions.push({ radical: radical, descriptions: descriptions })
})

lineReaderRadicalCatalogue.on("close", () =>
{
    const writeStream = fs.createWriteStream("radicalDescriptions.js")
    writeStream.write("module.exports.radicalDescriptions = ")
    writeStream.write(JSON.stringify(radicalDescriptions).replace(" ", ""))
    writeStream.end(";")
    console.log("Finished radical catalog.")
})

// http://www.edrdg.org/kanjidic/kanjidic2.xml.gz

// read all lines with <literal>亜</literal> or <stroke_count>7</stroke_count>

const kanjiToStrokeCount = {}


const lineReaderKanjidic = readline.createInterface({
    input: fs.createReadStream("../../datasets/kanjidic2.xml")
})

let currentLiteral = "";

lineReaderKanjidic.on("line", (line) =>
{
    if (line.startsWith("<literal>"))
        currentLiteral = line.replace(/<(\/)*literal>/g, "") // Remove both opening and closing tag
    if (line.startsWith("<stroke_count>"))
        kanjiToStrokeCount[currentLiteral] = Number.parseInt(line.replace(/<(\/)*stroke_count>/g, ""))
})

lineReaderKanjidic.on("close", () =>
{
    const writeStream = fs.createWriteStream("kanjiToStrokeCount.js")
    writeStream.write("module.exports.kanjiToStrokeCount = ")
    writeStream.write(JSON.stringify(kanjiToStrokeCount).replace(" ", ""))
    writeStream.end(";")
    console.log("Finished kanjiToStrokeCount.")
})