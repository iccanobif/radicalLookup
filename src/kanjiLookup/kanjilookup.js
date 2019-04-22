const radicalToKanji = require("./radicalToKanji.js").radicalToKanji
const radicalDescriptions = require("./radicalDescriptions.js").radicalDescriptions
const kanjiToStrokeCount = require("./kanjiToStrokeCount").kanjiToStrokeCount

const getKanjiFromRadicalName = (radicalName) =>
{
    return radicalDescriptions
        .filter(x => x.descriptions.indexOf(radicalName) >= 0)
        .map(x => radicalToKanji[x.radical])
        .flat()
        .sort()
        .reduce((acc, val) =>
        {
            if (acc[acc.length - 1] != val)
                acc.push(val)
            return acc
        }, [])
}

// radicalNames must be a list of names of radicals
module.exports.getKanjiFromRadicalNames = (radicalNames) =>
{
    // Clean input
    radicalNames = radicalNames
        .map(x => x.trim())
        .filter(x => x != "")

    if (radicalNames.length == 0)
        return []

    return radicalNames
        .map(name => getKanjiFromRadicalName(name))
        .reduce((acc, val) => // Only include kanji that are linked to all specified radical names 
        {
            const output = []
            acc = new Set(acc)
            val.forEach(x =>
            {
                if (acc.has(x))
                    output.push(x)
            })
            return output
        })
        .sort((a, b) => 
        {
            const strokeComparison = kanjiToStrokeCount[a] - kanjiToStrokeCount[b]
            if (strokeComparison != 0)
                return strokeComparison
            else
                return a.codePointAt(0) - b.codePointAt(0)
        })
}