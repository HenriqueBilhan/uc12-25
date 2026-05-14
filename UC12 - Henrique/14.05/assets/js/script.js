/*const box = document.querySelector(".box")
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
        }
    })
})
boxes.forEach(box => {
  observer.observe(box)  
})
*/
// seleciona TODOS os elementos que possuem a classe "box"
// o resultado vira uma lista de elementos


//-------------------------------------------------------------------------------------



const boxes = document.querySelectorAll(".box")

// cria um observador de interseção
// ele serve para "vigiar" elementos da página
// e detectar quando eles aparecem na tela
/*
No IntersectionObserver, a função recebe automaticamente 2 parâmetros:
Eles são enviados pelo próprio navegador quando o observador detecta mudanças.
entries é uma lista com informações dos elementos observados.

Cada item dessa lista representa um elemento que mudou de estado na tela.
O objeto entry possui várias informações úteis:

entry.isIntersecting

Verifica se o elemento apareceu na tela.

entry.target

Representa o elemento HTML observado.

observer é o próprio observador criado pelo: const observer = new IntersectionObserver(...)

Isso permite controlar o observador dentro da função.

*/
const observer = new IntersectionObserver((entries, observer) => {

    // percorre todos os elementos observados
    entries.forEach(entry => {

        // verifica se o elemento apareceu na área visível da tela
        // isIntersecting retorna true quando o elemento entra na viewport
        if(entry.isIntersecting){

            // adiciona a classe "visible" ao elemento
            // normalmente usada para ativar animações no CSS
            entry.target.classList.add("visible")

            // para de observar esse elemento
            // isso evita que a animação fique repetindo
            observer.unobserve(entry.target)
        }
    })
})
// percorre cada box encontrada no HTML
boxes.forEach(box => {

    // manda o observer começar a observar cada elemento
    observer.observe(box)
})