import { useDropzone } from "react-dropzone";

function FileDropper2(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: (event) => myCustomFileGetter(event),
  });
  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

export default FileDropper2;

async function myCustomFileGetter(event) {
  const files = [];
  // Retrieves the files loaded by the drag event or the select event
  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;

  for (var i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    files.push(file);
  }

  // files returned from this function will be acceptedFiles
  return files;
}
