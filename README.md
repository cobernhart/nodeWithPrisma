# nodeWithPrisma

Hey guys this is a short tutorial how to node init example

### First Install

npm install -g typescript prisma nodemon ts-node
npm install express prisma @prisma/client

### Second Init

npm init -y
tsc --init
npx prisma init

### Third Create

app.ts
db.ts
connect to DB
npx prisma db pull

### Add to file

db.ts
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

app.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Handle a GET request to fetch all users
app.get('/api/users', async (req, res) => {
const users = await prisma.user.findMany();
res.json(users);
});

// Handle a POST request to create a new user
app.post('/api/users', async (req, res) => {
const newUser = await prisma.user.create({
data: req.body,
});
res.json(newUser);
});

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}/`);
});
