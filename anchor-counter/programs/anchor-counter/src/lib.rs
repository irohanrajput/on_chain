use anchor_lang::prelude::*;

declare_id!("JPLxjsCtwMuLj9zBpyfoveeMvnwaatQ1bcBy7yTckvn");

#[program]
pub mod anchor_counter {
    use super::*;


pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    let counter = &ctx.accounts.counter;
    msg!("Counter account created! Current count: {}", counter.count);
    Ok(())
}

pub fn increment(ctx: Context<Increment>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    msg!("Previous counter: {}", counter.count);
    counter.count += 1;
    msg!("Counter incremented! Current count: {}", counter.count);
    Ok(())
}
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init, // Create this account
        payer = payer, // Use payer to pay rent
        space = 8 + 8 // 8 bytes for account discriminator + 8 bytes for u64
    )]
    pub counter: Account<'info, Counter>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[account]
pub struct Counter {
    pub count: u64,
}
