import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Bell, Bookmark, Bot, Compass, DoorOpen, Gamepad2, Heart, Home, MessageCircle, MoreHorizontal, Play, Plus, Search, Send, Share2, SmilePlus, Sparkles, Tags, ThumbsUp, Trophy, UserPlus, UserRound, Users, UsersRound, Volume2, X, Zap } from 'lucide-react';
import './styles.css';
import homeHeroAvatar from './assets/avatar/avatar-hero.png';
import homeMiniAvatar from './assets/avatar/avatar-mini.png';
import avatarIcon01 from './assets/avatar-icons/icon-01.png';
import avatarIcon02 from './assets/avatar-icons/icon-02.png';
import avatarIcon03 from './assets/avatar-icons/icon-03.png';
import avatarIcon04 from './assets/avatar-icons/icon-04.png';
import avatarIcon05 from './assets/avatar-icons/icon-05.png';
import avatarIcon06 from './assets/avatar-icons/icon-06.png';
import avatarIcon07 from './assets/avatar-icons/icon-07.png';
import role01 from './assets/avatars-hero/role-01.png';
import role02 from './assets/avatars-hero/role-02.png';
import role03 from './assets/avatars-hero/role-03.png';
import role04 from './assets/avatars-hero/role-04.png';
import role05 from './assets/avatars-hero/role-05.png';
import role06 from './assets/avatars-hero/role-06.png';
import role07 from './assets/avatars-hero/role-07.png';
import mapIcon01 from './assets/map-icons/mapicon-01.png';
import mapIcon02 from './assets/map-icons/mapicon-02.png';
import mapIcon03 from './assets/map-icons/mapicon-03.png';
import mapIcon04 from './assets/map-icons/mapicon-04.png';
import mapIcon05 from './assets/map-icons/mapicon-05.png';
import mapIcon06 from './assets/map-icons/mapicon-06.png';
import mapIcon07 from './assets/map-icons/mapicon-07.jpg';
import avatar1 from './assets/avatars/avatar-1.png';
import avatar2 from './assets/avatars/avatar-2.png';
import avatar3 from './assets/avatars/avatar-3.png';
import avatar4 from './assets/avatars/avatar-4.png';
import avatar5 from './assets/avatars/avatar-5.png';
import avatar6 from './assets/avatars/avatar-6.png';
import mapCover1 from './assets/map-covers/map-cover-1.jpg';
import mapCover2 from './assets/map-covers/map-cover-2.jpg';
import mapCover3 from './assets/map-covers/map-cover-3.jpeg';
import mapCover4 from './assets/map-covers/map-cover-4.jpg';
import mapCover5 from './assets/map-covers/map-cover-5.jpg';
import mapCover6 from './assets/map-covers/map-cover-6.jpg';
import playIcon from './assets/icons/Frame 8507.png';
import remixIcon from './assets/icons/Frame 8508.png';
import closeIcon from './assets/icons/Component 177.png';
import expertBadge from './assets/icons/image 58.png';
import communityBadge from './assets/icons/image 61.png';
import socialGroupHero from './assets/icons/social-group-hero.png';
import previewVideo1 from './assets/videos/preview-1.mp4';
import previewVideo2 from './assets/videos/preview-2.mp4';
import previewVideo3 from './assets/videos/preview-3.mp4';
import previewVideo4 from './assets/videos/preview-4.mp4';
import previewVideo5 from './assets/videos/preview-5.mp4';
import previewVideo6 from './assets/videos/preview-6.mp4';
import groupCover1 from './assets/group-covers/group-cover-1.png';
import groupCover2 from './assets/group-covers/group-cover-2.png';
import groupCover3 from './assets/group-covers/group-cover-3.png';
import groupCover4 from './assets/group-covers/group-cover-4.png';
import groupCover5 from './assets/group-covers/group-cover-5.png';
import groupCover6 from './assets/group-covers/group-cover-6.png';

const svgData = svg => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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

/** 详情页「好友推荐」演示数据（Steam 式社交证明） */
const mapFriendActivityByTitle = {
  '云朵小镇跑酷': { recommend: 4, played: 12, recommendAvatars: [avatar1, avatar2, avatar3], playedAvatars: [avatar2, avatar3, avatar4, avatar5, avatar6] },
  '萌宠家园建造赛': { recommend: 6, played: 9, recommendAvatars: [avatar2, avatar3, avatar4], playedAvatars: [avatar1, avatar3, avatar5] },
  '废墟能量战场': { recommend: 3, played: 18, recommendAvatars: [avatar3, avatar1], playedAvatars: [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6] },
  '樱花列车物语': { recommend: 5, played: 7, recommendAvatars: [avatar4, avatar5, avatar6], playedAvatars: [avatar2, avatar4, avatar6] },
  '机关密室 24H': { recommend: 2, played: 5, recommendAvatars: [avatar5, avatar6], playedAvatars: [avatar1, avatar5, avatar3] },
  '糖果岛派对': { recommend: 7, played: 15, recommendAvatars: [avatar6, avatar1, avatar2, avatar3], playedAvatars: [avatar1, avatar2, avatar3, avatar4, avatar5] },
};

const getMapFriendActivity = title => mapFriendActivityByTitle[title] ?? {
  recommend: 3,
  played: 8,
  recommendAvatars: [avatar1, avatar2],
  playedAvatars: [avatar2, avatar3, avatar4],
};

const ugcMaps = [
  { title: '云朵小镇跑酷', type: '跑酷', creator: 'Mika', avatar: avatar1, cover: mapCover1, video: previewVideo1, likes: '8.6w', plays: '42.1w', comments: '1.2k', desc: '在漂浮云岛之间连续跳跃，终点藏着彩虹传送门。', tags: ['轻松', '多人', '3分钟'], difficulty: '简单' },
  { title: '萌宠家园建造赛', type: '建造', creator: 'Nono', avatar: avatar2, cover: mapCover2, video: previewVideo2, likes: '5.4w', plays: '30.8w', comments: '864', desc: '给你的萌宠搭一个梦幻家园，好友可以一起装修。', tags: ['创造', '家园', '协作'], difficulty: '休闲' },
  { title: '废墟能量战场', type: '对抗', creator: 'Kiki', avatar: avatar3, cover: mapCover3, video: previewVideo3, likes: '12.9w', plays: '88.2w', comments: '3.5k', desc: '争夺中心能量核心，占点、防守、反打都很关键。', tags: ['PVP', '组队', '热血'], difficulty: '中等' },
  { title: '樱花列车物语', type: '剧情', creator: 'Ari', avatar: avatar4, cover: mapCover4, video: previewVideo4, likes: '7.1w', plays: '51.6w', comments: '952', desc: '坐上通往樱花岛的列车，解锁沿途 NPC 的小故事。', tags: ['剧情', '探索', '治愈'], difficulty: '休闲' },
  { title: '机关密室 24H', type: '解谜', creator: 'Ben', avatar: avatar5, cover: mapCover5, video: previewVideo5, likes: '4.8w', plays: '23.7w', comments: '670', desc: '每个房间都有一个机关逻辑，适合和好友语音开黑。', tags: ['机关', '解谜', '双人'], difficulty: '困难' },
  { title: '糖果岛派对', type: '派对', creator: 'Luna', avatar: avatar6, cover: mapCover6, video: previewVideo6, likes: '9.3w', plays: '62.4w', comments: '1.8k', desc: '随机小游戏轮换，最后一名会被糖果炮弹发射出去。', tags: ['派对', '随机', '欢乐'], difficulty: '简单' },
];

const feedTabs = ['Following', 'For You', 'Explore', 'New'];

const continueGames = [
  { title: 'Sky Builder', tag: '建造', coverImage: mapIcon01, players: '82.5k', progress: 68 },
  { title: 'Squad Park', tag: '派对', coverImage: mapIcon02, players: '52.6k', progress: 42 },
  { title: 'Block Rush', tag: '竞速', coverImage: mapIcon03, players: '42.6k', progress: 24 },
];

const recommended = [
  { title: '像素能量战场', desc: '和好友组队占领能量核心', metric: '9.6 热度', coverImage: mapIcon04 },
  { title: '小镇创作者', desc: '一起搭建开放世界街区', metric: '新地图', coverImage: mapIcon05 },
  { title: '萌宠冒险岛', desc: '收集伙伴并完成每日任务', metric: '好友在玩', coverImage: mapIcon06 },
];

const friendDirectoryTags = ['全部好友', '王者荣耀', '王者荣耀世界', '王者万'];

const socialGroups = [
  { title: '方块搭子局', count: '6690人', coverImage: groupCover1, badge: '新群' },
  { title: '开黑交友营', count: '1865人', coverImage: groupCover2, badge: '新群' },
  { title: '冒险小队', count: '10万人+', coverImage: groupCover3 },
  { title: '语音找搭子', count: '10万人+', coverImage: groupCover4 },
  { title: '派对扩列厅', count: '10万人+', coverImage: groupCover5 },
  { title: 'CP 甜甜圈', count: '10万人+', coverImage: groupCover6 },
  { title: '夜聊树洞', count: '', coverImage: groupCover1 },
  { title: '新人交友营', count: '', coverImage: groupCover2 },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lastNonAiTab, setLastNonAiTab] = useState('home');
  const [selectedGame, setSelectedGame] = useState(continueGames[0]);
  const [showComposer, setShowComposer] = useState(false);
  const [toast, setToast] = useState('欢迎回来，继续你的创造旅程');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { from: 'ai', text: "I'm Mini World’s intelligent AI assistant. How can I help you today?" },
  ]);
  const [aiHasInteracted, setAiHasInteracted] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedMapForDetail, setSelectedMapForDetail] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessagesByFriend, setChatMessagesByFriend] = useState(initialChatMessagesByFriend);
  const [likedMaps, setLikedMaps] = useState(new Set());
  const [bookmarkedMaps, setBookmarkedMaps] = useState(new Set());
  const [followedCreators, setFollowedCreators] = useState(new Set());
  const [friendsSection, setFriendsSection] = useState('directory'); // directory | messages | social | groups
  const [directoryTag, setDirectoryTag] = useState(friendDirectoryTags[0]);
  const [playingPreview, setPlayingPreview] = useState(null);
  const previewVideoRefs = useRef({});
  const [pauseFlash, setPauseFlash] = useState(null);
  const pauseFlashTimerRef = useRef(null);

  const avatarIconRowRef = useRef(null);
  const avatarIconDragRef = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0, pointerId: null });

  const avatarIconOptions = useMemo(() => ([
    { id: '01', src: avatarIcon01 },
    { id: '02', src: avatarIcon02 },
    { id: '03', src: avatarIcon03 },
    { id: '04', src: avatarIcon04 },
    { id: '05', src: avatarIcon05 },
    { id: '06', src: avatarIcon06 },
    { id: '07', src: avatarIcon07 },
  ]), []);
  const [selectedAvatarIconId, setSelectedAvatarIconId] = useState('04');
  const roleAvatarOptions = useMemo(() => ({
    '01': role01,
    '02': role02,
    '03': role03,
    '04': role04,
    '05': role05,
    '06': role06,
    '07': role07,
  }), []);
  const selectedRoleAvatar = roleAvatarOptions[selectedAvatarIconId] ?? role04;

  const toggleFollow = (creator) => {
    setFollowedCreators(prev => {
      const next = new Set(prev);
      if (next.has(creator)) next.delete(creator);
      else next.add(creator);
      return next;
    });
  };

  const toggleLike = (title) => {
    setLikedMaps(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const toggleBookmark = (title) => {
    setBookmarkedMaps(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const dragState = useRef({ active: false, startY: 0, scrollTop: 0 });

  const onlineFriends = useMemo(
    () => friends.filter(friend => friend.status === 'online' || friend.status === 'playing'),
    []
  );
  const onlineCount = onlineFriends.length;
  const currentChatMessages = selectedFriend ? chatMessagesByFriend[selectedFriend.name] ?? [] : [];

  const continueGameDetailByTitle = useMemo(() => ({
    'Sky Builder': {
      title: 'Sky Builder',
      type: '建造',
      creator: 'Mika',
      avatar: avatar1,
      cover: mapCover1,
      video: previewVideo1,
      likes: '4.2w',
      plays: '82.5k',
      comments: '612',
      desc: '在天空岛上建造你的创意基地，邀请好友一起搭桥、布置机关与装饰。',
      tags: ['创造', '多人', '轻松'],
      difficulty: '休闲',
    },
    'Squad Park': {
      title: 'Squad Park',
      type: '派对',
      creator: 'Kiki',
      avatar: avatar3,
      cover: mapCover2,
      video: previewVideo2,
      likes: '3.1w',
      plays: '52.6k',
      comments: '488',
      desc: '派对小游戏轮换，支持快速组队加入，适合语音开黑与休闲社交。',
      tags: ['派对', '随机', '欢乐'],
      difficulty: '简单',
    },
    'Block Rush': {
      title: 'Block Rush',
      type: '竞速',
      creator: 'Ari',
      avatar: avatar4,
      cover: mapCover3,
      video: previewVideo3,
      likes: '5.6w',
      plays: '42.6k',
      comments: '735',
      desc: '极限冲刺与躲避障碍的竞速挑战，冲进排行榜拿下最快记录。',
      tags: ['竞速', '反应', '挑战'],
      difficulty: '中等',
    },
  }), []);

  const nameCollator = useMemo(() => {
    try {
      return new Intl.Collator(['zh-Hans-CN', 'zh-CN', 'en'], { sensitivity: 'base' });
    } catch {
      return new Intl.Collator(undefined, { sensitivity: 'base' });
    }
  }, []);

  const friendDirectoryGroups = useMemo(() => {
    const sorted = [...friendMessages].sort((a, b) => nameCollator.compare(a.name, b.name));
    const groups = new Map();
    sorted.forEach(friend => {
      const first = friend.name?.trim()?.[0] ?? '#';
      const letter = /[A-Za-z]/.test(first) ? first.toUpperCase() : '#';
      if (!groups.has(letter)) groups.set(letter, []);
      groups.get(letter).push(friend);
    });
    return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [nameCollator]);

  const handleFriendClick = friend => {
    setToast(`${friend.name} ${friend.status === 'playing' ? '正在游戏中，可申请加入' : '在线，可以发起聊天'}`);
  };

  const handleTabClick = tab => {
    setActiveTab(tab);
    if (tab !== 'friends') {
      setSelectedFriend(null);
    }
    if (tab === 'friends') {
      setFriendsSection('directory');
      setDirectoryTag(friendDirectoryTags[0]);
    }
    const labels = { home: '首页动态', games: '游戏大厅', create: '创建内容', friends: '好友列表', profile: '个人主页' };
    setToast(`已切换到${labels[tab]}`);
  };

  const toggleAiMode = () => {
    setActiveTab(prev => {
      if (prev === 'ai') {
        // Return to the tab user was on before entering AI.
        return lastNonAiTab ?? 'home';
      }
      return 'ai';
    });
    // When leaving AI, ensure the previous window is visible/expanded.
    if (activeTab === 'ai' && (lastNonAiTab ?? 'home') === 'home') {
      setHomeSheetY(0);
    }
  };

  const sendAiMessage = () => {
    const text = aiInput.trim();
    if (!text) return;
    setAiHasInteracted(true);
    setAiMessages(prev => [
      ...prev,
      { from: 'me', text },
      { from: 'ai', text: '收到，我先帮你拆解任务并给出实现建议。' },
    ]);
    setAiInput('');
  };

  const aiQuickOptions = useMemo(() => ([
    {
      id: 'block-spawn-monster',
      text: 'Help me generate a Mini World script: spawn a monster when a block is clicked.',
    },
    {
      id: 'recent-update',
      text: "What's new in the latest Mini World update?",
    },
    {
      id: 'hot-maps',
      text: 'Recommend a few of the hottest maps right now.',
    },
  ]), []);

  useEffect(() => {
    const typingMsg = aiMessages.find(m => m?.typing);
    if (!typingMsg) return;

    const tickMs = 18;
    const timer = setInterval(() => {
      setAiMessages(prev => prev.map(m => {
        if (m?.id !== typingMsg.id || !m.typing) return m;
        if (m.phase === 'code') {
          const nextLen = Math.min((m.code?.length ?? 0) + 1, m.fullCode.length);
          const nextCode = m.fullCode.slice(0, nextLen);
          if (nextLen >= m.fullCode.length) {
            return { ...m, code: nextCode, phase: 'text' };
          }
          return { ...m, code: nextCode };
        }
        const nextLen = Math.min((m.text?.length ?? 0) + 1, m.fullText.length);
        const nextText = m.fullText.slice(0, nextLen);
        if (nextLen >= m.fullText.length) {
          return { ...m, text: nextText, typing: false };
        }
        return { ...m, text: nextText };
      }));
    }, tickMs);

    return () => clearInterval(timer);
  }, [aiMessages]);

  const handleAiQuickOption = (option) => {
    setAiHasInteracted(true);
    if (option.id === 'block-spawn-monster') {
      const id = `script-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setAiMessages(prev => [
        ...prev,
        { from: 'me', text: option.text },
        {
          id,
          from: 'ai',
          kind: 'script',
          code: '',
          text: '',
          fullCode: [
            'local Script = {}  -- Called when the component starts',
            'function Script:OnStart()',
            '    GameObject:CreatePrefab(ObjType.Mob, 3102, 10, 8, 10)',
            'end',
            'return Script',
          ].join('\n'),
          fullText: [
            'Code explanation:',
            'Ye Meng Bao is a common monster in the game, but it normally spawns randomly on the map.',
            'With this single script instruction, you can spawn Ye Meng Bao at the specified coordinates.',
            '',
            'Paste the code into the Script editor and give it a try.',
            'If you are not afraid of danger, you can spawn more of them — and you can also change the coordinates.',
          ].join('\n'),
          typing: true,
          phase: 'code',
        },
      ]);
      return;
    }

    setAiMessages(prev => [
      ...prev,
      { from: 'me', text: option.text },
      { from: 'ai', text: '收到，我先帮你拆解任务并给出实现建议。' },
    ]);
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

  const handleAvatarIconDragStart = event => {
    const target = avatarIconRowRef.current;
    if (!target) return;
    // If user starts on an icon button, allow click selection (no drag capture).
    if (event.target?.closest?.('.avatar-icon-btn')) return;
    avatarIconDragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: target.scrollLeft,
      pointerId: event.pointerId,
    };
    target.setPointerCapture?.(event.pointerId);
    target.classList.add('dragging-x');
  };

  const handleAvatarIconDragMove = event => {
    const target = avatarIconRowRef.current;
    const drag = avatarIconDragRef.current;
    if (!target || !drag.active || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > 4) drag.moved = true;
    target.scrollLeft = drag.scrollLeft - dx;
  };

  const handleAvatarIconDragEnd = event => {
    const target = avatarIconRowRef.current;
    const drag = avatarIconDragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;
    drag.active = false;
    target?.classList.remove('dragging-x');
  };

  const handleAvatarIconRowClickCapture = event => {
    // Prevent accidental clicks when user was dragging to scroll.
    if (avatarIconDragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      avatarIconDragRef.current.moved = false;
    }
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

  const togglePreviewVideo = title => {
    const currentVideo = previewVideoRefs.current[title];
    if (!currentVideo) return;

    Object.entries(previewVideoRefs.current).forEach(([videoTitle, video]) => {
      if (videoTitle !== title && video) video.pause();
    });

    if (playingPreview === title && !currentVideo.paused) {
      currentVideo.pause();
      setPlayingPreview(null);
      return;
    }

    currentVideo.play()
      .then(() => {
        setPlayingPreview(title);
        setToast(`播放预览：${title}`);
      })
      .catch(() => {
        setToast('视频暂时无法播放，请稍后再试');
      });
  };

  const pausePreviewVideo = title => {
    const currentVideo = previewVideoRefs.current[title];
    if (!currentVideo || currentVideo.paused) return;
    currentVideo.pause();
    setPlayingPreview(null);
    setPauseFlash(title);
    if (pauseFlashTimerRef.current) clearTimeout(pauseFlashTimerRef.current);
    pauseFlashTimerRef.current = setTimeout(() => setPauseFlash(null), 600);
  };

  useEffect(() => {
    if (activeTab !== 'ai') setLastNonAiTab(activeTab);
  }, [activeTab]);

  const isAiMode = activeTab === 'ai';
  const contentTab = isAiMode ? lastNonAiTab : activeTab;

  return (
    <main className="app-shell">
      <section className={`phone-frame ${contentTab === 'friends' ? 'friends-mode' : ''} ${contentTab === 'games' ? 'feed-mode' : ''} ${isAiMode ? 'ai-mode' : ''}`}>
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="ai-flow-bg" aria-hidden />
        {contentTab === 'home' && (
          <div className="home-cool-bg" aria-hidden />
        )}

        <header className="top-bar">
          <div className="brand">
            <div className="brand-mark">M</div>
            <span>MiniCreata</span>
          </div>
          <div className="top-actions">
            <button aria-label="AI 助手" onClick={toggleAiMode} className={isAiMode ? 'is-active' : ''}><Bot size={20} /></button>
            <button aria-label="搜索"><Search size={20} /></button>
            <button aria-label="通知"><Bell size={20} /></button>
          </div>
        </header>

        <section className={`ai-page ${isAiMode ? 'is-visible' : ''}`} aria-label="AI 界面">
          <div className="ai-chat-scroll" aria-label="对话内容">
            {aiMessages.map((msg, idx) => (
              idx === 0 && msg.from === 'ai' ? (
                <div key={idx} className="ai-welcome" aria-label="AI 欢迎语">
                  <div className="ai-welcome-icon" aria-hidden>M</div>
                  <div className="ai-bubble ai-bubble--welcome">{msg.text}</div>
                </div>
              ) : (
                <div key={msg.id ?? idx} className={`ai-msg ${msg.from === 'me' ? 'mine' : 'theirs'}`}>
                  <div className="ai-bubble">
                    {msg.kind === 'script' ? (
                      <>
                        <pre className="ai-code">
                          {msg.code}
                          {msg.typing && msg.phase === 'code' ? <span className="ai-caret" aria-hidden /> : null}
                        </pre>
                        <div className="ai-explain">
                          {msg.text}
                          {msg.typing && msg.phase === 'text' ? <span className="ai-caret" aria-hidden /> : null}
                        </div>
                      </>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              )
            ))}

            {!aiHasInteracted && (
              <section className="ai-quick-options" aria-label="Quick questions">
                <div className="ai-quick-title">You may ask</div>
                {aiQuickOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className="ai-quick-option"
                    onClick={() => handleAiQuickOption(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </section>
            )}
          </div>
          <div className="ai-input-dock" aria-label="AI 输入区">
            <div className="ai-input-bar">
              <input
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendAiMessage(); }}
                placeholder="输入你的需求，例如：把首页改成 2.0 风格..."
              />
              <button type="button" onClick={sendAiMessage} aria-label="发送"><Send size={18} /></button>
            </div>
          </div>
        </section>

        <div className={`main-panels ${isAiMode ? 'is-hidden' : ''}`}>
        {contentTab === 'home' && (
          <section className="hero-card hero-card--center" aria-label="主界面形象">
            <div className="main-character-wrap">
              <div className="star-badge">★</div>
              <img className="main-character-image" src={selectedRoleAvatar ?? homeHeroAvatar} alt="虚拟形象" />
            </div>
          </section>
        )}

        {contentTab === 'profile' && (
          <section className="hero-card">
            <div className="mini-avatar-card">
              <div className="mini-avatar-image-wrap">
                <img className="mini-avatar-image" src={homeMiniAvatar} alt="兔美美主页头像" />
              </div>
              <div className="player-name">兔美美</div>
            </div>
            <div className="main-character-wrap">
              <div className="star-badge">★</div>
              <img className="main-character-image" src={homeHeroAvatar} alt="游戏角色形象" />
            </div>
          </section>
        )}

        {contentTab === 'friends' ? (
          <section className="friends-page friends-shell" aria-label="好友页">
            <aside className="friends-rail" aria-label="好友功能">
              <button
                type="button"
                className={`friends-rail-item ${friendsSection === 'directory' ? 'active' : ''}`}
                onClick={() => {
                  setFriendsSection('directory');
                  setSelectedFriend(null);
                }}
                aria-label="好友目录"
              >
                <Users size={20} />
              </button>
              <button
                type="button"
                className={`friends-rail-item ${friendsSection === 'messages' ? 'active' : ''}`}
                onClick={() => setFriendsSection('messages')}
                aria-label="私聊消息"
              >
                <MessageCircle size={20} />
                <span className="friends-rail-badge">3</span>
              </button>
              <button
                type="button"
                className={`friends-rail-item ${friendsSection === 'social' ? 'active' : ''}`}
                onClick={() => {
                  setFriendsSection('social');
                  setSelectedFriend(null);
                }}
                aria-label="社交圈"
              >
                <Compass size={20} />
              </button>
              <button
                type="button"
                className={`friends-rail-item ${friendsSection === 'groups' ? 'active' : ''}`}
                onClick={() => {
                  setFriendsSection('groups');
                  setSelectedFriend(null);
                }}
                aria-label="添加群组"
              >
                <UserPlus size={20} />
              </button>
            </aside>

            <section className="friends-main" aria-label="好友内容区">
              {friendsSection === 'messages' ? (
                selectedFriend ? (
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
                  <div className="friends-list-layout" aria-label="私聊消息列表">
                    <div className="friends-page-header">
                      <div>
                        <p>Messages</p>
                        <h1>聊天</h1>
                      </div>
                      <button aria-label="添加好友" onClick={() => setToast('打开添加好友入口')}><UserPlus size={21} /></button>
                    </div>

                    <div className="friends-search-row">
                      <div className="friends-search"><Search size={17} /><span>搜索好友或房间</span></div>
                      <button onClick={() => setToast('打开添加好友入口')}><UserPlus size={16} /> Add Friends</button>
                    </div>

                    <section className="friends-row friends-row-in-page" aria-label="在线好友">
                      {onlineFriends.map(friend => (
                        <button
                          className="friend"
                          key={friend.name}
                          type="button"
                          onClick={() => {
                            const full = friendMessages.find(f => f.name === friend.name);
                            if (full) setSelectedFriend(full);
                            else handleFriendClick(friend);
                          }}
                        >
                          <span className="friend-avatar" style={{ background: friend.color }}>
                            <img src={friend.avatar} alt={`${friend.name} 头像`} />
                          </span>
                          <span className={`status-dot ${friend.status}`} />
                        </button>
                      ))}
                    </section>

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
                  </div>
                )
              ) : friendsSection === 'social' ? (
                <section className="social-page" aria-label="社交圈">
                  <div className="social-hero" style={{ backgroundImage: `url(${socialGroupHero})` }}>
                    <div className="social-hero-copy">
                      <h1>发现群聊</h1>
                      <p>推荐 · 开黑 · 交友 · 赛事</p>
                    </div>
                  </div>
                  <div className="social-tabs" aria-label="社交圈分类">
                    {['推荐', '开黑', '交友', '赛事', '聊天摸鱼'].map(tab => (
                      <button key={tab} className={tab === '推荐' ? 'active' : ''} type="button">{tab}</button>
                    ))}
                  </div>
                  <div
                    className="social-grid drag-scroll-area"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    aria-label="群组推荐列表"
                  >
                    {socialGroups.map(group => (
                      <button key={group.title} type="button" className="social-card" onClick={() => setToast(`打开群组：${group.title}`)}>
                        <div
                          className="social-card-cover"
                          style={group.coverImage ? undefined : { background: group.cover }}
                        >
                          {group.coverImage ? <img src={group.coverImage} alt="" aria-hidden /> : null}
                          {group.badge && <span className="social-badge">{group.badge}</span>}
                        </div>
                        <div className="social-card-meta">
                          <strong>{group.title}</strong>
                          {group.count && <span>{group.count}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              ) : friendsSection === 'groups' ? (
                <section className="groups-page" aria-label="添加群组">
                  <div className="friends-page-header">
                    <div>
                      <p>Groups</p>
                      <h1>添加群组</h1>
                    </div>
                    <button aria-label="搜索群组" onClick={() => setToast('搜索群组')}><Search size={20} /></button>
                  </div>
                  <div className="friends-search-row">
                    <div className="friends-search"><Search size={17} /><span>搜索群组或ID</span></div>
                    <button onClick={() => setToast('创建群组')}><Plus size={16} /> 创建</button>
                  </div>
                  <div className="groups-empty">
                    <p>这里先做占位：后续可以接「推荐群组 / 最近浏览 / 创建群组 / 扫码加入」。</p>
                    <button type="button" onClick={() => setToast('打开群组推荐')}>查看推荐群组</button>
                  </div>
                </section>
              ) : (
                <section className="directory-page" aria-label="好友目录">
                  <div className="friends-page-header">
                    <div>
                      <p>Contacts</p>
                      <h1>联系人</h1>
                    </div>
                    <button aria-label="搜索联系人" onClick={() => setToast('搜索联系人')}><Search size={20} /></button>
                  </div>
                  <div className="friends-search-row">
                    <div className="friends-search"><Search size={17} /><span>搜索好友</span></div>
                    <button onClick={() => setToast('好友申请')}><UserPlus size={16} /> 好友申请</button>
                  </div>
                  <div className="directory-tags" aria-label="好友分组">
                    {friendDirectoryTags.map(tag => (
                      <button
                        type="button"
                        key={tag}
                        className={tag === directoryTag ? 'active' : ''}
                        onClick={() => setDirectoryTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div
                    className="directory-scroll drag-scroll-area"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    aria-label="联系人列表"
                  >
                    {friendDirectoryGroups.map(([letter, entries]) => (
                      <section key={letter} className="directory-group" aria-label={`分组 ${letter}`}>
                        <div className="directory-letter">{letter}</div>
                        {entries.map(friend => (
                          <button
                            key={friend.name}
                            type="button"
                            className="directory-item"
                            onClick={() => {
                              setFriendsSection('messages');
                              setSelectedFriend(friend);
                            }}
                          >
                            <img src={friend.avatar} alt={`${friend.name} 头像`} />
                            <span className="directory-item-copy">
                              <strong>{friend.name}</strong>
                              <em>{friend.title}</em>
                            </span>
                            <span className="directory-item-meta">{friend.time}</span>
                          </button>
                        ))}
                      </section>
                    ))}
                  </div>
                </section>
              )}
            </section>
          </section>
        ) : contentTab === 'profile' ? (
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
                      setSelectedMapForDetail(continueGameDetailByTitle[game.title] ?? null);
                      setToast(`打开详情：${game.title}`);
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
                    <div className="recommend-cover" style={item.coverImage ? undefined : { background: item.cover }}>
                      {item.coverImage ? <img className="recommend-cover-image" src={item.coverImage} alt="" aria-hidden /> : null}
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
        ) : contentTab === 'home' ? (
          <section className="home-tab-panel home-sheet" aria-label="主界面内容">
            <div className="tab-handle">
              <span className="tab-indicator" />
              <span>Home</span>
            </div>

            <div
              ref={avatarIconRowRef}
              className="avatar-icon-row"
              aria-label="切换虚拟形象"
              onClickCapture={handleAvatarIconRowClickCapture}
              onPointerDown={handleAvatarIconDragStart}
              onPointerMove={handleAvatarIconDragMove}
              onPointerUp={handleAvatarIconDragEnd}
              onPointerCancel={handleAvatarIconDragEnd}
              onPointerLeave={handleAvatarIconDragEnd}
            >
              {avatarIconOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  className={`avatar-icon-btn ${opt.id === selectedAvatarIconId ? 'active' : ''}`}
                  onClick={() => setSelectedAvatarIconId(opt.id)}
                  aria-label={`选择虚拟形象 ${opt.id}`}
                >
                  <img src={opt.src} alt="" />
                </button>
              ))}
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
                      setSelectedMapForDetail(continueGameDetailByTitle[game.title] ?? null);
                      setToast(`打开详情：${game.title}`);
                    }}
                  >
                    <div className="game-cover" style={game.coverImage ? undefined : { background: game.cover }}>
                      {game.coverImage ? <img className="game-cover-image" src={game.coverImage} alt="" aria-hidden /> : null}
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
                    <div className="recommend-cover" style={item.coverImage ? undefined : { background: item.cover }}>
                      {item.coverImage ? <img className="recommend-cover-image" src={item.coverImage} alt="" aria-hidden /> : null}
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
                <article
                  className={`ugc-feed-card ${playingPreview === map.title ? 'is-playing' : ''} ${pauseFlash === map.title ? 'show-pause-flash' : ''}`}
                  key={map.title}
                >
                  <video
                    className="ugc-cover ugc-preview-video"
                    ref={element => {
                      if (element) previewVideoRefs.current[map.title] = element;
                      else delete previewVideoRefs.current[map.title];
                    }}
                    src={map.video}
                    poster={map.cover}
                    preload="metadata"
                    playsInline
                    muted
                    loop
                    onClick={() => {
                      if (playingPreview === map.title) pausePreviewVideo(map.title);
                    }}
                    onEnded={() => setPlayingPreview(null)}
                    onPause={() => {
                      if (playingPreview === map.title) setPlayingPreview(null);
                    }}
                  />
                  <div className="ugc-pause-flash" aria-hidden>
                    <span className="preview-pause-icon" />
                  </div>
                  <div className="ugc-cover-shade" />
                  <div className="ugc-type-pill"><Compass size={14} /> {map.type}</div>
                  <button
                    className="ugc-play-button"
                    onClick={() => togglePreviewVideo(map.title)}
                    aria-label={`播放 ${map.title} 预览`}
                  >
                    <Play size={34} fill="currentColor" />
                  </button>
                  <aside className="ugc-side-actions">
                    <button onClick={() => toggleLike(map.title)} className={likedMaps.has(map.title) ? 'active' : ''} aria-label="点赞"><Heart size={22} fill={likedMaps.has(map.title) ? "#ff4757" : "none"} color={likedMaps.has(map.title) ? "#ff4757" : "currentColor"} /><span>{map.likes}</span></button>
                    <button onClick={() => toggleBookmark(map.title)} className={bookmarkedMaps.has(map.title) ? 'active' : ''} aria-label="收藏"><Bookmark size={22} fill={bookmarkedMaps.has(map.title) ? "#ffd32a" : "none"} color={bookmarkedMaps.has(map.title) ? "#ffd32a" : "currentColor"} /></button>
                    <button onClick={() => setToast(`分享 ${map.title}`)} aria-label="分享"><Share2 size={22} /></button>
                  </aside>
                  <div className="ugc-feed-copy">
                    <div className="creator-row">
                      <img src={map.avatar} alt={`${map.creator} 头像`} />
                      <span>@{map.creator}</span>
                      <div className="ugc-primary-actions" aria-label="快捷操作">
                        <button
                          className="img-action-btn"
                          onClick={() => setToast(`一键开始：${map.title}`)}
                          aria-label="试玩"
                          title="试玩"
                        >
                          <img src={playIcon} alt="" />
                        </button>
                        <button
                          className="img-action-btn"
                          onClick={() => setToast(`基于 ${map.title} 开始二次创作`)}
                          aria-label="复制项目"
                          title="复制项目"
                        >
                          <img src={remixIcon} alt="" />
                        </button>
                        <button
                          className="detail-pill-btn"
                          onClick={() => setSelectedMapForDetail(map)}
                          aria-label="详情"
                          title="详情"
                        >
                          <Compass size={14} />
                        </button>
                      </div>
                      <button
                        className={`creator-follow-btn ${followedCreators.has(map.creator) ? 'followed' : ''}`}
                        onClick={() => toggleFollow(map.creator)}
                      >
                        {followedCreators.has(map.creator) ? '已关注' : '关注'}
                      </button>
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

        </div>

        <nav className={`bottom-nav ${isAiMode ? 'is-hidden' : ''}`} aria-label="主导航">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}><Home size={21} /><span>Home</span></button>
          <button className={activeTab === 'games' ? 'active' : ''} onClick={() => handleTabClick('games')}><Trophy size={21} /><span>Games</span></button>
          <button className="create-button" onClick={() => setShowComposer(true)} aria-label="创建"><Plus size={30} /></button>
          <button className={activeTab === 'friends' ? 'active' : ''} onClick={() => handleTabClick('friends')}><UsersRound size={21} /><span>Friends</span></button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}><UserRound size={21} /><span>Me</span></button>
        </nav>

        {selectedMapForDetail && (
          <div className="map-detail-overlay">
            <section className="map-detail-page">
              <header className="detail-header">
                <div className="creator-info-large">
                  <img className="detail-creator-avatar" src={selectedMapForDetail.avatar} alt={selectedMapForDetail.creator} />
                  <div className="creator-meta">
                    <div className="creator-name-row">
                      <strong className="detail-creator-name">{selectedMapForDetail.creator}</strong>
                      <span className="detail-badge-wrap">
                        <img src={expertBadge} className="detail-badge-img" alt="进阶高手" />
                        <img src={communityBadge} className="detail-badge-img" alt="社区优秀创作者" />
                      </span>
                    </div>
                    <p className="detail-creator-stats">113粉丝 · 132作品</p>
                  </div>
                </div>
                <div className="detail-header-actions">
                  <button 
                    type="button"
                    className={`detail-follow-btn ${followedCreators.has(selectedMapForDetail.creator) ? 'followed' : ''}`}
                    onClick={() => toggleFollow(selectedMapForDetail.creator)}
                  >
                    {followedCreators.has(selectedMapForDetail.creator) ? '已关注' : '关注'}
                  </button>
                  <button type="button" className="detail-close-btn" onClick={() => setSelectedMapForDetail(null)} aria-label="关闭"><img src={closeIcon} alt="关闭" /></button>
                </div>
              </header>

              <div
                className="detail-main-scroll drag-scroll-area"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                <div className="detail-main-content">
                  <div className="detail-cover-wrap">
                    <img src={selectedMapForDetail.cover} alt="封面" />
                    <div className="top-10-badge">创作赛TOP10</div>
                  </div>

                  <div className="detail-stats-row">
                    <div className="stat-item"><strong>SS</strong><span>推荐级别</span></div>
                    <div className="stat-item"><strong>1.0</strong><span>最新版本</span></div>
                    <div className="stat-item"><strong>32</strong><span>触发器</span></div>
                    <div className="stat-item"><strong>876</strong><span>方块数</span></div>
                    <div className="stat-item"><strong>19.5h</strong><span>创作时长</span></div>
                  </div>

                  {(() => {
                    const fa = getMapFriendActivity(selectedMapForDetail.title);
                    const merged = [...fa.recommendAvatars, ...fa.playedAvatars];
                    const seen = new Set();
                    const uniqueAvatars = merged.filter(a => {
                      if (seen.has(a)) return false;
                      seen.add(a);
                      return true;
                    });
                    const displayAvatars = uniqueAvatars.slice(0, 5);
                    const morePlayed = Math.max(0, fa.played - displayAvatars.length);
                    const ratioPct = fa.played > 0 ? Math.round((fa.recommend / fa.played) * 100) : 0;
                    return (
                      <aside className="detail-friend-reco" aria-label="好友推荐与游玩">
                        <div className="detail-friend-reco__top">
                          <div className="detail-friend-reco__title-row">
                            <ThumbsUp size={16} className="detail-friend-reco__icon" aria-hidden />
                            <span className="detail-friend-reco__title">好友评价</span>
                            <span className="detail-friend-reco__badge">好友网络</span>
                          </div>
                          <div className="detail-friend-reco__avatars">
                            {displayAvatars.map((src, i) => (
                              <img key={i} src={src} alt="" className="detail-friend-reco__avatar" />
                            ))}
                            {morePlayed > 0 ? (
                              <span className="detail-friend-reco__more">+{morePlayed}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="detail-friend-reco__steam-bar" aria-hidden>
                          <div className="detail-friend-reco__steam-bar-fill" style={{ width: `${Math.min(100, ratioPct)}%` }} />
                        </div>
                        <p className="detail-friend-reco__stats">
                          <strong>{fa.recommend}</strong>
                          <span> 位好友推荐</span>
                          <span className="detail-friend-reco__dot">·</span>
                          <strong>{fa.played}</strong>
                          <span> 位好友玩过</span>
                        </p>
                        <p className="detail-friend-reco__hint">仅统计你的好友列表内的数据。</p>
                      </aside>
                    );
                  })()}

                  <div className="detail-description">
                    <h2>{selectedMapForDetail.title}</h2>
                    <p className="publish-date">发布于 2022-12-22</p>
                    <div className="desc-text">
                      <p>{selectedMapForDetail.desc}</p>
                      <p>本项目采用了最新的物理引擎和逻辑触发器，为您带来沉浸式的游戏体验。玩家可以在地图中自由探索，解开隐藏的谜题，并与环境进行深度交互。无论是光影效果还是玩法深度，都经过了创作者的精心打磨。</p>
                    </div>
                  </div>

                  <div className="detail-tags-section">
                    <h3>作品标签</h3>
                    <div className="detail-tags-grid">
                      <span>完全开源</span>
                      <span>多触发器</span>
                      <span>跑酷游戏</span>
                      <span>#凹凸创作赛</span>
                      {selectedMapForDetail.tags.map(t => <span key={t}>#{t}</span>)}
                    </div>
                  </div>

                  <div className="detail-main-content-spacer" aria-hidden />
                </div>
              </div>

              <footer className="detail-bottom-bar detail-bottom-bar--map-actions">
                <div className="detail-primary-actions-full">
                  <button className="btn-copy"><span>📦</span> 复制项目 <small>完全开源</small></button>
                  <a href="https://apps.apple.com/cn/app/%E8%BF%B7%E4%BD%A0%E4%B8%96%E7%95%8C/id1170455562" target="_blank" rel="noopener noreferrer" className="btn-play-custom">
                    <Play size={18} fill="currentColor" />
                    <span>试玩</span>
                  </a>
                </div>
              </footer>
            </section>
          </div>
        )}

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
