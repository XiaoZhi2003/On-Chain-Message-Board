// dapp/app/components/MessageList.tsx
'use client';

import { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import { PROGRAM_ID } from '../../constants';
import idl from '../lib/idl.json';

export const MessageList = () => {
  const { connection } = useConnection();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const provider = new anchor.AnchorProvider(connection, {} as any, {});
      const program = new anchor.Program(idl as any, provider) as any;
      
      // 获取链上所有 Post 账号
      const allPosts = await program.account.post.all();
      
      // 排序：时间戳从大到小（最新在前）
      const sorted = allPosts.sort((a: any, b: any) => 
        b.account.timestamp.toNumber() - a.account.timestamp.toNumber()
      );

      setMessages(sorted);
    } catch (err) {
      console.error("读取链上数据失败:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // 自动轮询：每 5 秒同步一次，解决“发送后看不到”的问题
    const timer = setInterval(fetchMessages, 5000);
    return () => clearInterval(timer);
  }, [connection]);

  if (loading && messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 animate-pulse">正在从链上读取数据...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {messages.length === 0 ? (
        <div className="text-center py-20 glass-card bg-white/2">
          <p className="text-gray-500 italic">还没有人留言，去抢个沙发吧！</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className="glass-card p-6 flex gap-4 group hover:bg-white/10 transition-all">
            {/* 左侧：模拟头像 */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
                👤
              </div>
            </div>
            
            {/* 右侧：内容 */}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-sm text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                  {msg.account.author.toString().slice(0, 4)}...{msg.account.author.toString().slice(-4)}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {new Date(msg.account.timestamp.toNumber() * 1000).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-200 leading-relaxed break-words">
                {msg.account.content}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};