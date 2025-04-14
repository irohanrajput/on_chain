use anchor_lang::prelude::*;

declare_id!("3E9Qcm259vuxwyYK2hEBf6hArgBUbxn2fssS5e6Jdv5Z");

#[program]
pub mod hello {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
