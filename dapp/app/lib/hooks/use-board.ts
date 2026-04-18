import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import { PROGRAM_ID } from '../../../constants';
import idl from '../idl.json';

export function useBoard() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const sendPost = async (content: string) => {
    if (!wallet.publicKey) {
      alert("请先连接钱包！");
      return;
    }

    const provider = new anchor.AnchorProvider(
      connection,
      wallet as any,
      anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(idl as any, provider);

    try {
      // 1. 计算 PDA 地址
      const [postPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("comment"), wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );

      // 2. 预检账户状态
      const postAccount = await connection.getAccountInfo(postPda);
      
      let tx;
      if (!postAccount) {
        console.log("正在初始化留言...");
        tx = await program.methods
          .initializePost(content)
          .accounts({
            post: postPda,
            user: wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          } as any)
          .rpc();
      } else {
        console.log("正在更新留言...");
        tx = await program.methods
          .updatePost(content)
          .accounts({
            post: postPda,
            user: wallet.publicKey,
          } as any)
          .rpc();
      }

      console.log("交易签名:", tx);
      // 这里的 alert 会在确认成功后弹出
      alert(postAccount ? "✅ 留言已更新！" : "🚀 留言已发布！");
      window.location.reload(); 

    } catch (err: any) {
      const errorMsg = err.toString();

      // ✅ 修复：拦截“已经处理过”的报错
      if (errorMsg.includes("already been processed")) {
        console.warn("交易重复提交，但链上已确认成功。");
        window.location.reload();
        return;
      }

      // 处理用户取消签名
      if (errorMsg.includes("User rejected")) {
        console.log("用户取消签名");
        return;
      }

      console.error("操作失败，详细信息:", err);
      alert(`操作失败: ${err.message || "请检查控制台日志"}`);
    }
  };

  /**
   * 💡 额外赠送：如果你的合约后续加入了关闭账户的指令，
   * 你可以调用这个函数来退回你的存储费（Rent）
   */
  const deletePost = async () => {
    if (!wallet.publicKey) return;
    const provider = new anchor.AnchorProvider(connection, wallet as any, {});
    const program = new anchor.Program(idl as any, provider);

    try {
      const [postPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("comment"), wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );

      // 注意：此处的 'deletePost' 需对应你合约里的删除方法名
      const tx = await program.methods
        .deletePost() 
        .accounts({
          post: postPda,
          user: wallet.publicKey,
        } as any)
        .rpc();

      alert("留言已删除，租金已退回钱包！");
      window.location.reload();
    } catch (err) {
      console.error("删除失败:", err);
    }
  };

  return { sendPost, deletePost };
}