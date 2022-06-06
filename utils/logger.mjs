export default (message, header, ...rest) =>
    console.log(!header ? message : ' '.concat(header.concat(`\n${'-'.repeat(10)}`, `\n${message}\n\n`)), ...rest);