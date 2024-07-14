use anchor_lang::prelude::*;
use anchor_spl::token_interface::Mint;

use crate::{Prediction, PREDICTION_SEED};

#[derive(Accounts)]
pub struct CheckResult<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account()]
    pub mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(
        mut,
        seeds = [PREDICTION_SEED, mint.key().as_ref(), signer.key().as_ref()],
        bump,
        close = signer
    )]
    pub prediction: Account<'info, Prediction>,
}

impl<'info> CheckResult<'info> {
    pub fn handler(&mut self) -> Result<()> {
        // TODO: Implement check result by call Pyth oracle
        msg!("Check result");
        Ok(())
    }
}
