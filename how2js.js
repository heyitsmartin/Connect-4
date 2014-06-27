//Connect four 
//Learning how to javascript 




document.addEventListener('DOMContentLoaded',domloaded,false);

function domloaded(){
    var board = create2dArray(7,6);
    var c = document.getElementById("theCanvas");
    var cDraw = c.getContext("2d");
    var currentCol =-1; 
    var turn = 0 ; 
    var rect = c.getBoundingClientRect(); 
    var count = 0 ;
    
    
    function piece(startx,starty) { 
        this.startx= startx;
        this.starty=starty;
        this.height = 1000/6; 
        this.width = 1500/7;
        this.drawInt = drawSqaure;
        this.team = -1; 
        this.xcoord= 0; 
        this.ycoord=0; 
        this.fillSqaure = colorSpace;
        this.whereAmI=whereamI;
        
    }
    function whereamI() { 
        return this.xcoord, this.ycoord;
    }
    function drawSqaure() { 
        cDraw.rect(this.startx ,this.starty,this.width ,this.height);
    }
    //determines color/draws color 
    function colorSpace(){ 
        cDraw;
        if(this.team==0){ 
            cDraw.fillStyle="#FF9933";
        }else if (this.team == 1) { 
            cDraw.fillStyle="#00FFEF";
        }else{
            return "no team associated"; 
        }
        cDraw.fillRect(this.startx ,this.starty,this.width ,this.height);
        cDraw.fillStyle = "#000000";
    }
   
    //create 2d array cause apparently js doesnt have that...
    
    function create2dArray (x,y) { 
        var arr = new Array(x);
        for(var i=0;i<x;i++) { 
            arr[i] = new Array(20); 
        }
        return arr; 
    }
    //Mouse setup 
    function getMouse(canvas, event) { 
        return { 
            x:event.clientX-rect.left,
            y:event.clientY - rect.top
        }; 
    }
    //when mouse clicks 
    function onClickCanvas(event) { 
        var x = event.clientX-c.getBoundingClientRect().left; 
        var y = event.clientY-c.getBoundingClientRect().top; 
        console.log("x: "+x + " y: "+y);
        count = checkWin(mouseCol(x),placePiece(mouseCol(x),board));
        
        if(count >= 4) { 
            if( turn == 1 ) { 
                var win = "Orange"; 
            }else { 
                var win = "Blue";
            }
           if( window.confirm("Congrats, "+win+" wins!\n Start a new game?")){
              newGame();
            }else { 
                c.removeEventListener("mousedown", onClickCanvas, false);
                window.alert("Refresh the page to restart!");
                console.log("GAME OVER YO.");
    
            }
        }
        drawCanvas();
        
        
    }
    //Checks first empty space in array 
    function placePiece(x,board){ 
        
        if(board[x][0].team != -1 ) { 
            console.log("Column is full");
        }else { 
            for(var i = 5; i>-1; i--) { 
                if(board[x][i].team == -1) {
                    board[x][i].team=turn;
                    board[x][i].fillSqaure();
                    changeTurn();
                    
                   
                    console.log(x,i);
                    return i;
                    break;
                }    
            }
            
        }
        
    }
    //change turn 
    function changeTurn(){
            if(turn == 0 ) { 
                turn = 1;
            }else if( turn ==1){ 
                turn = 0;
            }
    }
    //Where is the mouse? 
    function mouseCol (x) { 
        //check which row its in - report back 
        if(x< 172) {
            //console.log("Col: 0");
            return 0; 
        }else if ( x>172 && x<345){
            //console.log("Col: 1");
            return 1; 
        }else if (x>345 && x<514) {
            //console.log("Col: 2");
            return 2;
        }else if (x>514 && x<686){
            //console.log("Col: 3");
            return 3;
        }else if (x>686 && x<857){
            //console.log("Col: 4");
            return 4; 
        }else if (x>857 && x<1030){
            //console.log("Col: 5");
            return 5;
        }else if (x > 1030) { 
            //console.log("Col: 6");
            return 6; 
        }else { 
            console.log("Something horribly wrong has occured");
            return -1; 
        }
    }
        
    //add event listeners for mouse ~
    
    c.addEventListener('mousemove',function(event){ 
        var mouseloc = getMouse(c, event);
        // if the function is called 
        //currentCol = mouseCol(mouseloc.x);
        
        
    }, false);
    //clear board
    function newGame(){ 
        for(var i=0;i<7;i++){
            for(var j=0; j<6; j++) {
                board[i][j] = new piece( i*1500/7, j*1000/6);
                board[i][j].drawInt();   
                board[i][j].xcoord= i; 
                board[i][j].ycoord= j; 
            }
        }
        cDraw.stroke();

    }
    //fade in rect 
    function fadeInRectangle(x, y, w, h, r, g, b) {
        i = 0.0,
        draw = setInterval(function() {
            cDraw.fillStyle = 'rgba(' +r + ','
                                   + b + ','
                                   + g + ','
                                    + i +  ')';
            cDraw.fillRect(x, y, w, h);
            if(i <=0.01) {
                i=i+.00012;
                console.log(i);
            }else{
                 clearInterval(draw);
            }
        }, 300);
    }
    
    //check for win 
    //Only interesting part, kinda gave up after doing this.
    function checkWin(x,y) { 
        var startx =x;
        var starty=y; 
        var tempx = x ; 
        var tempy = y;
        var count = 1; 
        var go = true; 
        var highc =0; 
        var a = board[startx][starty].team; 
        console.log("Starting position: ({0},{1})", startx,starty);
        for(i=-1; i<=1;i++) {
            for(j=-1; j<=1;j++){
                if(i==0 && j==0) continue;
                
                var i2 = i ;
                var j2= j;
                
                if(x+i2 >6 || y+j2 > 5 || x+i2 <0 || y+j2 < 0) {
                    go =false; 
                }else if(a != board[x+i][y+j].team) continue; 
                
                    while(go){
                        console.log("found position: ({0},{1})", (x+i2),(y+j2));
                        count++; 
                        if(i2<0) i2-- ;
                        if (j2<0) j2 --; 
                        if( j2>0) j2++;
                        if(i2>0)i2++;
                       
                        if(x+i2 >6 || y+j2 > 5 || x+i2 <0 || y+j2 < 0) {
                            go =false; 
                        }else if(a != board[x+i2][y+j2].team) go = false; 
                    }
                
                i2=i;
                j2=j; 
                go = true;
                
                if(x-i2 <0 || y-j2 <0|| x-i2 >6 || y-j2 >5) {
                    go =false; 
                }else if(a != board[x-i2][y-j2].team) go = false; 
                
                    while(go){
                         console.log("2 found position: ({0},{1})", (x-i2),(y-j2));
                        count++; 
                        if(i2<0) i2-- ;
                        if (j2<0) j2 --; 
                        if( j2>0) j2++;
                        if(i2>0)i2++;
                        if(x-i2 <0 || y-j2 <0|| x-i2 >6 || y-j2 >5) {
                            go =false; 
                        }else if(a != board[x-i2][y-j2].team) go = false; 
                    }
                
                
                
            
            }   
            console.log("win count: "+count);
            if( count >= highc){
                highc = count;
            }
                
            count =1;
        }
        
        return highc;
        
        
        
    }
    
    //intital setup of board 
   
    c.addEventListener("mousedown", onClickCanvas, false);
    
    for(var i=0;i<7;i++){
        for(var j=0; j<6; j++) {
            board[i][j] = new piece( i*1500/7, j*1000/6);
            board[i][j].drawInt();   
            board[i][j].xcoord= i; 
            board[i][j].ycoord= j; 
        }
    }
    cDraw.stroke();

    //cDraw.fillRect(10,10,100,100);
    //fadeInRectangle(10, 10, 100, 100, 123, 213, 50);
    //cDraw.fillStyle= 'rgba(123,123,123,0.5)';
    //cDraw.fillRect(100,100,100,100);
    
    
    function drawCanvas() { 
        //clear everything 
        cDraw.clearRect(0,0,c.width,c.height)
        //draw everything
        

        for(var i=0;i<7;i++){
            for(var j=0; j<6; j++) {
                board[i][j].fillSqaure();
                board[i][j].drawInt();   
            }
            
        
        }
        
        
      
        cDraw.stroke();
    }
    

}


 