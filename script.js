const validarCpf = (cpf) => {
    if (cpf.length != 11) return false;
    else {
        var numeros = cpf.substring(0, 9)
        var digitos = cpf.substring(9)
        var soma = 0;
        for (var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }

        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        if (resultado != digitos.charAt(0)) {
            return false;
        }

        var soma = 0;

        numeros = cpf.substring(0, 10);

        for (var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado != digitos.charAt(1)){
            return false;
        }else return true;
    }
}
function validacao() {
   

    var cpf = document.getElementById("cpf").value
    var validInputs = document.querySelectorAll(".required")
    var resultadoValidacao = validarCpf(cpf)
    for (i = 0; i < validInputs.length; i++) {
        if (validInputs[i].value === undefined || validInputs[i].value === "") {
            resultadoValidacao = false;
            validInputs[i].style["border"] = "1px solid red"
            
        } else {
            resultadoValidacao = true
            validInputs[1].style["border"] = "none"
            validInputs[i].style["border"] = "none"
        }
    }

    if (resultadoValidacao && validarCpf(cpf)) {

        window.alert("Parabens!! voce foi cadastrado com sucesso");

        return true
    }else if(!validarCpf(cpf)){
        window.alert("Opss! Aconteceu um erro no seu cadastro, verifique se voce preencheu todos espacos necessarios")
        validInputs[1].style["border"] = "1px solid red"
        document.querySelector("span").style["display"] = "inline"
        return false
    }
    else {
        window.alert("Opss! Aconteceu um erro no seu cadastro, verifique se voce preencheu todos espacos necessarios")
        return false
    }
}
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('endereco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('estado').value=(conteudo.uf);
} 
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {
        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};
