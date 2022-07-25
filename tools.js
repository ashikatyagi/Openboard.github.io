let menu = document.querySelector(".menu");
let menuflag = true;
let tools_cont = document.querySelector(".toolscontainer");
let pencil_tool = document.querySelector(".pencil-tool-cont");
let eraser_tool = document.querySelector(".eraser-cont");
let pencil = document.querySelector(".pencil");
let pencilflag = false;

let eraser = document.querySelector(".eraser");
let eraserflag = false;

let notepad = document.querySelector(".notepad");

let upload = document.querySelector(".upload");


menu.addEventListener("click", function (e) {
    menuflag = !menuflag;


    if (menuflag) {
        let elementicon = menu.children[0];
        elementicon.classList.remove("fa-times");
        elementicon.classList.add("fa-bars");
        tools_cont.style.display = "flex";


    }
    else {
        let elementicon = menu.children[0];
        elementicon.classList.remove("fa-bars");
        elementicon.classList.add("fa-times");
        tools_cont.style.display = "none";
        pencil_tool.style.display = "none";
        eraser_tool.style.display = "none";
    }

})
pencil.addEventListener("click", function run() {
    pencilflag = !pencilflag;
    if (pencilflag) {
        pencil_tool.style.display = "flex";
    }
    else {
        pencil_tool.style.display = "none";
    }
    
    
})
eraser.addEventListener("click", function run() {
    eraserflag= !eraserflag; 
    if (eraserflag) {
        eraser_tool.style.display = "flex";
    }
    else {
        eraser_tool.style.display = "none";
    }
    
  
})
notepad.addEventListener("click", function run() {
    let divcontent = `
    <div id="sticky" class="notepad-cont" draggable="true" ondragstart="drag(event)">
    <div class="header">
        <div class="minimize">
            <i class="fa fa-window-minimize"></i>
        </div>
        <div class="cancel">
            <i class='fas fa-times'></i>
        </div>
    </div>
    <div class="pad">
       <textarea class="textarea" name="text"></textarea>
        
    </div>
    </div>`;
    createsticky(divcontent);
})
upload.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let divcontent = `
        <div id="sticky" class="notepad-cont" draggable="true" ondragstart="drag(event)">
        <div class="header">
            <div class="minimize">
                <i class="fa fa-window-minimize"></i>
            </div>
            <div class="cancel">
                <i class='fas fa-times'></i>
            </div>
        </div>
        <div class="pad">
           <img class="imginsticky" src="${url}" alt=""></img>
            
        </div>
        </div>`;
        createsticky(divcontent);

    })
})
function createsticky(divcontent) {
    let createle = document.createElement("div");
    createle.setAttribute("class", "notepad-cont");
    createle.innerHTML = divcontent;
    document.body.appendChild(createle);
    let minimize = createle.querySelector(".minimize");
    let cancel = createle.querySelector(".cancel");
    minimizeorremove(minimize, cancel, createle);

    createle.onmousedown = function (e) {
        draganddrop(createle, e)
    };

    createle.ondragstart = function () {
        return false;
    };
}

function draganddrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;


    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}
function minimizeorremove(minimize, cancel, createle) {
    minimize.addEventListener("click", (e) => {
        let pad = createle.querySelector(".pad");

        let displayy = getComputedStyle(pad).getPropertyValue("display");

        if (displayy == "none") {
            pad.style.display = "block";
        }
        else {
            pad.style.display = "none"
        }

    })
    cancel.addEventListener("click", (e) => {
        createle.remove();
    })

}
