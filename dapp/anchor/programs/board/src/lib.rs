use anchor_lang::prelude::*;

// 这是你的程序 ID，部署时需要替换为通过 `solana address -k target/deploy/vault-keypair.json` 生成的 ID
declare_id!("CTEnUDC6gQMdKC5L7hNv9PGGKfCqpQbzXnV2r8odmgvN");

#[program]
pub mod board {
    use super::*;

    // 初始化留言账号：每个用户只能通过自己的钱包地址派生出一个唯一的留言板
    pub fn initialize_post(ctx: Context<InitializePost>, content: String) -> Result<()> {
        let post = &mut ctx.accounts.post;
        post.author = *ctx.accounts.user.key;
        post.content = content;
        post.timestamp = Clock::get()?.unix_timestamp;
        
        msg!("留言已成功发送！时间戳: {}", post.timestamp);
        Ok(())
    }

    // 更新留言内容
    pub fn update_post(ctx: Context<UpdatePost>, new_content: String) -> Result<()> {
        let post = &mut ctx.accounts.post;
        post.content = new_content;
        post.timestamp = Clock::get()?.unix_timestamp;
        
        msg!("留言内容已更新！");
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(content: String)]
pub struct InitializePost<'info> {
    // PDA 派生规则：[b"comment", 用户的公钥]
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 4 + 200 + 8, // 8(Anchor基础) + 32(作者公钥) + 4(String前缀) + 200(内容) + 8(时间戳)
        seeds = [b"comment", user.key().as_ref()],
        bump
    )]
    pub post: Account<'info, Post>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePost<'info> {
    #[account(
        mut,
        seeds = [b"comment", user.key().as_ref()],
        bump,
        // 这里改用这行，手动指定匹配 Post 里的 author 字段
        constraint = post.author == user.key() 
    )]
    pub post: Account<'info, Post>,
    pub user: Signer<'info>,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub content: String,
    pub timestamp: i64,
}