/*btn.addEventListener("click", () => {
    console.log("Clique detectado");
});
*/
// Evento de Duplo click
/*
btn.addEventListener("dblclick", () => {
    console.log("Duplo clique");
});
*/

//Evento do Mouse Enter
/*const caixa = document.querySelector(".box");

caixa.addEventListener("mouseenter", () => {
    console.log("Entrou na caixa");
});
*/
//Evento de MouseLeave
/*
caixa.addEventListener("mouseleave", () => {
    console.log("Saiu da caixa");
});
*/
//Evento MouseMove
/*
caixa.addEventListener("mousemove", (event) => {
    console.log("X:", event.clientX, "Y:", event.clientY);
});
*/
// Evento de Teclado
/*

document.addEventListener("keydown", (event) => {
    console.log("Tecla:", event.key);
});
*/
//Evento  de "keyup"
/* document.addEventListener("keyup", (event) => {
    console.log("Soltou:", event.key);
});
*/
//Evento de "keyup", "keydown"
/*
document.addEventListener("keydown", () => {
    console.log("pressionou");
});

document.addEventListener("keyup", () => {
    console.log("soltou");
});
*/
//Evento de submit
/*const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form enviado");
});
*/
//Evento de imput
/*const input = document.querySelector("input");

input.addEventListener("input", (event) => {
    console.log("Valor:", event.target.value);
});*/
//Evento de Change
/*
const input = document.querySelector("input");

input.addEventListener("input", (event) => {
    console.log("Valor:", event.target.value);
});
*/
// Evento de Focus
/*input.addEventListener("focus", () => {
    console.log("Campo ativo");
});*/
//Evento de Blur
/*
input.addEventListener("blur", () => {
    console.log("Saiu do campo");
});
*/
//Evento de Carregamento
/*document.addEventListener("DOMContentLoaded", () => {
    console.log("HTML carregado");
});
*/
//Evento de Load
/*window.addEventListener("load", () => {
    console.log("Tudo carregado (imagens, etc)");
});
*/
//Evento de Objeto event
/*elemento.addEventListener("click", (event) => {
    console.log(event);
});
*/
 

const title = document.querySelector('h3')
const input = document.querySelector('input')
const link = document.getElementById('link')
const img = document.getElementById('imagem')
const btn = document.getElementById('btn')
const PIKACHU_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbfzYtn-eRiOeIygbWQ6S5yecoe-TpaJGngA&s'
const SQUIRTL_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvgt4O7bdc3ZlDEvYvma4MmUh_by2nZrV0A&s'
input.addEventListener('input', (event) => {
  title.innerHTML = `Nome: <span style="color:red;">${event.target.value}</span>`
})
let mudou = false
btn.addEventListener('click', () => {
  if (mudou) {
    img.src = PIKACHU_URL
  } else {
    img.src = SQUIRTL_URL
  }
  mudou = !mudou
})