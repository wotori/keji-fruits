import { useState } from "react";
import { useEffect } from "react";
import { Three } from "./components/three";

export function App() {
  const [fruit, setFruit] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:8000/")
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("api response:", data);
  //       setFruit(data);
  //     });
  // }, []);

  function handleSelect(e) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    let file = e.target.files[0];
    var formdata = new FormData();
    formdata.append("uploaded_file", file, file.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:8000/detect", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(Object.entries(result)[0]);
        setFruit(Object.entries(result)[0][0]);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <input id="file" type="file" onChange={handleSelect}></input>
      <Three obj="apple" />
    </>
  );
}
