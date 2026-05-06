// 萌えセレクト講義：会話データ
// image には img フォルダ内の画像パスを指定できます。
// 画像が未用意の場合は teacher.png / student.png に自動フォールバックします。

const DIALOGUE = [
  {
    speaker: "teacher",
    text: "おかえりなさい…ではなく、授業開始です。\n今日は「萌えセレクト」について学びましょう！",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "先生、萌えセレクトとはなんですか？",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "いい質問ですね！\n萌えセレクトとは、お気に入りのメイドさんを独占してお話できるシステムです！",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "先生、萌えセレクトの時間と料金を教えてください。",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "30分／2,000円(税込)。\n席料＋指名料も込みで、追加料金はありません。",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "長く話したい場合はどうしたらいいですか？\n延長は可能ですか？",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "事前に利用したい時間の長さで予約すればOK。\n延長もOKですが、混雑状況によってはお断りされる場合がありますので、長めの予約がおすすめです。",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "遠方でも利用できる方法はありますか？",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "それならオンライン版の「どこでもポトロ」がおすすめです。\n萌えセレクト、どこでもポトロともに、事前予約はXのDMで受け付けています。",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "ほかに注意することはありますか？",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "萌えセレクト中は、メイドさんと一緒にお食事ができます。\n飲食物については以下の点に注意してください。\n1) 手作り以外の持ち込みはOK\n2) UberEATSも利用可能\n3) メイドさんはアルコール飲料は飲めません",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "わかりました！\nさっそく利用してみようと思います。",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "ちょっと待って！まだ続きがあります。\n実は「萌えセレクトLite」というサービスもあります！",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "萌えセレクトLite？\n萌えセレクトとは違うのですか？",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "はい。\n萌えセレクトLiteは15分／1,000円(税込)。\n席料＋指名料も込みで、追加料金はありません。",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "ちょっとだけでもいいから、お気に入りのメイドさんと絶対にお話したいときに重宝しそうですね！\n何か注意点はありますか？",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  },
  {
    speaker: "teacher",
    text: "萌えセレクトLiteについては以下の点に注意してください。\n1) 当日限定\n2) 予約不可\n3) お屋敷にご滞在中の方のみご利用可",
    teacherImage: "img/teacher_happy.png",
    studentImage: "img/student.png"
  },
  {
    speaker: "student",
    text: "なるほど！\nではまず萌えセレクトLiteで、お気に入りのメイドさんを見つけようと思います！",
    teacherImage: "img/teacher.png",
    studentImage: "img/student_smile.png"
  }
];

let idx = 0;
let timer = null;
const AUTO_MS = 3600;

const bubble = document.getElementById("bubble");
const lineEl = document.getElementById("line");
const spEl = document.getElementById("speaker");
const speakerIcon = document.getElementById("speakerIcon");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const teacherImg = document.getElementById("teacherImg");
const studentImg = document.getElementById("studentImg");

const bPrev = document.getElementById("prev");
const bNext = document.getElementById("next");
const bAuto = document.getElementById("auto");

function safeSetImage(el, src, fallback){
  if(!el) return;
  el.onerror = () => {
    el.onerror = null;
    el.src = fallback;
  };
  el.src = src || fallback;
}

function renderLine(){
  const cur = DIALOGUE[idx];
  const isTeacher = cur.speaker === "teacher";

  bubble.classList.toggle("left", isTeacher);
  bubble.classList.toggle("right", !isTeacher);

  teacherImg.classList.toggle("active", isTeacher);
  studentImg.classList.toggle("active", !isTeacher);

  spEl.textContent = isTeacher ? "先生" : "生徒";
  speakerIcon.textContent = isTeacher ? "♡" : "♪";
  lineEl.textContent = cur.text;

  safeSetImage(teacherImg, cur.teacherImage, "img/teacher.png");
  safeSetImage(studentImg, cur.studentImage, "img/student.png");

  progress.textContent = `${idx + 1} / ${DIALOGUE.length}`;
  progressBar.style.width = `${((idx + 1) / DIALOGUE.length) * 100}%`;
}

function next(){
  idx = (idx + 1) % DIALOGUE.length;
  renderLine();
}

function prev(){
  idx = (idx - 1 + DIALOGUE.length) % DIALOGUE.length;
  renderLine();
}

function autoPlay(){
  if(timer) return;
  timer = setInterval(next, AUTO_MS);
  bAuto.textContent = "⏸ 停止";
}

function stopAuto(){
  clearInterval(timer);
  timer = null;
  bAuto.textContent = "▶ オート再生";
}

bPrev.addEventListener("click", () => {
  stopAuto();
  prev();
});

bNext.addEventListener("click", () => {
  stopAuto();
  next();
});

bAuto.addEventListener("click", () => {
  if(timer){
    stopAuto();
  }else{
    autoPlay();
  }
});

window.addEventListener("load", renderLine);

