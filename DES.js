var DES = {};

DES.getLoginKey = function (userKey, randomKey) {
    return DES.desKeySpread(DES.xorKey(userKey, randomKey));
}

/* Expand 14 bytes key to 16 bytes key */

DES.desKeySpread = function (normal) {
    spread = new Buffer(16);
    spread[0] = normal[0] & 0xfe;
    spread[1] = ((normal[0] << 7) | (normal[1] >> 1)) & 0xfe;
    spread[2] = ((normal[1] << 6) | (normal[2] >> 2)) & 0xfe;
    spread[3] = ((normal[2] << 5) | (normal[3] >> 3)) & 0xfe;
    spread[4] = ((normal[3] << 4) | (normal[4] >> 4)) & 0xfe;
    spread[5] = ((normal[4] << 3) | (normal[5] >> 5)) & 0xfe;
    spread[6] = ((normal[5] << 2) | (normal[6] >> 6)) & 0xfe;
    spread[7] = normal[6] << 1;
    spread[8] = normal[7] & 0xfe;
    spread[9] = ((normal[7] << 7) | (normal[8] >> 1)) & 0xfe;
    spread[10] = ((normal[8] << 6) | (normal[9] >> 2)) & 0xfe;
    spread[11] = ((normal[9] << 5) | (normal[10] >> 3)) & 0xfe;
    spread[12] = ((normal[10] << 4) | (normal[11] >> 4)) & 0xfe;
    spread[13] = ((normal[11] << 3) | (normal[12] >> 5)) & 0xfe;
    spread[14] = ((normal[12] << 2) | (normal[13] >> 6)) & 0xfe;
    spread[15] = normal[13] << 1;
    DES.desKeyParityAdj(spread, 16);
    return spread;
}

/* Adjust key parity */

DES.desKeyParityAdj = function (key, len) {
    var i = new Buffer(1);
    var j = new Buffer(1);
    var parity = new Buffer(1);
    for (i = 0; i < len; i++) {
        parity = 1;
        for (j = 1; j < 8; j++)
            if ((key[i] >> j) & 1) parity = ~parity & 1;
        key[i] |= parity;
    }
}


DES.xorKey = function (userKey, randomKey) {
    /* Xor the random server key with user key */
    var xored = new Buffer(14);
    for (var i = 0; i < 14; i++) {
        xored[i] = userKey[i] ^ randomKey[i];
    }
    return xored;
}


module.exports = DES;
