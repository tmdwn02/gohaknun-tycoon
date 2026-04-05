// ════════════════════════════════════════
//  고학번의 하루 — 서울대 생존 타이쿤
// ════════════════════════════════════════

// ─── 행동 정의 (버거 재료 → 고학번 행동) ───
const INGREDIENTS = {
  wake:      { name: '기상',    bg: '#f5c842', color: '#333', emoji: '🌅' },
  queue:     { name: '셔틀줄서기', bg: '#4ecdc4', color: '#fff', emoji: '🚶' },
  board:     { name: '셔틀탑승',  bg: '#2980b9', color: '#fff', emoji: '🚌' },
  check:     { name: '공지확인',bg: '#8e44ad', color: '#fff', emoji: '📱' },
  attend:    { name: '출석체크',bg: '#27ae60', color: '#fff', emoji: '✍️' },
  rice:      { name: '학식받기', bg: '#c8883a', color: '#fff', emoji: '🍚' },
  alone:     { name: '혼밥수용',bg: '#7b3a1e', color: '#fff', emoji: '😶' },
  kakaotalk: { name: '팀카톡',  bg: '#e8c233', color: '#333', emoji: '💬' },
  everytime: { name: '에타확인', bg: '#e74c3c', color: '#fff', emoji: '🔴' },
  goHome:    { name: '귀가',    bg: '#7f8c8d', color: '#fff', emoji: '🏠' },
  search:    { name: '자료조사', bg: '#3d5a80', color: '#fff', emoji: '🔍' },
  seat:      { name: '자리잡기',bg: '#e07c24', color: '#fff', emoji: '🪑' },
  submit:    { name: '과제제출', bg: '#1a6b3c', color: '#fff', emoji: '📤' },
  cafe:      { name: '카페',    bg: '#6b3a2a', color: '#fff', emoji: '☕' },
  writeRep:  { name: '레포트작성',bg: '#2c6e49', color: '#fff', emoji: '✏️' },
  nap:       { name: '쪽잠',    bg: '#34495e', color: '#fff', emoji: '😴' },
};
const ING_KEYS = Object.keys(INGREDIENTS);

// ─── 상황 정의 — customer가 미션과 1:1로 연결됨 ───
// 인덱스 0-6: 4단계 이하 (1~2일차용)
// 인덱스 7-14: 5단계 이상 (3~5일차용)
const RECIPES = [
  /* ── 4단계 이하 ── */
  { name: '등교하기',       ings: ['wake', 'queue', 'board'],                                                              price: 3000,  desc: '버스 줄이 끝도 없다...',
    customer: { name: '학교 알람',    emoji: '⏰', patience: 1.2, quote: '"기상 시간이다..."' } },
  { name: '수업 출석',      ings: ['check', 'attend'],                                                                     price: 2500,  desc: '강의실이 어디더라?',
    customer: { name: '교수님',       emoji: '👨‍🏫', patience: 1.5, quote: '"오늘 출석 부릅니다"', bonusMult: 1.5 } },
  { name: '점심 혼밥',      ings: ['rice', 'alone'],                                                                       price: 3000,  desc: '4년째 혼밥이다',
    customer: { name: '배꼽시계',     emoji: '🫃', patience: 1.3, quote: '"배고프다..."' } },
  { name: '팀플 독박',      ings: ['kakaotalk', 'check', 'attend'],                                                        price: 5500,  desc: '읽씹... 그냥 내가 다 한다',
    customer: { name: '팀플 빌런',    emoji: '😤', patience: 0.6, quote: '"카톡 씹는 중..."' } },
  { name: '잔디광장 구경',  ings: ['check', 'queue', 'alone', 'goHome'],                                                   price: 5000,  desc: '같이 갈 사람이 없다...',
    customer: { name: '잔디광장',     emoji: '🌿', patience: 2.0, quote: '"오늘 축제래..."' } },
  { name: '도서관 자리잡기',ings: ['wake', 'queue', 'search', 'seat'],                                                    price: 4000,  desc: '1열은 이미 꽉 찼다',
    customer: { name: '중앙도서관',   emoji: '📚', patience: 0.9, quote: '"자리가 없습니다..."' } },
  { name: '레포트 제출',    ings: ['search', 'alone', 'writeRep', 'submit'],                                                  price: 5000,  desc: '프린터 앞에서 줄 서기',
    customer: { name: '레포트',       emoji: '📄', patience: 1.0, quote: '"형식 맞춰서 내세요"' } },
  /* ── 5단계 이상 ── */
  { name: '휴강 사태',      ings: ['wake', 'queue', 'board', 'everytime', 'goHome'],                                       price: 4500,  desc: '모르고 학교까지 왔다',
    customer: { name: '에브리타임',   emoji: '📱', patience: 0.8, quote: '"휴강 공지 올라왔음"' } },
  { name: '과제 마감 전날', ings: ['check', 'search', 'alone', 'nap', 'submit'],                                          price: 6500,  desc: '밤새워서 겨우 냈다',
    customer: { name: '마감 알림',    emoji: '🚨', patience: 0.7, quote: '"제출 마감 1시간 전"' } },
  { name: '카페 공부',      ings: ['queue', 'seat', 'cafe', 'search', 'alone'],                                           price: 5000,  desc: '아메리카노 한 잔으로 버팀',
    customer: { name: '스타벅스',     emoji: '☕', patience: 1.6, quote: '"공부 잘 되는 척..."' } },
  { name: '교수님 면담',    ings: ['check', 'queue', 'attend', 'submit', 'goHome'],                                        price: 5500,  desc: '성적 이의신청 해봤자...',
    customer: { name: '교수님 연구실',emoji: '🚪', patience: 1.1, quote: '"면담 예약하셨나요?"' } },
  { name: '셔틀 놓침',      ings: ['wake', 'queue', 'board', 'everytime', 'goHome'],                                       price: 4000,  desc: '1분 차이로 놓쳤다...',
    customer: { name: '셔틀버스',     emoji: '🚌', patience: 0.8, quote: '"방금 출발했습니다"' } },
  { name: '팀플 발표',      ings: ['kakaotalk', 'check', 'search', 'attend', 'submit'],                                    price: 6000,  desc: '발표자료 혼자 다 만듦',
    customer: { name: '팀플 팀원',    emoji: '🫥', patience: 0.7, quote: '"나 발표 못하겠어"' } },
  { name: '수강신청 전쟁',  ings: ['wake', 'check', 'search', 'everytime', 'attend', 'submit'],                           price: 7000,  desc: '새벽 6시 클릭 전쟁...',
    customer: { name: '수강신청 창',  emoji: '💻', patience: 0.5, quote: '"서버가 터졌습니다"' } },
  { name: '고학번 풀루틴',  ings: ['wake','queue','board','check','attend','rice','alone','kakaotalk','everytime','goHome'],price: 14000, desc: '이게 고학번의 하루다',
    customer: { name: '고학번',       emoji: '😮‍💨', patience: 1.0, quote: '"또 하루 시작이다..."' } },
];

// ─── 일차 설정 ───
// minRecipe~maxRecipe 범위에서 랜덤 출제
// 인덱스 0-6: 4단계 이하 / 인덱스 7-14: 5단계 이상
const DAY_CONFIG = [
  { orders: 4, timePerOrder: 26, minRecipe: 0, maxRecipe: 3  }, // 1일차: 등교·출석·혼밥·팀플독박
  { orders: 5, timePerOrder: 24, minRecipe: 0, maxRecipe: 6  }, // 2일차: 4단계 이하 전체
  { orders: 5, timePerOrder: 22, minRecipe: 7, maxRecipe: 11 }, // 3일차: 5단계 이상
  { orders: 6, timePerOrder: 20, minRecipe: 7, maxRecipe: 13 }, // 4일차: 5~6단계
  { orders: 7, timePerOrder: 18, minRecipe: 7, maxRecipe: 14 }, // 5일차: 전체 5단계 이상 + 풀루틴
];
const TOTAL_DAYS = DAY_CONFIG.length;

// ─── 업그레이드 풀 ───
const UPGRADE_POOL = [
  { id: 'time+5',   name: '⏱️ 여유 +5초',    desc: '상황당 제한시간 5초 증가',    apply: g => { g.bonusTime += 5; } },
  { id: 'time+3',   name: '⏱️ 여유 +3초',    desc: '상황당 제한시간 3초 증가',    apply: g => { g.bonusTime += 3; } },
  { id: 'penalty-', name: '🛡️ 멘탈 강화',    desc: '실수 시 패널티 -2초',         apply: g => { g.penaltyReduce += 2; } },
  { id: 'bonus+',   name: '📈 스펙 업',       desc: '모든 미션 점수 20% 증가',     apply: g => { g.bonusMult += 0.2; } },
  { id: 'speed+',   name: '⚡ 속도의 사나이', desc: '빠를수록 더 높은 점수',       apply: g => { g.speedBonus = true; } },
  { id: 'fail-1',   name: '😇 회복탄력성',    desc: '실패 허용 +1회 증가',         apply: g => { g.maxFails++; } },
];

// ─── 게임 상태 ───
let G = {};

function initGame() {
  G = {
    phase: 'playing',
    day: 1,
    money: 0,
    totalOrders: 0,
    totalFailed: 0,
    ordersDone: 0,
    ordersFailed: 0,
    currentOrder: [],
    currentBurger: [],
    currentCustomer: null,
    currentRecipe: null,
    lastRecipeName: null,
    timer: 0,
    timerMax: 0,
    timerRaf: null,
    lastTick: 0,
    bonusTime: 0,
    penaltyReduce: 0,
    bonusMult: 1.0,
    speedBonus: false,
    maxFails: 3,
    appliedUpgrades: [],
  };
}

// ─── 시작 ───
function startGame() {
  initGame();
  showScreen('screen-game');
  startDay();
}

function startDay() {
  G.ordersDone   = 0;
  G.ordersFailed = 0;
  document.getElementById('hud-day').textContent   = `${G.day}단계`;
  document.getElementById('hud-money').textContent = `생존 ${G.money.toLocaleString()}점`;
  renderIngredientButtons();
  nextOrder();
}

// ─── 주문 흐름 ───
function nextOrder() {
  cancelTimer();
  clearFeedback();

  const cfg = DAY_CONFIG[G.day - 1];

  if (G.ordersDone + G.ordersFailed >= cfg.orders) {
    endDay();
    return;
  }

  const minR = cfg.minRecipe ?? 0;
  const maxR = Math.min(cfg.maxRecipe, RECIPES.length - 1);
  let recipe;
  let tries = 0;
  do {
    recipe = RECIPES[minR + Math.floor(Math.random() * (maxR - minR + 1))];
    tries++;
  } while (recipe.name === G.lastRecipeName && tries < 10);
  G.currentRecipe   = recipe;
  G.lastRecipeName  = recipe.name;
  G.currentCustomer = G.currentRecipe.customer;
  G.currentOrder  = [...G.currentRecipe.ings];
  G.currentBurger = [];

  G.timerMax = (cfg.timePerOrder + G.bonusTime) * G.currentCustomer.patience;
  G.timer    = G.timerMax;

  renderCustomer();
  renderOrder();
  renderBurgerStack();
  updateOrderProgress();
  startTimer();
}

// ─── 타이머 ───
function startTimer() {
  G.lastTick = performance.now();
  G.timerRaf = requestAnimationFrame(tickTimer);
}

function tickTimer(now) {
  const dt = (now - G.lastTick) / 1000;
  G.lastTick = now;
  G.timer = Math.max(0, G.timer - dt);
  updateTimerBar();
  if (G.timer <= 0) {
    orderFailed('⏰ 시간 초과! 상황을 버티지 못했습니다.');
    return;
  }
  G.timerRaf = requestAnimationFrame(tickTimer);
}

function cancelTimer() {
  if (G.timerRaf) cancelAnimationFrame(G.timerRaf);
  G.timerRaf = null;
}

function updateTimerBar() {
  const pct = G.timer / G.timerMax;
  const bar = document.getElementById('timer-bar');
  bar.style.width = (pct * 100) + '%';
  bar.className = 'timer-bar' + (pct < 0.25 ? ' danger' : pct < 0.5 ? ' warning' : '');
}

// ─── 행동 클릭 ───
function clickIngredient(key) {
  const expected = G.currentOrder[G.currentBurger.length];

  if (key === expected) {
    G.currentBurger.push(key);
    renderBurgerStack();
    renderOrder();
    if (G.currentBurger.length === G.currentOrder.length) {
      orderComplete();
    }
  } else {
    const penalty = Math.max(1, 3 - G.penaltyReduce);
    G.timer = Math.max(0, G.timer - penalty);
    showFeedback(`❌ 틀렸어요! 다음은 "${INGREDIENTS[expected].name}"`, 'bad');
    shakeElement(`ing-${key}`);
  }
}

// ─── 미션 완료 ───
function orderComplete() {
  cancelTimer();
  G.ordersDone++;
  G.totalOrders++;

  const speedRatio = G.timer / G.timerMax;
  let earned = G.currentRecipe.price * G.bonusMult;
  if (G.speedBonus) earned *= (0.7 + speedRatio * 0.6);
  if (G.currentCustomer.bonusMult) earned *= G.currentCustomer.bonusMult;
  earned = Math.round(earned / 100) * 100;

  G.money += earned;
  document.getElementById('hud-money').textContent = `생존 ${G.money.toLocaleString()}점`;
  showFeedback(`✅ +${earned.toLocaleString()}점${speedRatio > 0.6 ? ' ⚡빠른 대처!' : ''}`, 'good');

  setTimeout(nextOrder, 1100);
}

// ─── 미션 실패 ───
function orderFailed(msg) {
  cancelTimer();
  G.ordersFailed++;
  G.totalFailed++;
  showFeedback(msg || '😤 상황을 버티지 못했습니다!', 'bad');
  shakeElement('customer-card');

  if (G.ordersFailed >= G.maxFails) {
    setTimeout(gameOver, 1200);
  } else {
    setTimeout(nextOrder, 1200);
  }
}

// ─── 일 종료 ───
function endDay() {
  cancelTimer();
  const cfg     = DAY_CONFIG[G.day - 1];
  const success = G.ordersDone >= Math.ceil(cfg.orders * 0.5);

  if (!success) { gameOver(); return; }

  if (G.day >= TOTAL_DAYS) { showEnding(); return; }

  showScreen('screen-result');
  document.getElementById('result-emoji').textContent = G.ordersFailed === 0 ? '🏆' : '😮‍💨';
  document.getElementById('result-title').textContent = `${G.day}단계 생존!`;
  document.getElementById('result-stats').innerHTML = `
    <div>✅ 버텨낸 상황: ${G.ordersDone}개</div>
    <div>❌ 못 버틴 상황: ${G.ordersFailed}개</div>
    <div>📊 누적 생존점수: ${G.money.toLocaleString()}점</div>
  `;

  document.getElementById('upgrade-section').style.display = 'none';
  document.getElementById('btn-next-day').textContent = '다음 단계 버티기 →';
}

function nextDay() {
  if (G.day >= TOTAL_DAYS) { showEnding(); return; }
  G.day++;
  showScreen('screen-game');
  startDay();
}

// ─── 게임오버 ───
function gameOver() {
  cancelTimer();
  showScreen('screen-gameover');
  document.getElementById('gameover-desc').textContent = `오랜만의 학교생활을 버티지 못하고 중도휴학 결정. 졸업은 더더욱 멀어져만 간다..`;
  document.getElementById('gameover-stats').innerHTML  = finalStatsHTML();
}

// ─── 엔딩 ───
function showEnding() {
  showScreen('screen-ending');
  const s = G.money;
  let emoji, title, desc;
  if (s >= 200000)      { emoji = '🏆'; title = '고학번 레전드!';    desc = '7일을 완벽하게 버텨냈습니다. 진정한 서울대 생존자!'; }
  else if (s >= 120000) { emoji = '🎓'; title = '학기 생존 완료!';   desc = '힘들었지만 끝까지 버텼어요. 수고 많았습니다!'; }
  else                  { emoji = '😮‍💨'; title = '간신히 생존...';   desc = '겨우겨우 버텼습니다. 이게 고학번의 현실이에요.'; }
  document.getElementById('ending-emoji').textContent = emoji;
  document.getElementById('ending-title').textContent = title;
  document.getElementById('ending-desc').textContent  = desc;
  document.getElementById('ending-stats').innerHTML   = finalStatsHTML();
}

function finalStatsHTML() {
  return `
    <div>📅 도달 단계: ${G.day}단계</div>
    <div>✅ 총 버텨낸 상황: ${G.totalOrders}개</div>
    <div>❌ 총 실패: ${G.totalFailed}번</div>
    <div>📊 최종 생존점수: ${G.money.toLocaleString()}점</div>
  `;
}

// ─── 렌더 ───
function renderCustomer() {
  const c = G.currentCustomer;
  document.getElementById('customer-avatar').textContent = c.emoji;
  document.getElementById('customer-name').textContent   = c.name;
  document.getElementById('customer-quote').textContent  = c.quote;

  // 상황 이름도 같이 표시
  const situEl = document.getElementById('event-situation');
  if (situEl) situEl.textContent = `📌 ${G.currentRecipe.name}: ${G.currentRecipe.desc}`;
}

function renderOrder() {
  const el = document.getElementById('order-display');
  el.innerHTML = '';
  G.currentOrder.forEach((key, i) => {
    const ing  = INGREDIENTS[key];
    const chip = document.createElement('span');
    chip.className = 'order-chip' +
      (i < G.currentBurger.length ? ' done' : i === G.currentBurger.length ? ' next' : '');
    chip.textContent    = ing.emoji + ' ' + ing.name;
    chip.style.background = ing.bg;
    chip.style.color      = ing.color;
    el.appendChild(chip);
  });
}

function renderBurgerStack() {
  const el = document.getElementById('burger-stack');
  if (G.currentBurger.length === 0) {
    el.innerHTML = '<div class="empty-plate">📭</div>';
    return;
  }
  el.innerHTML = '';
  G.currentBurger.forEach(key => {
    const ing  = INGREDIENTS[key];
    const chip = document.createElement('span');
    chip.className        = 'stack-chip';
    chip.textContent      = ing.emoji + ' ' + ing.name;
    chip.style.background = ing.bg;
    chip.style.color      = ing.color;
    el.appendChild(chip);
  });
}

function renderIngredientButtons() {
  const el = document.getElementById('ingredients-section');
  el.innerHTML = '';
  ING_KEYS.forEach(key => {
    const ing = INGREDIENTS[key];
    const btn = document.createElement('button');
    btn.className        = 'ing-btn';
    btn.id               = `ing-${key}`;
    btn.style.background = ing.bg;
    btn.style.color      = ing.color;
    btn.innerHTML        = `<span class="ing-emoji">${ing.emoji}</span>${ing.name}`;
    btn.onclick          = () => clickIngredient(key);
    el.appendChild(btn);
  });
}

function updateOrderProgress() {
  const cfg  = DAY_CONFIG[G.day - 1];
  const done = G.ordersDone + G.ordersFailed;
  document.getElementById('order-progress').textContent = `${done + 1}/${cfg.orders}`;
}

// ─── 유틸 ───
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback-msg');
  el.textContent = msg;
  el.className   = `feedback-msg ${type}`;
}

function clearFeedback() {
  const el = document.getElementById('feedback-msg');
  el.textContent = '';
  el.className   = 'feedback-msg';
}

function shakeElement(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 400);
}
