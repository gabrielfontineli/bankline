const validatecpf = (cpf) => {
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


    const cpf = document.getElementById("cpf").value.replace(/[^a-z0-9 ]/g, "")
    const validInputs = document.querySelectorAll(".required")
    let inputIsValid = validatecpf(cpf)
    const cpfIsValid = validatecpf(cpf)

    for (i = 0; i < validInputs.length; i++) {
        if (validInputs[i].value === "") validInputs[i].style["border"] = "1px solid red"
    }
    for (i = 0; i < validInputs.length; i++) {
        if (validInputs[i].value === "") inputIsValid = false;
        else {
            inputIsValid = true
            validInputs[1].style["border"] = "none"
            document.querySelector("span").style["display"] = "none"
            validInputs[i].style["border"] = "none"
        }
    }

    if (!inputIsValid || !cpfIsValid) {
        window.alert("Opss! Aconteceu um erro no seu cadastro, verifique se você preencheu todos espaços necessários")
        cpfIsValid ? (
            validInputs[1].style["border"] = "none",
            document.querySelector("span").style["display"] = "none"
        ) : (
            validInputs[1].style["border"] = "1px solid red",
            document.querySelector("span").style["display"] = "inline"
        );
        return false
    }
    else if (cpfIsValid && inputIsValid) window.alert("Parabéns!! você foi cadastrado com sucesso")
    return true
}
function clearCepInputs() {
    document.getElementById('endereco').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('estado').value = ("");
}

function retrievingCepInputs(cepInputs) {
    if ('erro' in cepInputs) {
        clearCepInputs();
        alert("CEP não encontrado.");
    }
    else {
        document.getElementById('endereco').value = (cepInputs.logradouro);
        document.getElementById('bairro').value = (cepInputs.bairro);
        document.getElementById('cidade').value = (cepInputs.localidade);
        document.getElementById('estado').value = (cepInputs.uf);
    }
}

function searchCep(valor) {

    const cep = valor.replace(/\D/g, '');

    if (cep === "") clearCepInputs();
    else {
        const validateCep = /^[0-9]{8}$/;
        if (validateCep.test(cep)) {
            let script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=retrievingCepInputs';
            document.body.appendChild(script);

        } else {
            clearCepInputs();
            alert("Formato de CEP inválido.");
        }
    }
};
function cpfMask() {
    let i = document.getElementById("cpf").value.length;
    if (i === 3 || i === 7)
        document.getElementById("cpf").value = document.getElementById("cpf").value + ".";
    else if (i === 11)
        document.getElementById("cpf").value = document.getElementById("cpf").value + "-";
    else if (i===14) i = 0
    }

function phoneMask() {
    let i = document.getElementById('celular').value.length;
    switch (i) {
        case 0:
            document.getElementById('celular').value = '('
            break
        case 3:
            document.getElementById('celular').value += ')'
            break
        case 5:
            document.getElementById('celular').value += ' ';
            break
        case 10:
            document.getElementById('celular').value += '-'
            break
        case 15:
            i = 0
            break
    }
}

