let canvas;
let ctx;
let stroke = 15;
let currentTool;
let penColour = 'black';
let backgroundColour = 'white';
let isMouseDown = false;
let drawnPoints = [];

function selectTool(toolName) {
    const allTools = document.getElementsByClassName("toolbox")[0];
    for (const tool of allTools.children) {
        if (tool.className === "selected") {
            tool.className = "";
        }
    }
    const selectedTool = document.getElementById(toolName);
    selectedTool.className = "selected";
}

function getCurrentTool() {
    return document.getElementsByClassName("selected")[0].id;
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = backgroundColour;
}    
    addEventListener('mousedown', (e) => {
        currentPosition = getMousePos(e);
        isMouseDown = true;
        currentTool = getCurrentTool();
        if (currentTool === "brush") {
            ctx.moveTo(currentPosition.x, currentPosition.y);
            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.lineCap = 'round';
            ctx.strokeStyle = penColour;
        }    
        else if (currentTool === "eraser") {
            ctx.moveTo(currentPosition.x, currentPosition.y);
            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.lineCap = 'round';
            ctx.strokeStyle = backgroundColour;
        }
    })
    addEventListener('mousemove', (e) => {
        console.log("draw");
        currentPosition = getMousePos(e);
        currentTool = getCurrentTool();
        if (isMouseDown && currentTool === "brush") {
            ctx.lineTo(currentPosition.x, currentPosition.y);
            ctx.stroke();
        }
        else if (isMouseDown && currentTool === "eraser") {
            ctx.lineTo(currentPosition.x, currentPosition.y);
            ctx.stroke();
        }
    })
    addEventListener('mouseup', (e) => {
        console.log("no click");
        isMouseDown = false;
    })


function getMousePos(e) {
    let canvas_bounds = canvas.getBoundingClientRect();
    return {
        x: e.clientX - canvas_bounds.left,
        y: e.clientY - canvas_bounds.top
    };
}





 