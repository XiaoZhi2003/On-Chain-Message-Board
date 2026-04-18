// dapp/app/components/BoardInput.tsx
'use client';

import { useState } from 'react';
import { useBoard } from '../lib/hooks/use-board';

export const BoardInput = () => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { sendPost } = useBoard();

  const handleSend = async () => {
    if (!text.trim()) return;
    setIsSending(true);
    try {
      await sendPost(text);
      setText(''); // 清空输入框
      // 发送成功后，页面通常会自动通过 useBoard 里的 reload 刷新
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="glass-card p-6 border-t-2 border-t-purple-500/50">
      <textarea 
        className="input-field min-h-[120px] mb-4 text-lg"
        placeholder="写下你的链上留言..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSending}
      />
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 italic">
          * 每个钱包地址仅支持存储一条留言，再次发送将覆盖旧内容。
        </p>
        <button 
          onClick={handleSend}
          disabled={isSending || !text.trim()}
          className={`btn-primary flex items-center gap-2 ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSending ? (
            <>
              <span className="animate-spin text-lg">⌛</span> 正在上链...
            </>
          ) : (
            '发送到 Solana'
          )}
        </button>
      </div>
    </div>
  );
};