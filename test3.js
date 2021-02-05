const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const word = process.argv[2];
async function fetchFunction() {
  let result = null;
  await fetch("https://codequiz.azurewebsites.net/", {
    method: "GET",
    headers: { Cookie: "hasCookie=true" },
  })
    .then((res) => res.text())
    .then((response) => {
      const doc = new JSDOM(response);
      const data = doc.window.document.querySelectorAll("td");
      for (const [key, value] of Object.entries(data)) {
        if (value.textContent.replace(" ", "") == word) {
          result = data[parseInt(key) + 1].textContent;
          break;
        }
      }
    });
  return result;
}
(async () => {
  console.log(await fetchFunction());
})();
