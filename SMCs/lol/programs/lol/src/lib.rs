use anchor_lang::prelude::*;

declare_id!("9SYrpNx8Tp8evW4A1SXuiS1nisPwhQt7d8x6XF8j1PoS");

#[program]
pub mod lol {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
