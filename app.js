// Initialize Lucide icons
lucide.createIcons();

// State
let userState = {
    masterName: '',
    onboarded: false,
    targetSleep: 7,
    targetMeals: 3,
    usualMealSize: 1.0,
    
    streak: 0,
    shields: 0,
    currency: 0, 
    ownedCostumes: [],
    ownedBackgrounds: [],
    equippedCostume: null,
    equippedBackgrounds: [], 
    
    isFrozen: false,
    historyScores: [50, 50, 50],
    
    today: {
        sleepDiff: null,
        mealCount: 0,
        badMealCount: 0,
        emotion: null
    },
    
    currentDailyScore: 50,
    averageScore: 50,
    level: 3,
    logs: []
};

const costumesData = [
    { id: 'crown', icon: '👑', name: '왕관', price: 50 },
    { id: 'ribbon', icon: '🎀', name: '리본', price: 30 },
    { id: 'glasses', icon: '🕶️', name: '선글라스', price: 40 },
    { id: 'flower', icon: '🌸', name: '꽃장식', price: 20 },
    { id: 'wizard', icon: '🧙‍♂️', name: '마법사 모자', price: 60 },
    { id: 'bunny', icon: '🐰', name: '토끼 귀', price: 50 }
];

const backgroundsData = [
    { id: 'carpet', icon: '🧶', name: '포근한 카펫', price: 30, type: 'carpet', emoji: '🧶' },
    { id: 'bookshelf', icon: '📚', name: '미니 책장', price: 50, type: 'bookshelf', emoji: '📚' },
    { id: 'plant', icon: '🪴', name: '미니 화분', price: 40, type: 'plant', emoji: '🪴' },
    { id: 'plushie', icon: '🧸', name: '곰인형', price: 60, type: 'plushie', emoji: '🧸' }
];

const quizzes = [
    { type: 'text', q: '오늘 먹은 음식 중에서 가장 인상 깊었던 색깔은 무슨 색이었어?' },
    { type: 'words3', q: '방금 먹은 메뉴를 세 가지의 단어로 표현한다면 어떻게 될까? (띄어쓰기로 구분해줘!)' },
    { type: 'yesno', q: '음식을 먹으면서 천천히 씹고 맛을 음미하려고 노력했어?' },
    { type: 'yesno', q: '먹으면서 스마트폰이나 영상을 보지 않고 식사에만 집중해봤어?' },
    { type: 'text', q: '오늘 첫 입을 먹었을 때 어떤 기분이 들었어?' },
    { type: 'text', q: '이 음식을 먹으며 혹시 떠오른 행복한 추억이나 사람이 있어?' },
    { type: 'text', q: '음식에서 가장 바삭하거나 부드러웠던 식감은 뭐였어?' },
    { type: 'yesno', q: '배가 적당히 불렀을 때 수저를 내려놓을 수 있었어?' },
    { type: 'text', q: '나를 위해 차려진 이 음식에게 고마운 점 하나를 말해본다면?' }
];

const dialogues = {
    bad: [
        "마스터... 기운이 하나도 없어...",
        "나도 아프고 너도 아프면 어떡해 😢",
        "조금만 푹 쉬고 맛있는 거 먹자...",
        "마스터의 몸이 보내는 신호를 들어줘."
    ],
    normal: [
        "오늘 하루는 어땠어?",
        "네가 웃으면 나도 배가 불러!",
        "가끔은 쉬어가는 것도 필요해.",
        "밥은 잘 챙겨 먹고 있는 거지?",
        "오늘 하루도 고생 많았어 💖"
    ],
    good: [
        "마스터! 완전 최고야! 쌩쌩해!",
        "네 덕분에 나도 이렇게 건강해졌어!",
        "우리 이대로 계속 건강하게 지내자 ✨",
        "마스터의 좋은 기운이 뿜뿜 느껴져!"
    ]
};

const levels = [
    { maxScore: 19, name: '겁나 아픈 푸디몬', img: 'assets/level1.png' },
    { maxScore: 39, name: '아픈 푸디몬', img: 'assets/level2.png' },
    { maxScore: 59, name: '기본 푸디몬', img: 'assets/level3.png' },
    { maxScore: 79, name: '건강한 푸디몬', img: 'assets/level4.png' },
    { maxScore: 94, name: '생기발랄 푸디몬', img: 'assets/level5.png' },
    { maxScore: 100, name: '천상계 푸디몬', img: 'assets/level6.png' }
];

const interactionEmojis = ['💖', '✨', '🎵', '⭐', '🎈', '🥰'];

// DOM Elements
const onboardingScreen = document.getElementById('onboarding-screen');
const loginSection = document.getElementById('login-section');
const storySection = document.getElementById('story-section');
const mainScreen = document.getElementById('main-screen');
const storyText = document.getElementById('story-text');
const storyActions = document.getElementById('story-actions');
const tapToContinue = document.getElementById('tap-to-continue');
const storyBackBtn = document.getElementById('story-back-btn');

const levelDisplay = document.getElementById('level-display');
const streakDisplay = document.getElementById('streak-display');
const shieldDisplay = document.getElementById('shield-display');
const shieldIndicator = document.getElementById('shield-indicator');
const currencyDisplay = document.getElementById('currency-display');
const shopCurrencyDisplay = document.getElementById('shop-currency-display');
const invShieldCount = document.getElementById('inv-shield-count');

const scoreProgress = document.getElementById('score-progress');
const petImageWrapper = document.getElementById('main-pet-wrapper');
const storyPetWrapper = document.getElementById('story-pet-container');
const petImage = document.getElementById('pet-image');
const storyPetImage = document.getElementById('story-pet-image');
const petStatusMessage = document.getElementById('pet-status-message');
const petScoreText = document.getElementById('pet-score-text');
const petHat = document.getElementById('pet-hat');
const petCostume = document.getElementById('pet-costume');
const petAura = document.getElementById('pet-aura');
const petZzz = document.getElementById('pet-zzz');

const toast = document.getElementById('toast');
const attendanceRewardText = document.getElementById('attendance-reward-text');
const clickParticle = document.getElementById('click-particle');
const windowSky = document.getElementById('window-sky');

let storyStep = 0;
let shopCurrentTab = 'costume';
let currentQuizObj = null;
let currentYesNoAnswer = null;
let dialogueInterval = null;

// Temp variables for onboarding
let tempSleep = 7;
let tempMeals = 3;
let tempMealSize = 1.0;

function init() {
    updateTimeWindow();
    setInterval(updateTimeWindow, 60000); 
    
    // Using explicit advance function instead of generic click listener
    storySection.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION' || e.target.tagName === 'INPUT') return;
        if (storyStep === 0 || storyStep === 1) {
            storyStep++;
            renderStoryStep();
        }
    });
    
    document.querySelectorAll('#meal-step-2 .option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const val = parseFloat(e.target.dataset.val);
            handleMealLog(val);
        });
    });

    document.querySelectorAll('#emotion-modal .option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const val = parseFloat(e.target.dataset.val);
            handleEmotionLog(val);
        });
    });

    document.getElementById('submit-sleep-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('sleep-input').value);
        handleSleepLog(val);
    });

    document.getElementById('test-next-day-btn').addEventListener('click', handleNextDay);
    
    petImageWrapper.addEventListener('click', interactPet);
    storyPetWrapper.addEventListener('click', interactPet);
}

function updateTimeWindow() {
    const hour = new Date().getHours();
    windowSky.className = 'window-pane';
    if (hour >= 6 && hour < 17) {
        windowSky.classList.add('sky-day');
    } else if (hour >= 17 && hour < 20) {
        windowSky.classList.add('sky-sunset');
    } else {
        windowSky.classList.add('sky-night');
    }
}

function mockLogin(provider) {
    loginSection.style.display = 'none';
    storySection.style.display = 'flex';
    storyStep = 0;
    renderStoryStep();
}

function prevStoryStep() {
    if (storyStep > 0) {
        storyStep--;
        renderStoryStep();
    }
}

function renderStoryStep() {
    storyActions.innerHTML = ''; // Clear old actions
    
    if (storyStep === 0) {
        storyBackBtn.style.display = 'none';
        tapToContinue.style.display = 'block';
        storyActions.style.display = 'none';
        storyText.innerHTML = "안녕! 나는 사람의 감각과 감정을 먹고 자라는 푸디몬이야.";
    } 
    else if (storyStep === 1) {
        storyBackBtn.style.display = 'flex';
        tapToContinue.style.display = 'block';
        storyActions.style.display = 'none';
        storyText.innerHTML = "네가 잘 자고 편안하게 먹으면 나는 튼튼해지지만,<br>불안이 쌓이거나 몸의 신호를 무시하면 시들어버려...";
    } 
    else if (storyStep === 2) {
        storyBackBtn.style.display = 'flex';
        tapToContinue.style.display = 'none';
        storyActions.style.display = 'block';
        storyText.innerHTML = "나의 마스터가 되어 나를 돌봐줄래?";
        storyActions.innerHTML = `<button class="primary-btn" onclick="storyStep++; renderStoryStep(event)">입양하기! 🥰</button>`;
    }
    else if (storyStep === 3) {
        storyBackBtn.style.display = 'flex';
        tapToContinue.style.display = 'none';
        storyActions.style.display = 'block';
        storyText.innerHTML = "고마워! 먼저, 내가 마스터를 뭐라고 부르면 될까?";
        storyActions.innerHTML = `
            <input type="text" id="onboarding-name" class="text-input" placeholder="이름을 입력해 줘!" value="${userState.masterName}" style="margin-bottom: 12px; text-align: center;">
            <button class="primary-btn" onclick="saveNameAndNext()">다음</button>
        `;
        setTimeout(() => document.getElementById('onboarding-name').focus(), 100);
    }
    else if (storyStep === 4) {
        storyBackBtn.style.display = 'flex';
        tapToContinue.style.display = 'none';
        storyActions.style.display = 'block';
        storyText.innerHTML = `반가워! ${userState.masterName} 마스터!<br>그럼 마스터에 대해 알려줘.<br>평소 수면 시간은 어느 정도야?`;
        storyActions.innerHTML = `
            <select id="onboarding-sleep" style="margin-bottom: 12px; text-align: center;">
                <option value="5" ${tempSleep === 5 ? 'selected' : ''}>5시간</option>
                <option value="6" ${tempSleep === 6 ? 'selected' : ''}>6시간</option>
                <option value="7" ${tempSleep === 7 ? 'selected' : ''}>7시간</option>
                <option value="8" ${tempSleep === 8 ? 'selected' : ''}>8시간</option>
                <option value="9" ${tempSleep === 9 ? 'selected' : ''}>9시간 이상</option>
            </select>
            <button class="primary-btn" onclick="saveSleepAndNext()">다음</button>
        `;
    }
    else if (storyStep === 5) {
        storyBackBtn.style.display = 'flex';
        storyText.innerHTML = `하루 목표 식사 횟수는 몇 끼야?`;
        storyActions.innerHTML = `
            <select id="onboarding-meals" style="margin-bottom: 12px; text-align: center;">
                <option value="1" ${tempMeals === 1 ? 'selected' : ''}>1끼</option>
                <option value="2" ${tempMeals === 2 ? 'selected' : ''}>2끼</option>
                <option value="3" ${tempMeals === 3 ? 'selected' : ''}>3끼</option>
                <option value="4" ${tempMeals === 4 ? 'selected' : ''}>4끼</option>
            </select>
            <button class="primary-btn" onclick="saveMealsAndNext()">다음</button>
        `;
    }
    else if (storyStep === 6) {
        storyBackBtn.style.display = 'flex';
        storyText.innerHTML = "마지막으로, 일반적인 1인분 기준으로 평소에 얼만큼 먹어? (기준 설정)";
        storyActions.innerHTML = `
            <select id="onboarding-meal-size" style="margin-bottom: 12px; text-align: center;">
                <option value="0.33" ${tempMealSize === 0.33 ? 'selected' : ''}>1/3 이하</option>
                <option value="0.5" ${tempMealSize === 0.5 ? 'selected' : ''}>1/2</option>
                <option value="0.66" ${tempMealSize === 0.66 ? 'selected' : ''}>2/3</option>
                <option value="1.0" ${tempMealSize === 1.0 ? 'selected' : ''}>1 (정량)</option>
                <option value="1.5" ${tempMealSize === 1.5 ? 'selected' : ''}>1.5</option>
                <option value="2.0" ${tempMealSize === 2.0 ? 'selected' : ''}>2 이상</option>
            </select>
            <button class="primary-btn" onclick="finishStory()">시작하기 ✨</button>
        `;
    }
}

function saveNameAndNext() {
    const input = document.getElementById('onboarding-name');
    if(input.value.trim().length === 0) {
        showToast('이름을 한 글자 이상 적어주세요! 🥺');
        return;
    }
    userState.masterName = input.value.trim();
    storyStep++;
    renderStoryStep();
}

function saveSleepAndNext() {
    tempSleep = parseFloat(document.getElementById('onboarding-sleep').value);
    storyStep++;
    renderStoryStep();
}

function saveMealsAndNext() {
    tempMeals = parseFloat(document.getElementById('onboarding-meals').value);
    storyStep++;
    renderStoryStep();
}

function finishStory() {
    tempMealSize = parseFloat(document.getElementById('onboarding-meal-size').value);
    
    userState.targetSleep = tempSleep;
    userState.targetMeals = tempMeals;
    userState.usualMealSize = tempMealSize;
    userState.onboarded = true;
    
    onboardingScreen.classList.remove('active');
    setTimeout(() => {
        mainScreen.classList.add('active');
        calculateScore();
        startDialogueRotation();
    }, 500);
}

function interactPet(e) {
    if (userState.isFrozen && userState.onboarded) return; 
    
    const wrapper = e.currentTarget;
    wrapper.classList.add('jump');
    setTimeout(() => wrapper.classList.remove('jump'), 200);
    
    const randomEmoji = interactionEmojis[Math.floor(Math.random() * interactionEmojis.length)];
    clickParticle.textContent = randomEmoji;
    
    showParticle(e, clickParticle);
    changePetDialogue(true);
}

function showParticle(e, particleEl) {
    particleEl.style.left = `${e.clientX}px`;
    particleEl.style.top = `${e.clientY}px`;
    particleEl.classList.remove('fly');
    void particleEl.offsetWidth; 
    particleEl.classList.add('fly');
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
    if (id === 'inventory-modal') renderInventory();
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function getFormattedTime() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    let hh = d.getHours();
    const min = String(d.getMinutes()).padStart(2, '0');
    const ampm = hh >= 12 ? '오후' : '오전';
    hh = hh % 12 || 12;
    return `${mm}월 ${dd}일 ${ampm} ${hh}:${min}`;
}

function addLog(type, content) {
    userState.logs.unshift({
        time: getFormattedTime(),
        type: type,
        content: content
    });
}

function openHistoryModal() {
    const listEl = document.getElementById('history-list');
    listEl.innerHTML = '';
    
    if (userState.logs.length === 0) {
        listEl.innerHTML = '<p style="color:#718096; text-align:center; padding: 20px;">아직 기록이 없어요. 푸디몬과 함께 일상을 기록해 보세요!</p>';
    } else {
        userState.logs.forEach(log => {
            let tagClass = '';
            let tagLabel = '';
            if (log.type === 'meal') { tagClass = 'tag-meal'; tagLabel = '식사'; }
            else if (log.type === 'sleep') { tagClass = 'tag-sleep'; tagLabel = '수면'; }
            else if (log.type === 'emotion') { tagClass = 'tag-emotion'; tagLabel = '감정'; }
            else if (log.type === 'skip') { tagClass = 'tag-emotion'; tagLabel = '결식'; }
            
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-item-header">
                    <span>${log.time}</span>
                </div>
                <div class="history-item-body">
                    <span class="tag ${tagClass}">${tagLabel}</span>
                    <span>${log.content}</span>
                </div>
            `;
            listEl.appendChild(item);
        });
    }
    openModal('history-modal');
}

// QUIZ LOGIC
function openMealModal() {
    document.getElementById('meal-quiz-answer').value = '';
    document.getElementById('meal-quiz-yesno-options').style.display = 'none';
    document.getElementById('meal-quiz-answer').style.display = 'block';
    
    document.querySelectorAll('#meal-quiz-yesno-options .option-btn').forEach(b => b.classList.remove('selected'));
    currentYesNoAnswer = null;

    currentQuizObj = quizzes[Math.floor(Math.random() * quizzes.length)];
    document.getElementById('meal-quiz-text').textContent = currentQuizObj.q;
    
    if (currentQuizObj.type === 'yesno') {
        document.getElementById('meal-quiz-answer').style.display = 'none';
        document.getElementById('meal-quiz-yesno-options').style.display = 'grid';
    }
    
    document.getElementById('meal-step-1').style.display = 'block';
    document.getElementById('meal-step-2').style.display = 'none';
    openModal('meal-modal');
}

function setYesNoAnswer(ans) {
    currentYesNoAnswer = ans;
    document.querySelectorAll('#meal-quiz-yesno-options .option-btn').forEach(b => {
        if (b.textContent.includes(ans)) b.classList.add('selected');
        else b.classList.remove('selected');
    });
}

function nextMealStep() {
    if (currentQuizObj.type === 'yesno') {
        if (!currentYesNoAnswer) {
            showToast('답변을 선택해 주세요! 🥺');
            return;
        }
    } else {
        const answer = document.getElementById('meal-quiz-answer').value.trim();
        if (answer.length < 2) {
            showToast('적어도 두 글자 이상 적어주세요! 🥺');
            return;
        }
        if (currentQuizObj.type === 'words3') {
            const words = answer.split(' ').filter(w => w.length > 0);
            if (words.length < 3) {
                showToast('3개 이상의 단어로 표현해 주세요! 🥺');
                return;
            }
        }
    }
    
    document.getElementById('meal-step-1').style.display = 'none';
    document.getElementById('meal-step-2').style.display = 'block';
}

function skipMeal() {
    closeModal('meal-modal');
    userState.today.badMealCount++;
    addLog('skip', `식사를 건너뛰었어요.`);
    showToast(`식사를 거르면 푸디몬이 아파해요 😢`);
    calculateScore();
}

function handleMealLog(size) {
    closeModal('meal-modal');
    userState.today.mealCount++;
    
    let answerText = "";
    if (currentQuizObj.type === 'yesno') {
        answerText = currentYesNoAnswer;
    } else {
        answerText = document.getElementById('meal-quiz-answer').value.trim();
    }
    
    let sizeDesc = size === 1.0 ? '정량' : `${Math.round(size*100)}%`;
    addLog('meal', `식사 기록 (${sizeDesc}): "${answerText}"`);
    
    // Adjusted logic per user feedback
    if (size <= 0.33) {
        userState.today.badMealCount++;
        showToast(`식사량이 너무 부족했어요! 😢`);
    } else if (size >= 2.0) {
        userState.today.badMealCount++;
        showToast(`식사량이 너무 과했어요! 🤢`);
    } else {
        showToast(`${userState.masterName} 마스터 완벽해요! 🥰`);
    }
    
    calculateScore();
}

function handleSleepLog(hours) {
    closeModal('sleep-modal');
    const diff = Math.abs(userState.targetSleep - hours);
    userState.today.sleepDiff = diff;
    addLog('sleep', `수면 ${hours}시간 기록`);
    
    if (diff <= 1) showToast('푹 잤네요! 푸디몬도 쌩쌩해요! ✨');
    else if (diff >= 3) showToast('수면이 부족해요. 푸디몬이 피곤해합니다 🥱');
    else showToast('오늘 밤엔 좀 더 푹 자보는 건 어때요? 🌙');
    calculateScore();
}

function handleEmotionLog(val) {
    closeModal('emotion-modal');
    userState.today.emotion = val;
    
    let feel = '보통';
    if(val >= 80) feel = '좋음/매우 좋음';
    else if(val <= 40) feel = '나쁨/매우 나쁨';
    addLog('emotion', `오늘 기분: ${feel}`);
    
    if (val >= 80) showToast('좋은 기분! 푸디몬도 신났어요! 🎶');
    else if (val <= 40) showToast('푸디몬이 위로해 줄게요 🫂');
    else showToast('무난한 하루! 푸디몬이 곁에 있어요 🌟');
    calculateScore();
}

function calculateScore() {
    userState.isFrozen = false; 

    let sleepScore = 0;
    if (userState.today.sleepDiff === null) sleepScore = 0; 
    else {
        if (userState.today.sleepDiff <= 1) sleepScore = 100;
        else if (userState.today.sleepDiff < 3) sleepScore = 50;
        else sleepScore = 0;
    }

    let mealScore = 0;
    if (userState.today.mealCount > 0) {
        let baseMeal = (userState.today.mealCount / userState.targetMeals) * 100;
        if (baseMeal > 100) baseMeal = 100;
        baseMeal -= (userState.today.badMealCount * 20);
        mealScore = Math.max(0, baseMeal);
    } else {
        // If they skipped everything or haven't eaten but triggered a calc
        if (userState.today.badMealCount > 0) mealScore = 0;
    }

    let emotionScore = 0;
    if (userState.today.emotion !== null) emotionScore = userState.today.emotion;
    else emotionScore = 50; 

    let baseScore = (sleepScore * 0.35) + (mealScore * 0.35) + (emotionScore * 0.30);

    let multiplier = 1.0;
    if (userState.streak >= 14) multiplier = 1.15;
    else if (userState.streak >= 7) multiplier = 1.10;
    else if (userState.streak >= 3) multiplier = 1.05;
    
    userState.currentDailyScore = Math.min(100, baseScore * multiplier);
    updateUI();
}

function handleNextDay() {
    const hasLoggedAnything = userState.today.sleepDiff !== null || userState.today.mealCount > 0 || userState.today.emotion !== null;
    
    if (!hasLoggedAnything) {
        if (userState.shields > 0) {
            userState.shields--;
            showToast('스트릭 방패가 사용되어 연속 기록이 유지되었습니다! 🛡️');
        } else {
            userState.streak = 0;
        }
        userState.isFrozen = true;
    } else {
        userState.streak++;
        userState.historyScores.push(userState.currentDailyScore);
        if (userState.historyScores.length > 7) userState.historyScores.shift(); 
        
        if (userState.streak % 7 === 0) {
            userState.shields++;
            showToast('연속 달성! 스트릭 방패 1개를 얻었습니다! 🛡️');
        }
        
        const reward = 10 + (Math.floor(userState.streak / 3) * 5);
        userState.currency += reward;
        attendanceRewardText.textContent = `별가루 +${reward}개 획득!`;
        openModal('attendance-modal');
    }

    userState.today = { sleepDiff: null, mealCount: 0, badMealCount: 0, emotion: null };
    userState.currentDailyScore = 0;
    calculateScore(); 
}

// DIALOGUE ROTATION
function startDialogueRotation() {
    if(dialogueInterval) clearInterval(dialogueInterval);
    dialogueInterval = setInterval(() => {
        if(!userState.isFrozen) {
            changePetDialogue(false);
        }
    }, 12000); 
}

function changePetDialogue(isInteraction) {
    if (userState.isFrozen) return;
    petStatusMessage.style.opacity = 0;
    
    setTimeout(() => {
        let pool = dialogues.normal;
        if (userState.averageScore >= 80) pool = dialogues.good;
        else if (userState.averageScore < 40) pool = dialogues.bad;
        
        if (isInteraction) {
            pool = ["앗, 간지러워!", "에헤헤", "마스터 손길 최고야 🥰", "기분 좋아!"];
        }
        
        let text = pool[Math.floor(Math.random() * pool.length)];
        
        // Dynamically replace Master's name if missing in the text
        if (!text.includes(userState.masterName) && Math.random() > 0.5) {
             text = `${userState.masterName} 마스터, ` + text;
        }
        
        petStatusMessage.textContent = text;
        petStatusMessage.style.opacity = 1;
    }, 300);
}

function renderInventory() {
    invShieldCount.textContent = `${userState.shields}개`;
    
    const cContainer = document.getElementById('inventory-costumes');
    cContainer.innerHTML = '';
    if (userState.ownedCostumes.length === 0) cContainer.innerHTML = '<p style="color:#718096; grid-column: 1 / -1; text-align:center;">보유한 코스튬이 없어요.</p>';
    
    userState.ownedCostumes.forEach(id => {
        const item = costumesData.find(c => c.id === id);
        if(!item) return;
        const isEquipped = userState.equippedCostume === id;
        const div = document.createElement('div');
        div.className = `costume-item ${isEquipped ? 'owned' : ''}`;
        div.innerHTML = `<div class="costume-icon">${item.icon}</div><div class="costume-name">${item.name}</div><div class="costume-price" style="color: ${isEquipped ? '#9C66FF' : '#718096'}">${isEquipped ? '장착 중' : '장착하기'}</div>`;
        div.onclick = () => { userState.equippedCostume = isEquipped ? null : id; renderInventory(); updateUI(); };
        cContainer.appendChild(div);
    });

    const bContainer = document.getElementById('inventory-backgrounds');
    bContainer.innerHTML = '';
    if (userState.ownedBackgrounds.length === 0) bContainer.innerHTML = '<p style="color:#718096; grid-column: 1 / -1; text-align:center;">보유한 배경이 없어요.</p>';
    
    userState.ownedBackgrounds.forEach(id => {
        const item = backgroundsData.find(b => b.id === id);
        if(!item) return;
        const isEquipped = userState.equippedBackgrounds.includes(id);
        const div = document.createElement('div');
        div.className = `costume-item ${isEquipped ? 'owned' : ''}`;
        div.innerHTML = `<div class="costume-icon">${item.icon}</div><div class="costume-name">${item.name}</div><div class="costume-price" style="color: ${isEquipped ? '#9C66FF' : '#718096'}">${isEquipped ? '장착 중' : '장착하기'}</div>`;
        div.onclick = () => {
            if (isEquipped) {
                userState.equippedBackgrounds = userState.equippedBackgrounds.filter(x => x !== id);
            } else {
                userState.equippedBackgrounds.push(id);
            }
            renderInventory(); 
            updateUI();
        };
        bContainer.appendChild(div);
    });
}

function switchShopTab(tab) {
    shopCurrentTab = tab;
    document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'costume') {
        document.getElementById('shop-items-costume').style.display = 'grid';
        document.getElementById('shop-items-background').style.display = 'none';
    } else {
        document.getElementById('shop-items-costume').style.display = 'none';
        document.getElementById('shop-items-background').style.display = 'grid';
    }
    renderShop();
}

function openShop() {
    closeModal('inventory-modal');
    openModal('shop-modal');
    renderShop();
}

function renderShop() {
    shopCurrencyDisplay.textContent = userState.currency;
    
    const cContainer = document.getElementById('shop-items-costume');
    cContainer.innerHTML = '';
    costumesData.forEach(item => {
        const isOwned = userState.ownedCostumes.includes(item.id);
        const div = document.createElement('div');
        div.className = `costume-item`;
        div.innerHTML = `<div class="costume-icon">${item.icon}</div><div class="costume-name">${item.name}</div><div class="costume-price">${isOwned ? '<span style="color:#48BB78">보유 중</span>' : `<span>✨</span>${item.price}`}</div>`;
        if (!isOwned) div.onclick = () => buyItem(item, 'costume');
        else div.style.opacity = '0.6';
        cContainer.appendChild(div);
    });

    const bContainer = document.getElementById('shop-items-background');
    bContainer.innerHTML = '';
    backgroundsData.forEach(item => {
        const isOwned = userState.ownedBackgrounds.includes(item.id);
        const div = document.createElement('div');
        div.className = `costume-item`;
        div.innerHTML = `<div class="costume-icon">${item.icon}</div><div class="costume-name">${item.name}</div><div class="costume-price">${isOwned ? '<span style="color:#48BB78">보유 중</span>' : `<span>✨</span>${item.price}`}</div>`;
        if (!isOwned) div.onclick = () => buyItem(item, 'background');
        else div.style.opacity = '0.6';
        bContainer.appendChild(div);
    });
}

function buyItem(item, type) {
    if (userState.currency >= item.price) {
        userState.currency -= item.price;
        if (type === 'costume') userState.ownedCostumes.push(item.id);
        else userState.ownedBackgrounds.push(item.id);
        
        showToast(`${item.name}을(를) 구매했어요! 🎉`);
        renderShop();
        updateUI();
    } else {
        showToast('별가루가 부족해요! 😥');
    }
}

function updateUI() {
    currencyDisplay.textContent = userState.currency;
    
    let sum = 0;
    userState.historyScores.forEach(s => sum += s);
    let avgDivisor = userState.historyScores.length;
    if (!userState.isFrozen && userState.currentDailyScore > 0) {
        sum += userState.currentDailyScore;
        avgDivisor++;
    }
    userState.averageScore = sum / avgDivisor;

    let currentLevelObj = levels[0];
    let levelIndex = 0;
    for (let i = 0; i < levels.length; i++) {
        if (userState.averageScore <= levels[i].maxScore) {
            currentLevelObj = levels[i];
            levelIndex = i + 1;
            break;
        }
    }
    userState.level = levelIndex;

    streakDisplay.textContent = `${userState.streak}일 연속`;
    
    if (userState.shields > 0) {
        shieldIndicator.style.display = 'flex';
        shieldDisplay.textContent = userState.shields;
    } else {
        shieldIndicator.style.display = 'none';
    }

    levelDisplay.textContent = `Lv.${userState.level} ${currentLevelObj.name}`;
    scoreProgress.style.width = `${userState.averageScore}%`;
    
    petImage.src = currentLevelObj.img;
    storyPetImage.src = currentLevelObj.img;

    petScoreText.textContent = `최근 평균 지수: ${Math.round(userState.averageScore)} (오늘: ${Math.round(userState.currentDailyScore)})`;
    
    if (userState.equippedCostume && !userState.isFrozen) {
        const c = costumesData.find(x => x.id === userState.equippedCostume);
        petCostume.style.display = 'block';
        petCostume.textContent = c ? c.icon : '';
    } else {
        petCostume.style.display = 'none';
    }

    document.querySelectorAll('.bg-item:not(.window)').forEach(el => el.classList.remove('active'));
    userState.equippedBackgrounds.forEach(bgId => {
        const bg = backgroundsData.find(b => b.id === bgId);
        if (bg) {
            const el = document.getElementById(`bg-${bg.type}`);
            if (el) {
                el.classList.add('active');
                el.textContent = bg.emoji;
            }
        }
    });

    if (userState.isFrozen) {
        petImageWrapper.classList.add('frozen');
        petZzz.style.display = 'block';
        petStatusMessage.textContent = `${userState.masterName} 마스터의 소식이 궁금해... Zzz`;
        petHat.style.display = 'none';
        petAura.style.display = 'none';
    } else {
        petImageWrapper.classList.remove('frozen');
        petZzz.style.display = 'none';
        
        if (userState.streak >= 3) petHat.style.display = 'block';
        else petHat.style.display = 'none';

        if (userState.streak >= 7) petAura.style.display = 'block';
        else petAura.style.display = 'none';
    }
}

// Start
init();
