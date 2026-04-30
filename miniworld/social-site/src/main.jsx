import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, Gamepad2, Home, Plus, Search, Sparkles, UserRound, UsersRound, X, MessageCircle, Trophy, Zap, UserPlus, Volume2, MoreHorizontal, ArrowLeft, Send, Tags, SmilePlus, DoorOpen, Heart, Bookmark, Play, Share2, Compass } from 'lucide-react';
import './styles.css';
import mainCharacterImage from './assets/main-character.png';
import avatar1 from './assets/avatars/avatar-1.png';
import avatar2 from './assets/avatars/avatar-2.png';
import avatar3 from './assets/avatars/avatar-3.png';
import avatar4 from './assets/avatars/avatar-4.png';
import avatar5 from './assets/avatars/avatar-5.png';
import avatar6 from './assets/avatars/avatar-6.png';
import mapCover1 from './assets/map-covers/map-cover-1.png';
import mapCover2 from './assets/map-covers/map-cover-2.png';
import mapCover3 from './assets/map-covers/map-cover-3.png';
import mapCover4 from './assets/map-covers/map-cover-4.png';
import mapCover5 from './assets/map-covers/map-cover-5.png';
import mapCover6 from './assets/map-covers/map-cover-6.png';

const svgData = svg => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const playIcon = svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="16" fill="#fff"/><path d="M18 14v20l17-10z" fill="#5865f2"/></svg>`);
const remixIcon = svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="16" fill="#fff"/><path d="M24 8l4.2 10.8L40 20l-9 7.6L33.8 40 24 33.2 14.2 40 17 27.6 8 20l11.8-1.2z" fill="#7c3aed"/></svg>`);

const friends = [
  { name: 'Mika', avatar: avatar1, status: 'online', color: '#ffe35d' },
  { name: 'Nono', avatar: avatar2, status: 'online', color: '#a78bfa' },
  { name: 'Kiki', avatar: avatar3, status: 'playing', color: '#67e8f9' },
  { name: 'Ari', avatar: avatar4, status: 'online', color: '#fb923c' },
  { name: 'Ben', avatar: avatar5, status: 'away', color: '#facc15' },
  { name: 'Luna', avatar: avatar6, status: 'online', color: '#c4b5fd' },
];

const friendMessages = [
  { name: 'Mika', avatar: avatar1, status: 'online', title: '正在 Sky Builder 建造世界', message: '刚刚完成了一座彩虹小屋，要来参观吗？', time: '现在', unread: 2, activity: '建造中' },
  { name: 'Nono', avatar: avatar2, status: 'online', title: '在线', message: '我发现了一个新的隐藏入口。', time: '3m', unread: 0, activity: '可聊天' },
  { name: 'Kiki', avatar: avatar3, status: 'playing', title: '正在 Squad Park 派对', message: '队伍还差 1 人，快来！', time: '12m', unread: 1, activity: '组队中' },
  { name: 'Ari', avatar: avatar4, status: 'online', title: '在线', message: '你的地图我点赞了，机关很好玩。', time: '1h', unread: 0, activity: '看动态' },
  { name: 'Ben', avatar: avatar5, status: 'away', title: '离开', message: '晚点一起跑 Block Rush。', time: '2h', unread: 0, activity: '暂离' },
  { name: 'Luna', avatar: avatar6, status: 'online', title: '在线', message: '发我你的房间号，我马上来。', time: '昨天', unread: 0, activity: '可邀请' },
  { name: '阿赤Saber', avatar: avatar1, status: 'online', title: '正在 萌萌恐险拍', message: '房间开好了，版本号 1.55.0，快来！', time: '昨天', unread: 3, activity: '邀请中' },
  { name: '糖果兔', avatar: avatar2, status: 'away', title: '离开', message: '我在整理皮肤搭配，晚点上线。', time: '2d', unread: 0, activity: '换装中' },
  { name: '方块小洛', avatar: avatar3, status: 'playing', title: '正在 跑酷挑战', message: '第三关有隐藏金币路线。', time: '2d', unread: 0, activity: '闯关中' },
  { name: '星海Builder', avatar: avatar4, status: 'online', title: '在线', message: '你上次做的机关门我想复刻一下。', time: '3d', unread: 0, activity: '可聊天' },
];

const quickTags = ['来我房间', '一起建造', '求带跑酷', '交换地图', '等我 5 分钟'];

const createInitialChatMessages = friend => [
  { from: 'friend', type: 'text', text: friend.message, time: friend.time },
  { from: 'me', type: 'text', text: `${friend.name}，等下要不要一起玩迷你世界？`, time: '16:19' },
  { from: 'friend', type: 'tag', text: friend.activity, time: '16:20' },
  { from: 'friend', type: 'text', text: friend.status === 'playing' ? '我这局快结束了，结束后一起组队。' : '可以呀，你把房间邀请发我。', time: '16:21' },
  { from: 'me', type: 'invite', roomName: '萌萌恐险拍', roomId: '2001945593', players: '1/6', version: '1.55.0', host: '兔美美', time: '16:23' },
];

const initialChatMessagesByFriend = Object.fromEntries(
  friendMessages.map(friend => [friend.name, createInitialChatMessages(friend)])
);

const gameInviteTemplate = {
  roomName: '萌萌恐险拍',
  roomId: '2001945593',
  players: '1/6',
  version: '1.55.0',
};

const ugcMaps = [
  { title: '云朵小镇跑酷', type: '跑酷', creator: 'Mika', avatar: avatar1, cover: mapCover1, likes: '8.6w', plays: '42.1w', comments: '1.2k', desc: '在漂浮云岛之间连续跳跃，终点藏着彩虹传送门。', tags: ['轻松', '多人', '3分钟'], difficulty: '简单' },
  { title: '萌宠家园建造赛', type: '建造', creator: 'Nono', avatar: avatar2, cover: mapCover2, likes: '5.4w', plays: '30.8w', comments: '864', desc: '给你的萌宠搭一个梦幻家园，好友可以一起装修。', tags: ['创造', '家园', '协作'], difficulty: '休闲' },
  { title: '废墟能量战场', type: '对抗', creator: 'Kiki', avatar: avatar3, cover: mapCover3, likes: '12.9w', plays: '88.2w', comments: '3.5k', desc: '争夺中心能量核心，占点、防守、反打都很关键。', tags: ['PVP', '组队', '热血'], difficulty: '中等' },
  { title: '樱花列车物语', type: '剧情', creator: 'Ari', avatar: avatar4, cover: mapCover4, likes: '7.1w', plays: '51.6w', comments: '952', desc: '坐上通往樱花岛的列车，解锁沿途 NPC 的小故事。', tags: ['剧情', '探索', '治愈'], difficulty: '休闲' },
  { title: '机关密室 24H', type: '解谜', creator: 'Ben', avatar: avatar5, cover: mapCover5, likes: '4.8w', plays: '23.7w', comments: '670', desc: '每个房间都有一个机关逻辑，适合和好友语音开黑。', tags: ['机关', '解谜', '双人'], difficulty: '困难' },
  { title: '糖果岛派对', type: '派对', creator: 'Luna', avatar: avatar6, cover: mapCover6, likes: '9.3w', plays: '62.4w', comments: '1.8k', desc: '随机小游戏轮换，最后一名会被糖果炮弹发射出去。', tags: ['派对', '随机', '欢乐'], difficulty: '简单' },
];

const feedTabs = ['Following', 'For You', 'Explore', 'New'];

const continueGames = [
  { title: 'Sky Builder', tag: '建造', cover: 'linear-gradient(135deg, #54d6ff, #2271ff 48%, #ffe76b)', players: '82.5k', progress: 68 },
  { title: 'Squad Park', tag: '派对', cover: 'linear-gradient(135deg, #8ff2c5, #3ba6ff 45%, #ffbd59)', players: '52.6k', progress: 42 },
  { title: 'Block Rush', tag: '竞速', cover: 'linear-gradient(135deg, #ff68d8, #7c3aed 50%, #22d3ee)', players: '42.6k', progress: 24 },
];

const recommended = [
  { title: '像素能量战场', desc: '和好友组队占领能量核心', metric: '9.6 热度', cover: 'linear-gradient(135deg, #231942, #5e60ce 42%, #ffbe0b)' },
  { title: '小镇创作者', desc: '一起搭建开放世界街区', metric: '新地图', cover: 'linear-gradient(135deg, #99f6e4, #60a5fa 50%, #fbbf24)' },
  { title: '萌宠冒险岛', desc: '收集伙伴并完成每日任务', metric: '好友在玩', cover: 'linear-gradient(135deg, #fef3c7, #f97316 45%, #22c55e)' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGame, setSelectedGame] = useState(continueGames[0]);
  const [showComposer, setShowComposer] = useState(false);
  const [toast, setToast] = useState('欢迎回来，继续你的创造旅程');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessagesByFriend, setChatMessagesByFriend] = useState(initialChatMessagesByFriend);
  const dragState = useRef({ active: false, startY: 0, scrollTop: 0 });

  const onlineCount = useMemo(() => friends.filter(friend => friend.status === 'online' || friend.status === 'playing').length, []);
  const currentChatMessages = selectedFriend ? chatMessagesByFriend[selectedFriend.name] ?? [] : [];

  const handleFriendClick = friend => {
    setToast(`${friend.name} ${friend.status === 'playing' ? '正在游戏中，可申请加入' : '在线，可以发起聊天'}`);
  };

  const handleTabClick = tab => {
    setActiveTab(tab);
    if (tab !== 'friends') {
      setSelectedFriend(null);
    }
    const labels = { home: '首页动态', games: '游戏大厅', create: '创建内容', friends: '好友列表', profile: '个人主页' };
    setToast(`已切换到${labels[tab]}`);
  };

  const handleDragStart = event => {
    dragState.current = {
      active: true,
      startY: event.clientY,
      scrollTop: event.currentTarget.scrollTop,
    };
    event.currentTarget.classList.add('dragging');
  };

  const handleDragMove = event => {
    if (!dragState.current.active) return;
    event.currentTarget.scrollTop = dragState.current.scrollTop - (event.clientY - dragState.current.startY);
  };

  const handleDragEnd = event => {
    dragState.current.active = false;
    event.currentTarget.classList.remove('dragging');
  };

  const appendMessageForSelectedFriend = message => {
    if (!selectedFriend) return;
    setChatMessagesByFriend(messagesByFriend => ({
      ...messagesByFriend,
      [selectedFriend.name]: [...(messagesByFriend[selectedFriend.name] ?? []), message],
    }));
  };

  const sendTextMessage = () => {
    const text = chatInput.trim();
    if (!text) return;
    appendMessageForSelectedFriend({ from: 'me', type: 'text', text, time: '刚刚' });
    setChatInput('');
  };

  const sendTagMessage = tag => {
    appendMessageForSelectedFriend({ from: 'me', type: 'tag', text: tag, time: '刚刚' });
    setToast(`已发送标签：${tag}`);
  };

  const sendGameInvite = () => {
    appendMessageForSelectedFriend({ from: 'me', type: 'invite', host: '兔美美', time: '刚刚', ...gameInviteTemplate });
    setToast('已发送游戏房间邀请');
  };

  const createGameRoom = () => {
    appendMessageForSelectedFriend({ from: 'me', type: 'invite', host: '兔美美', time: '刚刚', roomName: '空岛建造派对', roomId: '5208842026', players: '1/8', version: '1.55.0' });
    setToast('已创建房间并发送邀请');
  };

  return (
    <main className="app-shell">
      <section className={`phone-frame ${activeTab === 'friends' ? 'friends-mode' : ''} ${activeTab === 'home' ? 'feed-mode' : ''}`}>
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />

        <header className="top-bar">
          <div className="brand">
            <div className="brand-mark">M</div>
            <span>MiniCreata</span>
          </div>
          <div className="top-actions">
            <button aria-label="搜索"><Search size={20} /></button>
            <button aria-label="通知"><Bell size={20} /></button>
          </div>
        </header>

        {activeTab === 'profile' && (
          <>
            <section className="hero-card">
              <div className="mini-avatar-card">
                <div className="mini-avatar-image-wrap">
                  <img className="mini-avatar-image" src={mainCharacterImage} alt="兔美美主页头像" />
                </div>
                <div className="player-name">兔美美</div>
              </div>
              <div className="main-character-wrap">
                <div className="star-badge">★</div>
                <img className="main-character-image" src={mainCharacterImage} alt="游戏角色形象" />
              </div>
            </section>

            <section className="friends-row" aria-label="在线好友">
              {friends.map(friend => (
                <button className="friend" key={friend.name} onClick={() => handleFriendClick(friend)}>
                  <span className="friend-avatar" style={{ background: friend.color }}>
                    <img src={friend.avatar} alt={`${friend.name} 头像`} />
                  </span>
                  <span className={`status-dot ${friend.status}`} />
                </button>
              ))}
            </section>
          </>
        )}

        {activeTab === 'friends' ? (
          <section className="friends-page" aria-label="好友列表页">
            {selectedFriend ? (
              <section className="chat-page" aria-label="私聊界面">
                <div className="chat-header">
                  <button aria-label="返回好友列表" onClick={() => setSelectedFriend(null)}><ArrowLeft size={20} /></button>
                  <span className="message-avatar-wrap compact">
                    <img src={selectedFriend.avatar} alt={`${selectedFriend.name} 头像`} />
                    <span className={`message-status ${selectedFriend.status}`} />
                  </span>
                  <div>
                    <h1>{selectedFriend.name}</h1>
                    <p>{selectedFriend.title}</p>
                  </div>
                </div>

                <div
                  className="chat-scroll-area drag-scroll-area"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {currentChatMessages.map((message, index) => (
                    <div className={`chat-row ${message.from === 'me' ? 'mine' : 'theirs'}`} key={`${message.type}-${index}`}>
                      {message.from !== 'me' && <img className="chat-avatar" src={selectedFriend.avatar} alt={`${selectedFriend.name} 头像`} />}
                      <div className={`chat-bubble ${message.type}`}>
                        {message.type === 'invite' ? (
                          <div className="game-invite-card">
                            <div className="invite-cover"><span>?</span></div>
                            <div className="invite-info">
                              <p><strong>{message.host}</strong> 邀请你加入房间</p>
                              <p>房间名：<b>{message.roomName}</b></p>
                              <p>房间号：<em>{message.roomId}</em></p>
                              <p>人数：<em>{message.players}</em></p>
                              <p>版本号：<strong>{message.version}</strong></p>
                              <small>(对方游戏版本过低，请提醒对方更新游戏)</small>
                              <button onClick={() => setToast(`加入房间 ${message.roomId}`)}>加入房间</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span>{message.text}</span>
                            <small>{message.time}</small>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quick-action-row">
                  <button onClick={createGameRoom}><DoorOpen size={15} /> 创建房间</button>
                  <button onClick={sendGameInvite}><Gamepad2 size={15} /> 发送邀请</button>
                </div>

                <div className="quick-tags">
                  {quickTags.map(tag => <button key={tag} onClick={() => sendTagMessage(tag)}><Tags size={13} /> {tag}</button>)}
                </div>

                <div className="chat-input-bar">
                  <button onClick={() => sendTagMessage('表情: 开心') } aria-label="发送表情"><SmilePlus size={19} /></button>
                  <input
                    value={chatInput}
                    onChange={event => setChatInput(event.target.value)}
                    onKeyDown={event => { if (event.key === 'Enter') sendTextMessage(); }}
                    placeholder="给好友发送消息..."
                  />
                  <button onClick={sendTextMessage} aria-label="发送"><Send size={19} /></button>
                </div>
              </section>
            ) : (
              <>
                <div className="friends-page-header">
                  <div>
                    <p>Messages</p>
                    <h1>好友</h1>
                  </div>
                  <button aria-label="添加好友" onClick={() => setToast('打开添加好友入口')}><UserPlus size={21} /></button>
                </div>

                <div className="friends-search-row">
                  <div className="friends-search"><Search size={17} /><span>搜索好友或房间</span></div>
                  <button onClick={() => setToast('打开添加好友入口')}><UserPlus size={16} /> Add Friends</button>
                </div>

                <div
                  className="friends-scroll-area drag-scroll-area"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  <article className="party-card">
                    <div className="party-stack">
                      {friendMessages.slice(0, 3).map(friend => (
                        <img key={friend.name} src={friend.avatar} alt={`${friend.name} 头像`} />
                      ))}
                    </div>
                    <div className="party-info">
                      <h2>派对大厅、Ty1ermmz 和其他用户</h2>
                      <span>常规</span>
                    </div>
                    <button aria-label="语音"><Volume2 size={18} /></button>
                  </article>

                  <div className="friend-message-list">
                    {friendMessages.map(friend => {
                      const messages = chatMessagesByFriend[friend.name] ?? [];
                      const lastMessage = messages[messages.length - 1];
                      const previewText = lastMessage?.type === 'invite' ? '您: [游戏房间邀请]' : `${lastMessage?.from === 'me' ? '您: ' : ''}${lastMessage?.text ?? friend.message}`;

                      return (
                        <button className="friend-message-item" key={friend.name} onClick={() => setSelectedFriend(friend)}>
                          <span className="message-avatar-wrap">
                            <img src={friend.avatar} alt={`${friend.name} 头像`} />
                            <span className={`message-status ${friend.status}`} />
                          </span>
                          <span className="message-copy">
                            <span className="message-title-row">
                              <strong>{friend.name}</strong>
                              <em>{friend.activity}</em>
                            </span>
                            <span className="message-subtitle">{friend.title}</span>
                            <span className="message-text">{previewText}</span>
                          </span>
                          <span className="message-meta">
                            <span>{lastMessage?.time ?? friend.time}</span>
                            {friend.unread > 0 ? <b>{friend.unread}</b> : <MoreHorizontal size={18} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </section>
        ) : activeTab === 'profile' ? (
          <section className="home-tab-panel me-tab-panel" aria-label="个人主页页签">
            <div className="tab-handle">
              <span className="tab-indicator" />
              <span>我的主页</span>
            </div>

            <div className="toast-line">
              <Sparkles size={15} />
              <span>{toast}</span>
            </div>

            <section className="content-section">
              <div className="section-heading">
                <h2>Continue Playing</h2>
                <button onClick={() => setToast(`${onlineCount} 位好友在线`)}>在线 {onlineCount}</button>
              </div>
              <div className="game-strip">
                {continueGames.map(game => (
                  <article
                    className={`game-card ${selectedGame.title === game.title ? 'selected' : ''}`}
                    key={game.title}
                    onClick={() => {
                      setSelectedGame(game);
                      setToast(`准备继续游玩 ${game.title}`);
                    }}
                  >
                    <div className="game-cover" style={{ background: game.cover }}>
                      <Gamepad2 size={22} />
                      <span>{game.tag}</span>
                    </div>
                    <h3>{game.title}</h3>
                    <p>👁 {game.players}</p>
                    <div className="progress"><span style={{ width: `${game.progress}%` }} /></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section recommended-section">
              <div className="section-heading">
                <h2>Recommended</h2>
                <button onClick={() => setToast('已刷新推荐内容')}>换一批</button>
              </div>
              <div className="recommend-grid">
                {recommended.map(item => (
                  <article className="recommend-card" key={item.title} onClick={() => setToast(`打开推荐：${item.title}`)}>
                    <div className="recommend-cover" style={{ background: item.cover }}>
                      <Zap size={24} />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      <span>{item.metric}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        ) : (
          <section className="ugc-feed-page" aria-label="UGC 地图推荐流">
            <div className="feed-top-tabs">
              {feedTabs.map(tab => <button className={tab === 'For You' ? 'active' : ''} key={tab}>{tab}</button>)}
            </div>

            <div
              className="ugc-feed-scroll drag-scroll-area"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {ugcMaps.map((map, index) => (
                <article className="ugc-feed-card" key={map.title}>
                  <img className="ugc-cover" src={map.cover} alt={`${map.title} 地图封面`} />
                  <div className="ugc-cover-shade" />
                  <div className="ugc-primary-actions">
                    <button onClick={() => setToast(`一键开始：${map.title}`)}><img src={playIcon} alt="一键游戏" className="action-icon" /> 一键游戏</button>
                    <button onClick={() => setToast(`基于 ${map.title} 开始二次创作`)}><img src={remixIcon} alt="二次创作" className="action-icon" /> 二次创作</button>
                  </div>
                  <div className="ugc-type-pill"><Compass size={14} /> {map.type}</div>
                  <button className="ugc-play-button" onClick={() => setToast(`开始游玩：${map.title}`)} aria-label={`游玩 ${map.title}`}><Play size={34} fill="currentColor" /></button>
                  <aside className="ugc-side-actions">
                    <button onClick={() => setToast(`点赞 ${map.title}`)}><Heart size={22} /><span>{map.likes}</span></button>
                    <button onClick={() => setToast(`收藏 ${map.title}`)}><Bookmark size={22} /><span>收藏</span></button>
                    <button onClick={() => setToast(`分享 ${map.title}`)}><Share2 size={22} /><span>分享</span></button>
                  </aside>
                  <div className="ugc-feed-copy">
                    <div className="creator-row">
                      <img src={map.avatar} alt={`${map.creator} 头像`} />
                      <span>@{map.creator}</span>
                      <button onClick={() => setToast(`关注 ${map.creator}`)}>关注</button>
                    </div>
                    <h2>{map.title}</h2>
                    <p>{map.desc}</p>
                    <div className="ugc-tag-row">
                      {map.tags.map(tag => <span key={tag}>#{tag}</span>)}
                    </div>
                    <div className="ugc-meta-row">
                      <span>游玩 {map.plays}</span>
                      <span>评论 {map.comments}</span>
                      <span>难度 {map.difficulty}</span>
                    </div>
                  </div>
                  {index === 0 && <div className="feed-scroll-hint">上下滑动发现更多地图</div>}
                </article>
              ))}
            </div>
          </section>
        )}

        <nav className="bottom-nav" aria-label="主导航">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}><Home size={21} /><span>Home</span></button>
          <button className={activeTab === 'games' ? 'active' : ''} onClick={() => handleTabClick('games')}><Trophy size={21} /><span>Games</span></button>
          <button className="create-button" onClick={() => setShowComposer(true)} aria-label="创建"><Plus size={30} /></button>
          <button className={activeTab === 'friends' ? 'active' : ''} onClick={() => handleTabClick('friends')}><UsersRound size={21} /><span>Friends</span></button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}><UserRound size={21} /><span>Me</span></button>
        </nav>

        {showComposer && (
          <div className="sheet-backdrop" onClick={() => setShowComposer(false)}>
            <section className="composer-sheet" onClick={event => event.stopPropagation()}>
              <div className="sheet-header">
                <h2>创建新内容</h2>
                <button onClick={() => setShowComposer(false)} aria-label="关闭"><X size={20} /></button>
              </div>
              <button className="composer-option" onClick={() => { setToast('选择：发布游戏动态'); setShowComposer(false); }}>
                <MessageCircle size={22} />
                <div><strong>发布动态</strong><span>分享截图、成就或组队邀请</span></div>
              </button>
              <button className="composer-option" onClick={() => { setToast('选择：创建游戏房间'); setShowComposer(false); }}>
                <Gamepad2 size={22} />
                <div><strong>创建房间</strong><span>邀请好友一起游玩</span></div>
              </button>
              <button className="composer-option" onClick={() => { setToast('选择：上传创作地图'); setShowComposer(false); }}>
                <Sparkles size={22} />
                <div><strong>上传地图</strong><span>发布你的 UGC 世界</span></div>
              </button>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
