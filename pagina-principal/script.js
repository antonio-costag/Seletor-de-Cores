var texto = document.getElementById('texto')
var cor = document.getElementById('cor')
var ico_copiar = document.getElementById('copiar')
var random_bt = document.getElementById('random')
var tipo_bt = document.getElementById('tipo_cor')
var linha = document.getElementById('linha')
var caixa_bt = document.getElementById('botoes')

texto.value = RgbParaHexadicimal(window.getComputedStyle(cor).backgroundColor)

random_bt.addEventListener('mouseover', ()=>{
    random_bt.style.backgroundColor = "#cfd1d7bb"
    tipo_bt.style.backgroundColor = "#ffffff00"
    linha.style.backgroundColor = "#ffffff00"
})
random_bt.addEventListener('click', ()=>{
    var nova_cor = CorHandom()

    if(tipo_bt.innerHTML == '<p>Rgb</p>'){
        texto.value = RgbParaHexadicimal(nova_cor)
    }
    else{
        texto.value = CorHandom()
    }

    cor.style.backgroundColor = texto.value
})
tipo_bt.addEventListener('mouseover', ()=>{
    tipo_bt.style.backgroundColor = "#cfd1d7bb"
    random_bt.style.backgroundColor = "#ffffff00"
    linha.style.backgroundColor = "#ffffff00"
})
tipo_bt.addEventListener('click', ()=>{
    var cor_tratamento = window.getComputedStyle(cor).backgroundColor

    if(tipo_bt.innerHTML == '<p>Rgb</p>'){
        tipo_bt.innerHTML = '<p>Hexa</p>'
        texto.value = cor_tratamento

        texto.style.width = '270px'
        texto.style.marginLeft = '14px'
    }
    else{
        tipo_bt.innerHTML = '<p>Rgb</p>'
        texto.value = RgbParaHexadicimal(cor_tratamento)

        texto.style.width = '120px'
        texto.style.marginLeft = '85px'
    }
})
caixa_bt.addEventListener('mouseout', ()=>{
    tipo_bt.style.backgroundColor = "#ffffff00"
    random_bt.style.backgroundColor = "#ffffff00"
    linha.style.backgroundColor = "#cfd1d7bb"
})
texto.addEventListener('keyup', ()=>{
    AjustarTamanho()
    cor.style.backgroundColor = texto.value
})
texto.addEventListener('keydown', ()=>{
    AjustarTamanho()
})
texto.addEventListener('mouseout', ()=>{
    var cor_tratamento = window.getComputedStyle(cor).backgroundColor

    if(tipo_bt.innerHTML == '<p>Rgb</p>'){
        texto.value = RgbParaHexadicimal(cor_tratamento)
    }
    else{
        texto.value = cor_tratamento
    }
})
cor.addEventListener('click', ()=>{
    navigator.clipboard.writeText(texto.value)
    //navigator: fornece informações do navegador
    //clipboard: representa a area de transferencia do sistema
    //writeText: grava uma string na area de tranferencia
    ico_copiar.style.backgroundImage = "url(img/copiado.png)"
    texto.style.outline = "auto"
})
cor.addEventListener('mouseover', ()=>{
    if(tipo_bt.innerHTML == '<p>Rgb</p>'){
        cor.style.backgroundColor = texto.value + "cc"
    }
    else{
        cor.style.backgroundColor = RgbParaHexadicimal(texto.value) + "cc"
    }
    ico_copiar.style.backgroundImage = "url(img/copiar.png)"
})
cor.addEventListener('mouseout', ()=>{
    cor.style.backgroundColor = texto.value
    ico_copiar.style.backgroundImage = "none"
    texto.style.outline = "0"
})
function RgbParaHexadicimal(rgb){
    var vermelho = ""
    var verde = ""
    var azul = ""

    for(i = 4; i < rgb.length; i++){
        if(isNaN(rgb[i]) == false){
            vermelho += rgb[i]
        }
        else{
            i = 20
        }
    }
    for(i = 6 + vermelho.length; i < rgb.length; i++){
        if(isNaN(rgb[i]) == false){
            verde += rgb[i]
        }
        else{
            i = 20
        }
    }
    for(i = 8 + vermelho.length + verde.length; i < rgb.length; i++){
        if(isNaN(rgb[i]) == false){
            azul += rgb[i]
        }
        else{
            i = 20
        }
    }
    return "#" + Hexadecimal(parseInt(vermelho)) + Hexadecimal(parseInt(verde)) + Hexadecimal(parseInt(azul))
}
function Hexadecimal(cor){
    var letas = ['A', 'B', 'C', 'D', 'D', 'F']
    var valor_1 = Math.trunc(cor / 16)
    var valor_2 = cor % 16
    
    if(valor_1 > 9){
        valor_1 = letas[valor_1 - 10]
    }
    if(valor_2 > 9){
        valor_2 = letas[valor_2 - 10]
    }
    return valor_1.toString() + valor_2.toString()
}
function CorHandom(){
    return 'rgb(' + NumHandom() + ', ' + NumHandom() + ', '+ NumHandom() + ')'
}
function NumHandom(){
    return Math.floor(Math.random() * (255 - 1 + 1)) + 1;
}
function AjustarTamanho(){
    if(tipo_bt.innerHTML == '<p>Rgb</p>'){
        if(texto.value.length >= 8){
            texto.value = texto.value.substring(0, texto.value.length - 1);
        }
    }
    else{
        if(texto.value.length >= 19){
            texto.value = texto.value.substring(0, texto.value.length - 1);
        }
    }
}
