import express from "express";
import cors from "cors";
import { findAllAccounts, findOneAccountById, findOneAccountByEmail, createAccount, updateAccount } from "./dal.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// get all user accounts
app.get('/api', async (req, res) => {
  const accounts = await findAllAccounts();
  
  console.log(accounts);
  res.send(accounts);
});

// get user account by id
app.get('/api/:_id', async (req, res) => {
  const account = await findOneAccountById(req.params._id);
  
  console.log(account);
  res.send(account);
});

// get user account by email
app.get('/api/email/:email', async (req, res) => {
  const account = await findOneAccountByEmail(req.params.email);
  
  console.log(account);
  res.send(account);
});

// create user account
app.post('/api', async (req, res) => {
  // check if user account exists
  const account = await findOneAccountByEmail(req.body.email);

  if (account != null) {
    console.log('User account already exists');
    res.send({ status: 'User account already exists' });
  } else {
    const result = await createAccount({ name: req.body.name, email: req.body.email, password: req.body.password, balance: req.body.balance, roles: req.body.roles });

    console.log(result);
    res.send({ status: 'Ok', result: result });
  }
});

// login user
app.post('/api/login', async (req, res) => {
  // check if user account exists
  const account = await findOneAccountByEmail(req.body.email);

  if (account != null) {
    if (account.password === req.body.password) {
        console.log('User logged in');
        res.send({ status: 'Ok', account: account });
      } else {
        console.log('Login failed: wrong password');
        res.send({ status: 'Login failed: wrong password' });
      }
  } else {
    console.log('Login failed: user not found');
    res.send({ status: 'Login failed: user not found' });
  }
});

// update user account balance
app.patch("/api/:_id", async (req, res) => {
  const result = await updateAccount(req.params._id, req.body.amount);

  console.log(result);
  res.send(result);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


