const path = require("path");
const basePath = process.cwd();
const fs = require("fs");
const buildDir = path.join(basePath, "/build");

const GENERIC_TITLE = "OneForArt"; // Replace with what you want the generic titles to say.
const GENERIC_DESCRIPTION = "Purchase this NFT to reveal a unique color!"; // Replace with what you want the generic descriptions to say.

const MYSTERY_BALLS = [
  "https://ipfs.io/ipfs/bafkreicrksszycd4cyedx5ckn3fpzegqaztuie2pteg37b73j4s2h3fd5q",
  "https://ipfs.io/ipfs/bafkreidtkxz7meyotpe53hg24cpqnnhu6qjjhlw2ewumvsb3qtpwos2lwm",
  "https://ipfs.io/ipfs/bafkreihxidtufgzfgvaiklp3nt3e3hugrupjzu7f2ss3xln7fnp4gzr4vq",
  "https://ipfs.io/ipfs/bafkreielsgbfym5oh7assvljskbeomne47eoesnuallcczbj4n6jjhs6ka",
  "https://ipfs.io/ipfs/bafkreibrw37uhryn7gryq44srmlmggsxcmmqkqhm43strnyxk65kntmlzq",
  "https://ipfs.io/ipfs/bafkreia3j6mblzhqqd54gb7r2cws3ht6m5fcbljg2ik6igkebahofzcuie",
  "https://ipfs.io/ipfs/bafkreihzpxjyiow62te63at4zrkrva7mi7s7iryjj5idybgjuxdlcc45ii",
  "https://ipfs.io/ipfs/bafkreid66igmnrznlyjxvobjsb755uazqyoc7dellvap2rgtbg3uzlztf4",
  "https://ipfs.io/ipfs/bafkreifzvc5kj63xmv4i4pz57ief6wdkxby6c6aavvrafbtvmopa2hzwee",
  "https://ipfs.io/ipfs/bafkreiayifh2f3uxwfd7dqbdl64s3ws3vqcdpnol6qrquzlyk4sts34hce",
  "https://ipfs.io/ipfs/bafkreigyymmysr6czezyapqx4omnsbp6ex5ujifp5yueomdxjvtrjkjg2e",
  "https://ipfs.io/ipfs/bafkreigw5vzthyxnlh7rnqtomy5h4mzngyohbdhrwzytm4jkwgo3ymgct4",
  "https://ipfs.io/ipfs/bafkreig6odtqhzazv24rmxwb5wutwungnulmm457hxcex2zb45ur4ylqcm",
  "https://ipfs.io/ipfs/bafkreia4ql77nhpnuembe3y326ryzzuptrbgjv2upmuhkbl5amwh2vmrpu",
  "https://ipfs.io/ipfs/bafkreigojojaeeu7cijoohtsosuzwa3jvnnhtyvvm3bj6qhyus4pkcf344",
  "https://ipfs.io/ipfs/bafkreigrabatijqlbrxzxwcbd7prseu527qbddb62zoamanj6dkhl2hjm4",
  "https://ipfs.io/ipfs/bafkreigumhbmysjwqchrc636vr5anikxcxx73befhtzcidkvdcbf6re5ny",
  "https://ipfs.io/ipfs/bafkreid5njxoujelpqfmf2objjqa774rlgfpgxd24nptzrj2ekattgdkgu",
  "https://ipfs.io/ipfs/bafkreidb7abnz3ihjr2dowyn7d2zuzyjdhwi6zvzsd2oanebokzkv4cmr4",
  "https://ipfs.io/ipfs/bafkreihffd7grmabfjyypw3rs2ozu2cc4txq4xumybw7pkggsnrdqwdliy",
  "https://ipfs.io/ipfs/bafkreihlrrdprq7qza7jep6mrgu3izpkpbbwcz6scummmwr6dlpemj7h34",
  "https://ipfs.io/ipfs/bafkreid2bq5q7wyz3sr6newyj2oni2c2gcdwi3i7glelt66cfp3s3lfgly",
  "https://ipfs.io/ipfs/bafkreidpg5wt4nqjiw2nno42paertr2m4rje5k37y2ebdhcnrapmkoljmm",
  "https://ipfs.io/ipfs/bafkreidbzj5txcob3hsrxz5yzytzpfr3mw4sjw26owes2qpazblfnabta4",
];

if (!fs.existsSync(path.join(buildDir, "/genericJson"))) {
  fs.mkdirSync(path.join(buildDir, "/genericJson"));
}

fs.readdirSync(`${buildDir}/json`).forEach((file) => {
  if (file === "_metadata.json" || file === "_ipfsMetas.json") return;

  const jsonFile = JSON.parse(fs.readFileSync(`${buildDir}/json/${file}`));
  const value = jsonFile.attributes[1].value;
  jsonFile.name = `${GENERIC_TITLE} #${jsonFile.attributes[1].value} - Unknown`;
  jsonFile.description = GENERIC_DESCRIPTION;
  jsonFile.file_url =
    MYSTERY_BALLS[Math.floor(Math.random() * MYSTERY_BALLS.length)];
  // "https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh";
  // This is an example url, replace with yours.
  delete jsonFile.attributes;
  jsonFile.attributes = [
    {
      trait_type: "color_id",
      value: value,
    },
  ];

  fs.writeFileSync(
    `${buildDir}/genericJson/${file}`,
    JSON.stringify(jsonFile, null, 2)
  );

  console.log(`${file} copied and updated!`);
});
