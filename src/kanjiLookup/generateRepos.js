const fs = require("fs")
const readline = require("readline")

console.log("Starting...")
const radicalToKanji = {}
const lineReaderKradfile = readline.createInterface({
    input: fs.createReadStream("../../datasets/kradfile.utf8")
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

const lineReaderRadicalCatalogue= readline.createInterface({
    input: fs.createReadStream("../../datasets/radicals.utf8")
})

lineReaderRadicalCatalogue.on("line", (line) =>
{
    if (line.charAt(0) == "#")
        return
    const splits = line.split("\t")
    const radical = splits[0]
    const descriptions = splits[1]
    radicalDescriptions.push({radical: radical, descriptions: descriptions})
})

lineReaderRadicalCatalogue.on("close", () =>
{
    const writeStream = fs.createWriteStream("radicalDescriptions.js")
    writeStream.write("module.exports.radicalDescriptions = ")
    writeStream.write(JSON.stringify(radicalDescriptions).replace(" ", ""))
    writeStream.end(";")
    console.log("Finished radical catalog.")
})
