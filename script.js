'use strict';

window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
        console.info('serviceWorker loaded!');
    }
}

var formulario = {};
(function(formulario){
    formulario.cpf = document.getElementById('cpf');
    formulario.bairro = document.getElementById('bairro');
    formulario.endereco = document.getElementById('endereco')
    formulario.cidade = document.getElementById('cidade');
    formulario.estado = document.getElementById('estado');
    formulario.celular = document.getElementById('celular');
    formulario.required = document.querySelectorAll(".required");
    formulario.invalidElement = document.querySelector("span");
})(formulario);

function validatecpf(cpf) {
    if (cpf.length != 11) return false;

    let numbers = cpf.substring(0, 9)
    let entry = cpf.substring(9)
    let sum = 0;
    for (let i = 10; i > 1; i--) {
        sum += numbers.charAt(10 - i) * i;
    }

    var result = (sum % 11) < 2 ? 0 : 11 - (sum % 11);

    if (result != entry.charAt(0)) {
        return false;
    }
    sum = 0;
    numbers = cpf.substring(0, 10);

    for (let k = 11; k > 1; k--) {
        sum += numbers.charAt(11 - k) * k;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return result != entry.charAt(1) ? false : true
}

function validate() {
    const cpf = formulario.cpf.value.replace(/[^a-z0-9 ]/g, "")
    const requiredInputs = formulario.required;
    let inputIsValid = false;
    const cpfIsValid = validatecpf(cpf);

    for (let i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "")  {
            requiredInputs[i].style["border"] = "1px solid red"
            inputIsValid = false;
        } else {
            inputIsValid = true
            requiredInputs[1].style["border"] = "none"
            formulario.invalidElement.style["display"] = "none"
            requiredInputs[i].style["border"] = "none"
        }
    }

    if (!inputIsValid || !cpfIsValid) {
        window.alert("Opss! Aconteceu um erro no seu cadastro, verifique se você preencheu todos espaços necessários")
        cpfIsValid ? (
            requiredInputs[1].style["border"] = "none",
            formulario.invalidElement.style["display"] = "none"
        ) : (
            requiredInputs[1].style["border"] = "1px solid red",
            formulario.invalidElement.style["display"] = "inline"
        );
        return false
    }
    else if (cpfIsValid && inputIsValid) window.alert("Parabéns!! você foi cadastrado com sucesso")
    return true
}
function clearCepInputs() {
    formulario.endereco.value = ("");
    formulario.bairro.value = ("");
    formulario.cidade.value = ("");
    dformulario.estado.value = ("");
}

function retrievingCepInputs(cepInputs) {
    if ('erro' in cepInputs) {
        clearCepInputs();
        alert("CEP não encontrado.");
        return;
    }
    formulario.endereco.value = (cepInputs.logradouro);
    formulario.bairro.value = (cepInputs.bairro);
    formulario.cidade.value = (cepInputs.localidade);
    formulario.estado.value = (cepInputs.uf);
}

function searchCep(valor) {

    const cep = valor.replace(/\D/g, '');

    if (cep === "")  {
        clearCepInputs(); 
        return;
    }

    const validateCep = /^[0-9]{8}$/;
    if (! validateCep.test(cep)) {
        clearCepInputs();
        alert("Formato de CEP inválido.");
        return;
    } 

    const script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=retrievingCepInputs';
    document.body.appendChild(script);

};

function cpfMask() {
    const length = formulario.cpf.value.length;
    if (length === 3 || length === 7)
        formulario.cpf.value = formulario.cpf.value + ".";
    else if (length === 11)
        formulario.cpf.value = formulario.cpf.value + "-";
    else if (length===14) length = 0
}

function phoneMask() {
    const length = formulario.celular.value.length;
    switch (length) {
        case 0:
            formulario.celular.value = '('
            break
        case 3:
            formulario.celular.value += ')'
            break
        case 5:
            formulario.celular.value += ' ';
            break
        case 10:
            formulario.celular.value += '-'
            break
        case 15:
            i = 0
    }
}