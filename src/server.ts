import app from "./app";
import * as mongoose from "mongoose";
import config from "./config";

(async function () {
  try {
    await mongoose.connect(config.mongodb_uri as string);
    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
