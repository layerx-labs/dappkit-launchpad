import parseTemplate from '../utils/parse-template.mjs';

export default function parseComment(comment = "") {
  return parseTemplate("devdoc.md", {comment});
}