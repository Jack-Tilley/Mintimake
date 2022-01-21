const FormData = require("form-data");
const fetch = require("node-fetch");
const path = require("path");
const basePath = process.cwd();
const fs = require("fs");

const AUTH = "061e528a-a2f9-462b-a95a-50d09db4dd62";
const TIMEOUT = 1000; // Milliseconds. Extend this if needed to wait for each upload. 1000 = 1 second.

const allMetadata = [];

async function main() {
  const files = fs.readdirSync(`${basePath}/build/images`); // REMOVE TEST
  files.sort(function (a, b) {
    return a.split(".")[0] - b.split(".")[0];
  });
  for (const file of files) {
    const fileName = path.parse(file).name;
    let jsonFile = fs.readFileSync(`${basePath}/build/json/${fileName}.json`); // REMOVE TEST
    let metaData = JSON.parse(jsonFile);
    const color_id = metaData.attributes.find(
      ({ trait_type }) => trait_type === "color_id"
    ).value;
    // if (color_id <= 1361) {
    //   continue;
    // }
    if (!metaData.file_url.includes("https://")) {
      const response = await fetchWithRetry(file);
      metaData.file_url = response.ipfs_url;

      fs.writeFileSync(
        `${basePath}/build/json/${fileName}.json`, // REMOVE TEST
        JSON.stringify(metaData, null, 2)
      );
      console.log(`${response.file_name} uploaded & ${fileName}.json updated!`);
    } else {
      console.log(`${fileName} already uploaded.`);
    }

    allMetadata.push(metaData);
  }
  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`, // REMOVE TEST
    JSON.stringify(allMetadata, null, 2)
  );
}

main();

function timer(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function fetchWithRetry(file) {
  await timer(TIMEOUT);
  return new Promise((resolve, reject) => {
    const fetch_retry = (_file) => {
      const formData = new FormData();
      const fileStream = fs.createReadStream(
        `${basePath}/build/images/${_file}`
      );
      formData.append("file", fileStream);

      let url = "https://api.nftport.xyz/v0/files";
      let options = {
        method: "POST",
        headers: {
          Authorization: AUTH,
        },
        body: formData,
      };

      return fetch(url, options)
        .then(async (res) => {
          const status = res.status;

          if (status === 200) {
            return res.json();
          } else {
            console.error(`ERROR STATUS: ${status}`);
            console.log("Retrying");
            await timer(TIMEOUT);
            fetch_retry(_file);
          }
        })
        .then(async (json) => {
          if (json.response === "OK") {
            return resolve(json);
          } else {
            console.error(`NOK: ${json.error}`);
            console.log("Retrying");
            await timer(TIMEOUT);
            fetch_retry(_file);
          }
        })
        .catch(async (error) => {
          console.error(`CATCH ERROR: ${error}`);
          console.log("Retrying");
          await timer(TIMEOUT);
          fetch_retry(_file);
        });
    };
    return fetch_retry(file);
  });
}
