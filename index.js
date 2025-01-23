const express = require("express");
require("dotenv").config();
const app = express();
//const webpush = require("webpush");
const bodyParser = require("body-parser");
const cors = require("cors");

//importar rutas
const loginRoutes = require("./routes/login.routes");
const assignmenRol = require("./routes/assignmen.routes");
const incidNodos = require("./routes/incidents_nodos.routes");
const incidSoluc = require("./routes/incidents_Soluc.routes");
const inciden = require("./routes/incidents.routes");
const usermana = require("./routes/users_mana.routes");
const rolRoutes = require("./routes/rol.routes");
const userRolRoutes = require("./routes/user_rol.routes");
const tipoInciRoutes = require("./routes/tipo_Inci.routes");
const prioInciRoutes = require("./routes/priori_Inci.routes");
const notificaionRoutes = require("./routes/notification.routes");
const clientsRoutes = require("./routes/clients.routes");
const contratsRoutes = require("./routes/contrats.routes");

//milddlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

//routes rol
app.use("/login", loginRoutes);
app.use("/assign", assignmenRol);
app.use("/inciNod", incidNodos);
app.use("/inciSolu", incidSoluc);
app.use("/inciden", inciden);
app.use("/usermana", usermana);
app.use("/userrol", userRolRoutes);
app.use("/rol", rolRoutes);
app.use("/tipoInci", tipoInciRoutes);
app.use("/prioInci", prioInciRoutes);
app.use("/notifica", notificaionRoutes);
app.use("/clients", clientsRoutes);
app.use("/contrats", contratsRoutes);


//execution server web
app.get("/", (req, res) => {
  res.send("Bienvenidos al API teams!!");
});
app.listen(5000);
console.log("server running in http://localhost:5000");
//app.use(bodyParser.json());
//app.use(cors());