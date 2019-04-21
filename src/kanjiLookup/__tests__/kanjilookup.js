import { radicalToKanji } from "../radicalToKanji.js";
import { radicalDescriptions } from "../radicalDescriptions.js";

test("radicalToKanji", () =>
{
  expect(radicalToKanji["火"]).toContain("炎")
  expect(radicalToKanji["女"]).toContain("嫁")
})

test("radicalDescriptions", () =>
{
  expect(radicalDescriptions).toContainEqual({ "radical": "宀", "descriptions": "roof" })
})