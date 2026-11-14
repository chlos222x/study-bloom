// ─── SUPABASE CONNECTION ───
const SUPABASE_URL = "https://eeaxdngmnwlxsjghrmbp.supabase.co";
const SUPABASE_KEY = "sb_publishable_BswWvU_ZtO_zIJqQpIbsFQ_YtEx-or3";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── AUTHENTICATION FUNCTIONS ───
async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { full_name: name } }
  });
  if (error) alert(error.message);
  else alert("✅ Check your email to confirm your account!");
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) alert(error.message);
  else {
    alert("✅ Welcome back!");
    updateUserUI(data.user);
  }
}

async function signOut() {
  await supabase.auth.signOut();
  alert("👋 Logged out!");
  location.reload();
}

function getCurrentUser() {
  return supabase.auth.currentUser;
}

supabase.auth.onAuthStateChange((event, session) => {
  if (session) updateUserUI(session.user);
  else updateUserUI(null);
});

function updateUserUI(user) {
  const loginBtn = document.getElementById("loginButton");
  if (loginBtn) {
    if (user) {
      const name = user.user_metadata?.full_name || user.email;
      loginBtn.innerHTML = `♡ ${name} — Log out`;
      loginBtn.onclick = signOut;
    } else {
      loginBtn.innerHTML = "♡ Log in";
      loginBtn.onclick = openLogin;
    }
  }
}

function showSignUp() {
  const authTitle = document.getElementById("authTitle");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  if (authTitle) authTitle.textContent = "♡ Create account";
  if (loginForm) loginForm.style.display = "none";
  if (signupForm) signupForm.style.display = "block";
}

function showLogin() {
  const authTitle = document.getElementById("authTitle");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  if (authTitle) authTitle.textContent = "♡ Log in";
  if (loginForm) loginForm.style.display = "block";
  if (signupForm) signupForm.style.display = "none";
}

async function handleSignUp() {
  const name = document.getElementById("authName")?.value.trim();
  const email = document.getElementById("authEmail2")?.value.trim();
  const password = document.getElementById("authPassword2")?.value;
  if (!name || !email || password.length < 6) {
    return alert("Please fill all fields (password: min 6 characters)");
  }
  await signUp(email, password, name);
  closeModal("loginModal");
}

async function handleSignIn() {
  const email = document.getElementById("authEmail")?.value.trim();
  const password = document.getElementById("authPassword")?.value;
  if (!email || !password) return alert("Please fill in all fields");
  await signIn(email, password);
  closeModal("loginModal");
}

// ─── DATA ───
const DATA = {
  "GCSE": {
    "Mathematics": ["AQA", "Pearson Edexcel", "OCR", "WJEC", "Eduqas"],
    "English Language": ["AQA", "Pearson Edexcel", "OCR", "WJEC", "Eduqas"],
    "English Literature": ["AQA", "Pearson Edexcel", "OCR", "WJEC", "Eduqas"],
    "Biology": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Chemistry": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Physics": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Combined Science": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "History": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Geography": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Computer Science": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Business": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Psychology": ["AQA", "Pearson Edexcel", "OCR"],
    "Sociology": ["AQA", "Pearson Edexcel", "OCR"],
    "French": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Spanish": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "German": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Religious Studies": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "PE": ["AQA", "Pearson Edexcel", "OCR"],
    "Music": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Art & Design": ["AQA", "Pearson Edexcel", "OCR", "WJEC"]
  },
  "A Level": {
    "Mathematics": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Further Mathematics": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "English Literature": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Biology": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Chemistry": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Physics": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Computer Science": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "History": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Geography": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Economics": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Business": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Psychology": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Sociology": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Politics": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Law": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "French": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Spanish": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "German": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Art & Design": ["AQA", "Pearson Edexcel", "OCR", "WJEC"],
    "Music": ["AQA", "Pearson Edexcel", "OCR", "WJEC"]
  },
  "BTEC": {
    "Business": ["Pearson BTEC"],
    "Information Technology": ["Pearson BTEC"],
    "Sport": ["Pearson BTEC"],
    "Health & Social Care": ["Pearson BTEC"],
    "Applied Science": ["Pearson BTEC"],
    "Engineering": ["Pearson BTEC"],
    "Creative Media": ["Pearson BTEC"],
    "Travel & Tourism": ["Pearson BTEC"],
    "Animal Care": ["Pearson BTEC"],
    "Construction": ["Pearson BTEC"]
  }
};

const EMOJI = {
  Mathematics: "🔢", Biology: "🧬", Chemistry: "⚗️", Physics: "⚡",
  "English Language": "📖", "English Literature": "🖋️", History: "🏛️",
  Geography: "🌍", "Computer Science": "💻", Business: "📈",
  Economics: "💷", Psychology: "🧠", Sociology: "👥", French: "🇫🇷",
  Spanish: "🇪🇸", German: "🇩🇪", "Art & Design": "🎨", Music: "🎵",
  Sport: "🏃", "Health & Social Care": "🩺", "Applied Science": "🔬",
  Engineering: "⚙️", "Creative Media": "🎬", "Travel & Tourism": "✈️",
  "Animal Care": "🐾", Construction: "🏗️"
};

// ─── STATE ───
let qualification = "", subject = "", board = "";
const $ = id => document.getElementById(id);

// ─── QUALIFICATION SELECTION ───
function setQualification(q, btn) {
  qualification = q; subject = ""; board = "";
  
  document.querySelectorAll(".qual-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  
  const subjectSelect = $("subject");
  subjectSelect.disabled = false;
  subjectSelect.innerHTML = '<option value="">Choose a subject...</option>' +
    Object.keys(DATA[q]).map(s => `<option>${s}</option>`).join("");
  
  const boardSelect = $("board");
  boardSelect.disabled = true;
  boardSelect.innerHTML = '<option value="">Choose an exam board...</option>';
  
  updateStepper();
  renderTopics();
}

// ─── SUBJECT SELECTION ───
$("subject").onchange = () => {
  subject = $("subject").value;
  board = "";
  const boardSelect = $("board");
  boardSelect.disabled = !subject;
  boardSelect.innerHTML = '<option value="">Choose an exam board...</option>' +
    (subject ? DATA[qualification][subject].map(b => `<option>${b}</option>`).join("") : "");
  updateStepper();
  renderTopics();
};

// ─── EXAM BOARD SELECTION ───
$("board").onchange = () => {
  board = $("board").value;
  updateStepper();
  renderTopics();
};

// ─── UPDATE STEPPER & HINT ───
function updateStepper() {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  $("s1").classList.add("active");
  if (qualification) $("s2").classList.add("active");
  if (subject) $("s3").classList.add("active");
  if (board) $("s4").classList.add("active");
  
  const status = $("status");
  const hint = $("hint");
  
  if (!qualification) {
    status.textContent = "Choose your course";
    hint.textContent = "Choose GCSE, A Level or BTEC to begin.";
  } else if (!subject) {
    status.textContent = "Choose a subject";
    hint.innerHTML = `<strong>${qualification}</strong> selected — now choose your subject.`;
  } else if (!board) {
    status.textContent = "Choose exam board";
    hint.innerHTML = `${qualification} → <strong>${subject}</strong> — now choose your exam board.`;
  } else {
    status.textContent = "Ready to revise";
    hint.innerHTML = `${qualification} → ${subject} → <strong>${board}</strong> — choose a topic below.`;
  }
}

// ─── TOPIC LIST ───
function topicList(s) {
  const common = ["Core concepts", "Key terms & definitions", "Exam technique", "Practice questions", "Past-paper practice"];
  const specific = {
    Mathematics: ["Algebra", "Graphs", "Geometry & measures", "Statistics", "Probability"],
    Biology: ["Cell biology", "Organisation", "Infection & response", "Bioenergetics", "Ecology"],
    Chemistry: ["Atomic structure", "Bonding", "Quantitative chemistry", "Chemical changes", "Organic chemistry"],
    Physics: ["Energy", "Electricity", "Particle model", "Atomic structure", "Forces"],
    "English Language": ["Reading skills", "Writing skills", "Language analysis", "Structure", "Exam practice"],
    History: ["Key events", "Causes & consequences", "Interpretations", "Source analysis", "Essay practice"],
    Geography: ["Physical geography", "Human geography", "Case studies", "Fieldwork", "Exam practice"],
    "Computer Science": ["Algorithms", "Programming", "Data", "Computer systems", "Cyber security"],
    Business: ["Business objectives", "Marketing", "Operations", "Finance", "People"]
  };
  return specific[s] || common;
}

// ─── RENDER TOPICS ───
function renderTopics() {
  const grid = $("topicsGrid");
  
  if (!qualification || !subject || !board) {
    grid.innerHTML = "";
    return;
  }
  
  const topics = topicList(subject);
  grid.innerHTML = topics.map(t => `
    <div class="topic-card">
      <span style="font-size:20px">${EMOJI[subject] || "📚"}</span>
      <h3>${t}</h3>
      <p>${qualification} • ${board}</p>
      <button class="topic-btn" onclick="openTopic('${esc(t)}')">Open →</button>
    </div>
  `).join("");
}

// ─── OPEN TOPIC MODAL ───
function openTopic(t) {
  localStorage.setItem("topicsOpened", (+localStorage.getItem("topicsOpened") || 0) + 1);
  $("topicsStat").textContent = localStorage.getItem("topicsOpened");
  
  const search = encodeURIComponent(`${qualification} ${subject} ${board} ${t} revision`);
  
  $("topicContent").innerHTML = `
    <h2>${EMOJI[subject] || "📚"} ${t}</h2>
    <p class="muted">${qualification} • ${subject} • ${board}</p>
    <div style="margin-top:16px">
      <p><strong>Revision tools</strong></p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">
        <button class="primary-btn" onclick="showNotes('${esc(t)}')">📝 Notes</button>
        <button class="secondary-btn" onclick="showFlashcards('${esc(t)}')">🧠 Flashcards</button>
        <button class="secondary-btn" onclick="showQuiz('${esc(t)}')">❓ Quiz</button>
        <a href="https://www.youtube.com/results?search_query=${search}" target="_blank" class="secondary-btn" style="text-decoration:none">▶ Videos</a>
      </div>
    </div>
    <div id="topicExtra"></div>
  `;
  $("topicModal").classList.add("show");
}

function showNotes(t) {
  $("topicExtra").innerHTML = `
    <div style="margin-top:20px;padding:16px;background:var(--accent-light);border-radius:12px">
      <h3>📝 ${t} notes</h3>
      <textarea id="notesText" style="width:100%;height:100px;border-radius:8px;padding:10px;margin:10px 0;border:1px solid var(--border);background:white" placeholder="Write your notes here...">${localStorage.getItem("notes_"+t) || ""}</textarea>
      <button class="primary-btn" onclick="saveNotes('${esc(t)}')">Save notes</button>
    </div>
  `;
}

function saveNotes(t) {
  localStorage.setItem("notes_"+t, $("notesText").value);
  alert("✅ Notes saved on your device!");
}

function showFlashcards(t) {
  $("topicExtra").innerHTML = `
    <div style="margin-top:20px;padding:16px;background:var(--accent-light);border-radius:12px">
      <h3>🧠 Flashcards — ${t}</h3>
      <p><strong>Question:</strong> What's a key concept in ${t}?</p>
      <button class="secondary-btn" onclick="this.nextElementSibling.hidden=!this.nextElementSibling.hidden">Toggle answer</button>
      <p hidden style="margin-top:8px;color:var(--muted)">Add your own answer here ✏️</p>
    </div>
  `;
}

function showQuiz(t) {
  $("topicExtra").innerHTML = `
    <div style="margin-top:20px;padding:16px;background:var(--accent-light);border-radius:12px">
      <h3>❓ Quick Quiz — ${t}</h3>
      <p style="margin:10px 0"><strong>Q.</strong> Which revision method works best?</p>
      <label style="display:block;padding:6px 0"><input type="radio" name="q"> Passive rereading</label>
      <label style="display:block;padding:6px 0"><input type="radio" name="q"> Active recall & practice</label>
      <label style="display:block;padding:6px 0"><input type="radio" name="q"> Skim-reading only</label>
      <button class="primary-btn" style="margin-top:12px" onclick="finishQuiz()">Finish quiz</button>
    </div>
  `;
}

function finishQuiz() {
  localStorage.setItem("quizCount", (+localStorage.getItem("quizCount") || 0) + 1);
  $("quizStat").textContent = localStorage.getItem("quizCount");
  alert("✅ Quiz completed! Great job!");
}

// ─── TO-DO LIST ───
function addTodo() {
  const input = $("todoInput");
  const text = input.value.trim();
  if (!text) return;
  
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.push({ text, done: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
  renderTodos();
}

function renderTodos() {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  $("todosList").innerHTML = todos.map((item, i) => `
    <div class="todo-item ${item.done ? "done" : ""}">
      <input type="checkbox" ${item.done ? "checked" : ""} onchange="toggleTodo(${i})">
      <span>${esc(item.text)}</span>
      <button onclick="deleteTodo(${i})">×</button>
    </div>
  `).join("");
}

function toggleTodo(i) {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos[i].done = !todos[i].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function deleteTodo(i) {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
 
