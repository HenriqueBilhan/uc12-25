//Pegar cada elemento que vamos usar
//como podemos identificar estes elementos?

const titulo = document.getElementById("titulo")
const botao = document.getElementById("btn")

const textoOriginal = titulo.textContent

function trocaMensagem() {
    if (titulo.textContent === textoOriginal) {
        titulo.textContent = "Texto trocado"
    } else {
        titulo.textContent = textoOriginal
    }
}

botao.addEventListener('click', trocaMensagem)