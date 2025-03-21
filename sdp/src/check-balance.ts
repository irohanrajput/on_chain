import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function check_balance (walletAddress: string){
    try {
        const publicKey = new PublicKey(walletAddress);
        const connection = new Connection("https://api.devnet.solana.com");

        const balanceInLamports:number = await connection.getBalance(publicKey);

        const balanceInSOL:number = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(`The wallet ${walletAddress} has a balance of ${balanceInSOL} SOL`);
        

    }
    catch (error){
        console.error(error.message);
    }
}



check_balance("HppEDRNKQQPqcn5SHhHRaiqiZcXzedVUkLjt8LwAfVeP5"); 