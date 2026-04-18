'use client';

import { useEffect, useState } from 'react'; // 导入 hook
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { BoardInput } from './components/BoardInput';
import { MessageList } from './components/MessageList';

export default function Page() {
  // 1. 声明挂载状态
  const [mounted, setMounted] = useState(false);

  // 2. 在 useEffect 中设置已挂载，这只会在浏览器端执行
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          On-chain Message Board
        </h1>
        
        {/* 3. 只有挂载后才渲染钱包按钮，防止 SSR 冲突 */}
        {mounted && <WalletMultiButton />}
      </nav>

      <div className="max-w-2xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📝</span> 发布留言
          </h2>
          <BoardInput />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>🌍</span> 最近留言
          </h2>
          <MessageList />
        </section>
      </div>
    </main>
  );
}