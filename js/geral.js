//TOOLTIP BOOTSTRAP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


//MENU ADICIONA CLASSE NO MENU CLICADO
var menuLink = document.querySelectorAll(".nav-link");
var urlAncora = window.location.hash.substring(1);

function linkAction() {
    menuLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    //fecha menu mobile
    document.querySelector(".navbar-collapse").classList.remove("show")
}
menuLink.forEach(n => n.addEventListener('click', linkAction))


//MENU SELECIONA CONFORME ATUAL URL AO CARREGAR PÁGINA
window.onload = function () {
    menuLink.forEach(function (linques) {
        linques.classList.remove("active");
        if (linques.dataset.ancora == urlAncora) {
            linques.classList.add("active")
        }
    });
};


//MENU MUDA ATIVO NA ROLAGEM (sem click menu)
let sections = document.querySelectorAll('section');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 85;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            menuLink.forEach(n => n.classList.remove('active'))
            document.querySelector('.nav-link[href*=' + id + ']').classList.add('active');
        };
        //quando tiver uma área acima da primeira secção
        if (top <= 300) {
            menuLink.forEach(n => n.classList.remove('active'))
        }
    });
};


//MENU FIXAR NO TOPO QUANDO SCROLL PARA CIMA
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
    //atual posição de rolagem
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        //scrolled up
        document.querySelector('nav').classList.remove("menu-updown");
    } else {
        //scrolled down
        document.querySelector('nav').classList.add("menu-updown");
    }
    //atualizar posição de rolagem anterior
    prevScrollPos = currentScrollPos;
});


//IR PARA O TOPO, REMOVE DA URL O TITULO DO MENU e Propaganda
let botSubir = document.querySelector(".subir");
let propaganda = document.querySelector(".devdesign");
window.addEventListener("scroll", (event) => {
    //sumir e aparecer
    let scroll = this.scrollY;
    if (scroll >= 1000) {
        botSubir.classList.add("aparecer")
        propaganda.classList.add("aparecer")
    } else {
        botSubir.classList.remove("aparecer")
        propaganda.classList.remove("aparecer")
    }
});
botSubir.onclick = function () {
    window.scrollTo(0, 0);
    menuLink.forEach(n => n.classList.remove('active'));
    history.pushState("", document.title, window.location.pathname + window.location.search);
};


//DIA E HORA (0 dom e 6 sáb)
//https://stackoverflow.com/questions/15399628/use-javascript-to-print-out-open-or-closed-depending-on-time-of-day-in-real-ti
var checkOpenStatus = function () {
    var d = new Date();
    var hora = d.getHours();
    var dia = d.getDay();

    //var testehora = (hora == 12);
    //var testdia = (dia == 6)

    if ((hora > 7) && (hora < 12) && (dia > 0) && (dia < 6) || (hora > 12) && (hora < 18) && (dia > 0) && (dia < 6)) {
        escreve = "<b style=\"color:#008000\">Aberto</b> - Fecha as 18h";

    } else if ((hora == 12) && (dia >= 1) && (dia <= 5)) {
        escreve = "<b style=\"color:#b30b0b\">Fechado</b> - Retorna as 13h";

    } else if ((hora > 7) && (hora < 13) && (dia == 6)) {
        escreve = "<b style=\"color:#008000\">Aberto</b> - Fecha as 12h";

    } else if (dia == 0) {
        escreve = "<b style=\"color:#b30b0b\">Fechado</b> - Abre amanhã as 8h";

    } else {
        escreve = "<b style=\"color:#b30b0b\">Fechado</b>";
    }

    //console.log(hora + "h Dia" + dia + " Hora:" + testehora + " Dia:" + testdia)

    document.querySelector(".open-close").innerHTML = escreve;
    setTimeout(checkOpenStatus, 30000);
};
checkOpenStatus();


//COPIAR TEXTO
const copiar = document.querySelector(".emailcopiar");

copiar.onclick = function () {
    document.execCommand("copy");
    alert('E-mail copiado!');
}
copiar.addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", copiar.textContent);
    }
});


//LER MAIS
function lerMaisFuncao() {
    var pontinhos = document.getElementById("pontinhos");
    var maisTextos = document.getElementById("mais");
    var btnText = document.getElementById("lermais");

    if (pontinhos.style.display === "none") {
        pontinhos.style.display = "inline";
        btnText.innerHTML = "Ler mais▾";
        maisTextos.style.display = "none";
    } else {
        pontinhos.style.display = "none";
        btnText.innerHTML = "Ler menos▴";
        maisTextos.style.display = "inline";
    }
}

//PROPAGANDA NO SITE
document.querySelector(".bi-x-square").onclick = function () {
    document.querySelector(".devdesign").style.display = "none";
}