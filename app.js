function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const userid = makeid(8);

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  messages.style.color = color;
  return color;
}
const usernameColor = getRandomColor();

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", function (event) {
  m = {
    username: userid,
    data: "Hello Server!",
    time: new Date(),
    color: usernameColor,
  };
  console.log(m);
  socket.send(JSON.stringify(m));
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
  messages = document.getElementById("messages");
  msg = document.createElement("div");
  date = document.createElement("span");
  date.classList.add("date");
  un = document.createElement("span");
  un.classList.add("un");
  jd = JSON.parse(event.data);
  un.innerHTML = jd.username;
  // add style to username
  d = document.createElement("span");
  d.classList.add("d");
  d.innerHTML = jd.data;
  date.innerHTML = jd.time;
  msg.classList.add("message");
  msg.appendChild(date);
  msg.appendChild(un);
  msg.appendChild(d);
  messages.appendChild(msg);
});

function sendMessage() {
  i_t_m = document.getElementById("msg_text");
  t_m = i_t_m.value;
  console.log(t_m);
  m = {
    username: userid,
    data: t_m,
    time: new Date(),
    color: usernameColor,
  };
  console.log(m);

  socket.send(JSON.stringify(m));
  if (!t_m) return;

  document.getElementById("msg_text").value = "";
}
