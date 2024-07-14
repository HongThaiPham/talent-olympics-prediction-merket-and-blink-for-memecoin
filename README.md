# Prediction Market & Blink for Memecoins

### SOLANA - The Talent Olympics

## Introduction

Using binary option models, create a prediction market for Solana meme coin prices. Users should be able to predict if a meme coin price will end higher or lower within a specified timeframe.

## Features

- Make a prediction for meme price
- Close prediction
- Check result with oracle

## How to use

### Install the required dependencies:

- Rust
- Solana CLI
- Anchor

### Clone the repository:

```bash
git clone git@github.com:HongThaiPham/talent-olympics-prediction-merket-and-blink-for-memecoin.git

cd talent-olympics-prediction-merket-and-blink-for-memecoin
```

### Build the program:

```bash
anchor build
```

### Run the tests:

```bash
anchor test
```

Test case:

- [x] should create a new prediction market failt because predict in past
- [x] should create a new prediction market successfully
- [x] should close prediction market successfully
- [x] should check prediction result successfully

### Deploy the program:

```bash
anchor deploy
```

## Video demo

[![Watch the video](https://cdn.loom.com/sessions/thumbnails/e99fa56d52354a18b6a2db254a600ce8-with-play.gif)](https://www.loom.com/share/e99fa56d52354a18b6a2db254a600ce8)
