var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
//设置二维数组用来保存当下了棋子，就不能落子了
var chessBored=[];
for(var i=0;i< 15;i++){
	chessBored[i]=[];
	for(var j=0;j< 15;j++){
	chessBored[i][j]=0;	
		}
	}
//设置二维数组结束
context.strokeStyle="#BFBFBF";
//棋盘水印开始
var logo=new Image();
logo.src="44.jpg";
logo.onload=function(){  //这个是使图片显示，因为有个时间，加载完成，要用onload事件，记住
	context.drawImage(logo,0,0,450,450);
	drawchess();          //调用这个是使水印在棋盘下面，便于好看，
}
//棋盘水印结束
var drawchess=function(){
//画棋盘开始
for(var i=0;i<15;i++){
	context.moveTo(15+i*30,15);  //这是横的部分代码
	context.lineTo(15+i*30,435);
	context.stroke();
	context.moveTo(15,15+i*30);  //这是竖线的代码
	context.lineTo(435,15+i*30);
	context.stroke();
	}
//画棋盘结束	
	}	
	
var onStep=function(i,j,me){
	//画子开始
context.beginPath();
context.arc(15+i*30,15+ j*30,13,0,2*Math.PI);  //1,2代表的是圆心坐标，3是半径，4,5是代表扇形起始和终止
context.closePath(); 
var gradient=context.createRadialGradient(15+i*30+2,15+ j*30-2,13,15+i*30+2,15+ j*30-2,0); //返回一个渐变对象，1，2代表的是圆心坐标，3是半径，456也是同理
if(me){                           //这里是判断是那个棋子，黑棋还是白棋
gradient.addColorStop(0,"#0A0A0A");   //0是代表第一个圆，1是代表第二个圆
gradient.addColorStop(1,"#636766");	
}else{
gradient.addColorStop(0,"#D1D1D1");
gradient.addColorStop(1,"#F9F9F9");		
	}
context.fillStyle=gradient; //切记，fillStyle这里填充的颜色，是用到前面返回的两个对象
context.fill();
//画子结束 	
	
	}	
	
//下棋开始
chess.onclick=function(e){
	var e=e || window.event;
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBored[i][j] ==0){
    onStep(i,j,me);
    if(me){
    chessBored[i][j]=1;	
    	}else {
    chessBored[i][j]=2;		
    		}
	  me = !me;	    //这个是判断黑白棋的交换	
		}
		}	