const iframe = document.getElementById("iframe");
const urlInput = document.getElementById("urlInput");
const GoBtn = document.getElementById("GoBtn");

const linkBtn = document.getElementById("linkBtn");
const projectBtn = document.getElementById("projectBtn");
const authorBtn = document.getElementById("authorBtn");

const incBtn = document.getElementById("incBtn");
const decBtn = document.getElementById("decBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const fullBtn = document.getElementById("fullBtn");
const openBtn = document.getElementById("openBtn");

const backBtns = document.querySelectorAll(".backBtn");

backBtns.forEach(button => {
    button.addEventListener('click', () => {  
         closeAll();
    });
});

const links = document.querySelectorAll(".link");
links.forEach(link => {
    link.addEventListener('click', (event) => {
        const target = event.target.tagName == "DIV" ? event.target : event.target.parentElement;
        iframe.src = target.dataset.url;
        urlInput.value = target.dataset.url;
        console.log("clicked link:", target.dataset.url);
        iframe.click();
        closeAll();
    });
});

iframe.style.width = "70vw";
iframe.style.height = "70vh";

let webHistory = [];
let currentPage = 0;
webHistory[currentPage] = iframe.src;

iframe.addEventListener('load', () => {
    console.log("The iframe URL has changed or reloaded!", iframe.contentWindow);
});

urlInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        GoBtn.click();
    }
});

GoBtn.addEventListener("click", (event) => {
    Go(urlInput.value);
    webHistory[currentPage] = urlInput.value;
    console.log("Go button clicked. URL: " + urlInput.value);
});

backBtn.addEventListener("mousedown", (event) => {
    currentPage -= 1;
    if (webHistory[currentPage] == undefined) {
        console.log("no exiting history here, loading default example page");
        webHistory[currentPage] = "https://www.desmos.com/"
    }
    Go(webHistory[currentPage]);
});

forwardBtn.addEventListener("mousedown", (event) => {
    currentPage += 1;
    if (webHistory[currentPage] == undefined) {
        console.log("no exiting history here, loading default example page");
        webHistory[currentPage] = "https://www.desmos.com/"
    }
    Go(webHistory[currentPage]);
});

fullBtn.addEventListener('click', () => {
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) { /* Safari */
    iframe.webkitRequestFullscreen();
  }
});

linkBtn.addEventListener('click', () => {
    const linkBox = document.getElementById("linkBox");
    linkBox.style.display = "block";
});

projectBtn.addEventListener('click', () => {
    console.log("hey");
    const projectBox = document.getElementById("projectBox");
    projectBox.style.display = "block";
});

authorBtn.addEventListener('click', () => {
    const authorBox = document.getElementById("authorBox");
    authorBox.style.display = "block";
});

incBtn.addEventListener("mousedown", (event) => {
    resize("+", 5);
});

decBtn.addEventListener("mousedown", (event) => {
    resize("-", 5);
});

openBtn.addEventListener("mousedown", (event) => {
    window.open(iframe.src, "_blank");
});

function Go(URL) {
    //set the iframe's src to the URL provided
    iframe.src = URL;
}

function resize(operation, operator) {
    if (operation == "+") {
        iframe.style.width = parseInt(iframe.style.width) + operator + "vw";
        iframe.style.height = parseInt(iframe.style.height) + operator + "vh";
    } else if (operation == "-") {
        iframe.style.width = parseInt(iframe.style.width) - operator + "vw";
        iframe.style.height = parseInt(iframe.style.height) - operator + "vh";
    } else {
        iframe.style.width =  operator + "vw";
        iframe.style.height = operator + "vh";
    }

    console.log(`resizing iframe, ${operation} ${operator}, now ${iframe.style.width} x ${iframe.style.height}`);
}

function closeAll() {
    const boxs = document.querySelectorAll(".box");
    boxs.forEach(box => {
        box.style.display = "none";
    });
}