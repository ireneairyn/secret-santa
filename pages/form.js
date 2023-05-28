import Head from "next/head";
import React from "react";
import Form from "/components/Form";

function FormPage() {
  return (
    <>
      <div className="wrapper">
        <div className="formContent">
          <Form />
        </div>
      </div>
    </>
  );
}

export default FormPage;
