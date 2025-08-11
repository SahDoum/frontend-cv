function handleFileCode() {
  let divs = document.getElementsByClassName('file-code');
  Array.from(divs).forEach(div => {
    let fileName = div.getAttribute('data-file');
    let fileLanguage = getFileLanguage(fileName);

    fetch(fileName)
      .then(response => response.text())
      .then(fileText => {
        let pre = createPreElement(fileText, fileLanguage);
        div.parentNode.replaceChild(pre, div);
        addCopyButton(pre);
        hljs.highlightAll();


      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}

function getFileLanguage(fileName) {
  let ext = fileName.split('.').pop().toLowerCase();
  switch (ext) {
    case 'html':
      return 'HTML';
    case 'css':
      return 'CSS';
    case 'js':
      return 'JavaScript';
    default:
      return 'Plain Text';
  }
}

function createPreElement(fileData, language) {
  let pre = document.createElement('pre');
  pre.classList.add('code-pre');
  pre.setAttribute('data-language', language);
  let code = document.createElement('code');
  code.textContent = fileData;
  pre.appendChild(code);
  return pre;
}

function addCopyButton(element) {
  if (navigator.clipboard) {
    let button = document.createElement("button");
    button.innerText = "Copy Code";
    element.appendChild(button);
    button.addEventListener("click", async () => {
      await copyCode(element);
    });
  }
}

async function copyCode(element) {
  let code = element.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
}

// Usage example:
handleFileCode();
hljs.highlightAll();
