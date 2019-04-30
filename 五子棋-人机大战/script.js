var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
var over=false;
//���ö�ά�����������浱�������ӣ��Ͳ���������
var chessBored=[];
//����һ����ά���飬����װӮ���Ǹ�����
var wins=[];
//Ӯ��ͳ������
mywin=[];
computerwin=[];
//������жϵ��������ӵĵط��Ͳ�����������
for(var i=0;i< 15;i++){
	chessBored[i]=[];
	for(var j=0;j< 15;j++){
	chessBored[i][j]=0;	
		}
	}
//���ö�ά�������
for(var i=0;i< 15;i++){
	wins[i]=[];
	for(var j=0;j< 15;j++){
		wins[i][j]=[];
		}
	}
	
//����Ӯ�ķ���
var count = 0;
//���е�����Ӯ�ķ���
for(var i=0;i< 15;i++){
 for(var j=0;j< 11;j++){
 	for(var k=0;k< 5;k++){
 		wins[i][j+k][count]=true;
 		}
 		count++;
 	}	
	}	
//���е����з���	
for(var i=0;i< 15;i++){
 for(var j=0;j< 11;j++){
 	for(var k=0;k< 5;k++){
 		wins[j+k][i][count]=true;
 		}
 		count++;
 	}	
	}	
//б�ߵ����з���
for(var i=0;i< 11;i++){
 for(var j=0;j< 11;j++){
 	for(var k=0;k< 5;k++){
 		wins[i+k][j+k][count]=true;
 		}
 		count++;
 	}	
	}	
//��б�ߵ����з���	
for(var i=0;i< 11;i++){
 for(var j=14;j>3;j--){
 	for(var k=0;k< 5;k++){
 		wins[i+k][j-k][count]=true;
 		}
 		count++;
 	}	
	}	
//���������װ������һά����,��Ҫ�������ж���ô�������У������Ƿ��Ѿ���5����	
for(var i=0;i< count; i++){
	mywin[i]=0;
	computerwin[i]=0;
	}			
context.strokeStyle="#BFBFBF";
//����ˮӡ��ʼ
var logo=new Image();
logo.src="44.jpg";
logo.onload=function(){  //�����ʹͼƬ��ʾ����Ϊ�и�ʱ�䣬������ɣ�Ҫ��onload�¼�����ס
	context.drawImage(logo,0,0,450,450);
	drawchess();          //���������ʹˮӡ���������棬���ںÿ���
}
//����ˮӡ����
var drawchess=function(){
//�����̿�ʼ
for(var i=0;i<15;i++){
	context.moveTo(15+i*30,15);  //���Ǻ�Ĳ��ִ���
	context.lineTo(15+i*30,435);
	context.stroke();
	context.moveTo(15,15+i*30);  //�������ߵĴ���
	context.lineTo(435,15+i*30);
	context.stroke();
	}
//�����̽���	
	}	
	
var onStep=function(i,j,me){
	//���ӿ�ʼ
context.beginPath();
context.arc(15+i*30,15+ j*30,13,0,2*Math.PI);  //1,2�������Բ�����꣬3�ǰ뾶��4,5�Ǵ���������ʼ����ֹ�������һ��Բ��ֻ������û����ɫ
context.closePath(); 
var gradient=context.createRadialGradient(15+i*30+2,15+ j*30-2,13,15+i*30+2,15+ j*30-2,0); //����һ���������1��2�������Բ�����꣬3�ǰ뾶��456Ҳ��ͬ��
if(me){                           //�������ж����Ǹ����ӣ����廹�ǰ���
gradient.addColorStop(0,"#0A0A0A");   //0�Ǵ����һ��Բ��1�Ǵ���ڶ���Բ
gradient.addColorStop(1,"#636766");	
}else{
gradient.addColorStop(0,"#D1D1D1");
gradient.addColorStop(1,"#F9F9F9");		
	}
context.fillStyle=gradient; //�мǣ�fillStyle����������ɫ�����õ�ǰ�淵�ص���������
context.fill();
//���ӽ��� 	
	
	}	
	
//���忪ʼ
chess.onclick=function(e){
	if(over){   //������жϵ�����ʱ,�Ͳ���л��
		return;
		}
	if(!me){  //������жϲ����ҷ����壬�Ͳ��ܵ�
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
	     //����������жϵ�ȫ���Ǻ���ʱ������ʤ����������5���ڰ׻�϶���ʤ�����м�
	  for(var k=0;k< count;k++){
	  	if(wins[i][j][k]){
	  		mywin[k]++;
	  		computerwin[k]=6;
	  	if(mywin[k]==5){
	  			window.alert('you win������');
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
	var u=0,v=0;   //������жϼ���������ӵ�λ��
	//�����������¼�ֵ�
	for(var i=0; i< 15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j< 15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
			}
		}
	//��¼�ķֽ���	
	for(var i=0;i< 15;i++){
		for(var j=0;j< 15;j++){
			if(chessBored[i][j]==0){
				for(var k=0;k< count;k++){
					if(wins[i][j][k]){
				//������ж����µ�λ�ã�������ֹ��		
						if(mywin[k]==1){
						myScore[i][j] +=200;	
							}else if(mywin[k]==2){
								myScore[i][j] +=400;	
								}else if(mywin[k]==3){
								myScore[i][j] +=2000;		
									}else if(mywin[k]==4){
									myScore[i][j] +=10000;		
										}
				//�ж����µ�λ�ý���,����ǵ����µ�λ��
							if(computerwin[k]==1){
						computerScore[i][j] +=220;	
							}else if(computerwin[k]==2){
								computerScore[i][j] +=420;	
								}else if(computerwin[k]==3){
								computerScore[i][j] +=2200;		
									}else if(computerwin[k]==4){
									computerScore[i][j] +=20000;		
										}
				//�����µ�λ�ý���						
						}
					}
				//�ж��������֮��ķ������Ǹ��󣬾ͻ�ȡ��������	
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
			//��ȡ�������			
							
				}
			}
		}
		//����ǵ����µ�λ��
		onStep(u,v,false);
		chessBored[u][v]=2;
		 for(var k=0;k< count;k++){  //����������еķ�������ѭ��
	  	if(wins[u][v][k]){         //������жϵ�����(u,v)��λ�ã�k�ķ���
	  		computerwin[k]++;
	  		mywin[k]=6;
	  	if(computerwin[k]==5){
	  			window.alert('�����Ӯ�ˣ�����');
	  			over=true;
	  			}
	  		}
	  }
		if(!over){
	  me= !me;		
			}



	}