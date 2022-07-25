let canvas=document.querySelector(".canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
let tool=canvas.getContext("2d");


let pencolor="black";
tool.strokeStyle=pencolor;
let eracolor="white";


let download=document.querySelector(".download");
let lineTool=document.querySelector(".line");
let rectTool=document.querySelector(".rect");
let red=document.querySelector(".red");
let blue=document.querySelector(".blue");
let green=document.querySelector(".green");
let pencilvalue=document.querySelector(".pencilinput");
let eraservalue=document.querySelector(".eraserinput");

let penwidth=pencilvalue.value;
let erawidth=eraservalue.value;
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");
let urlarr=[];
let idx=0;

let ctool =pencil;
eraservalue.addEventListener("click",(e)=>{
    erawidth=eraservalue.value;
    tool.lineWidth=erawidth;   
})
pencilvalue.addEventListener("click",(e)=>{
    penwidth=pencilvalue.value;
    tool.lineWidth=penwidth;
})
tool.lineWidth=penwidth;
lineTool.addEventListener("click",(e)=>{
   return ctool=lineTool;
})
rectTool.addEventListener("click",(e)=>{
    return ctool=rectTool;
})
pencil.addEventListener("click",(e)=>{
    return ctool=pencil;
})
eraser.addEventListener("click",(e)=>{
    if(eraserflag){
    tool.strokeStyle=eracolor;
    tool.lineWidth=erawidth;
    console.log(tool.lineWidth);
    ctool=pencil;
    }
    else{
      tool.strokeStyle=pencolor;
      tool.lineWidth=penwidth;
    }
})
    let startX,startY,endX,endY;
    let drawingboard=false;
    canvas.addEventListener("mousedown",(event)=>{
         startX=event.clientX;
         startY=event.clientY;
         if(ctool==pencil ){
            drawingboard=true;
            tool.beginPath();
            tool.moveTo(startX,startY);
         }
    })
    canvas.addEventListener("mouseup",(event)=>{
         endX=event.clientX;
         endY=event.clientY;
    if(ctool==lineTool){
    tool.beginPath();
    tool.moveTo(startX,startY);
    tool.lineTo(endX,endY);
    tool.stroke();
    console.log("linedrawn");
    }
    else if(ctool==rectTool){
        let w=endX-startX;
        let h=endY-startY;
        tool.beginPath();
     
        tool.rect(startX, startY, w, h);
        tool.stroke();
    }
    else{
        drawingboard=false;
       
    }

    let url=canvas.toDataURL();
    urlarr.push(url);
    idx=urlarr.length-1;


    })
    canvas.addEventListener("mousemove",(e)=>{
        if(ctool==pencil){
            if(drawingboard==false){
                return;
            }
            else{
                 endX=e.clientX;
                 endY=e.clientY;
                 tool.lineTo(endX,endY);
                 tool.stroke();
            }
        }
    })

   
    
    red.addEventListener("click",(e)=>{
       pencolor="red";
       tool.strokeStyle=pencolor;
    })
    blue.addEventListener("click",(e)=>{
        pencolor="blue";
        tool.strokeStyle=pencolor;
    })
    green.addEventListener("click",(e)=>{
        pencolor="green";
        tool.strokeStyle=pencolor
    })
    
download.addEventListener("click",(e)=>{
    let url=canvas.toDataURL();
    let a=document.createElement("a");
    a.href=url;
    a.download="canvas.jpg";
    a.click();
})

// now redo nad undo
undo.addEventListener("click",(e)=>{
    
    if(idx>=0){
    idx--;
    drawimg(urlarr,idx);
    
    }
})
redo.addEventListener("click",(e)=>{
    if(idx<=urlarr.length-1){
      idx++;
      drawimg(urlarr,idx);
    }
})

function drawimg(urlarr,idx){
    console.log(urlarr[idx]);
    let url=urlarr[idx];
    
   
    
  
    let img=new Image();
    img.src=url; 
    img.addEventListener("load",(e)=>{
        tool.drawImage(img,canvas.width,canvas.height);
    })
    
}
