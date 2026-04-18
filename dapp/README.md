# On Chain Message Board

这是一个基于 Solana 区块链的去中心化留言板。用户可以支付少量gas在链上发布自己的个人感言，并支持随时修改留言内容。

## 🌟 项目特性
- **唯一性**: 每个钱包地址通过 PDA (Program Derived Address) 拥有一个唯一的留言账号。
- **权限控制**: 只有留言的作者（签名者）才有权修改其留言内容。
- **透明性**: 所有留言数据公开存储在 Solana Devnet 测试网上。
- **高效存储**: 采用 Anchor 框架优化账户空间分配。

## 🛠️ 技术栈
- **语言**: Rust
- **开发框架**: [Anchor Framework](https://www.anchor-lang.com/)
- **网络**: Solana Devnet
- **工具**: Solana CLI, Node.js, Yarn/NPM

## 📂 项目结构
- `programs/solana-wall/src/lib.rs`: 核心逻辑实现（初始化留言、更新留言）。
- `migrations/`: 程序部署脚本。

## 🚀 快速开始

### 1. 克隆并安装依赖
```bash
git clone https://github.com/XiaoZhi2003/On-Chain-Message-Board
npm install
cd on-chain-message-board
```

### 2. 编译并部署
```bash
cd dapp
cd anchor
anchor build
anchor deploy
```
### 3. 启动
```bash
cd dapp
npm run dev
```
