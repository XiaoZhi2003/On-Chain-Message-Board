declare module '@solana/wallet-adapter-react-ui/styles.css' {
    const content: any;
    export default content;
}

// 或者更省事的做法，允许导入所有 css
declare module "*.css";