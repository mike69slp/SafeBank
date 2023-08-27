import { MongoClient, ObjectId } from "mongodb";

// connect to mongodb
const connectionString = "mongodb+srv://miguel:VVdORbf9NQ0UAFX7@cluster0.bikep8i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);
let conn = null;

try {
  console.log("Connecting to MongoDB Atlas...");

  conn = await client.connect();
} catch(e) {
  console.error(e);
}

const db = conn.db("bank_accounts");

// return all user accounts
export async function findAllAccounts() {
    let  accounts = null;

    try {
        accounts = await db.collection('accounts').find({}).toArray();
    } catch(e) {
        console.error(e);
    }

    return accounts;
}

// find user account by _id
export async function findOneAccountById(_id) {
    let account = null;

    try {
        account = await db.collection('accounts').findOne({ _id: new ObjectId(_id) });
    } catch(e) {
        console.error(e);
    }

    return account;
}

// find user account by email
export async function findOneAccountByEmail(email) {
    let account = null;

    try {
        account = await db.collection('accounts').findOne({ email: email });
    } catch(e) {
        console.error(e);
    }

    return account;
}

// create user account
export async function createAccount(account) {
    let result = null;

    try {
        result = await db.collection('accounts').insertOne(account);
    } catch(e) {
        console.error(e);
    }

    return result;
}

// update user account - deposit/withdraw amount
export async function updateAccount(_id, amount) {
    let result = null;

    try {
        result = await db.collection('accounts').findOneAndUpdate({ _id: new ObjectId(_id) }, { $inc: { balance: amount }}, { returnDocument: 'after' });
    } catch(e) {
        console.error(e);
    }

    return result;
}