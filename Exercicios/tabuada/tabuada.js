function gerarTabuada () {
    let numero = document.getElementById("numero").value
    let resultado = document.getElementById("resultado")
    resultado.innerHTML = ""

    if (numero === "") {
       resultado.innerHTML = "<p>Digite um numero valido.</p>"
        return
    }    
    numero = parseInt (numero)
    let tabuadaHTML = `<h3> Tabuada  do ${numero}</h3>`
    for (let i = 1; i <= 10; i++) {
        tabuadaHTML += `<p>${numero} x ${i} = ${numero * i}</p>`
    }
    resultado.innerHTML = tabuadaHTML
}         