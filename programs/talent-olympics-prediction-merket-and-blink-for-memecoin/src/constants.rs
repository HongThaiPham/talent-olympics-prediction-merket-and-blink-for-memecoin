use anchor_lang::prelude::*;

pub const DISCRIMINATOR_SIZE: usize = std::mem::size_of::<u64>();

#[constant]
pub const PREDICTION_SEED: &[u8] = b"prediction";
