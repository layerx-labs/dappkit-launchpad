export default (message, header, ...rest) => {
  if (!message)
    message = `Not created because empty or not allowed.`;
  console.log(!header ? message : ' '.concat(header.concat(`\n${'-'.repeat(10)}`, `\n${message}\n\n`)), ...rest);
}
