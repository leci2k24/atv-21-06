//declarar as variaveis para armazenar a posicao do meu botao "no"
let topMod = 0;
let leftMod = 0;
/*adicionando um evento ao corpo da pagina (body) pra que
a funcao do botao (webHandler) seja chamada quando o mouse se mover */
$("body").on("mousemove", webHandler);
//criar a funcao webHandler (para versao no desktop)
function webHandler(event){
    //definindo posicao inicial do botal
    let button = $('#no').position();
    //calculando o centro do botao
    let buttonCenter = {
        //colocando uma margem extra de 100px de largura e 40px de altura
        x: button.left + 30,
        y: button.top + 10
    }
    //calcular a distancia entre o cursor do mouse e o centro do botao
    // Math.sqrt(x) raiz quadrada do x
    //Math.pow(base, expoent): eleva a base ao expoente expecificado
    let distance = Math.sqrt(Math.pow(event.pageX - buttonCenter.x, 2))
    //verificar se o mouse esta a menos de 80 px do botao
    if (distance < 80){
        var angle = calculateAngle (event, buttonCenter, distance)
            //se o mouse está proximo do botao, a funcao calculateAngle é chamada pra calcular
            //o seno e cos baseado na posicao do mouse em relacao ao botao
            //pra que ele saia de perto
            leftMod += 10 * angle.cos * (event.pageX < buttonCenter.x ? 1 : -1)
            /*Verificando  a posicao horizontal do mouse, se esta a direita, ele vai se deslocar
            para a esquerda, se esta a esquerda do botao, ele retorna 1 e se esta a direita, ele retorna -1
            e se move no valor do angulo atual (calculado pelo calculateAngle vezes 10)
            */
           topMod += 10 * angle.sin * (event.pageY < buttonCenter.y ? 1 : -1)
           //colocar uma nova posicao no botao a partir de css com os valores definidos pelas funcoes
           $('#no').css({top: topMod, left: leftMod, position: 'relative'})
        }
    }

    //criando funcao que vai calcular de fato o seno e o cosseno
    function calculateAngle(mouse, center, distance){
        //Math.abs retorna um valor absoluto, garantindo que nao tenha valores negativos
        let sin = Math.abs(mouse.pageY - center.y)/distance
        let cos = Math.abs(mouse.pageX - center.x) / distance
        return {sin: sin, cos: cos}
    }