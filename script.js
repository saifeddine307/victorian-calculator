/* =========================================
   PASSWORD PROTECTION
   ========================================= */

const CALCULATOR_PASSWORD = "when the rain stops"; 
// 👆 غير 1234 إلى كلمة المرور التي تريدها


function checkPassword() {

  const input = document.getElementById('password-input');
  const error = document.getElementById('password-error');
  const card = document.querySelector('.password-card');

  const enteredPassword = input.value;

  if (enteredPassword === CALCULATOR_PASSWORD) {

    // إخفاء شاشة كلمة المرور
    document
      .getElementById('password-screen')
      .classList.add('unlocked');

    // إظهار الآلة الحاسبة
    document
      .getElementById('calculator')
      .classList.add('unlocked');

  } else {

    // إظهار رسالة الخطأ
    error.classList.add('show');

    // اهتزاز البطاقة
    card.classList.remove('shake');

    // إعادة تشغيل animation
    void card.offsetWidth;

    card.classList.add('shake');

    // مسح كلمة المرور
    input.value = '';

    // التركيز على الحقل
    input.focus();

  }
}


/* الضغط على Enter */

document
  .getElementById('password-input')
  .addEventListener('keydown', function(event) {

    if (event.key === 'Enter') {
      checkPassword();
    }

  });
let display = document.getElementById('display');
let currentInput = '';

function appendNum(num) {
  if (display.classList.contains('love-revealed')) resetDisplay();
  if (currentInput === '0') currentInput = '';
  currentInput += num;
  display.innerText = currentInput;
}

function appendOp(op) {
  if (display.classList.contains('love-revealed')) resetDisplay();
  if (currentInput === '') return;
  currentInput += op;
  display.innerText = currentInput;
}

function clearDisplay() {
  currentInput = '';
  resetDisplay();
  display.innerText = '0';
}

function deleteLast() {
  if (display.classList.contains('love-revealed')) {
    clearDisplay();
    return;
  }
  currentInput = currentInput.slice(0, -1);
  display.innerText = currentInput || '0';
}

function calculate() {
  // الشرط: التأكد من احتواء العملية على الرقمين 25 و 9 معاً
  if (currentInput.includes('25') && currentInput.includes('9')) {
    triggerSecret();
    return;
  }

  try {
    let result = eval(currentInput);
    display.innerText = result;
    currentInput = result.toString();
  } catch (e) {
    display.innerText = 'Error';
    currentInput = '';
  }
}

function triggerSecret() {
  // 1. عرض I love you داخل شاشة الحاسبة
  display.innerText = 'Samia ❤️';
  display.classList.add('love-revealed');

  // 2. إنشاء عنصر Happy Birthday كبير خارج الآلة الحاسبة
  let overlayText = document.createElement('div');
  overlayText.id = 'bday-overlay';
  overlayText.innerText = 'Happy Birthday!';
  document.body.appendChild(overlayText);

  // 3. إطلاق القلوب المتطايرة
  createHearts();
  currentInput = '';
}

function resetDisplay() {
  display.classList.remove('love-revealed');
  
  // إزالة القلوب وعنصر Happy Birthday عند بدء كتابة رقم جديد
  document.querySelectorAll('.heart').forEach(h => h.remove());
  let overlay = document.getElementById('bday-overlay');
  if (overlay) overlay.remove();
}

// دالة إنشاء القلوب المتطايرة في الخلفية
function createHearts() {
  for (let i = 0; i < 25; i++) {
    let heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(heart);
  }
}