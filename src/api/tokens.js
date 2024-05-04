import * as dotenv from 'dotenv'
dotenv.config("../../.env")

const options = {
    method: "POST",
    url: `${process.env.AUTH_DOMAIN}oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: `${process.env.GRANT_TYPE}`,
      client_id: `${process.env.CLIENT_ID}`,
      client_secret:`${process.env.CLIENT_SECRET}`,
      audience: `${process.env.CLIENT_AUDIENCE}`,
    }),
  };

export default options