const radicalToKanji = require("./radicalToKanji.js").radicalToKanji
const radicalDescriptions = require("./radicalDescriptions.js").radicalDescriptions

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
    return radicalNames
        .map(x => x.trim())
        .filter(x => x != "")
        .map(name => getKanjiFromRadicalName(name))
        .reduce((acc, val) => {
            const output = [] 
            acc = new Set(acc)
            val.forEach(x => {
                if (acc.has(x))
                    output.push(x)
            })
            return output
        })
}