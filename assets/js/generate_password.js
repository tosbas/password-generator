const view = document.querySelector("#view");
const range = document.querySelector("#range");
const rangeLength = document.querySelector("#rangeLength");
const saveBtn = document.querySelector("#copy-button");
const copyResult = document.querySelector("#copy-result");
const exportBtn = document.querySelector("#export-button");
const namePass = document.querySelector("#name");

let startClick = false;

/**
 * Génére une chaine aléatoire, prend en param la taille
 * @param number length Longueur de la chaine
 * @returns La chaine générée
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

/**
 * Remplace rangeLength par la valeur du champ "range" et 
 * le champ "view" par la chaine générée
 */
const viewValue = () => {
  rangeLength.innerHTML = range.value;
  view.value = generatePassword(parseInt(range.value));
};

//Pour avoir une valeur générée dés le chargement de page
rangeLength.innerHTML = range.value;
view.value = generatePassword(parseInt(range.value));

//Event sur le bouton "Copier"
saveBtn.addEventListener("click", () => {
  saveBtn.classList.remove("button-anim");
  copyResult.classList.remove("copy-result-anim");
  copyResult.removeAttribute("hidden");
  setTimeout(() => {
    copyResult.classList.add("copy-result-anim");
    saveBtn.classList.add("button-anim");
  }, 100);

  //Ajout dans le presse-papier du mot de passe
  navigator.clipboard.writeText(view.value);
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
}, {passive:true});

range.addEventListener("touchend", () => {
  viewValue();
},{passive:true});

// Event sur le boutton "Exporter"
exportBtn.addEventListener("click", () =>{
  exportBtn.classList.remove("button-anim"); 
  setTimeout(() => {
    exportBtn.classList.add("button-anim");
  }, 100);

  let nameValue = namePass.value;
  const viewValue = view.value;

  //Si le champ "Nom" est vide, ajout d'une valeur par défaut
  if(nameValue.length === 0){
    nameValue = "Mot de passe généré depuis https://tosbas.github.io/password-generator/";
  }

  //Téléchargement du fichier
  downloadFile(nameValue, viewValue);
})

/**
 * Permet de télécharger un fichier au format .txt
 * @param string nameValue Nom du fichier
 * @param string viewValue Mot de passe
 */
const downloadFile = (nameValue, viewValue) => {
  const link = document.createElement("a"); 
  const content = `****** ${nameValue} ******\r${viewValue}`;
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = `${nameValue}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
};
