"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const path = __importStar(require("path"));
const bodyParser = __importStar(require("body-parser"));
const api_1 = __importDefault(require("./routes/api/api"));
class Server {
    constructor() {
        this.basedir = path.join(__dirname, '../..');
        this.app = express_1.default();
        this.configureApplication();
        this.establishRoutes();
    }
    static bootStrap() {
        return new Server();
    }
    configureApplication() {
        // Parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Point static path to dist
        this.app.use(express_1.default.static(path.join(this.basedir, 'dist')));
    }
    establishRoutes() {
        this.router = express_2.Router({ mergeParams: true });
        this.router.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.router.use('/api', api_1.default);
        this.app.use(this.router);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map