const view = document.querySelector("#view");
const range = document.querySelector("#range");
const rangeLength = document.querySelector("#rangeLength");
const saveBtn = document.querySelector("#copy-button");
const copyResult = document.querySelector("#copy-result");

let startClick = false;

const MIN = 4;
const MAX = 24;

/**
 * Génére une chaine aléatoire, prends en param la taille
 * @param number length
 * @returns
 */
const generatePassword = (length) => {
  let result = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  const charactersLength = characters.length;

  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.substring(0, length);
};

const viewValue = () => {
  rangeLength.innerHTML = range.value;
  view.value = generatePassword(parseInt(range.value));
};

rangeLength.innerHTML = range.value;
view.value = generatePassword(parseInt(range.value));

saveBtn.addEventListener("click", () => {
  saveBtn.classList.remove("copy-button-anim");
  copyResult.classList.remove("copy-result-anim");
  copyResult.removeAttribute("hidden");
  setTimeout(() => {
    copyResult.classList.add("copy-result-anim");
    saveBtn.classList.add("copy-button-anim");
  }, 100);

  navigator.clipboard.writeText(view.value);
  copyResult.innerHTML = "Mot de passe copier";
});

range.addEventListener("click", () => {
  viewValue();
});

range.addEventListener("mousedown", () => {
  startClick = true;
});

range.addEventListener("mousemove", () => {
  if (startClick) {
    viewValue();
  }
});

range.addEventListener("mouseup", () => {
  startClick = false;
});

range.addEventListener("touchmove", () => {
  viewValue();
});

range.addEventListener("touchend", () => {
  viewValue();
});
