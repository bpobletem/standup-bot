import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, PUBLIC_KEY,  APP_ID} = process.env;

if (!DISCORD_TOKEN || !PUBLIC_KEY || !APP_ID) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  PUBLIC_KEY,
  APP_ID,
  MESSAGE_CHANNEL_ID: "",
};
