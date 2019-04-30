var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
var over=false;
//设置二维数组用来保存当下了棋子，就不能落子了
var chessBored=[];
//定义一个三维数组，用来装赢的那个方法
var wins=[];
//赢法统计数组
mywin=[];
computerwin=[];
//这个是判断挡下了棋子的地方就不能在下子了
for(var i=0;i< 15;i++){
	chessBored[i]=[];
	for(var j=0;j< 15;j++){
	chessBored[i][j]=0;	
		}
	}
//设置二维数组结束
for(var i=0;i< 15;i++){
	wins[i]=[];
	for(var j=0;j< 15;j++){
		wins[i][j]=[];
		}
	}
	
//定义赢的方法
var count = 0;
//横列的所有赢的方法
for(var i=0;i< 15;i++){
 for(var j=0;j< 11;j++){
 	for(var k=0;k< 5;k++){
 		wins[i][j+k][count]=true;
 		}
 		count++;
 	}	
	}	
//竖列的所有方法	
for(var i=0;i< 15;i++){
 for(var j=0;j< 11;j++){
 	for(var k=0;k< 5;k++){
 		wins[j+k][i][count]=true;
 		}
 		count++;
 	}	
	}	
//斜线的所有方法
for(var i=0;i< 11;i++){
 for(var j=0;j< 11;j++){
 	for(var k=0;k< 5;k++){
 		wins[i+k][j+k][count]=true;
 		}
 		count++;
 	}	
	}	
//反斜线的所有方法	
for(var i=0;i< 11;i++){
 for(var j=14;j>3;j--){
 	for(var k=0;k< 5;k++){
 		wins[i+k][j-k][count]=true;
 		}
 		count++;
 	}	
	}	
//这个是用来装方法的一维数组,主要是用来判断在么个方法中，棋子是否已经到5个了	
for(var i=0;i< count; i++){
	mywin[i]=0;
	computerwin[i]=0;
	}			
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
context.arc(15+i*30,15+ j*30,13,0,2*Math.PI);  //1,2代表的是圆心坐标，3是半径，4,5是代表扇形起始和终止，这个画一个圆，只是这里没有颜色
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
	if(over){   //这个是判断当结束时,就不能谢了
		return;
		}
	if(!me){  //这个是判断不是我放下棋，就不能点
		return; 
		}	
	var e=e || window.event;
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBored[i][j] ==0){
    onStep(i,j,me);
    chessBored[i][j]=1;	
	     //这个是用来判断当全部是黑棋时，才是胜利，而不是5个黑白混合都是胜利，切记
	  for(var k=0;k< count;k++){
	  	if(wins[i][j][k]){
	  		mywin[k]++;
	  		computerwin[k]=6;
	  	if(mywin[k]==5){
	  			window.alert('you win！！！');
	  			over=true;
	  			}
	  		}
	  }
	
	if(!over){
		me = !me;
		computerAI();
		}
	}
}	


var computerAI=function(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;   //这个是判断计算机下棋子的位置
	//这个是用来记录分的
	for(var i=0; i< 15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j< 15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
			}
		}
	//记录的分结束	
	for(var i=0;i< 15;i++){
		for(var j=0;j< 15;j++){
			if(chessBored[i][j]==0){
				for(var k=0;k< count;k++){
					if(wins[i][j][k]){
				//这个是判断人下的位置，用来阻止的		
						if(mywin[k]==1){
						myScore[i][j] +=200;	
							}else if(mywin[k]==2){
								myScore[i][j] +=400;	
								}else if(mywin[k]==3){
								myScore[i][j] +=2000;		
									}else if(mywin[k]==4){
									myScore[i][j] +=10000;		
										}
				//判断人下的位置结束,这个是电脑下的位置
							if(computerwin[k]==1){
						computerScore[i][j] +=220;	
							}else if(computerwin[k]==2){
								computerScore[i][j] +=420;	
								}else if(computerwin[k]==3){
								computerScore[i][j] +=2200;		
									}else if(computerwin[k]==4){
									computerScore[i][j] +=20000;		
										}
				//电脑下的位置结束						
						}
					}
				//判断人与电脑之间的分数，那个大，就获取他的坐标	
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
					}else if(myScore[i][j]==max){
					if(computerScore[i][j] > computerScore[u][v]){
						u=i;
						v=j;
						}	
						}
				
			  	if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
					}else if(computerScore[i][j]==max){
					if(myScore[i][j] > myScore[u][v]){
						u=i;
						v=j;
						}	
						}		
			//获取坐标结束			
							
				}
			}
		}
		//这个是电脑下的位置
		onStep(u,v,false);
		chessBored[u][v]=2;
		 for(var k=0;k< count;k++){  //这个是在所有的方法中来循环
	  	if(wins[u][v][k]){         //这个是判断电脑在(u,v)的位置，k的方法
	  		computerwin[k]++;
	  		mywin[k]=6;
	  	if(computerwin[k]==5){
	  			window.alert('计算机赢了！！！');
	  			over=true;
	  			}
	  		}
	  }
		if(!over){
	  me= !me;		
			}



	}