const DIALOGUE = [
  { speaker: "teacher", text: "おかえりなさい…ではなく、授業開始です。\n今日は「萌えセレクト」について学びましょう！" },
  { speaker: "student", text: "先輩、萌えセレクトとはなんですか？" },
  { speaker: "teacher", text: "いい質問ですね！\n萌えセレクトとは、お気に入りのメイドさんを独占してお話できるシステムです！" },
  { speaker: "student", text: "先輩、萌えセレクトの時間と料金を教えてください。" },
  { speaker: "teacher", text: "30分／2,000円(税込)。\n席料＋指名料も込みで、追加料金はありません。" },
  { speaker: "student", text: "長く話したい場合はどうしたらいいですか？\n延長は可能ですか？" },
  { speaker: "teacher", text: "事前に利用したい時間の長さで予約すればOKです。\n延長も可能ですが、混雑状況によってはお断りされる場合があります。" },
  { speaker: "teacher", text: "長めにお話したい場合は、最初から長めに予約されることをおすすめします。" },
  { speaker: "student", text: "遠方でも利用できる方法はありますか？" },
  { speaker: "teacher", text: "それなら、萌えセレクトのオンライン版\n「どこでもポトロ」がおすすめです。" },
  { speaker: "teacher", text: "萌えセレクト、どこでもポトロともに、\n事前予約はXのDMで受け付けています。" },
  { speaker: "student", text: "ほかに注意することはありますか？" },
  { speaker: "teacher", text: "萌えセレクト中は、メイドさんと一緒にお食事ができます。" },
  { speaker: "teacher", text: "飲食物については以下の点に注意してください。\n1) 手作り以外の持ち込みはOK\n2) UberEATSも利用可能\n3) メイドさんはアルコール飲料は飲めません" },
  { speaker: "student", text: "わかりました！\nさっそく利用してみようと思います。" },
  { speaker: "teacher", text: "ちょっと待って！まだ続きがあります。\n実は「萌えセレクトLite」というサービスもあります！" },
  { speaker: "student", text: "萌えセレクトLite？\n萌えセレクトとは違うのですか？" },
  { speaker: "teacher", text: "はい。\n萌えセレクトLiteは15分／1,000円(税込)。\n席料＋指名料も込みで、追加料金はありません。" },
  { speaker: "student", text: "ちょっとだけでもいいから、お気に入りのメイドさんと絶対にお話したいときに重宝しそうですね！" },
  { speaker: "teacher", text: "萌えセレクトLiteについては以下の点に注意してください。\n1) 当日限定\n2) 予約不可\n3) お屋敷にご滞在中の方のみご利用可" },
  { speaker: "student", text: "なるほど！\nではまず萌えセレクトLiteで、お気に入りのメイドさんを見つけようと思います！" }
];

let currentIndex = 0;
let autoTimer = null;
let typingTimer = null;
let isTyping = false;
let currentFullText = "";
const AUTO_MS = 4300;
const TYPE_MS = 24;

const teacherBubble = document.getElementById("teacherBubble");
const studentBubble = document.getElementById("studentBubble");
const teacherLine = document.getElementById("teacherLine");
const studentLine = document.getElementById("studentLine");
const progressFill = document.getElementById("progressFill");
const progressCount = document.getElementById("progressCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const autoBtn = document.getElementById("autoBtn");
const tapLayer = document.getElementById("tapLayer");

function stopTyping(){
  if(typingTimer){
    clearInterval(typingTimer);
    typingTimer = null;
  }
  isTyping = false;
}

function typeText(target, text){
  stopTyping();
  currentFullText = text;
  target.textContent = "";
  isTyping = true;

  let i = 0;
  typingTimer = setInterval(() => {
    target.textContent = text.slice(0, i + 1);
    i += 1;

    if(i >= text.length){
      stopTyping();
    }
  }, TYPE_MS);
}

function showFullText(){
  stopTyping();
  const cur = DIALOGUE[currentIndex];
  const target = cur.speaker === "teacher" ? teacherLine : studentLine;
  target.textContent = currentFullText || cur.text;
}

function renderLine(){
  const cur = DIALOGUE[currentIndex];
  const isTeacher = cur.speaker === "teacher";

  teacherBubble.classList.toggle("is-active", isTeacher);
  studentBubble.classList.toggle("is-active", !isTeacher);

  teacherLine.textContent = "";
  studentLine.textContent = "";

  typeText(isTeacher ? teacherLine : studentLine, cur.text);

  const rate = ((currentIndex + 1) / DIALOGUE.length) * 100;
  progressFill.style.width = `${rate}%`;
  progressCount.textContent = `${currentIndex + 1} / ${DIALOGUE.length}`;
}

function nextLine(){
  if(isTyping){
    showFullText();
    return;
  }

  currentIndex = (currentIndex + 1) % DIALOGUE.length;
  renderLine();
}

function prevLine(){
  currentIndex = (currentIndex - 1 + DIALOGUE.length) % DIALOGUE.length;
  renderLine();
}

function startAuto(){
  if(autoTimer) return;
  autoTimer = setInterval(() => {
    if(!isTyping){
      nextLine();
    }
  }, AUTO_MS);
  autoBtn.textContent = "⏸ 停止";
  autoBtn.classList.add("is-playing");
}

function stopAuto(){
  if(autoTimer){
    clearInterval(autoTimer);
    autoTimer = null;
  }
  autoBtn.textContent = "▶ オート再生";
  autoBtn.classList.remove("is-playing");
}

prevBtn.addEventListener("click", () => {
  stopAuto();
  prevLine();
});

nextBtn.addEventListener("click", () => {
  stopAuto();
  nextLine();
});

autoBtn.addEventListener("click", () => {
  if(autoTimer){
    stopAuto();
  }else{
    startAuto();
  }
});

tapLayer.addEventListener("click", () => {
  stopAuto();
  nextLine();
});

window.addEventListener("keydown", (event) => {
  if(event.key === "ArrowRight" || event.key === " " || event.key === "Enter"){
    event.preventDefault();
    stopAuto();
    nextLine();
  }

  if(event.key === "ArrowLeft"){
    event.preventDefault();
    stopAuto();
    prevLine();
  }
});

window.addEventListener("load", renderLine);

// 横向きチェック
function checkOrientation(){
  const isPortrait = window.innerHeight > window.innerWidth;

  if(isPortrait){
    document.body.classList.add("portrait-mode");
  }else{
    document.body.classList.remove("portrait-mode");
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("load", checkOrientation);
