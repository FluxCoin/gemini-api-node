import * as crypto from "crypto";

export interface RequestParams {
  key: string;
  secret: string;
  payload: any;
}

export default ({ key, secret, payload }: RequestParams) => {
  const encodedPayload = (new Buffer(JSON.stringify(payload)))
    .toString(`base64`);

  const signature = crypto
    .createHmac(`sha384`, secret)
    .update(encodedPayload)
    .digest(`hex`);

  return {
    headers: {
      "X-GEMINI-APIKEY": key,
      "X-GEMINI-PAYLOAD": encodedPayload,
      "X-GEMINI-SIGNATURE": signature,
    },
  };
};
