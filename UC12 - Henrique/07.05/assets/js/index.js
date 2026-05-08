const div = document.querySelector("div");
const btn = document.querySelector("button");
const btnRem = document.getElementById("btn-rem")
btn.addEventListener("click", () =>{
const box =  document.createElement("div")
box.classList.add("container")
div.appendChild(box);

});

btnRem.addEventListener("click", () => {
    if(div.children.length > 0) {
       div.children[0].remove()
    }

});