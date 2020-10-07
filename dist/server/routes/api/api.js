"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ApiRoutes {
    constructor() {
        this.router = express_1.Router({ mergeParams: true });
        this.init();
    }
    init() {
        this.router.post('/v1/parse', this.v1Parse);
        this.router.post('/v2/parse', this.v2Parse);
    }
    v1Parse(req, res) {
        try {
            const myRequest = req.body;
            const myRequestData = myRequest["data"];
            const myResponseData = {
                statusCode: 200,
                data: {
                    firstName: myRequestData.slice(0, 8),
                    lastName: myRequestData.substring(8, 18),
                    clientId: myRequestData.slice(-7)
                }
            };
            res.send(myResponseData);
        }
        catch (e) {
            res.send("error");
        }
    }
    v2Parse(req, res) {
        try {
            const myRequest = req.body;
            const myData = myRequest["data"];
            let myData2 = myData.split('0');
            myData2 = myData2.filter(value => value != "");
            const myResponse = {
                statusCode: 200,
                data: {
                    firstName: myData2[0],
                    lastName: myData2[1],
                    clientId: myData2[2]
                }
            };
            res.send(myResponse);
        }
        catch (e) {
            res.send("error");
        }
    }
}
const apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
//# sourceMappingURL=api.js.map