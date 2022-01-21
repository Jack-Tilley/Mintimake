import React from "react";

const FileDropper = ({
  acceptedFiles,
  fileRejections,
  getRootProps,
  getInputProps,
}) => {
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div>
      <section className="container">
        <div
          style={{ border: "3px solid rgba(0, 0, 0, 0.05)" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.png images will be accepted)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
    </div>
  );
};

export default FileDropper;
