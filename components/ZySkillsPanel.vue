<!--<template>
  <div class="skill-panel-box">
    <div class="window">
      <div class="handle">
        <div class="buttons">
          <button class="close">
          </button>
          <button class="minimize">
          </button>
          <button class="maximize">
          </button>
        </div>
        <span class="title">{{ title }}</span>
      </div>
      <div class="terminal" ref="terminal"></div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const title = ref("urname@dvmrt: ~");
const terminal = ref(null);
const prompt = "➜";
const path = "~";

const commandHistory = [];
let historyIndex = 0;

let command = "";

const commands = [
  {
    name: "clear",
    function: clear,
  },
  {
    name: "help",
    function: help,
  },
  {
    name: "list",
    function: list,
  },
  {
    name: "fortune",
    function: fortune,
  },
  {
    name: "echo",
    function: echo,
  },
];

const hintMessage = "Try 'help' or 'list'";

// UTILITY
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// COMMANDS
function clear() {
  terminal.value.innerHTML = "";
}

function help() {
  appendText("COMMANDS: clear, help, list, echo, fortune");
}

function list() {
  appendText(
      "MY SKILLS: html5, css3, less, javascript (native, jQuery, APIs), svg\n- Frameworks: bootstrap, ink, lumx, mdl, materialize, material-ui\n- Others: npm, bower, gulp, postcss, font awesome, icomoon, git\n- Design: photoshop, illustrator"
  );
}

function echo(args) {
  appendText(args.join(" "));
}

function fortune() {
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "https://cdn.rawgit.com/bmc/fortunes/master/fortunes", false);
  // xhr.send(null);
  //
  // if (xhr.status === 200) {
  //   const fortunes = xhr.responseText.split("%");
  //   const fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
  //   appendText(fortune);
  // }
}

function processCommand() {
  let isValid = false;

  // Create args list by splitting the command
  // by space characters and then shift off the
  // actual command.

  const args = command.split(" ");
  const cmd = args[0];
  args.shift();

  // Iterate through the available commands to find a match.
  // Then call that command and pass in any arguments.
  for (let i = 0; i < commands.length; i++) {
    if (cmd === commands[i].name) {
      commands[i].function(args);
      isValid = true;
      break;
    }
  }

  // No match was found...
  if (!isValid) {
    appendText("zsh: command not found: " + command);
  }

  // Add to command history and clean up.
  commandHistory.push(command);
  historyIndex = commandHistory.length;
  command = "";
}

function displayPrompt() {
  const promptSpan = document.createElement("span");
  promptSpan.className = "prompt";
  promptSpan.textContent = prompt;
  terminal.value.appendChild(promptSpan);

  const pathSpan = document.createElement("span");
  pathSpan.className = "path";
  pathSpan.textContent = path;
  terminal.value.appendChild(pathSpan);
}

// Delete n number of characters from the end of our output
function erase(n) {
  command = command.slice(0, -n);
  const terminalContent = terminal.value.innerHTML.slice(0, -n);
  terminal.value.innerHTML = terminalContent;
}

function clearCommand() {
  if (command.length > 0) {
    erase(command.length);
  }
}

function appendCommand(str) {
  terminal.value.innerHTML += str;
  command += str;
}

function appendText(text) {
  const textSpan = document.createElement("span");
  textSpan.textContent = text + "\n";
  terminal.value.appendChild(textSpan);
}


document.addEventListener("keydown", (e) => {
  const keyCode = e.which || e.keyCode;

  // BACKSPACE
  if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
    if (command !== "") {
      erase(1);
    }
  }

  // UP or DOWN
  if (keyCode === 38 || keyCode === 40) {
    // Move up or down the history
    if (keyCode === 38) {
      // UP
      historyIndex&#45;&#45;;
      if (historyIndex < 0) {
        historyIndex++;
      }
    } else if (keyCode === 40) {
      // DOWN
      historyIndex++;
      if (historyIndex > commandHistory.length - 1) {
        historyIndex&#45;&#45;;
      }
    }

    // Get command
    const cmd = commandHistory[historyIndex];
    if (cmd !== undefined) {
      clearCommand();
      appendCommand(cmd);
    }
  }
});

document.addEventListener("keypress", (e) => {
  // Make sure we get the right event
  e = e || window.event;
  const keyCode = typeof e.which === "number" ? e.which : e.keyCode;

  // Which key was pressed?
  switch (keyCode) {
      // ENTER
    case 13:
      terminal.value.appendChild(document.createElement("br"));
      console.log(terminal.value)
      processCommand();
      displayPrompt();
      break;
    default:
      appendCommand(String.fromCharCode(keyCode));
  }
});

// Set the window title
onMounted(() => {
  // Get the date for our fake last-login
  const date = new Date().toString();
  const lastLogin = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and prompt
  appendText("Last login: " + lastLogin);
  appendText(hintMessage);
  displayPrompt();
});


</script>

<style lang="scss" scoped>
$button-diameter: 12px;

$button-not-focused: rgb(220, 220, 220);
$button-close: rgb(255, 97, 89);
$button-minimize: rgb(255, 191, 47);
$button-maximize: rgb(37, 204, 62);

$button-spacing: 4px;

$window-not-focused: rgb(246, 246, 246);
$window-focused: linear-gradient(0deg, rgb(216, 216, 216), rgb(236, 236, 236));
$window-border: rgb(179, 179, 179);

$handle-height: 22px;

$window-width: 100%;
$window-height: 480px;



* {
  box-sizing: border-box;
}

textarea, input, button {
  outline: none;
}

.window-button {
  padding: 0;
  margin: 0;
  margin-right: $button-spacing;

  width: $button-diameter;
  height: $button-diameter;

  background-color: $button-not-focused;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: $button-diameter / 2;

  color: rgba(0, 0, 0, 0.5);
}

.window {
  animation: bounceIn 1s ease-in-out;
  width: $window-width;
  background: #3a7bd5;
  background-image: -webkit-radial-gradient(top, circle cover, #ffa500 0%, #336d30 80%);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  .handle {
    height: $handle-height;

    background: $window-focused;

    border-top: 1px solid white;
    border-bottom: 1px solid $window-border;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    color: rgba(0, 0, 0, 0.7);

    font-family: Helvetica, sans-serif;
    font-size: 13px;

    line-height: $handle-height;
    text-align: center;
  }

  .buttons {
    position: absolute;
    float: left;

    margin: 0 $button-spacing * 2;

    .close {
      @extend .window-button;
      background-color: $button-close;
    }

    .minimize {
      @extend .window-button;
      background-color: $button-minimize;
    }

    .maximize {
      @extend .window-button;
      background-color: $button-maximize;
    }
  }

  .terminal {
    padding: $button-spacing;

    background-color: black;
    opacity: 0.7;

    height: $window-height / 2 - $handle-height;

    color: white;

    font-family: 'Source Code Pro', monospace;
    font-weight: 200;
    font-size: 14px;

    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    overflow-y: auto;

    &::after {
      content: "|";
      animation: blink 2s steps(1) infinite;
    }
  }
}

.prompt {
  color: rgb(189, 227, 113);
}

.path {
  color: rgb(94, 215, 255);
}

@keyframes blink {
  50% {
    color: transparent;
  }
}

@keyframes bounceIn {
  0% {
    transform: translateY(-1000px);
  }
  60% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>-->

<template>
  <section class="skill-box-t">
    <figure class="snip1382 ">
      <img src="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
           alt="sample96"/>
      <figcaption>
        <h2>APP/小程序开发</h2>
        <p>高质量、高水平、快速地开发各平台的小程序,可进行开发 iOS 和 Android 等跨端APP应用程序.</p>
      </figcaption>
    </figure>
    <figure class="snip1382 hover">
      <img src="https://images.pexels.com/photos/114907/pexels-photo-114907.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="sample99"/>
      <figcaption>
        <h2>Web 网页应用开发</h2>
        <p>结合前沿技术和创新思维、高质量和专业水平打造的最现代、最优质的Web网页应用。</p>
      </figcaption>
    </figure>
    <figure class="snip1382">
      <img src="https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=1600"
           alt="sample91"/>
      <figcaption>
        <h2>Node后端服务</h2>
        <p>快速搭建WEB服务接口，为前端应用提供后端支持.帮助解决各种Node相关问题。 </p>

      </figcaption>
    </figure>
  </section>

</template>
<script setup>

</script>
<style lang="scss" scoped>
.skill-box-panel {
  width: 100%;
  position: relative;
  border: 1px solid #eeedf2;
  margin-bottom: 50px;
  margin-top: calc(2rem + 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 1rem;

  .box-title {
    position: absolute;
    left: 25px;
    top: -20px;
    z-index: 1;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      font-size: 1rem;
      margin-right: 15px;
    }

    .text {
      font-size: 1rem;
      color: #a5a4a4;
      text-transform: uppercase;
      font-weight: 600;
    }
  }
}

.skill-box-t {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  h2 {
    color: #ffffff;
  }
}

figure.snip1382 {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  width: 31%;
  max-height: 220px;
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  @media screen and (max-width: 950px) {
    width: 100% !important;
    margin: 10px 0;
  }
}

figure.snip1382 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}

figure.snip1382 img {
  max-width: 100%;
}

figure.snip1382:after,
figure.snip1382:before,
figure.snip1382 figcaption:after,
figure.snip1382 figcaption:before {
  background: #0a0a0a;
  height: 25%;
  position: absolute;
  content: '';
  opacity: 0;
  -webkit-transition: all 0.35s steps(4);
  transition: all 0.35s steps(4);
  z-index: 1;
  left: 50%;
  right: 50%;
}

figure.snip1382:before {
  top: 0;
  -webkit-transition-delay: 0;
  transition-delay: 0;
}

figure.snip1382:after {
  top: 25%;
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

figure.snip1382 figcaption:before {
  top: 50%;
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
  z-index: -1;
}

figure.snip1382 figcaption:after {
  top: 75%;
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
  z-index: -1;
}

figure.snip1382 figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 30px;
}

figure.snip1382 h2,
figure.snip1382 p,
figure.snip1382 .icons {
  margin: 0;
  width: 100%;
  opacity: 0;
}

figure.snip1382 h2 {
  font-weight: 900;
  text-transform: uppercase;
}

figure.snip1382 p {
  font-weight: 300;
}

figure.snip1382 .icons {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
}

figure.snip1382 i {
  padding: 0px 10px;
  display: inline-block;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  opacity: 0.8;
  text-decoration: none;
}

figure.snip1382 i:hover {
  opacity: 1;
}

figure.snip1382:hover:after,
figure.snip1382.hover:after,
figure.snip1382:hover:before,
figure.snip1382.hover:before,
figure.snip1382:hover figcaption:after,
figure.snip1382.hover figcaption:after,
figure.snip1382:hover figcaption:before,
figure.snip1382.hover figcaption:before {
  left: 0;
  right: 0;
  opacity: 0.8;
}

figure.snip1382:hover figcaption h2,
figure.snip1382.hover figcaption h2,
figure.snip1382:hover figcaption p,
figure.snip1382.hover figcaption p,
figure.snip1382:hover figcaption .icons,
figure.snip1382.hover figcaption .icons {
  -webkit-transition-delay: 0.25s;
  transition-delay: 0.25s;
}

figure.snip1382:hover figcaption h2,
figure.snip1382.hover figcaption h2,
figure.snip1382:hover figcaption .icons,
figure.snip1382.hover figcaption .icons {
  opacity: 1;
}

figure.snip1382:hover figcaption p,
figure.snip1382.hover figcaption p {
  opacity: 0.7;
}
</style>
