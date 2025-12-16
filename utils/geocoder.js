import node_geocoder from "node-geocoder";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../config/config.env"),
});

const options = {
  provider: process.env.GEOCODE_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODE_API_KEY,
  formatter: null,
};

const geocoder = node_geocoder(options);

export default geocoder;
