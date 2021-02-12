/////////////////////////VARIABLES/////////////////////////
const $startTest = document.querySelector('#buttonStartTest');
const $welcomeMsj = document.querySelector('.welcomeMsj');
const $questionSeries = document.querySelector('#questionSeries');
const $yesButton = document.querySelector('#yesButton');
const $noButton = document.querySelector('#noButton');
const $centrosBienestarRespiratorio = document.querySelector('.centrosBienestarRespiratorio');
const $svgIcono = document.querySelector('.svgIcono');


//elementos a reemplazar en el DOM
const $question = document.querySelector('#question');
const $imgSymptom = document.querySelector('#imgSymptom');
const $marcador = document.querySelector('.marcador');
const $initialMsj = document.querySelector('.initialMsj');
const $finalMsj = document.querySelector('.finalMsj');
const $imgFinal =document.querySelector('.imgFinal');
const $tempLoader = document.querySelector('#tempLoader');
const $svgMapa=document.querySelector('.svgMapa');


//resultados 
const A = 'Sospechoso asintomático';
const B = 'Paciente sospechoso';
const C = 'Paciente con complicaciones severas'
const D = 'Paciente crítico';

let marcador = 0;
let i=0;
let ifYesClick;


/////////////////////////CLASES/////////////////////////
class Symptom{
    constructor(index, question, nameImg, value){
        this.index = index;
        this.question = question;
        this.nameImg = nameImg;
        this.value = value;
 
    }
    
    updateElement(){
        
        $question.innerHTML=`${this.index}. ${this.question}`;
        $imgSymptom.src= `image/${this.nameImg}.png`;
        
            

    }
}
/////////////////////////FUNCIONES/////////////////////////
function endTest(){
    console.log(i);
    if(i>10){
        if(marcador>=91){
            giveAdvice(D,'Urgente realizar hisopado, confirmación de datos y traslado a Cuerpo de Bomberos Municipales','123.svg',false);
        }else if(marcador>=71){
            giveAdvice(C,'Acude a cualquiera de los Centros de Bienestar Respiratorio:','tel.svg',true);
        }else if(marcador>=16){
            giveAdvice(B,'Si presentas algún síntoma adicional te recomendamos realizar la evaluación nuevamente. Utiliza mascarilla de forma adecuada, lávate las manos con jabón y gel antibacterial y evita salir de casa si no es necesario.','tel.svg',false);
        }else if(marcador>0){
            giveAdvice(A,'Informate al:','tel.svg',false);
        }else{
            giveAdvice('No presentas algún síntoma','Sigue cuidandote, para mayor informacion puedes contactar a los Centros de Bienestar Respiratorio ','tel.svg', false);
        }
    }
}


function giveAdvice(result,advice, image, isMap){
    setTimeout(()=>{
        $welcomeMsj.style.display ='block';
        $questionSeries.style.display='none';
        $welcomeMsj.removeChild($startTest);
    
        $initialMsj.innerHTML = result;
        $finalMsj.style.display='grid';
        
        $finalMsj.innerHTML = advice;
        
        if(isMap){
            $svgMapa.setAttribute('src','image/mapa.svg');
            $svgMapa.onload=() => {

                $svgMapa.style.display = 'block';
                $centrosBienestarRespiratorio.style.display = "grid";
            }

        }else{
            $imgFinal.setAttribute('src',`image/${image}`);
            $imgFinal.onload = ()=>{
                $imgFinal.style.display = 'block';
                $svgIcono.style.display='block';

            }
        }


    },500);

}

function updateMarcador(ifYesClick){
    if(ifYesClick){
        marcador += symptoms[i].value;
    }
    
    $tempLoader.setAttribute('width',marcador);
    $marcador.innerHTML = `${marcador}%`;
    i++;
    
}



const symptoms = [ 
    new Symptom(1, '¿Has viajado en los últimos 8 días?','1_viaje',5),
    new Symptom(2, '¿Tuviste contacto con algún contagiado?','2_contactoContagiado',6),
    new Symptom(3, '¿Has sido declarado en estado de cuarentena?','3_declaradoCuarentena',5),
    new Symptom(4, '¿Presentas dolor de cabeza?','4_dolorDeCabeza',8),
    new Symptom(5, '¿Presentas temperatura mayor a 38°?','5_temperaturaMayorA38',18),
    new Symptom(6, '¿Presentas dolor de garganta?','6_dolorDeGarganta',12),
    new Symptom(7, '¿Presentas tos?','7_tos',12),
    new Symptom(8, '¿Presentas dificultad para respirar?','8_dificultadParaRespirar',12),
    new Symptom(9, '¿Presentas disminución en la percepción de olores y sabores?','9_disminucionOlorYSabor',6),
    new Symptom(10, '¿Presentas diarrea?','10_diarrea',8),
    new Symptom(11, '¿Sientes cansancio?','11_cansancio',8),
]


/////////////////////////EVENTOS/////////////////////////
$startTest.onclick = function(){
    $welcomeMsj.style.display='none';
    $questionSeries.style.display='grid';
    symptoms[i].updateElement();
    
    
}

$yesButton.onclick = function(){
    updateMarcador(true);
    endTest();
    if(i<symptoms.length){
        symptoms[i].updateElement();
    }
   
    


}
$noButton.onclick =function(){
    updateMarcador(false);
    endTest();
    if(i<symptoms.length){
        symptoms[i].updateElement();
    }

}

