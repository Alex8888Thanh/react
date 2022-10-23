import { useState } from "react";

function App() {
  const [InputDataJson, setInputDataJson] = useState("");
  const [OutputDataJson, setOutputDataJson] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/jsons", {
        method: "POST",
        body: JSON.stringify({
          InputDataJson: InputDataJson,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setInputDataJson("");
        setOutputDataJson(resJson);
        setMessage("Process successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={InputDataJson}
          placeholder="InputDataJson"
          onChange={(e) => setInputDataJson(e.target.value)}
        />
        <div className="message">{outputDataJson ? <p>{outputDataJson}</p> : null}</div>

        <button type="submit">process</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
