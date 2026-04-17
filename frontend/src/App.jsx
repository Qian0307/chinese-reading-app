import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ReadingScreen from './components/ReadingScreen';
import ResultScreen from './components/ResultScreen';

const LOCAL_PASSAGES = [
  {
    id: 1, level: 1, title: '小明和小狗',
    text: '小明在公園裡玩耍。他看見一隻小狗跑來跑去。小狗很開心，小明也笑了。',
    questions: [
      { id: '1-1', type: 'who',   label: '誰',   icon: '👤', question: '誰在公園裡玩耍？',  hint: '看看文章的第一句話' },
      { id: '1-2', type: 'where', label: '哪裡', icon: '📍', question: '小明在哪裡玩耍？',  hint: '文章一開始就說了地點喔' },
      { id: '1-3', type: 'what',  label: '做什麼',icon: '🎯', question: '小狗在做什麼？',   hint: '小狗的動作在第二句話裡' }
    ]
  },
  {
    id: 2, level: 1, title: '媽媽煮飯',
    text: '媽媽在廚房煮飯。她做了香噴噴的炒飯。爸爸和弟弟一起吃飯，大家都說好吃。',
    questions: [
      { id: '2-1', type: 'who',   label: '誰',   icon: '👤', question: '誰在廚房煮飯？',   hint: '文章第一句話就告訴你了' },
      { id: '2-2', type: 'where', label: '哪裡', icon: '📍', question: '媽媽在哪裡煮飯？', hint: '媽媽煮飯的地方在第一句' },
      { id: '2-3', type: 'what',  label: '做什麼',icon: '🎯', question: '媽媽在做什麼？',  hint: '媽媽在廚房裡做的事情是什麼？' }
    ]
  },
  {
    id: 3, level: 2, title: '爬山去',
    text: '小華和同學一起去爬山。山上有很多漂亮的花。他們走了很久，大家都累了。後來坐下來吃點心休息。',
    questions: [
      { id: '3-1', type: 'who',   label: '誰',   icon: '👤', question: '誰去爬山？',          hint: '文章的第一句話說得很清楚' },
      { id: '3-2', type: 'where', label: '哪裡', icon: '📍', question: '他們去哪裡？',        hint: '他們去的地方和爬有關係' },
      { id: '3-3', type: 'what',  label: '做什麼',icon: '🎯', question: '大家累了以後做什麼？', hint: '看看文章最後一句話' }
    ]
  },
  {
    id: 4, level: 2, title: '畫畫課',
    text: '老師在教室教大家畫畫。小朋友們畫了很多美麗的圖畫。有的畫花，有的畫動物。老師說大家都畫得很好。',
    questions: [
      { id: '4-1', type: 'who',   label: '誰',   icon: '👤', question: '誰在教大家畫畫？',  hint: '文章第一句話就說了' },
      { id: '4-2', type: 'where', label: '哪裡', icon: '📍', question: '老師在哪裡教畫畫？', hint: '老師教畫畫的地方在第一句' },
      { id: '4-3', type: 'what',  label: '做什麼',icon: '🎯', question: '小朋友們在做什麼？', hint: '小朋友在課堂上做的事是什麼？' }
    ]
  },
  {
    id: 5, level: 3, title: '海邊的貝殼',
    text: '小美和家人去海邊玩。海邊有很多沙子和貝殼。小美撿了很多漂亮的貝殼。爸爸說要保護海邊的環境。',
    questions: [
      { id: '5-1', type: 'who',   label: '誰',   icon: '👤', question: '誰去海邊玩？',      hint: '文章第一句話就有答案' },
      { id: '5-2', type: 'where', label: '哪裡', icon: '📍', question: '他們去哪裡玩？',    hint: '他們去的地方和海有關係' },
      { id: '5-3', type: 'what',  label: '做什麼',icon: '🎯', question: '小美在海邊做什麼？', hint: '看看文章第三句話' }
    ]
  },
  {
    id: 6, level: 3, title: '圖書館借書',
    text: '小東去圖書館借書。他找到一本很有趣的故事書。小東讀了很久才回家。媽媽說多看書對我們很有幫助。',
    questions: [
      { id: '6-1', type: 'who',   label: '誰',   icon: '👤', question: '誰去圖書館借書？',     hint: '文章第一句話就說了' },
      { id: '6-2', type: 'where', label: '哪裡', icon: '📍', question: '小東去哪裡借書？',     hint: '小東去借書的地方在第一句' },
      { id: '6-3', type: 'what',  label: '做什麼',icon: '🎯', question: '小東在圖書館裡做了什麼？', hint: '小東去圖書館的目的是什麼？' }
    ]
  }
];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [passages, setPassages] = useState(LOCAL_PASSAGES);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [passageQueue, setPassageQueue] = useState([]);
  const [currentPassage, setCurrentPassage] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [sessionResults, setSessionResults] = useState([]);

  useEffect(() => {
    fetch('/api/passages')
      .then(r => r.json())
      .then(data => setPassages(data))
      .catch(() => {});
  }, []);

  function startLevel(level) {
    const queue = passages.filter(p => p.level === level);
    setSelectedLevel(level);
    setPassageQueue(queue);
    setCurrentPassage(queue[0]);
    setSessionResults([]);
    setScreen('reading');
  }

  function onPassageComplete(passageScore, maxScore) {
    const newTotal = totalScore + passageScore;
    setTotalScore(newTotal);

    const nextIdx = passageQueue.indexOf(currentPassage) + 1;
    if (nextIdx < passageQueue.length) {
      setCurrentPassage(passageQueue[nextIdx]);
    } else {
      const nextLevel = selectedLevel + 1;
      if (nextLevel <= 3 && !unlockedLevels.includes(nextLevel)) {
        setUnlockedLevels(prev => [...prev, nextLevel]);
      }
      setScreen('result');
    }
  }

  function goHome() {
    setScreen('welcome');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {screen === 'welcome' && (
        <WelcomeScreen
          unlockedLevels={unlockedLevels}
          totalScore={totalScore}
          onStart={startLevel}
        />
      )}
      {screen === 'reading' && currentPassage && (
        <ReadingScreen
          passage={currentPassage}
          passageIndex={passageQueue.indexOf(currentPassage) + 1}
          totalPassages={passageQueue.length}
          level={selectedLevel}
          totalScore={totalScore}
          onComplete={onPassageComplete}
          onHome={goHome}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          level={selectedLevel}
          totalScore={totalScore}
          unlockedLevels={unlockedLevels}
          onHome={goHome}
          onNextLevel={() => startLevel(selectedLevel + 1)}
          onRetry={() => startLevel(selectedLevel)}
        />
      )}
    </div>
  );
}
