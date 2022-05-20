import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export default function parseTemplate(fileName = "", context = {}, templateDir = "") {
  templateDir = templateDir || process.env.TEMPLATE_DIR || "./src/templates/";

  const template = handlebars.compile(fs.readFileSync(path.resolve(`${templateDir}${fileName}.hbs`), 'utf-8'), {noEscape: true});
  return template(context);
}
