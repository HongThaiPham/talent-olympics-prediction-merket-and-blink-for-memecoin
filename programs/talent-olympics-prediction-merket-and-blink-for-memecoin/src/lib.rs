pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("Bfd7dybd1TGncaCLs4UnRy5kK5jPYoH51FxSpkBP9ZjC");

#[program]
pub mod talent_olympics_prediction_merket_and_blink_for_memecoin {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }
}
