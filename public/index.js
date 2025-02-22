let start = document.querySelector("#start");
let popup = document.querySelector(".popup");
let user = document.querySelector("#user");
let admin = document.querySelector("#admin");
let signup = document.querySelector("#btn2");
let canclebtn = document.querySelector('#cancle');

start.addEventListener('click', () => {
    popup.style.transform = "translate(-50%, -50%) scale(1)"; // Show popup   
});

signup.addEventListener('click',()=>{
    popup.style.transform = "translate(-50%, -50%) scale(1)";
})

user.addEventListener('click',()=>{
    popup.style.transform = "translate(-50%, -50%) scale(0)";
})
admin.addEventListener('click',()=>{
    popup.style.transform = "translate(-50%, -50%) scale(0)";
});
cancle.addEventListener('click',()=>{
    popup.style.transform = "translate(-50%, -50%) scale(0)";
});