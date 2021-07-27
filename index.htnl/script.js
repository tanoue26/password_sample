//除外する文字列
const baseExcludeTexts = ['o', 'O', '0', 'I', 'l', '1'];
document.getElementById('excludeTexts').value = baseExcludeTexts.join(',');

const inputs = document.forms.inputs,
      passwordListElement = document.getElementById('passwordList');

document.getElementById('generateButton').addEventListener('click', e => {
  e.preventDefault();

  const isIncludNUmber = inputs.includeNumber.checked,
        isIncludeEnglishLowercase = inputs.includeEnglishLowercase.checked,
        isIncludeEnglishUppercase = inputs.includeEnglishUppercase.checked;

  if (isIncludNUmber || isIncludeEnglishLowercase || isIncludeEnglishUppercase) {

    //パスワードを生成するための配列
    const passwordTexts = [];
    if (isIncludeEnglishLowercase) {
      for (let i = 0; i < 26; i++) {
        passwordTexts.push(String.fromCharCode('a'.charCodeAt(0) + i));
      }
    }
    if (isIncludeEnglishUppercase) {
      for (let i = 0; i < 26; i++) {
        passwordTexts.push(String.fromCharCode('A'.charCodeAt(0) + i));
      }
    }
    if (isIncludNUmber) {
      for (let i = 0; i < 10; i++) {
        passwordTexts.push(i);
      }
    }
    const excludeTexts = document.forms.inputs.excludeTexts.value.split(','),
      excludedpasswordTexts = passwordTexts.filter(text => !(excludeTexts.includes(String(text))));
  
    let passwordLength = inputs.stringLength.value,
      isOutOfRange = false;
    if (passwordLength === 'custom') {
      passwordLength = inputs.customLength.value;
      if (passwordLength < 1 || passwordLength > 100) {
        alert('文字数は1から100の間で')
        isOutOfRange = true;
      }
    }

    let numberOfPasswords = inputs.numberOfPasswords.value;
    if (numberOfPasswords === 'custom') {
      numberOfPasswords = inputs.customNumberOfPasswordInput.value;
      if (numberOfPasswords < 1 || numberOfPasswords > 100) {
        alert('生成するパスワードの個数は1から100の間で')
        isOutOfRange = true;
      }
    }
  
    if (!isOutOfRange) {
      passwordListElement.innerHTML = '';
      
      for (let i = 0; i < numberOfPasswords; i++) {
        let passwords = '';
        for (let j = 0; j < passwordLength; j++) {
          passwords += excludedpasswordTexts[Math.floor(Math.random() * excludedpasswordTexts.length)];
        }

        const li = document.createElement('li'),
          input = document.createElement('input'),
          copyButton = document.createElement('a');
        input.value = passwords;
        li.appendChild(input);

        copyButton.textContent = 'コピーする';
        copyButton.classList.add('copyButton');
        copyButton.addEventListener('click', () => {
          const textarea = document.createElement('textarea');
          textarea.textContent = passwords;

          const body = document.querySelector('body');
          body.appendChild(textarea);

          textarea.select();
          document.execCommand('copy');
          body.removeChild(textarea);

          alert('パスワード「${passwords}」をコピーしました')
        })
        li.appendChild(copyButton);

        passwordListElement.appendChild(li);
      }
    }
    } else {
      alert('「パスワードを構成する文字」には、少なくとも1つ以上の項目にチェックを入れてください')
    }
})