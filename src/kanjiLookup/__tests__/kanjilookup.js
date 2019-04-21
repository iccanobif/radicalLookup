import { radicalToKanji } from "../radicalToKanji.js";
import { radicalDescriptions } from "../radicalDescriptions.js";
const rewire = require("rewire");
const kanjiLookup = rewire("../kanjilookup.js");

test("radicalToKanji", () =>
{
  expect(radicalToKanji["火"]).toContain("炎")
  expect(radicalToKanji["女"]).toContain("嫁")
})

test("radicalDescriptions", () =>
{
  expect(radicalDescriptions).toContainEqual({ "radical": "宀", "descriptions": "roof" })
})

test("Check if there are radicals in kradfile for which I don't have a description", () =>
{
  const radicalsWhichHaveADescription = radicalDescriptions.map(x => x.radical)

  Object.keys(radicalToKanji).forEach(radical => {
    expect(radicalsWhichHaveADescription).toContain(radical)
  })
})

test("getKanjiFromRadicalName", () =>
{
  const getKanjiFromRadicalName = kanjiLookup.__get__("getKanjiFromRadicalName");
  const womanKanjiList = getKanjiFromRadicalName("woman")
  expect(womanKanjiList).toContain("女")
  expect(womanKanjiList).toContain("嫁")
  expect(womanKanjiList).not.toContain("口")
})

test("getKanjiFromRadicalNames", () =>
{
  const womanRoofKanjiList = kanjiLookup.getKanjiFromRadicalNames(["woman", "roof"])
  expect(womanRoofKanjiList).toContain("安")
  expect(womanRoofKanjiList).toContain("嫁")
  expect(womanRoofKanjiList).toContain("鼹")
  expect(womanRoofKanjiList).not.toContain("人")
  expect(womanRoofKanjiList).not.toContain("家")
})

