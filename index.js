const mongo = require('./connectToMongoDB');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  console.log("New request GET to /");
  res.send('Hola Mundo!');
});

app.post('/users', async (req, res) => {
  try {
    console.log("New request POST to /users");
    await mongo.addNewUser();
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
})
 
app.get('/users', async (req, res) => {
  try {
    console.log("New request GET to /users");
    let users = await mongo.getAllUsers();
    res.send(users);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
})



const port = 3000;
const nodeenv = process.env.NODE_ENV;
const description = process.env.API_DESCRIPTION;

app.listen(port, function() {
  console.log(`Aplicación escuchando el puerto ${port}!`);
  console.log(`Trabajando con entorno ${nodeenv}`);
  console.log(`Descripción: ${description}`);
});
