import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  Server.start();
  // console.log(envs);
}
