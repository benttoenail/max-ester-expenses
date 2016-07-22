/*
BASIC THREE.JS TEMPLATE
Max Rose -->  July 4th, 2016 
INDEPENDANCE DAY 
*/

//Init of camera, scene and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({alpha : true, preserveDrawingBuffer: true});

//Init of Renderer and Canvas
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xf7e6f6, 0);

//Create Lights

//Camera Controls
var controls;
controls = new THREE.OrbitControls( camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

//Ground Helper
var ground = new THREE.GridHelper(10, 0.5, 0xd3d3d3, 0xd3d3d3);
//ground.position.y = - 2;
scene.add(ground);


// -- -- -- DAT GUI -- -- -- \\

var guiControls = new function() {
    this.groupSpacing = 0.01;
    this.barSpacing = 0.01;
}

var datGUI = new dat.GUI({
    height : 5 *32 - 1
});

datGUI.add(guiControls, "groupSpacing", 0, 20);
datGUI.add(guiControls, "barSpacing", 0, 20);

// END DAT GUI \\


//  -- -- --  BAR CHART  -- -- -- \\

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
var expense = ['food', 'utilities', 'out', 'other', 'rent', 'total'];
var groupSpace = 0;

var CreateBar = function( height, spacing, expenseType ) {
    
    var barGeo = new THREE.BoxGeometry(1, 1, 1);
    barGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0, .5, 0));
    
    
    if(expenseType == 'food'){
        var barMat = new THREE.MeshLambertMaterial({color:0xf0f0f0});    
    }else if(expenseType == 'utilities'){
        var barMat = new THREE.MeshBasicMaterial({color:0xfffff});    
    }else if(expenseType == 'out'){
        var barMat = new THREE.MeshBasicMaterial({color:0xe1f25});    
    }else if(expenseType == 'other'){
        var barMat = new THREE.MeshBasicMaterial({color:0x1ef90});    
    }else if(expenseType == 'rent'){
        var barMat = new THREE.MeshBasicMaterial({color:0xff22f});    
    }else if(expenseType == 'total'){
        var barMat = new THREE.MeshBasicMaterial({color:0x2f2f2f});    
    }
    
    
    var barMesh = new THREE.Mesh(barGeo, barMat);
    
    barMesh.position.x = spacing;
    barMesh.scale.y = height;
    
    scene.add(barMesh);
    return barMesh;
}


var bar = CreateBar(1, 2, 'food');
 
scene.add(bar);

// -->  CreateBar V 0.1
var MakeBars = function( count, _groupSpace ) {
    
    for(var i = 0; i<count; i++){
        
        var xPos =  i * _groupSpace;
        
        for(var j = 0; j < expense.length; j++){
        
            var randHeight = Math.random() * 10;
            var _expense = expense[j];
            CreateBar(randHeight, 1.1 * j + xPos, _expense);
        
        }
    }
}


//  END BAR CHART  \\


// -- -- -- UPDATE BAR POSITIONS -- -- -- \\

var UpdateBarPositions = function() {
    
    bar.position.x = guiControls.barSpacing;
    
}

// END UPDATE BAR POSITIONS \\ 
camera.position.z = 5;


//Main Render Function 
var render = function() {
    requestAnimationFrame( render );
    
    controls.update();
    renderer.render(scene, camera);
//    groupSpace = guiControls.groupSpacing;
    UpdateBarPositions();
    
    
}

MakeBars(months.length, 10 );
render();