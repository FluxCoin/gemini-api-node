export interface RequestParams {
    key: string;
    secret: string;
    payload: any;
}
declare const _default: ({ key, secret, payload }: RequestParams) => {
    headers: {
        "X-GEMINI-APIKEY": string;
        "X-GEMINI-PAYLOAD": string;
        "X-GEMINI-SIGNATURE": string;
    };
};
export default _default;
