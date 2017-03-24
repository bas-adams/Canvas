/*test js*/

function drawText(ctx, text, color, stroke){
  var x = 5,
      y = 0.1;
  function drawTextAnimation(){
    ctx.clearRect(600,180,750,280);
    ctx.save();
    ctx.translate(650, 280);
    ctx.lineWidth = 1;
    ctx.globalAlpha = y; 
    ctx.lineJoin = 'round';
    ctx.textBaseline = 'middle';
    ctx.font = x+"px Verdana";
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 2;
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.strokeStyle = stroke;
    ctx.strokeText(text, 0, 0);
    ctx.restore();  
    x += 5;
    y += 0.1
  }

  var animationText = setInterval(drawTextAnimation, 80);
  setTimeout( function(){
    clearInterval(animationText);
    undisableBtn();
  } ,1000);

}

function disableBtn() {
    document.getElementById("button").disabled = true;
}

function undisableBtn() {
    document.getElementById("button").disabled = false;
}

function selectFunction(e){
  if(selectOpt.value !== 'choose'){
    undisableBtn();
  } else{
    disableBtn();
  }
}

function AJAX_JSON_Req( url){
    
    var AJAX_req = new XMLHttpRequest();
    AJAX_req.open( "GET", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/json");
    AJAX_req.onreadystatechange = function(){
      initCanvas(AJAX_req); 
    }
    AJAX_req.send();
    
}
 
function initCanvas(AJAX_req){
  if( AJAX_req.readyState == 4 && AJAX_req.status == 200 ){
    var response = JSON.parse(AJAX_req.responseText),
        objs =  response.data;

    var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      cW = ctx.canvas.width,
      cY = ctx.canvas.height,
      startAnimate = document.querySelector('#button'),
      selectOpt = document.querySelector('#selectOpt'),
      x = 0,
      y = 0,
      loteryImg = new Image(),
      nameNumber = Math.floor((Math.random() * 6 ));
  
 
  loteryImg.addEventListener("load", function(){
    ctx.drawImage(loteryImg, 200, 150); 
  },false);
  
  loteryImg.src = objs[nameNumber]['icon'];
  
  disableBtn();

  selectOpt.addEventListener('click', selectFunction, false);
  button.addEventListener('click', function(){
     var random2 = Math.floor((Math.random() * 6 ) );

     ctx.clearRect(600,180,750,280);
       function animate(random2){
       
        disableBtn();
        ctx.clearRect(200,150,250,180);
        loteryImg.src = objs[random2]['icon'];
      }
      
      var animateInterval = setInterval(animate(random2), 10);     
        setTimeout(function(){
          clearInterval(animateInterval);

        if(response.data[random2]['name'] === selectOpt.value){
          drawText(ctx, 'You win', '#e08612', '#ffffff');

        }else{
          drawText(ctx, 'You lose', '#38dc22', '#0f5f04');
        }
        }, 500);
        

    }, false); 
  }
  
}


window.addEventListener('load', function(event){
   AJAX_JSON_Req('data.json');
},false);




