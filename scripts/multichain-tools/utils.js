"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearAccount = void 0;
const accounts_1 = require("@near-js/accounts");
const keystores_1 = require("@near-js/keystores");
const crypto_1 = require("@near-js/crypto");
const getNearAccount = (_a) => __awaiter(void 0, [_a], void 0, function* ({ networkId, accountId = 'dontcare', keypair = crypto_1.KeyPair.fromRandom('ed25519'), }) {
    const keyStore = new keystores_1.InMemoryKeyStore();
    yield keyStore.setKey(networkId, accountId, keypair);
    const connection = accounts_1.Connection.fromConfig({
        networkId,
        provider: {
            type: 'JsonRpcProvider',
            args: {
                url: {
                    testnet: 'https://neart.lava.build',
                    mainnet: 'https://near.lava.build',
                }[networkId],
            },
        },
        signer: { type: 'InMemorySigner', keyStore },
    });
    return new accounts_1.Account(connection, accountId);
});
exports.getNearAccount = getNearAccount;
