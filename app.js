const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const listaDatos = [];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(express.static("paginas"));

app.listen(port, () => {
  console.log("Puerto: " + port);
});

app.get("", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/tabla", urlencodedParser, (req, res) => {
  const json = {
    id: req.body.idName,
    titulo: req.body.tituloName,
    mensaje: req.body.mensajeName,
  };
  console.log(json);
  listaDatos.push(json);
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<style>table,th,td {border: 1px solid black;border-collapse: collapse;}</style>"
  );
  res.write('<table style="width: 50%">');
  res.write("<thead>");
  res.write("<tr>");
  res.write("<th>Id</th>");
  res.write("<th>Titulo</th>");
  res.write("<th>Mensaje</th>");
  res.write("</tr>");
  res.write("</thead>");
  res.write("<tbody>");
  for (let i = 0; i < listaDatos.length; i++) {
    res.write(
      `<tr><td>${listaDatos[i].id}</td><td>${listaDatos[i].titulo}</td><td>${listaDatos[i].mensaje}</td></tr>`
    );
  }
  res.write("</tbody>");
  res.write("</table><br>");
  res.write('<a href="index.html"><button>Volver al inicio</button></a>');
  res.end();
});
