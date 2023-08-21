// imports
const express = require("express");
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");
const PORT= process.env.PORT || 1701; // dynamic port generation necessary for Heroku deployment
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pageRoutes);
app.use(apiRoutes);

// listener
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});