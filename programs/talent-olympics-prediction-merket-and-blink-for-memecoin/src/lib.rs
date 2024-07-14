pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
use instructions::*;
pub use state::*;

declare_id!("Bfd7dybd1TGncaCLs4UnRy5kK5jPYoH51FxSpkBP9ZjC");

#[program]
pub mod talent_olympics_prediction_merket_and_blink_for_memecoin {
    use super::*;

    pub fn make_predict(
        ctx: Context<MakePredict>,
        start_time: i64,
        end_time: i64,
        direction: u8,
    ) -> Result<()> {
        ctx.accounts.handler(start_time, end_time, direction)
    }

    pub fn close_prediction(ctx: Context<ClosePrediction>) -> Result<()> {
        ctx.accounts.handler()
    }

    pub fn check_result(ctx: Context<CheckResult>) -> Result<()> {
        ctx.accounts.handler()
    }
}
