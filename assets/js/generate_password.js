const view = document.querySelector("#view");
const range = document.querySelector("#range");
const rangeLength = document.querySelector("#rangeLength");
const saveBtn = document.querySelector("#copy-button");
const copyResult = document.querySelector("#copy-result");
const exportBtn = document.querySelector("#export-button");
const namePass = document.querySelector("#name");

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
  saveBtn.classList.remove("button-anim");
  copyResult.classList.remove("copy-result-anim");
  copyResult.removeAttribute("hidden");
  setTimeout(() => {
    copyResult.classList.add("copy-result-anim");
    saveBtn.classList.add("button-anim");
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

exportBtn.addEventListener("click", () =>{

  exportBtn.classList.remove("button-anim");
  setTimeout(() => {
    exportBtn.classList.add("button-anim");
  }, 100);

  let nameValue = namePass.value;
  const viewValue = view.value;

  if(nameValue.length === 0){
    nameValue = "Mot de passe généré depuis https://tosbas.github.io/password-generator/";
  }

  downloadFile(nameValue, viewValue);
})

const downloadFile = (nameValue, viewValue) => {
  const link = document.createElement("a");
  const content = `****** ${nameValue} ******\r${viewValue}`;
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = `${nameValue}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
};
