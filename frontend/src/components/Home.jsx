import { useState } from "react";
import FileDropper from "./FileDropper";
import { useDropzone } from "react-dropzone";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [layerCount, setLayerCount] = useState(0);
  const [layerNames, setLayerNames] = useState([]);
  const [revealable, setRevealable] = useState(false);
  // const [fileList, setFileList] = useState([]);
  const [layers, setLayers] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    setLayerCount(0);
    setLayerNames([]);
    setLayers([]);
    const arr = [...e.target.files];
    let unique_set = new Set();
    // let layer_list = [];
    arr.forEach((file) => {
      // console.log(file);
      const longPath = file.webkitRelativePath;
      const pathStrSplit = [...longPath.split("/")];
      if (pathStrSplit.length <= 2 || !pathStrSplit.at(-1).endsWith(".png")) {
        console.log(pathStrSplit + " Not a valid path");
      } else {
        const pathStrSplit = longPath.split("/");
        // console.log(pathStrSplit);
        const file_name = pathStrSplit.pop();
        const layer_name = pathStrSplit.pop();
        const new_layer_data = {
          layer_name: layer_name,
          file_name: file_name,
          file_data: file,
        };
        unique_set.add(layer_name);
        setLayers((oldArray) => [...oldArray, new_layer_data]);
      }
    });
    const sorted_set = [...unique_set].sort();
    setLayerNames(sorted_set);
    setLayerCount(unique_set.size);
  };

  return (
    <div>
      <p>
        Select The Directory:
        <input
          type="file"
          webkitdirectory="true"
          mozdirectory="true"
          onChange={handleInput}
        />
      </p>
      <p>Select the directory containing all of your layers</p>
      <button onClick={() => console.log({ layers, layerCount, layerNames })}>
        layers
      </button>

      <div>
        {layerCount > 0 ? (
          <ul>
            {layerNames.forEach(
              (layer_name) => console.log(layer_name, ", layer")
              // <li>{layer_name}</li>
            )}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
    // <button onClick={handleSortLayers}>Sort Layers</button>
  );
};

export default Home;
