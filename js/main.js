const lengthInput = document.getElementById('lengthInput');
const lengthValue = document.getElementById('lengthValue');
const passwordInput = document.getElementById('password');
const radioBtns = [...document.querySelectorAll('.form__radio')];

const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');
const passwordName = document.getElementById('name');

// Constantes
const NUMBERS = '0123456789';
const SPECIALS = '!@#$%^&*_+-=<>?';

// Génération du mot de passe
const buildPassword = (length, charset) =>
    Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');

const getCharset = () => {
    const selected = radioBtns.find(radio => radio.checked);
    return selected?.value === 'special'
        ? NUMBERS + SPECIALS
        : NUMBERS;
};

const generatePassword = () => {
    try {
        const length = Number(lengthInput.value);

        if (!length || length <= 0) {
            throw new Error('Longueur invalide');
        }

        const charset = getCharset();

        if (!charset.length) {
            throw new Error('Charset vide');
        }

        passwordInput.value = buildPassword(length, charset);

    } catch (error) {
        alert(`[ERREUR] ${error.message}`);
    }
};

// Téléchargement
const downloadPassword = () => {
    try {
        const name = passwordName.value.trim();
        const password = passwordInput.value;

        if (!name) {
            throw new Error('Un nom est obligatoire');
        }

        if (!password) {
            throw new Error('Aucun mot de passe généré');
        }

        const content = `****** ${name} ******\n${password}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.txt`;
        a.click();

        URL.revokeObjectURL(url);

    } catch (error) {
        alert(`[ERREUR] ${error.message}`);
    }
};

generateBtn.addEventListener('click', generatePassword);
downloadBtn.addEventListener('click', downloadPassword);