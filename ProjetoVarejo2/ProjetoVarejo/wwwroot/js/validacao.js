function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function leech(v) {
    v = v.replace(/o/gi, "0")
    v = v.replace(/i/gi, "1")
    v = v.replace(/z/gi, "2")
    v = v.replace(/e/gi, "3")
    v = v.replace(/a/gi, "4")
    v = v.replace(/s/gi, "5")
    v = v.replace(/t/gi, "7")
    return v
}

function soNumeros(v) {
    return v.replace(/\D/g, "")
}

function telefone(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2") //Coloca hífen entre o quarto e o quinto dígitos
    return v
}

function cpf(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}

function data(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, "$1/$2") //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{2})(\d)/, "$1/$2") //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    return v
}


function formataDinheiro(n) {
    return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}


function moeda(v) {
    v = v.replace(/\D/g, "") // permite digitar apenas numero
    v = v.replace(/(\d{1})(\d{14})$/, "$1.$2") // coloca ponto antes dos ultimos digitos
    v = v.replace(/(\d{1})(\d{11})$/, "$1.$2") // coloca ponto antes dos ultimos 11 digitos
    v = v.replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos ultimos 8 digitos
    v = v.replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos ultimos 5 digitos
    v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2") // coloca virgula antes dos ultimos 2 digitos
    return v;
}



function cep(v) {
    v = v.replace(/D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/^(\d{5})(\d)/, "$1-$2") //Esse é tão fácil que não merece explicações
    return v
}

function cnpj(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, "$1.$2") //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2") //Coloca um hífen depois do bloco de quatro dígitos
    return v
}

function romanos(v) {
    v = v.toUpperCase() //Maiúsculas
    v = v.replace(/[^IVXLCDM]/g, "") //Remove tudo o que não for I, V, X, L, C, D ou M
    //Essa é complicada! Copiei daqui: http://www.diveintopython.org/refactoring/refactoring.html
    while (v.replace(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, "") != "")
        v = v.replace(/.$/, "")
    return v
}

function site(v) {
    //Esse sem comentarios para que você entenda sozinho ;-)
    v = v.replace(/^http:\/\/?/, "")
    dominio = v
    caminho = ""
    if (v.indexOf("/") > -1)
        dominio = v.split("/")[0]
    caminho = v.replace(/[^\/]*/, "")
    dominio = dominio.replace(/[^\w\.\+-:@]/g, "")
    caminho = caminho.replace(/[^\w\d\+-@:\?&=%\(\)\.]/g, "")
    caminho = caminho.replace(/([\?&])=/, "$1")
    if (caminho != "") dominio = dominio.replace(/\.+$/, "")
    v = "http://" + dominio + caminho
    return v
}


/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("myInput"), countries);

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function gerarPdf(TituloItem, PrecoAvista, PrecoAPrazo, QTVezes, TxJuros, OutrosEncargos) {
    if (nome) {
        // Youll need to make your image into a Data URL
        // Use http://dataurl.net/#dataurlmaker
        var doc = new jsPDF()
        aux = PrecoAPrazo;
        PrecoAvista = "Preço a vista: "+ PrecoAvista;
        PrecoAPrazo = "Preço a prazo: "+ PrecoAPrazo;
        QTVezes = QTVezes+" vezes de R$"+ aux/QTVezes;
        TxJuros = "Taxa de Juros " + TxJuros+"%";
        OutrosEncargos = "Outros Encargos R$ "+OutrosEncargos;


        //retangulos
        doc.roundedRect(20, 20, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 20, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 20, 50, 30, 1, 1, 'S')

        doc.roundedRect(20, 58, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 58, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 58, 50, 30, 1, 1, 'S')

        doc.roundedRect(20, 95.978, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 95.978, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 95.978, 50, 30, 1, 1, 'S')

        doc.roundedRect(20, 133, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 133, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 133, 50, 30, 1, 1, 'S')

        doc.roundedRect(20, 170, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 170, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 170, 50, 30, 1, 1, 'S')

        doc.roundedRect(20, 208.4, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 208.4, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 208.4, 50, 30, 1, 1, 'S')

        doc.roundedRect(20, 246, 50, 30, 1, 1, 'S')
        doc.roundedRect(79.8, 246.4, 50, 30, 1, 1, 'S')
        doc.roundedRect(140, 246, 50, 30, 1, 1, 'S')
        //TEXTUAI'S'
        doc.setFontSize(10)
        doc.text(25, 25, TituloItem)
        doc.text(25, 29, PrecoAvista)
        doc.text(25, 32.5, PrecoAPrazo)
        doc.text(25, 37, QTVezes)
        doc.text(25, 41.02, TxJuros)
        doc.text(25, 45.5, OutrosEncargos)

        doc.text(83.75, 25, TituloItem)
        doc.text(83.75, 29, PrecoAvista)
        doc.text(83.75, 32.5, PrecoAPrazo)
        doc.text(83.75, 37, QTVezes)
        doc.text(83.75, 41.02, TxJuros)
        doc.text(83.75, 45.5, OutrosEncargos)

        doc.text(144.1, 25, TituloItem)
        doc.text(144.1, 29, PrecoAvista)
        doc.text(144.1, 32.5, PrecoAPrazo)
        doc.text(144.1, 37, QTVezes)
        doc.text(144.1, 41.02, TxJuros)
        doc.text(144.1, 45.5, OutrosEncargos)

        doc.text(25, 63, TituloItem)
        doc.text(25, 67, PrecoAvista)
        doc.text(25, 71, PrecoAPrazo)
        doc.text(25, 75, QTVezes)
        doc.text(25, 79, TxJuros)
        doc.text(25, 83, OutrosEncargos)

        doc.text(83.75, 63, TituloItem)
        doc.text(83.75, 67, PrecoAvista)
        doc.text(83.75, 71, PrecoAPrazo)
        doc.text(83.75, 75, QTVezes)
        doc.text(83.75, 79, TxJuros)
        doc.text(83.75, 83, OutrosEncargos)

        doc.text(144.1, 63, TituloItem)
        doc.text(144.1, 67, PrecoAvista)
        doc.text(144.1, 71, PrecoAPrazo)
        doc.text(144.1, 75, QTVezes)
        doc.text(144.1, 79, TxJuros)
        doc.text(144.1, 83, OutrosEncargos)

        doc.text(25, 101, TituloItem)
        doc.text(25, 105, PrecoAvista)
        doc.text(25, 109, PrecoAPrazo)
        doc.text(25, 113, QTVezes)
        doc.text(25, 117, TxJuros)
        doc.text(25, 121, OutrosEncargos)

        doc.text(83.75, 101, TituloItem)
        doc.text(83.75, 105, PrecoAvista)
        doc.text(83.75, 109, PrecoAPrazo)
        doc.text(83.75, 113, QTVezes)
        doc.text(83.75, 117, TxJuros)
        doc.text(83.75, 121, OutrosEncargos)

        doc.text(144.1, 101, TituloItem)
        doc.text(144.1, 105, PrecoAvista)
        doc.text(144.1, 109, PrecoAPrazo)
        doc.text(144.1, 113, QTVezes)
        doc.text(144.1, 117, TxJuros)
        doc.text(144.1, 121, OutrosEncargos)

        doc.text(25, 138, TituloItem)
        doc.text(25, 142, PrecoAvista)
        doc.text(25, 146, PrecoAPrazo)
        doc.text(25, 150, QTVezes)
        doc.text(25, 154, TxJuros)
        doc.text(25, 158, OutrosEncargos)

        doc.text(83.75, 138, TituloItem)
        doc.text(83.75, 142, PrecoAvista)
        doc.text(83.75, 146, PrecoAPrazo)
        doc.text(83.75, 150, QTVezes)
        doc.text(83.75, 154, TxJuros)
        doc.text(83.75, 158, OutrosEncargos)

        doc.text(144.1, 138, TituloItem)
        doc.text(144.1, 142, PrecoAvista)
        doc.text(144.1, 146, PrecoAPrazo)
        doc.text(144.1, 150, QTVezes)
        doc.text(144.1, 154, TxJuros)
        doc.text(144.1, 158, OutrosEncargos)

        doc.text(25, 175, TituloItem)
        doc.text(25, 179, PrecoAvista)
        doc.text(25, 183, PrecoAPrazo)
        doc.text(25, 187, QTVezes)
        doc.text(25, 191, TxJuros)
        doc.text(25, 195, OutrosEncargos)

        doc.text(83.75, 175, TituloItem)
        doc.text(83.75, 179, PrecoAvista)
        doc.text(83.75, 183, PrecoAPrazo)
        doc.text(83.75, 187, QTVezes)
        doc.text(83.75, 191, TxJuros)
        doc.text(83.75, 195, OutrosEncargos)

        doc.text(144.1, 175, TituloItem)
        doc.text(144.1, 179, PrecoAvista)
        doc.text(144.1, 183, PrecoAPrazo)
        doc.text(144.1, 187, QTVezes)
        doc.text(144.1, 191, TxJuros)
        doc.text(144.1, 195, OutrosEncargos)

        doc.text(25, 214, TituloItem)
        doc.text(25, 218, PrecoAvista)
        doc.text(25, 222, PrecoAPrazo)
        doc.text(25, 226, QTVezes)
        doc.text(25, 230, TxJuros)
        doc.text(25, 234, OutrosEncargos)

        doc.text(83.75, 214, TituloItem)
        doc.text(83.75, 218, PrecoAvista)
        doc.text(83.75, 222, PrecoAPrazo)
        doc.text(83.75, 226, QTVezes)
        doc.text(83.75, 230, TxJuros)
        doc.text(83.75, 234, OutrosEncargos)

        doc.text(144.1, 214, TituloItem)
        doc.text(144.1, 218, PrecoAvista)
        doc.text(144.1, 222, PrecoAPrazo)
        doc.text(144.1, 226, QTVezes)
        doc.text(144.1, 230, TxJuros)
        doc.text(144.1, 234, OutrosEncargos)


        doc.text(25, 251, TituloItem)
        doc.text(25, 255, PrecoAvista)
        doc.text(25, 259, PrecoAPrazo)
        doc.text(25, 263, QTVezes)
        doc.text(25, 267, TxJuros)
        doc.text(25, 271, OutrosEncargos)

        doc.text(83.75, 251, TituloItem)
        doc.text(83.75, 255, PrecoAvista)
        doc.text(83.75, 259, PrecoAPrazo)
        doc.text(83.75, 263, QTVezes)
        doc.text(83.75, 267, TxJuros)
        doc.text(83.75, 271, OutrosEncargos)

        doc.text(144.1, 251, TituloItem)
        doc.text(144.1, 255, PrecoAvista)
        doc.text(144.1, 259, PrecoAPrazo)
        doc.text(144.1, 263, QTVezes)
        doc.text(144.1, 267, TxJuros)
        doc.text(144.1, 271, OutrosEncargos)

        doc.save('Eiqueta.pdf');
    }

}