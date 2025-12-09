const axios = require("axios");

class HttpConnectionRequest {

    constructor(defaults = {}) {
        this.defaultTimeout = defaults.timeout || 10000; // 10 seconds timeout
        this.defaultHeaders = defaults.headers || {};
    }

    // ===== INTERNAL METHOD — DO NOT CALL DIRECTLY =====
    async _sendRequest(method, url, headers = {}, body = {}, auth = false) {
        try {
            const finalHeaders = { ...this.defaultHeaders, ...headers };

            // If auth provided
            if (auth && typeof auth === "string") {
                finalHeaders["Authorization"] = auth;
            }

            const config = {
                method: method,
                url: url,
                headers: finalHeaders,
                timeout: this.defaultTimeout
            };

            // GET request should not include body
            if (method !== "get" && body && typeof body === "object") {
                config.data = body;
            }

            const response = await axios(config);

            return {
                success: true,
                status: response.status,
                headers: response.headers,
                data: response.data
            };

        } catch (err) {
            return {
                success: false,
                status: err.response?.status || 500,
                error: err.message,
                data: err.response?.data || null
            };
        }
    }

    // ===== PUBLIC METHODS =====
    get(url, headers = {}, body = {}, auth = false) {
        return this._sendRequest("get", url, headers, body, auth);
    }

    post(url, headers = {}, body = {}, auth = false) {
        return this._sendRequest("post", url, headers, body, auth);
    }

    put(url, headers = {}, body = {}, auth = false) {
        return this._sendRequest("put", url, headers, body, auth);
    }

    delete(url, headers = {}, body = {}, auth = false) {
        return this._sendRequest("delete", url, headers, body, auth);
    }
}

module.exports = HttpConnectionRequest;
