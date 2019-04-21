const radicalToKanji = require("./radicalToKanji.js").radicalToKanji
const radicalDescriptions = require("./radicalDescriptions.js").radicalDescriptions

// This can be moved to a utility library
Array.prototype.uniq = function ()
{
    return this
        .sort()
        .reduce((acc, val) =>
        {
            if (acc[acc.length - 1] != val)
                acc.push(val)
            return acc
        }, [])
}

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
        .map(name => getKanjiFromRadicalName(name))
        .flat()
        .sort()
        .reduce((acc, val) =>
        {
            if (acc[acc.length - 1] != val)
                acc.push(val)
            return acc
        }, [])
}