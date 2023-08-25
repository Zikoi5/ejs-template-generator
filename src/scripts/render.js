const util = require("util");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
//promisify
const { mkdir } = fs.promises;
// const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const distFolder = path.resolve("dist");
const pagesPath = path.resolve("src/pages");
// const pageModel = {
//   content: "<p>This is some sample content. Located on the sample page.</p>"
// };
//create output directory
const ejsFiles = fs.readdirSync(pagesPath);

async function render({ filename }) {
  try {
    const filenamePath = path.resolve("src/pages", filename);
    const output = path.resolve("dist", `${filename.split(".").shift()}.html`);

    console.log("output", output);

    //render ejs template to html string
    //pass pageModel in to render content
    const html = await ejs
      .renderFile(filenamePath) //{ model: pageModel }
      .then((output) => output);
    //create file and write html
    await writeFile(output, html, "utf8");
  } catch (error) {
    console.log(error);
  }
}

mkdir(distFolder, { recursive: true });

ejsFiles.forEach((file) => {
  render({ filename: file });
});

console.log("> Render files done");
