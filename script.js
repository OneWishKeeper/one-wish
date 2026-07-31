const SUPABASE_URL = "https://qchdhrxniqpwcwtxkrgz.supabase.co";
const SUPABASE_KEY = "sb_publishable_lYRHZV7dGb74UBYmfPTdbg_-RTlhzeO";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const output = document.getElementById("output");
const cursor = document.getElementById("cursor");
const wishArea = document.getElementById("wishArea");
const final = document.getElementById("final");
const seal = document.getElementById("seal");
const wish = document.getElementById("wish");

const intro = [
  "Connection established...",
  "",
  "The Feather watches.",
  "The Hawk waits.",
  "",
  "You have been granted one wish.",
  "Choose carefully.",
  "Not every wish asks the same price."
];

const messages = [
  "The Feather Has Fallen.\nThe Hawk Has Taken Flight.\nEvery wish leaves something behind.",
  "The Ink Remembers What the Hand Forgets.\nThe balance has been marked.",
  "The Hawk Circled Once.\nIt Did Not Circle Twice.\nNothing crosses the threshold unchanged.",
  "One Feather Was Given.\nOne Was Taken.\nNo wish travels alone.",
  "The Wind Changed Before the Feather Touched the Ground.\nFor what is given, something must be surrendered.",
  "The Mirror Closed Before It Answered.\nEvery gift leaves an empty place.",
  "The Seal Was Accepted Without Question.\nThe price is never named before the journey begins."
];

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function saveWish(wishText) {
  const { error } = await supabaseClient
    .from("wishes")
    .insert({
      wish_text: wishText
    });

  if (error) {
    console.error("Wish submission failed:", error);
    return false;
  }

  return true;
}

async function typeText(text, speed = 34) {
  for (const character of text) {
    output.textContent += character;
    await sleep(character === "\n" ? 180 : speed);
  }
}

async function start() {
  await sleep(900);

  for (const line of intro) {
    await typeText(line + "\n");
    await sleep(420);
  }

  cursor.style.display = "none";
  wishArea.classList.remove("hidden");
  wish.focus();
}

seal.addEventListener("click", async () => {
  const wishText = wish.value.trim();

  if (!wishText) {
    wish.placeholder = "A wish must first be written...";
    wish.focus();
    return;
  }

  seal.disabled = true;
  wish.disabled = true;

  const wishSaved = await saveWish(wishText);

  if (!wishSaved) {
    wish.placeholder = "The connection could not receive your wish. Try again...";
    seal.disabled = false;
    wish.disabled = false;
    wish.focus();
    return;
  }

  wishArea.classList.add("hidden");
  output.textContent = "";
  cursor.style.display = "inline-block";

  await typeText("Receiving...\n", 48);
  await sleep(650);

  await typeText("Reading...\n", 48);
  await sleep(800);

  await typeText("\nThe Ink Has Dried.\n", 62);
  await sleep(1000);

  const chosenMessage =
    messages[Math.floor(Math.random() * messages.length)];

  output.classList.add("glitch");
  await typeText("\n" + chosenMessage + "\n", 42);
  output.classList.remove("glitch");

  await sleep(1100);
  cursor.style.display = "none";
  final.classList.remove("hidden");
});

start();
