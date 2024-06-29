const express = require("express");
const { pageRouter } = require("./routes/pages");
const { notesRouter } = require("./routes/notes");

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware to serve static files
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", pageRouter);
app.use("/api", notesRouter);

app.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});
