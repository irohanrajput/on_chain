import * as web3 from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY"); //any one can be a payer provided we've the secret key, we can use different accounts as payer

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

//now we gotta 
// create a transaction
// create an instruction
// add the instruction to the transaction
// send the transaction

const PING_PROGRAM_ADDRESS: string = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS: string = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);

const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
    programId, // This specifies which program (smart contract) will process this instruction. In this case, this is the ping program's address. When the transaction executes, the Solana runtime will run the code at this address.
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
        }
    ]
})

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);

console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);


