"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.default = ({ key, secret, payload }) => {
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
//# sourceMappingURL=createRequestConfig.js.map