import { useState } from "react";
import { useEffect } from "react";
import { Three } from "./components/three";

export function rundomFruit() {
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("api response:", data);
      });
  }, []);
}

export function App() {
  const [fruit, setFruit] = useState(null);

  async function handleSelect(e) {
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

    await fetch("http://localhost:8000/detect", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let fruit_name = Object.entries(result)[0][0];
        console.log("detected fruit name:", fruit_name);
        setFruit(fruit_name);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <input id="file" type="file" onChange={handleSelect}></input>
      {fruit && <Three obj={fruit} />}
    </>
  );
}
