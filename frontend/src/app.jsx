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

    const fruitList = [
      "apple",
      "banana",
      "pear",
      "mango",
      "carrot",
      "eggplant",
      "orange",
      "grape",
      "dragonfruit",
      "pineapple"
    ];

    await fetch("http://localhost:8000/detect", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.length > 0) {
          let fruitName = result[0];
          console.log("detected fruit name:", fruitName);
          if (fruitList.includes(fruitName)) {
            setFruit(fruitName);
          } else {
            alert(
              `Only ${fruitList.toString()} are currently available to process.`
            );
          }
        } else {
          alert("The image could not be recognized.");
        }
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
