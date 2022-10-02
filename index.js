const sendBtn = document.querySelector("#button");

document.addEventListener("DOMContentLoaded", function (event) {
  let name = localStorage.getItem("name");
  let avatar = localStorage.getItem("avatar");
  if (name != null) {
    document.getElementById("author").value = name;
    document.querySelector(".avatar").src = avatar;
  }
  let comments = getCommentsFromLocalStorage();

  comments.forEach((comment) => {
    sendMessage(avatar, name, comment);
  });
});

const getCommentsFromLocalStorage = () => {
  let commentData = localStorage.getItem("comments") || "";
  return commentData.split("|||").filter((_) => _);
};

sendBtn.addEventListener("click", checkMessage);

const addCommentToLocalStorage = (comment) => {
  let comments = getCommentsFromLocalStorage();
  comments.push(comment);
  commentData = comments.join("|||");
  localStorage.setItem("comments", commentData);
};

function sendMessage(avatar, author, comment) {
  document.getElementById(
    "chat"
  ).innerHTML += `<div><img src="${avatar}" class="avatar" alt="avatar"><span
    class="author">${author}:</span><span>${comment}</span></div>`;
}

function checkMessage() {
  let avatar = document.querySelector(".avatar").src;
  let author = document.getElementById("author").value;
  let comment = document.querySelector("#comment");
  // добавляем имя пользователя в localStorage, если его еще там нет
  if (localStorage.getItem("name") != author) {
    // проверяем, есть ли вообще там имя пользователя?
    localStorage.setItem("name", author);
    localStorage.setItem("avatar", avatar);
  }
  addCommentToLocalStorage(comment.value);
  sendMessage(avatar, author, comment.value);
  comment.value = "";
}
