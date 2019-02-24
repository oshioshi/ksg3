enchant();
window.onload = function() {
 var game = new Game(320,480); //ゲーム準備、表示領域.
 var scale_h = window.innerHeight/480;
 var scale_w = window.innerWidth/320;
 if(scale_h >= scale_w){
  game.scale = scale_w
 }
 else{
 	 game.scale = scale_h
 }

 game.preload('./img/man2.png'); //ゲームに用いるリソース（画像）読み込み
 game.preload('./img/fire.jpg');
 game.preload('./img/heaven.jpg');
 game.preload('./img/hell1.jpg');
 game.preload('./img/s2.png');
 game.preload('./img/baby.png');
 
 
 game.fps = 30;
 game.onload = function() {

 //タイトル画面--------------------------------------------------------------

 var createTitleScene = function() {
	var scene = new Scene();
	
	scene.backgroundColor = 'rgba(250,100,100,1)';

	var fire = new Sprite(320, 480);	//背景生成
	fire.image = game.assets['./img/fire.jpg'];	//背景画像設定
	fire.x = 0;	//背景の配置
	fire.y = 0;
	scene.addChild(fire);

	var label = new Label('たんたんめん');
	label.textAlign = 'center';
	label.y = 300;
	label.font = 'bold 40px sans-serif';
	label.color =  'rgba(0,0,0,1)';
	scene.addChild(label);

	scene.addEventListener(Event.TOUCH_START,function(e){

	 game.replaceScene(createGameScene());
	});
	return scene;
  };


//ゲーム画面----------------------------------------------------------------------

  var createGameScene = function() {
	var scene = new Scene();
	scene.backgroundColor = 'rgba(50,0,0,1)';

	var hell = new Sprite(320, 480);	//背景生成
	hell.image = game.assets['./img/hell1.jpg'];	//背景画像設定
	hell.x = 0;	//背景の配置
	hell.y = 0;
	scene.addChild(hell);


	var time = 0; //タイム
	var trycount = 50;	//タップ回数
	var ase = 0;	//汗カウント
	var asecount = 0;	//汗カウント計算用値

	var label = new Label('たんたんめん：'+trycount);
	label.font = '14px sans-serif';
	label.color = '#fff';
	scene.addChild(label);

	var labela = new Label('汗：'+ase);
	labela.font = '14px sans-serif';
	labela.color = '#fff';
	labela.y = 40;
	scene.addChild(labela);

	var sec = Math.round(time/30);
	var timescore = new Label('タイム:'+sec);
	timescore.font = '14px sans-serif';
	timescore.color = '#fff';
	timescore.y = 20;
	scene.addChild(timescore);

	//タッチする対象物生成
	var player = new Sprite(280, 510);
	player.image = game.assets['./img/man2.png'];
	player.x = 40;
	player.y = 100;
	player.frame = 0;
	player.scale(0.5,0.5);
	scene.addChild(player);

	//怪盗出現前
	var sheef = new Sprite(512, 512);
	sheef.image = game.assets['./img/s2.png'];
	sheef.x = -50;
	sheef.y = 80
	sheef.frame = 0;
	sheef.scale(0.5,0.5);
	sheef.opacity = 0.0;
	scene.addChild(sheef);
	
	var move = 0;
	var framecount = 0;

	//毎フレームイベント
	scene.addEventListener(Event.ENTER_FRAME, function() {
	    time ++;
		var sec = Math.round(time/30);
		timescore.text = 'タイム：'+sec;		
	
		if (trycount <= 0){	//クリアタップ数
			//console.log(sec);
			player.frame = 3;
			finishgame(sec);
		}
	
		else{
			ase = Math.round(asecount -sec * 3);	
			labela.text = '汗：'+ase;
			//console.log(ase);

			if (ase >= 50){	//汗
			//console.log(asecount);
				asecount = 999;
				labela.color = '#f11';
				labela.text = '紙エプロンが破れる！！！';
				//player.frame = 10;
				player.frame += 0.2;

				if(player.frame >=12){
					player.frame = 12;
				sh();
				}
			}

			if(move == 1){
				if(player.frame <2.8){
				  player.frame += 0.3;
				}
				else{
					player.frame = 0;
					move = 0;
				}		
		  	} 
			else if(move == 2){
				if(player.frame <4){
					player.frame = 4;
				}
				if(player.frame <5.8){
			  	player.frame += 0.3;
				}
				else{
					player.frame = 4;
					move = 0;
				}	
			}
			else if(move == 3){
				if(player.frame <7){
					player.frame = 7;
				}
				if(player.frame <8.8){
				  player.frame += 0.3;
				}
				else{
					player.frame = 7
					move = 0;
				}	
			}
		}
		//console.log(player.frame);
		//console.log(asecount);
	});

	scene.addEventListener(Event.TOUCH_START, function() {　//画面タッチ処理）
		
		trycount --;
		label.text = 'たんたんめん：'+trycount;

		asecount = Math.random()*5 + asecount;
		
		//console.log(ase);
		//console.log(move);
		if(ase <15){
			move = 1;
		}
		else if(ase < 35){
			move = 2;
		}
		else if(ase <50){
			move = 3;
		}
	
	});


	var finishgame = function(s) {	//完食してゲーム終了	
		//player.frame = 3.0;
		//console.log(player.frame);
		player.tl.moveBy(0,-600,60);
		framecount ++;
		if(framecount == 60){
			game.replaceScene(createGameoverScene(s));
		}
	} 
	
	var sh = function() {	//ゲーム失敗
		player.tl.fadeOut(30);
		sheef.tl.fadeIn(60);
		sheef.tl.and();
		sheef.tl.rotateBy(1120,60);
		framecount ++;
		if (framecount == 60){
		stopgame();
		}
		} 

	var stopgame = function() {	//ゲーム失敗
	alert("紙エプロンを粗末にするな！！！！");
	game.replaceScene(createTitleScene());
	} 


	return scene;
	};

//終了画面--------------------------------------------------------------------------------
var createGameoverScene = function(resultscore) {
	var scene = new Scene();
	scene.backgroundColor = '#fff';

	var last = new Sprite(320, 480);	//背景生成
	last.image = game.assets['./img/heaven.jpg'];	//背景画像設定
	last.x = 0;	//背景の配置
	last.y = 0;
	scene.addChild(last);

	var baby = new Sprite(400, 416);	//背景生成
	baby.image = game.assets['./img/baby.png'];	//背景画像設定
	baby.x = 0;	//背景の配置
	baby.y = 240;

	scene.addChild(baby);

	var label = new Label(resultscore+'秒で食べきった!');
	label.textAlign = 'center';
	label.color = '#000';
	label.y = 220;
	label.font = '20px sans-serif';
	scene.addChild(label);

	var label2 = new Label('おみごと!');
	label2.textAlign = 'center';
	label2.color = '#000';
	label2.y = 180;
	label2.font = '30px sans-serif';
	scene.addChild(label2);

	var retry = new Label('リトライ');
	retry.color = '#000';
	retry.x = 0;
	retry.y = 30;
	retry.font = '20px sans-serif';
	scene.addChild(retry);

	retry.addEventListener(Event.TOUCH_START, function(e) {
		game.replaceScene(createTitleScene());
	});
	return scene;

	};

  game.replaceScene(createTitleScene());
 }

 game.start(); //ゲーム開始
};