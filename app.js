const express = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = 8080;
const URL = '0.0.0.0';

const app = express();

app.use(express.json());

app.listen(PORT, URL, () => {
	test();
	console.log(`Server running on port ${PORT} and url ${URL}`);
});

function test() {
	const A = { x: -2, y: -4 };
	const B = { x: 3, y: -4 };
	const C = { x: -1, y: -0.01 };
	let aRads = Math.atan2(A.y, A.x);
	let bRads = Math.atan2(B.y, B.x);
	let cRads = Math.atan2(C.y, C.x);
	console.log(aRads, cRads, bRads);
}
