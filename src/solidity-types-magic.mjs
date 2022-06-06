const SolidityTypes = {
  bool: `boolean`,
  address: `string`,
  "string": `string`,
  event: `void`,
  tuple: ``, // since we break down any typed tuple we can replace it for empty string // todo don't break typed tuples
}

const getSolidityType = (type = ``) => {
  const isArray = type.indexOf(`[]`) > -1;
  type = type.replace('[]', '');
  let retype;

  if (type.startsWith(`bytes`))
    retype = `string${isArray && "[]" || ""}`;
  else retype = `${(type.indexOf(`int`) > -1 ? `number` : (SolidityTypes[type] || ""))}${isArray && "[]" || ""}`;

  return retype;
}

export {getSolidityType, SolidityTypes};