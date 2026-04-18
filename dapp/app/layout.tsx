'use client';

// 1. 必须最先注入 Polyfill，确保后续库加载时 Buffer 已存在
import { Buffer } from 'buffer';
import process from 'process';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.process = process;
}

// 2. 导入样式（适配 v4 的 globals.css）
import './globals.css';

// 3. 导入业务组件
import { WalletProvider } from './components/WalletProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* v4 建议将背景色直接写在 globals.css 的 body 标签里，
        这里保留 bg-black 以防万一，但主要样式会由 CSS 驱动 
      */}
      <body className="bg-black antialiased">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}