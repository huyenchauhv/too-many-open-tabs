
let poopCounter = 0;
let rebooting = false;
let evolving = false;
let mood = "happy";
let poop = false;

let petX = 60;
let petY = 5;

let poopX = 0;
let poopY = 0;

let currentThought = "";

let sleepTimer = null;

let faceLocked = false;

let xp =
  Number(
    localStorage.getItem(
      "chauXP"
    )
  ) || 0;

//*DATA*//

const idleFaces = {

  1: "(•o•)",

  2: "(＾o＾)",

  3: "(¬o¬)",

  4: "(˘o˘)",

  5: "(⊙o⊙)"

};

const moods = {

  happy: {

    face: "(＾▽＾)",

    text: [

      "looking at clouds",
      "touching grass",
      "staring at the walls",
      "disassociating"

    ]

  },

  stress: {

    face: "(>_<)",

    text:
      "stressed about not doing anything"

  },

  cynical: {

    face: "(¬_¬)",

    text:
      "another bullshit"

  },

  sleepy: {

    face: "(-_-)",

    text:
      "just one more tab"

  },

  exhausted: {

    face: "(x_x)",

    text:
      "out of the house again"

  }

};

const stages = {

  1: {

    title:
      "small creature",

    face:
      "(•ᴗ•)",

    thoughts: [

      "zero brain",
      "what is a thought",
      "hungry"

    ]

  },

  2: {

    title:
      "household entity",

    face:
      "(^‿^)",

    thoughts: [

      "avoiding emails",
      "6000 missed calls",
      "30000 unread inboxes"

    ]

  },

  3: {

    title:
      "suspicious individual",

    face:
      "(¬_¬)",

    thoughts: [

      "this could have been an email",
      "not this again",
      "deeply unconvinced"

    ]

  },

  4: {

    title:
      "forest hermit",

    face:
      "(˘▾˘)",

    thoughts: [

      "the forest understands me",
      "living deliberately",
      "watching moss grow"

    ]

  },

  5: {

    title:
      "beyond help",

    face:
      "(⊙_⊙)",

    thoughts: [

      "became one with the browser",
      "transcending deadlines",
      "no thoughts only cries"

    ]

  }

};

const petMessages = [

  "feeling appreciated",
  "much better",
  "morale improved",
  "emotionally supported"

];

//*HELPERS*//

function evolveToStage(
  stage
) {

  const sprite =
    getEl(
      "pet-sprite"
    );

  if (!sprite)
    return;

evolving = true;
  faceLocked = true;

  sprite.textContent =
    "(o_o)";

  setTimeout(() => {

    sprite.textContent =
      "(???)";

  }, 600);

  setTimeout(() => {

  evolving = false;

  faceLocked = false;

  currentThought =
    getThought();

  updatePet();

  setStatus(
    `${stages[stage].title}!`,
    2000
  );

}, 2200);

}

function clearAction() {

  const action =
    getEl("pet-action");

  if (!action)
    return;

  action.textContent =
    "";

  action.classList.remove(
    "show"
  );

}

function showThought() {

  const thought =
    getEl(
      "pet-thought"
    );

  if (!thought)
    return;

  currentThought =
    getThought();

  thought.textContent =
    currentThought;

  thought.classList.add(
    "show"
  );

  clearTimeout(
    window.thoughtTimer
  );

  window.thoughtTimer =
    setTimeout(() => {

      thought.classList.remove(
        "show"
      );

      thought.textContent =
        "";

    }, 2500);

}

function getStage() {

  return Math.min(
    5,
    Math.floor(
      xp / 100
    ) + 1
  );

}

function gainXP(
  amount
) {

  const oldStage =
    getStage();

  xp += amount;

  // REBOOT

  if (
    xp >= 500
  ) {

    rebooting = true;
    faceLocked = true;

    const sprite =
      getEl(
        "pet-sprite"
      );

    if (sprite) {

      sprite.textContent =
        "(x_x)";

      sprite.classList.add(
        "pet-rebooting"
      );

    }

    setStatus(
      "returning to creature...",
      1500
    );

    setTimeout(() => {

      setStatus(
        "clearing cache...",
        1500
      );

    }, 1500);

    setTimeout(() => {

      setStatus(
        "restarting...",
        1500
      );

    }, 3000);

    setTimeout(() => {

  const sprite =
    getEl(
      "pet-sprite"
    );

  if (sprite) {

    sprite.classList.remove(
      "pet-rebooting"
    );

  }

  xp = 0;

  poop = false;

  mood = "happy";

  currentThought =
    getThought();

  localStorage.setItem(
    "chauXP",
    0
  );

  rebooting = false;

  faceLocked = false;

  updatePet();

}, 4500);

    return;

  }

  localStorage.setItem(
    "chauXP",
    xp
  );

  const newStage =
    getStage();

  // EVOLUTION

  if (
    newStage >
    oldStage
  ) {

    clearAction();

    evolveToStage(
      newStage
    );

    return;

  }

  updatePet();

}
function getEl(id) {

  return document.getElementById(id);

}

function getThought() {

  const stage =
    stages[
      getStage()
    ];

  return stage.thoughts[
    Math.floor(
      Math.random() *
      stage.thoughts.length
    )
  ];

}

function setStatus(
  text,
  duration = 1500
) {

  const status =
    getEl("pet-status");

  if (!status)
    return;

  status.textContent =
    text;

  clearTimeout(
    window.statusTimer
  );

  if (duration > 0) {

    window.statusTimer =
      setTimeout(() => {

        status.textContent =
          "";

      }, duration);

  }

}
function showAction(
  emoji
) {

  const action =
    getEl("pet-action");

  if (!action)
    return;

  action.textContent =
    emoji;

  action.classList.add(
    "show"
  );

  setTimeout(() => {

    action.classList.remove(
      "show"
    );

    action.textContent =
      "";

  }, 1200);

}

function bouncePet() {

  const sprite =
    getEl("pet-sprite");

  if (!sprite)
    return;

  sprite.classList.add(
    "pet-bounce"
  );

  setTimeout(() => {

    sprite.classList.remove(
      "pet-bounce"
    );

  }, 250);

}

function temporaryFace(
  face,
  duration = 1200
) {

  const sprite =
    getEl("pet-sprite");

  if (!sprite)
    return;

  faceLocked = true;

  sprite.textContent =
    face;

  setTimeout(() => {

  if (evolving)
    return;

  faceLocked = false;

  updatePet();

}, duration);

}

//*RENDER*//

function updatePet() {

  const sprite =
    getEl("pet-sprite");

  const moodText =
    getEl("pet-thought");

  const poopBox =
    getEl("pet-poop");

  const stageBox =
    getEl("pet-stage");

  if (
    !sprite ||
    !moodText
  ) return;

  if (
  !faceLocked &&
  !rebooting &&
  !evolving
) {

  sprite.textContent =
    stages[
      getStage()
    ].face;

}

  moodText.textContent =
    currentThought;

  if (stageBox) {

    stageBox.textContent =
      stages[
        getStage()
      ].title;

  }

  if (poopBox) {

   if (poop) {

  poopBox.textContent =
    "💩";

  poopBox.style.left =
    `${poopX}px`;

  poopBox.style.top =
    `${poopY}px`;

  poopBox.style.opacity =
    "1";

} else {

  poopBox.style.opacity =
    "0";

  poopBox.textContent =
    "";

}
  }

  updateXP();

}


function updateXP() {

  const fill =
    getEl(
      "xp-fill"
    );

  if (!fill)
    return;

  fill.style.width =
    `${xp % 100}%`;

}

//*WORLD*//

function setMood(
  newMood,
  message
) {

  mood = newMood;

  currentThought =
    getThought();

  setStatus(
    message
  );

}

function wander() {

  if (
  mood === "sleepy" ||
  evolving ||
  rebooting
) return;

  const pet =
    document.querySelector(
      ".pet-row"
    );

  if (!pet)
    return;

  pet.classList.add(
    "pet-walking"
  );

  petX +=
  Math.random() * 20 - 10;

petY +=
  Math.random() * 2 - 1;

petX =
  Math.max(
    0,
    Math.min(
      petX,
      180
    )
  );

petY =
  Math.max(
    10,
    Math.min(
      petY,
      35
    )
  );

  pet.style.left =
    `${petX}px`;

  pet.style.top =
    `${petY}px`;

  setTimeout(() => {

    pet.classList.remove(
      "pet-walking"
    );

  }, 1000);

}

//*ACTIONS*//

window.feedPet = () => {

  showAction("🍙");

  bouncePet();

  temporaryFace(
    "(^o^)"
  );

  setMood(
    "happy",
    "fed successfully"
  );

    gainXP(8);

};

window.coffeePet = () => {

  showAction("☕");

  bouncePet();

  temporaryFace(
    "(ಠ‿ಠ)"
  );

  const previousMood =
    mood;

  mood =
    "cynical";

  currentThought =
    getThought();

  updatePet();

  setStatus(
    "another coffee..."
  );

  setTimeout(() => {

    mood =
      previousMood;

    currentThought =
      getThought();

    updatePet();

  }, 5000);

  gainXP(3);

};

window.petPet = () => {

  showAction("♥");

  bouncePet();

  temporaryFace(
    "(◡‿◡)"
  );

  setMood(
    "happy",
    petMessages[
      Math.floor(
        Math.random() *
        petMessages.length
      )
    ]
  );

  gainXP(5);

};

window.bathPet = () => {

  showAction("🫧");

  bouncePet();

  temporaryFace(
    "(◕‿◕)",
    1500
  );

  setMood(
    "happy",
    "fresh and clean"
  );

  setTimeout(() => {

    poop = false;

    updatePet();

    showAction("✨");

  }, 700);

  gainXP(12);

};

window.sleepPet = () => {

  showAction("💤");

  bouncePet();

  temporaryFace(
    "(u_u)"
  );

  setMood(
    "sleepy",
    "zzz..."
  );

  clearTimeout(
    sleepTimer
  );

  sleepTimer =
    setTimeout(() => {

      setMood(
        "happy",
        "well rested"
      );

    }, 5000);

    gainXP(15);

};

window.resetPet = () => {

  if (
    !confirm(
      "return to creature?"
    )
  ) return;

  xp = 0;

  poop = false;

  mood = "happy";

  currentThought =
    getThought();

  localStorage.removeItem(
    "chauXP"
  );

  updatePet();

};

//*TIMERS*//


setInterval(() => {

  if (
    evolving ||
    faceLocked ||
    mood === "sleepy"
  ) return;

  const sprite =
    getEl(
      "pet-sprite"
    );

  if (!sprite)
    return;

  faceLocked = true;

  sprite.textContent =
    idleFaces[
      getStage()
    ];

  setTimeout(() => {

    faceLocked = false;

    updatePet();

  }, 1000);

}, 25000);

setInterval(() => {

  if (
    evolving ||
    rebooting
  ) return;

  showThought();

}, 20000);

setInterval(
  wander,
  4000
);

setInterval(() => {

  if (
    rebooting ||
    evolving ||
    poop
  ) return;

  poopCounter++;

  if (
    poopCounter >= 6
  ) {

    poopCounter = 0;

    showAction("!");

    setTimeout(() => {

      poop = true;

      const spots = [

  { x: 70, y: 82 },
  { x: 120, y: 85 },
  { x: 170, y: 82 }

];
      const spot =
        spots[
          Math.floor(
            Math.random() *
            spots.length
          )
        ];

      poopX =
        spot.x;

      poopY =
        spot.y;

      updatePet();

    }, 200);

  }

}, 3000);

//*INIT*//

currentThought =
  getThought();

updatePet();

setTimeout(() => {

  showThought();

}, 3000);

const pet =
  document.querySelector(
    ".pet-row"
  );

if (pet) {

  pet.style.left =
    `${petX}px`;

  pet.style.top =
    `${petY}px`;

}