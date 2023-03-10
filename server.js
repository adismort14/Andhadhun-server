const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const { PythonShell } = require("python-shell");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/data", (req, res) => {
  const data = req.body.data;
  console.log("Received data:", data);
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: "./",
    args: [data],
  };

  PythonShell.run("./arduinoData.py", options, function (err, results) {
    if (err) throw err;
    console.log("Python script executed successfully:", results);
    res.send("Data processed successfully");
  });
  // const pythonProcess = spawn("python", ["./serial.py", data]);

  // pythonProcess.stdout.on("data", function (data) {
  //   console.log(data.toString());
  // });

  // Log any errors from the Python process
  //   pythonProcess.on("error", (err) => {
  //     console.error(err);
  //     res.status(500).send("Failed to process data");
  //   });
  //   pythonProcess.on("exit", (code) => {
  //     if (code === 0) {
  //       res.send("Data processed successfully");
  //     } else {
  //       res.status(500).send("Failed to process data");
  //     }
  //   });
});

app.listen(port, () => {
  console.log(`Server listening at 10.3.13.139/localhost:${port}`);
});
