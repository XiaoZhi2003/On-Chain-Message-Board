# On-Chain Message Board

A decentralized message board built on the Solana blockchain. Users can publish their personal thoughts on-chain by paying a minimal gas fee, with the flexibility to update their messages at any time.

## 🌟 Key Features
- **Account Uniqueness**: Each wallet address owns a unique message account derived via **PDA (Program Derived Address)**.
- **Strict Access Control**: Only the original author (signer) of a message has the authority to modify its content.
- **Transparency & Immutability**: All message data is publicly stored and verified on the **Solana Devnet**.
- **Optimized Storage**: Built with the **Anchor Framework** to ensure efficient account space allocation and rent management.

## 🛠️ Tech Stack
- **Smart Contract**: Rust
- **Framework**: [Anchor Framework](https://www.anchor-lang.com/)
- **Network**: Solana Devnet
- **Frontend Interfacing**: @solana/web3.js, @coral-xyz/anchor
- **Tools**: Solana CLI, Node.js, Yarn/NPM

## 📂 Project Structure
- `programs/solana-wall/src/lib.rs`: Core program logic (Initialize Post, Update Post).
- `dapp/`: Frontend React/Next.js application using Tailwind CSS v4.
- `migrations/`: Deployment and initialization scripts.

## 🚀 Quick Start

### 1. Clone and Install Dependencies
```bash
git clone [https://github.com/XiaoZhi2003/On-Chain-Message-Board](https://github.com/XiaoZhi2003/On-Chain-Message-Board)
cd On-Chain-Message-Board/dapp
npm install
```
### 2. Build and Deploy Smart Contract
```bash
cd anchor
anchor build
anchor deploy
```

### 3. Launch Frontend Application
```bash
cd ..
npm run dev
```