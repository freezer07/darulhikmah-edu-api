import express from "express";
import app from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} listening on PORT `, PORT);
    console.log(`open browser and go to htttp://localhost:${PORT}`);
  });
};

startServer();
