var callStack;   
var barsInfo = [{disks: [4, 3, 2, 1]}, {disks: []}, {disks: []}];

function executeHanoi() {
  callStack = [];
  Hanoi(4, 0, 2, 1);
  moveDisk();
}

function moveDisk() {
  if (callStack.length == 0) return;
  var param = callStack.shift();
  var fromBar = param[0];
  var toBar = param[1];
  var disk = barsInfo[fromBar].disks.pop();
  var elem = document.getElementById("disk" + disk);
  var toBarElm = document.getElementById("bar" + toBar);
  elem.style.left = toBarElm.offsetLeft - Math.floor(elem.offsetWidth / 2) + "px";
  setTimeout(function() {
    toBarElm.appendChild(elem);
    barsInfo[toBar].disks.push(disk);
    moveDisk();
  }, 1000);
}

function Hanoi(n, a, b, c) {
  if (n > 0) {
    Hanoi(n - 1, a, c, b);
    callStack.push([a, b]);
    Hanoi(n - 1, c, b, a);
  }
}

for (var i = 4; i >= 1; i--) {
  var disk = document.createElement("div");
  disk.className = "disk";
  disk.id = "disk" + i;
  disk.style.width = i * 30 + "px";
  document.getElementById("bar0").appendChild(disk);
}

executeHanoi();
