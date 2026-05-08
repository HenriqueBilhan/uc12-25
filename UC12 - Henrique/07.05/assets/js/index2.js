const div = document.querySelector("div")
const btn = document.querySelector("button")
let contador = 0;
let numerodeItens = 0
btn.addEventListener("click", () =>{
if(numerodeItens == 0){
    contador = numerodeItens
}
    contador ++ 
numerodeItens++
    const box = document.createElement("div")
    box.classList.add("container");
    box.textContent = contador;
    box.addEventListener("click", () =>{
box.remove();
numerodeItens--;
    });

    div.appendChild(box);
})