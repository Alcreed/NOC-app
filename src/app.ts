import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // Crear una colección y un documento
  const newLog = await LogModel.create({
    message: "Test message desde Mongo",
    origin: "App.ts",
    level: "low",
  });

  await newLog.save();
  console.log("🚀 ~ main ~ newLog:", newLog);

  // const logs = await LogModel.find();
  // console.log("🚀 ~ main ~ logs:", logs);

  // Server.start();
}
