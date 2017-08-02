 (function() {
     
    //canvas variables
    var canvas;
    var context;
    var width;
    var height;
	
    //image variables
	var characterImage = new Image();
	characterImage.src = "images/character.png";
	var grassImage = new Image();
	grassImage.src = "images/grass1.png";
    var roadImage = new Image();
    roadImage.src = "images/road.png";
    var waterImage = new Image();
    waterImage.src = "images/water.png";
	var hookImage = new Image();
    hookImage.src = "images/hook.png";
	var fishLeft = new Image();
    fishLeft.src = "images/fishLeft.png";
	var fishRight = new Image();
    fishRight.src = "images/fishRight.png";
    var overworldImage = new Image();
	overworldImage.src = "images/Overworld.png";
    var woodFloor = new Image();
    woodFloor.src = "images/Basic_wood_floor.png";
	var redBalloon = new Image();
	redBalloon.src = "images/red-balloon.png";
    var greenBalloon = new Image();
    greenBalloon.src = "images/green-balloon.png";
    var goldBalloon = new Image();
    goldBalloon.src = "images/gold-balloon.png";
	var maleSprites = new Image();
	maleSprites.src = "images/male_sprites.png";
	var arrowImage = new Image();
	arrowImage.src = "images/arrow.png";
	var interior = new Image();
	interior.src = "images/Inner.png";
	var objects = new Image();
	objects.src = "images/objects.png";
    var fence_horizontal = new Image();
    fence_horizontal.src = "images/fence_horizontal.png";
    var fence_vertical = new Image();
    fence_vertical.src = "images/fence_vertical.png";
    var pattern;
    var pattern2;
    var pattern3;
	var pattern4;
	
    var interval_id;
	
	var request;
	
    var player = {
        x : 320,
        y : 400,
        lastX : 0,
        lastY : 0,
        width : 20,
		height: 40,
		xChange : 0,
		yChange : 0,
		facing : "right"
    };
    
    //exterior objects
	var buildings = [];
    
    var building = {
        x : 150,
        y : 20,
        width : 75,
		height : 80
    };
    
	var building2 = {
        x : 540,
        y : 280,
        width : 75,
		height : 80
    };
	
	var building3 = {
        x : 420,
        y : 280,
        width : 75,
		height : 80
    };
    
    var notice = {
        x : 320,
        y : 115,
        width : 35,
        height : 35
    };
    
    var door = {
        x : 300,
        y : 360,
        width : 40,
        height : 20
    };
	
	var stall = {
		x : 400,
		y : 45,
		width : 80,
		height : 85
	};
    
    var bridge = {
        x : 300,
        y : 200,
        width : 60,
        height : 70
    };
	var fountain = {
		x : 295,
		y : 320,
		width : 70,
		height : 70
	};
    var tower = {
        x : 530,
        y : 25,
        width : 50,
        height : 120
    };
    var boxes = {
        x : 200,
        y : 450,
        width : 65,
        height : 20
    };
    var river_left = {
        x : 0,
        y : 220,
        width : 300,
        height : 50
    };
    var river_right = {
        x : 350,
        y : 220,
        width : 280,
        height : 45
    };
    var battle_area = {
        x : 0,
        y : 300,
        width : 200,
        height : 120
    };
    var flag = {
        x : 240,
        y : 290,
        width : 25,
        height : 40
    };
    var tree = {
        x : 50,
        y : 50,
        width : 60,
        height : 60
    };
    var tree2 = {
        x : 250,
        y : 50,
        width : 60,
        height : 60
    };
    var tree3 = {
        x : 550,
        y : 405,
        width : 60,
        height : 60
    };
    var tree4 = {
        x : 430,
        y : 405,
        width : 60,
        height : 60
    };
    var battle_commander = {
        x : 230,
        y : 360,
        width : 20,
        height : 40
    };
	buildings.push(building, building2, building3, stall, fountain,river_left,river_right,battle_area,
        battle_commander, notice, tree, tree2, tree3, tree4, tower, boxes, flag);
    
    //interior objects
    var interior_objects = [];
    
    var fire_place = {
        x : 290,
        y : 105, 
        width : 60,
        height : 35
    };
    var book_case = {
        x : 450,
        y : 160, 
        width : 32,
        height : 110
    };
    var house_plant = {
        x : 380,
        y : 160, 
        width : 30,
        height : 60
    };
	var fortune_teller = {
		x : 325,
		y : 205, 
		width : player.width,
		height : player.height
	};
	interior_objects.push(fire_place,book_case,house_plant,fortune_teller);
    
    //fishing objects
	var fishing_line = {
		x : 320,
		y : 0,
		width : 1,
		height : 100,
		gravity : 5
	}
	var fishing_hook = {
		x : fishing_line.x -11,
		y : fishing_line.y + fishing_line.height-3,
		width : 15,
		height : 30,
		gravity : fishing_line.gravity
	}
	
	//game variables
	var round = 0;
	
    var fish_left = [];
	var fish_right = [];
	var fishing_score = 0;
    
	var quiver = [];
	var balloon_front_row = [];
	var balloon_back_row = [];
    var gold_balloon_container = [];
    var balloon_score = 0;
    
    var opponents = [];
    var obstacles = [];
    var start_time;
    var end_time;
    var total_time;
    var collision = "none";
    var enemy_collision = "none";
    var battle_result = "";
    
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;
    var moveLeft = false;
	var interact = false;
	var engage = false;
    
    var balloon_conversation = false;
    var battle_conversation = false;
	var fishing_conversation = false;
    
    var curr_game;
    var player_name = "";
    var curr_score = 0;
    var battle_score_display;
    var table;
    
    document.addEventListener('DOMContentLoaded', init, false);

    function init() {    
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        output = document.querySelector('#output');
        battle_score_display = document.querySelector('#battle_score_display');
        window.addEventListener('keydown', activate, false);
		window.addEventListener('keyup', deactivate, false);
		clearInterval(interval_id);
        get_user_name();
        interval_id = window.setInterval(draw, 33);
    }
    
    function get_user_name() {
        clearInterval(interval_id);
        var url = 'get_user_name.py';
        request = new XMLHttpRequest();
        request.addEventListener('readystatechange', handle_name_response, false);
        request.open('GET', url, true);
        request.send(null);
    }
    
    function handle_name_response() {
        if ( request.readyState === 4 ) {
            if ( request.status === 200 ) {
                player_name = request.responseText.trim();   
            }
        }
    }
    
    function draw() {
        //world draw
        context.clearRect(0, 0, width, height);
        pattern = context.createPattern(grassImage, "repeat");
        pattern2 = context.createPattern(roadImage, "repeat");
        pattern3 = context.createPattern(waterImage, "repeat");
        pattern4 = context.createPattern(fence_horizontal, "repeat");
        context.fillStyle = pattern;
        context.fillRect(0,0,width,height);
        context.fillStyle = pattern2;
        context.fillRect(305,270,50,210);
        context.fillRect(0,155,width,50);
        context.fillRect(180,70,20,100);
        context.fillRect(270,305,120,100);
        context.fillRect(310,355,300,20);
        context.fillStyle = pattern3;
        context.fillRect(0,220,width,50);
        context.fillStyle = pattern4;
        context.fillRect(0,300,200,10);
        context.fillRect(0,410,200,10);
        pattern4=context.createPattern(fence_vertical, "repeat");
        context.fillRect(200,300,4,120);
        context.drawImage(characterImage, 0, 6, 15, 21, stall.x+(stall.width)/3, stall.y+(stall.height)/3, player.width, player.height);
		context.drawImage(overworldImage, 314, 458, 60, 68, bridge.x, bridge.y, bridge.width, bridge.height);
        context.drawImage(overworldImage, 288, 358, 79, 85, stall.x, stall.y, stall.width, stall.height);
        context.drawImage(objects, 256, 192, 32, 32, tree.x, tree.y, tree.width, tree.height);
        context.drawImage(objects, 256, 192, 32, 32, tree2.x, tree2.y, tree2.width, tree2.height);
        context.drawImage(objects, 256, 192, 32, 32, tree3.x, tree3.y, tree3.width, tree3.height);
        context.drawImage(objects, 256, 192, 32, 32, tree4.x, tree4.y, tree4.width, tree4.height);
        context.drawImage(overworldImage, 544, 32, 16, 16, notice.x, notice.y, notice.width, notice.height);
        context.drawImage(redBalloon, stall.x, stall.y+30, 20, 40);
        context.drawImage(redBalloon, stall.x+60, stall.y+30, 20, 40);
        context.drawImage(overworldImage, 98, 0, 73, 80, building.x, building.y, building.width, building.height);
		context.drawImage(overworldImage, 98, 0, 73, 80, building2.x, building2.y, building2.width, building2.height);
		context.drawImage(overworldImage, 98, 0, 73, 80, building3.x, building3.y, building3.width, building3.height);
		context.drawImage(overworldImage, 352, 144, 48, 48, fountain.x, fountain.y, fountain.width, fountain.height);
        context.drawImage(overworldImage, 0, 338, 48, 117, tower.x, tower.y, tower.width, tower.height);
        context.drawImage(overworldImage, 48, 356, 48, 75, tower.x, tower.y-25, tower.width, 75);
        context.drawImage(overworldImage, 416, 320, 64, 23, boxes.x, boxes.y, boxes.width, boxes.height);
        context.drawImage(overworldImage, 152, 465, 23, 30, flag.x, flag.y, flag.width, flag.height);
        context.drawImage(maleSprites, 9, 462, 51, 48, 10, 330, 40, 40);
        context.drawImage(maleSprites, 148, 848, 26, 47, 140, 330, 20, 40);
        context.drawImage(maleSprites, 148, 207, 26, 47, battle_commander.x, battle_commander.y,
                          battle_commander.width, battle_commander.height);
        if (moveDown) {
            context.drawImage(characterImage, 0, 6, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveUp) {
            context.drawImage(characterImage, 0, 69, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveLeft) {
            context.drawImage(characterImage, 17, 103, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveRight){
            context.drawImage(characterImage, 18, 39, 15, 21, player.x, player.y, player.width, player.height);
        } else{
            context.drawImage(characterImage, 0, 69, 15, 21, player.x, player.y, player.width, player.height);
        }
        if (moveRight && collision != "right") {
            if (player.x < width - player.width){
                player.x += 5;       
            }      
        }
        if (moveUp && collision != "top") {
            if (player.y > 0) {
                player.y -= 5; 
            }
        }
        if (moveDown && collision != "bottom") {
            if  (player.y < height - player.height) {
                player.y += 5;
            }
        }
        if (moveLeft && collision != "left") {
            if (player.x> 0) {
                player.x -=5; 
            }       
        }
        for (var i=0; i<buildings.length; i+=1) {
            if (collidesRight(player,buildings[i])) {
                collision="right";
                break;
            } else if (collidesLeft(player,buildings[i])) {
                collision="left";
                break;
            } else if (collidesTop(player,buildings[i])) {
                collision="top";
                break;
           } else if (collidesBottom(player,buildings[i])) {
                collision="bottom";
                break;
            } else {
                collision = "none";
            }
        } 
		if (collidesTop(player,building) || collidesTop(player,building2) || collidesTop(player,building3) ||collidesTop(player,stall) || collidesTop(player,notice)
            || collidesLeft(player,battle_commander) || collides(player,fountain) 
            || collidesTop(player,river_left)||collidesTop(player,river_right) 
            || collidesTop(player,tower) || collidesBottom(player,boxes)
            || collidesTop(player,flag)) {
			context.drawImage(objects, 32, 130, 13, 12, player.x+3, player.y-12, 13, 12);
		} else {
            output.innerHTML='...';
        }
		if ((collidesTop(player,building)) && interact) {
            player.lastX = player.x;
            player.lastY = player.y;
            player.x=width/2-player.width/2;
            player.y=(height*0.75)-(player.height*1.25);
            output.innerHTML=('...');
			fortuneSetup();
		}
		if (((collidesTop(player,building2))||(collidesTop(player,building3))) && interact) {
            player.lastX = player.x;
            player.lastY = player.y;
            player.x=width/2-player.width/2;
            player.y=(height*0.75)-(player.height*1.25);
            output.innerHTML=('...');
            house1Setup();
        }
		if ((collidesTop(player,stall)) && interact) {
            output.innerHTML='Want to shoot some balloons? Press enter to begin.';
            balloon_conversation = true;
        }
        if (balloon_conversation && engage ) {
            player.lastX = player.x;
            player.lastY = player.y;
            player.width*=1.5;
            player.height*=1.5;
            balloon_shoot_setup();
		}
		if ((collidesLeft(player,battle_commander) && interact)) {
            output.innerHTML='Ah, another challenger. Press enter to battle.';
            battle_conversation=true;
        }
        if (battle_conversation && engage ) {
            player.lastX = player.x;
            player.lastY = player.y;
            battle_setup();
        }
        if (movement()) {
            balloon_conversation = false;
            battle_conversation = false;
			fishing_conversation = false;
            battle_score_display.innerHTML = "";
            canvas.style.display = 'block';
            battle_score_display.style.display = 'none';
        }
		if ((collides(player,fountain) && interact)) {
            output.innerHTML='A fountain';
		}
		if ((collidesBottom(player,boxes) && interact)) {
            output.innerHTML='Fruit, I think.';
        }
        if ((collidesTop(player,flag) && interact)) {
            output.innerHTML='Soldiers camp.';
        }
		if ((collides(player,tower) && interact)) {
            output.innerHTML='An old tower.';
        }
		if ((collidesTop(player,notice) && interact)) {
            battle_score_display.style.display = 'block';
            retrieve_score();
        }
		if ((collidesTop(player,river_left)||collidesTop(player,river_right)) && interact) {
            output.innerHTML='Want to try some fishing? Press enter to continue.';
            fishing_conversation = true;
        }
		if (fishing_conversation && engage ) {
			fishing_setup();
		} 
	}
	
	function fishing_setup() {
		clearInterval(interval_id);
        output.innerHTML='...';
        curr_game = "Fishing";
		fishing_conversation=false;
		round +=1;
		if (round<4) {
			for (var i=0; i<10; i++) {
				var fish = {
					x : width,
					y : getRandomNumber(height/2, height-25),
					width : 50,
					height : 25,
					xChange : getRandomNumber(-2, -1),
					yChange : getRandomNumber(-1, 1)
				}
				fish_left.push(fish);
			}
			
			for (var i=0; i<10; i++) {
				var fish = {
					x : 0,
					y : getRandomNumber(height/2, height-25),
					width : 50,
					height : 25,
					xChange : getRandomNumber(1, 2),
					yChange : getRandomNumber(-1, 1)
				}
				fish_right.push(fish);
			}
			interval_id = window.setInterval(fishing, 33);
		} else {
			curr_score = fishing_score;
			store_score()
		}
	
	}
	
	function fishing() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = pattern3;
        context.fillRect(0, 0, width, height); 
		context.drawImage(hookImage, fishing_hook.x, fishing_hook.y, fishing_hook.width, fishing_hook.height);
		context.fillStyle = "black";
		context.fillRect(fishing_line.x, fishing_line.y, fishing_line.width, fishing_line.height);
		output.innerHTML= "Move your line left and right and hold the spacebar to reel it in. Score: " + fishing_score;
		if (fishing_hook.y+fishing_hook.height < height) {
			fishing_line.height+=fishing_line.gravity;
			fishing_hook.y+=fishing_hook.gravity;
		}
		for (var i=0; i<fish_left.length; i++) {
			context.drawImage(fishLeft, fish_left[i].x, fish_left[i].y, fish_left[i].width, fish_left[i].height);
            fish_left[i].x+=fish_left[i].xChange;
			fish_left[i].y+=fish_left[i].yChange;
			if (fish_left[i].x < 0) {
				fish_left.splice(i,1);
			}
			if (interact && collides(fishing_hook,fish_left[i])) {
				fish_left[i].y -= 10;
			}
			if (fish_left[i].y+fish_left[i].height < 0) {
				fish_left.splice(i, 1);
				fishing_score+=1;
			}
			if (fish_left[i].y+fish_left[i].height > height || fish_left[i].y < height/2) {
                fish_left[i].yChange *= -1;
            }
		}
		for (var i=0; i<fish_right.length; i++) {
			context.drawImage(fishRight, fish_right[i].x, fish_right[i].y, fish_right[i].width, fish_right[i].height);
            fish_right[i].x+=fish_right[i].xChange;
			fish_right[i].y+=fish_right[i].yChange;
			if (fish_right[i].x+fish_right[i].width > width) {
				fish_right.splice(i,1);
			}
			if (interact && collides(fishing_hook,fish_right[i])) {
				fish_right[i].y -= 10;
			}
			if (fish_right[i].y+fish_right[i].height < 0) {
				fish_right.splice(i, 1);
				fishing_score+=1;
			}
			if (fish_right[i].y+fish_right[i].height > height || fish_right[i].y < height/2) {
                fish_right[i].yChange *= -1;
            }
		}
		if (moveLeft) {
            if (fishing_line.x > 0) {
                fishing_line.x -= 5; 
				fishing_hook.x -= 5;
            }
        }
        if (moveRight) {
            if  (fishing_line.x < width) {
                fishing_line.x += 5;
				fishing_hook.x += 5;
            }	
        }
		if (interact) {
			fishing_line.height-=10;
			fishing_hook.y-=10;
		}
		if (fish_left.length === 0 && fish_right.length === 0) {
			fishing_setup()
		}
	}

	function balloon_shoot_setup() {
		clearInterval(interval_id);
        output.innerHTML='...';
        curr_game = "Balloon Shoot";
        balloon_conversation=false;
		player.x=5;
		player.y=height/2;
		balloon_back_row = [];
		balloon_front_row = [];
        gold_balloon_container = [];
        round +=1;
        if (round < 4) {
            for (var i=0; i<20; i+=1) {
                var balloon = {
                    x : getRandomNumber(width/2, width-50),
                    y : getRandomNumber(height-50, height*0.33),
                    width : 20,
                    height : 40,
                    xChange : 0,
                    antigravity : -1
                };
            balloon_back_row.push(balloon);
            }
            for (var i=0; i<10; i+=1) {
                var balloon = {
                    x : getRandomNumber(width/2, width-50),
                    y : getRandomNumber(height-50, height*0.33),
                    width : 20,
                    height : 40,
                    xChange : 0,
                    antigravity : -1
                };
            balloon_front_row.push(balloon);
            }
            for (var i=0; i<1; i+=1) {
                var gold_balloon = {
                    x : getRandomNumber(width/2, width-50),
                    y : getRandomNumber(height-50, height*0.33),
                    width : 20,
                    height : 40,
                    xChange : 0,
                    antigravity : -1
                };
            gold_balloon_container.push(gold_balloon);
            } 
            interval_id = window.setInterval(balloon_shoot, 33);
        } else {
            player.width/=1.5;
            player.height/=1.5;
            player.x=player.lastX;
            player.y=player.lastY+player.height+5;
            curr_score = balloon_score;
            store_score()
        }
	}
	
	function balloon_shoot() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = pattern;
        context.fillRect(0, height/2, width, height/2);
        context.fillStyle = '#00BFFF';
        context.fillRect(0, 0, width, height/2);
        context.drawImage(maleSprites, 525, 1229, 45, 51, player.x, player.y, player.width, player.height);	
        if (round === 1) {
            output.innerHTML = "Avoid the red balloons. Control your arrows with the spacebar. Score: " + balloon_score;
        } else if (round === 2) {
            output.innerHTML = "Round 2. Score: " + balloon_score;
        } else {
            output.innerHTML = "Final round. Score: " + balloon_score;
        }
		if (interact) {
            var arrow = {
                x : player.x+5,
                y : player.y+(player.height/3),
                width : 31,
				height : 5,
                xChange : 0,
                yChange : -10,
				gravity : 0.3
            };
			if (quiver.length<1) {
				quiver.push(arrow);    
			}
        }
		for  (var i = 0; i < quiver.length; i+=1) {
			if (interact) {
				quiver[i].xChange += 1;
			}
			context.drawImage(arrowImage, 153, 235, 31, 5, quiver[i].x, quiver[i].y, quiver[i].width, quiver[i].height);
            quiver[i].x=quiver[i].x+quiver[i].xChange;
			quiver[i].y=quiver[i].y+quiver[i].yChange-quiver[i].gravity;
			quiver[i].yChange=quiver[i].yChange+quiver[i].gravity;
			if (quiver[i].x > width || quiver[i].y > player.y + player.height) {
				quiver.splice(i, 1);
			}
		}
		for (var i=0; i<balloon_back_row.length; i+=1) {
            context.drawImage(greenBalloon, balloon_back_row[i].x, balloon_back_row[i].y, balloon_back_row[i].width, balloon_back_row[i].height);
			balloon_back_row[i].x=balloon_back_row[i].x+balloon_back_row[i].xChange;
			balloon_back_row[i].y=balloon_back_row[i].y+balloon_back_row[i].antigravity;
			if (hit(balloon_back_row[i])) {
                balloon_score += 1;
                balloon_back_row.splice(i,1);
            } else if (balloon_back_row[i].y + balloon_back_row[i].height < 0 || 
				balloon_back_row[i].x > width || 
				balloon_back_row[i].x<0) {
				balloon_back_row.splice(i,1);  
			}
		}
		for (var i=0; i<balloon_front_row.length; i+=1) {	
            context.drawImage(redBalloon, balloon_front_row[i].x, balloon_front_row[i].y, balloon_front_row[i].width, balloon_front_row[i].height);
			balloon_front_row[i].x=balloon_front_row[i].x+balloon_front_row[i].xChange;
			balloon_front_row[i].y=balloon_front_row[i].y+balloon_front_row[i].antigravity;
			if (hit(balloon_front_row[i])) {
                balloon_score -= 1;
                balloon_front_row.splice(i,1);
            } else if (balloon_front_row[i].y + balloon_front_row[i].height < 0 || 
				balloon_front_row[i].x > width || 
				balloon_front_row[i].x < 0) {
				balloon_front_row.splice(i,1); 
			}
		}
		for (var i=0; i<gold_balloon_container.length; i+=1) {
            context.drawImage(goldBalloon, gold_balloon_container[i].x, gold_balloon_container[i].y, gold_balloon_container[i].width, gold_balloon_container[i].height);
            gold_balloon_container[i].x=gold_balloon_container[i].x+gold_balloon_container[i].xChange;
            gold_balloon_container[i].y=gold_balloon_container[i].y+gold_balloon_container[i].antigravity;
            if (hit(gold_balloon_container[i])) {
                balloon_score += 10;
                gold_balloon_container.splice(i,1);  
            } else if (gold_balloon_container[i].y + gold_balloon_container[i].height < 0 || 
                gold_balloon_container[i].x > width || 
                gold_balloon_container[i].x < 0) {
                gold_balloon_container.splice(i,1); 
            }
        }  
		if (moveUp) {
            if (player.y+(player.height*0.75) > height/2) {
                player.y -= 5; 
            }
        }
        if (moveDown) {
            if  (player.y + player.height < height*.75) {
                player.y += 5;
            }
        }
		if (moveLeft) {
            if (player.x > 0) {
                player.x -= 5; 
            }
        }
        if (moveRight) {
            if  (player.x < width*0.1) {
                player.x += 5;
            }
        }
		if (balloon_back_row.length === 0 && balloon_front_row.length === 0) {
			clearInterval(interval_id);
            balloon_shoot_setup();
        }
	}
	
	function battle_setup() {
        clearInterval(interval_id);
        curr_game = "Battle";
        output.innerHTML='Push your opponent back. Use the arrow keys to move and the spacebar to attack';
        start_time = new Date().getTime();
        battle_conversation = false;
        var max_opponent = 1;
        player.x=width-20;
        player.y=height/2;
        for (var i=0; i<max_opponent; i +=1) {
            var enemy = {
                x : 10,
                y : height/2,
                width : 25,
                height : 55,
                xChange : 0,
                yChange : 0
            }
            opponents.push(enemy);
        }
        var logY = 100;
        for (var i=0; i<3; i++) {
            var log = {
                x : 320,
                y : logY,
                width : 10,
                height : 60
            }
            obstacles.push(log);
            logY+=120;
        }
        interval_id = window.setInterval(battle, 33);
    }
    
    function battle() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = pattern;
        context.fillRect(0, 0, width, height);
        pattern4 = context.createPattern(fence_horizontal, "repeat");
        context.fillStyle = pattern4;
        context.fillRect(0,60,width,10);
        context.fillRect(0,height-60,width,10);
        for (var i=0; i<obstacles.length; i+=1) {
            context.drawImage(fence_vertical, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        }
        for (var i=0; i<opponents.length; i+=1) {
            if (!collidesRight(opponents[i],player)) {
                context.drawImage(maleSprites, 331, 719, 36, 48, opponents[i].x, opponents[i].y, opponents[i].width, opponents[i].height);
            } else {
                context.drawImage(maleSprites, 331, 463, 50, 45, opponents[i].x, opponents[i].y, opponents[i].width+15, opponents[i].height);
                player.x+=80;
            }
            opponents[i].x= opponents[i].x + opponents[i].xChange;
            opponents[i].y = opponents[i].y + opponents[i].yChange;
            if (opponents[i].x < player.x && opponents[i].y > player.y) {
                if (enemy_collision != "right"){
                    opponents[i].xChange=2.5;
                }
                opponents[i].yChange=-2.5;
            } else if (opponents[i].x < player.x && opponents[i].y < player.y) {
                if (enemy_collision != "right"){
                    opponents[i].xChange=2.5;
                }
                opponents[i].yChange=2.5;
            } else if (opponents[i].x > player.x && opponents[i].y > player.y) {
                opponents[i].xChange=-2.5;
                opponents[i].yChange=-2.5;
            } else if (opponents[i].x > player.x && opponents[i].y < player.y) {
                opponents[i].xChange=-2.5;
                opponents[i].yChange= 2.5;
            } else if (opponents[i].x < player.x - player.width*2 && opponents[i].y === player.y) {
                opponents[i].xChange=2.5;
                opponents[i].yChange=0;
            } else {
                opponents[i].xChange = 0;
                opponents[i].yChange = 0;
                opponents[i].x-=20;
                if (collision !="right"){
                    player.x+=50;
                }
                if (interact) {
                    opponents[i].x -= 120;
                }
            }
            if (opponents[i].x+opponents[i].width < 0) {
                opponents.splice(i, 1);
                battle_result = "win";
                battle_end_setup();
            }
            if (player.x > width) {
                opponents.splice(i, 1);
                battle_result = "lose";
                battle_end_setup();
            }
        }
        if (moveRight && collision!="right") {
            context.drawImage(maleSprites, 148, 843, 26, 50, player.x, player.y, player.width+5, player.height+15);
            if (player.x < width - player.width){
                player.x += 5;       
            }      
        }
        else if (moveUp && collision != "up") {
            context.drawImage(maleSprites, 17, 784, 30, 50, player.x, player.y, player.width+5, player.height+10);
            if (player.y > 0) {
                player.y -= 5; 
            }
        }
        else if (moveDown && collision !="down") {
            context.drawImage(maleSprites, 17, 911, 30, 50, player.x, player.y, player.width+5, player.height+10);
            if  (player.y < height - player.height) {
                player.y += 5;
            }
        }
        else if (moveLeft && collision!="left") {
            context.drawImage(maleSprites, 148, 843, 26, 50, player.x, player.y, player.width+5, player.height+15);
            if (player.x> 0) {
                player.x -=5; 
            }
        } else if (interact) {
            context.drawImage(maleSprites, 257, 845, 50, 50, player.x-10, player.y, player.width+25, player.height+20); 
        } else {
            context.drawImage(maleSprites, 148, 843, 26, 50, player.x, player.y, player.width+5, player.height+15);
        }
        for (var i=0; i<obstacles.length; i+=1) {
            if (collidesRight(player,obstacles[i])) {
                collision="right";
                break;
            } else if (collidesLeft(player,obstacles[i])) {
                collision="left";
                break;
            } else if (collidesTop(player,obstacles[i])) {
                collision="top";
                break;
           } else if (collidesBottom(player,obstacles[i])) {
                collision="bottom";
                break;
            } else {
                collision = "none";
            }
        }
    }
    
    function battle_end_setup() {
        clearInterval(interval_id);
        end_time = new Date().getTime();
        total_time = (end_time - start_time)/1000;
        curr_score = Math.round(total_time * 100) / 100
        interval_id = window.setInterval(battle_end, 33);
    }
    
    function battle_end() {
        
        context.clearRect(0, 0, width, height);
        context.fillStyle = pattern;
        context.fillRect(0, 0, width, height);
        pattern4 = context.createPattern(fence_horizontal, "repeat");
        context.fillStyle = pattern4;
        context.fillRect(0,60,width,10);
        context.fillRect(0,height-60,width,10);
        if (battle_result==="win") {
            output.innerHTML='You win! Victory in '+ total_time+' seconds. Press enter to continue.';
        } else if (battle_result==="lose") {
            output.innerHTML='You have been defeated. Press enter to continue.';
        }
        if(engage) {
            clearInterval(interval_id);
            player.x=player.lastX;
            player.y=player.lastY;
            store_score();
        }
    }
    
    function store_score() {
        clearInterval(interval_id);
        var url = 'insert_high_score.py?player_name='+player_name+'&curr_game='+curr_game+'&curr_score='+curr_score;
        request = new XMLHttpRequest();
        request.addEventListener('readystatechange', handle_score_response, false);
        request.open('GET', url, true);
        request.send(null);
    }
    
    function handle_score_response() {
        if ( request.readyState === 4 ) {
            if ( request.status === 200 ) {
                output.innerHTML = "Score stored successfull.";   
            } else  {
                output.innerHTML = "Cannot store score at the moment. please try again later..";
            }
            round = 0;
            fishing_score = 0;
            balloon_score = 0;
            total_time = 0;
            curr_score = 0;
            curr_game = "";
            init()
        }
    }
    
    function retrieve_score() {
        clearInterval(interval_id);
        var url = 'retrieve_score.py';
        request = new XMLHttpRequest();
        request.addEventListener('readystatechange', handle_retrieval_response, false);
        request.open('GET', url, true);
        request.send(null);
    }
    
    function handle_retrieval_response() {
        if ( request.readyState === 4 ) {
            if ( request.status === 200 ) {
                battle_score_display.innerHTML = request.responseText.trim();
                output.innerHTML = "High Scores";
                canvas.style.display = 'none';
                init(); 
            } else  {
                output.innerHTML = "Cannot retrieve score at the moment. Please try again later.";
                init();
            }
        }
    }
	
	function fortuneSetup() {
		clearInterval(interval_id);
		interval_id = window.setInterval(drawFortune, 33);
	}
	
	function drawFortune() {
        context.clearRect(0, 0, width, height);
		context.fillStyle = "black";
		context.fillRect(0,0,width,height);
        pattern = context.createPattern(woodFloor, "repeat");
		context.rect(width/4,height/4,width/2,height/2);
        context.fillStyle = pattern;
        context.fillRect(width/4,height/4,width/2,height/2);
        context.fillRect(door.x, door.y, door.width, door.height);
		context.drawImage(interior, 193, 160, 30, 47, 290, 40, 60, 90);
		context.drawImage(interior, 161, 192, 30, 16, fire_place.x, fire_place.y, fire_place.width, fire_place.height);
		context.drawImage(interior, 0, 113, 47, 47, width/2-50, height/3, 100, 100);
		context.drawImage(interior, 112, 195, 16, 55, book_case.x, book_case.y, book_case.width, book_case.height);
		context.drawImage(interior, 129, 195, 14, 29, house_plant.x, house_plant.y, house_plant.width, house_plant.height);
		context.drawImage(characterImage, 0, 6, 15, 21, fortune_teller.x, fortune_teller.y, fortune_teller.width, fortune_teller.height);
        if (moveDown) {
            context.drawImage(characterImage, 0, 6, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveUp) {
            context.drawImage(characterImage, 0, 69, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveLeft) {
            context.drawImage(characterImage, 17, 103, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveRight){
            context.drawImage(characterImage, 18, 39, 15, 21, player.x, player.y, player.width, player.height);
        } else{
            context.drawImage(characterImage, 0, 69, 15, 21, player.x, player.y, player.width, player.height);
        };
		player.x=player.x+player.xChange;
		player.y=player.y+player.yChange;
		if (moveRight && collision != "right") {
            if (player.x < width*0.75-player.width){
                player.x += 5;       
            }     
        }
        if (moveUp && collision != "top") {
            if (player.y > height/4-player.height*0.75) {
                player.y -= 5; 
            }
        }
        if (moveDown && collision != "bottom") {
            if  (player.y < height*0.75-player.height) {
                player.y += 5;
            }
        }
        if (moveLeft && collision != "left") {
            if (player.x> width/4) {
                player.x -=5; 
            }
        }
        for (var i=0; i<interior_objects.length; i+=1) {
            if (collidesRight(player,interior_objects[i])) {
                collision="right";
                break;
            } else if (collidesLeft(player,interior_objects[i])) {
                collision="left";
                break;
            } else if (collidesTop(player,interior_objects[i])) {
                collision="top";
                break;
           } else if (collidesBottom(player,interior_objects[i])) {
                collision="bottom";
                break;
            } else {
                collision = "none";
            }
        }
		if (collidesTop(player,fortune_teller) || collidesBottom(player, door)
            || collidesTop(player, fire_place) || collidesRight(player,book_case)
			|| collidesTop(player,house_plant)) {
            
			context.drawImage(objects, 32, 130, 13, 12, player.x+3, player.y-12, 13, 12);
		} else {
            output.innerHTML = '...';
        }
        if ((collidesBottom(player,door))&& interact) {
            player.x=player.lastX;
            player.y=player.lastY+(player.height)/2;
            output.innerHTML = "...";
            init();
        }
		if (collidesTop(player,fortune_teller) && interact) {
			requestFortune();
		}
		if (collidesTop(player,fire_place) && interact) {
            output.innerHTML="HOT! Obviously.";
        }
		if (collidesTop(player,house_plant) && interact) {
            output.innerHTML="Needs to be watered.";
        }
		if (collidesRight(player,book_case) && interact) {
            output.innerHTML="Books about the future";
        }
        if (movement()) {
            conversation = false;
        }	
	}
	
	function house1Setup() {
        clearInterval(interval_id);
        interval_id = window.setInterval(drawHouse1, 33);
    }
    
    function drawHouse1() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "black";
        context.fillRect(0,0,width,height);
        pattern = context.createPattern(woodFloor, "repeat");
        context.rect(width/4,height/4,width/2,height/2);
        context.fillStyle = pattern;
        context.fillRect(width/4,height/4,width/2,height/2);
        context.fillRect(door.x, door.y, door.width, door.height);
        context.drawImage(interior, 193, 160, 30, 47, 290, 40, 60, 90);
        context.drawImage(interior, 161, 192, 30, 16, fire_place.x, fire_place.y, fire_place.width, fire_place.height);
        context.drawImage(interior, 0, 113, 47, 47, width/2-50, height/3, 100, 100);
        context.drawImage(interior, 112, 195, 16, 55, book_case.x, book_case.y, book_case.width, book_case.height);
        context.drawImage(interior, 129, 195, 14, 29, house_plant.x, house_plant.y, house_plant.width, house_plant.height);
        context.drawImage(characterImage, 0, 6, 15, 21, fortune_teller.x, fortune_teller.y, fortune_teller.width, fortune_teller.height);
        if (moveDown) {
            context.drawImage(characterImage, 0, 6, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveUp) {
            context.drawImage(characterImage, 0, 69, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveLeft) {
            context.drawImage(characterImage, 17, 103, 15, 21, player.x, player.y, player.width, player.height);
        } else if (moveRight){
            context.drawImage(characterImage, 18, 39, 15, 21, player.x, player.y, player.width, player.height);
        } else{
            context.drawImage(characterImage, 0, 69, 15, 21, player.x, player.y, player.width, player.height);
        };
        player.x=player.x+player.xChange;
        player.y=player.y+player.yChange;
        if (moveRight && collision != "right") {
            if (player.x < width*0.75-player.width){
                player.x += 5;       
            }     
        }
        if (moveUp && collision != "top") {
            if (player.y > height/4-player.height*0.75) {
                player.y -= 5; 
            }
        }
        if (moveDown && collision != "bottom") {
            if  (player.y < height*0.75-player.height) {
                player.y += 5;
            }
        }
        if (moveLeft && collision != "left") {
            if (player.x> width/4) {
                player.x -=5; 
            }
        }
        for (var i=0; i<interior_objects.length; i+=1) {
            if (collidesRight(player,interior_objects[i])) {
                collision="right";
                break;
            } else if (collidesLeft(player,interior_objects[i])) {
                collision="left";
                break;
            } else if (collidesTop(player,interior_objects[i])) {
                collision="top";
                break;
           } else if (collidesBottom(player,interior_objects[i])) {
                collision="bottom";
                break;
            } else {
                collision = "none";
            }
        }
        if (collidesTop(player,fortune_teller) || collidesBottom(player, door)
            || collidesTop(player, fire_place) || collidesRight(player,book_case)
            || collidesTop(player,house_plant)) {
            
            context.drawImage(objects, 32, 130, 13, 12, player.x+3, player.y-12, 13, 12);
        } else {
            output.innerHTML = '...';
        }
        if ((collidesBottom(player,door))&& interact) {
            player.x=player.lastX;
            player.y=player.lastY+(player.height)/2;
            output.innerHTML = "...";
            init();
        }
        if (collidesTop(player,fortune_teller) && interact) {
            output.innerHTML="The fortune teller is across the river and to the left. Please get out of my house.";
        }
        if (collidesTop(player,fire_place) && interact) {
            output.innerHTML="HOT! Obviously.";
        }
        if (collidesTop(player,house_plant) && interact) {
            output.innerHTML="Needs to be watered.";
        }
        if (collidesRight(player,book_case) && interact) {
            output.innerHTML="The history of the village.";
        }
        if (movement()) {
            conversation = false;
        }   
    }
	
	function requestFortune() {
		clearInterval(interval_id);
		var url = 'fortune_teller.py';
		request = new XMLHttpRequest();
		request.addEventListener('readystatechange', handle_response, false);
		request.open('GET', url, true);
		request.send(null);
	}
	
	function handle_response() {
        var fortune;
        if ( request.readyState === 4 ) {
            if ( request.status === 200 ) {
                fortune = request.responseText.trim();
                output.innerHTML = fortune;
                fortuneSetup();
            } else  {
                output.innerHTML = "I'm on break, come back later.";
                fortuneSetup();
            }  
        }
    }
	
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    
    function collides(p, o) {
        if (p.x + p.width < o.x ||
            o.x + o.width < p.x ||
            p.y + 30 > o.y + o.height ||
            o.y > p.y + p.height) {
            return false;
        } else {
            return true;
        }
    }
	
	function hit(p) {
		for  (var i = 0; i < quiver.length; i+=1){
			if (quiver[i].x + quiver[i].width < p.x ||
				quiver[i].x > p.x+p.width ||
				quiver[i].y + quiver[i].height < p.y ||
				quiver[i].y > p.y + p.height) {
				return false;
			} else {
                quiver.splice(i,1);
				return true;
			}
        }
    }
    
    function collidesRight(p, o) {
        if (p.x+p.width === o.x && p.y+p.height >= o.y && p.y+p.height <= o.y+o.height+p.height/2 ) {
            return true;
        } else {
            return false;
        }
    }
    function collidesTop(p, o) {
        if (p.y === o.y + o.height - p.height*0.75 && p.x >= o.x-p.width && p.x <= o.x+o.width ) {
            return true;
        } else {
            return false;
        }
    }
    function collidesLeft(p, o) {
        if (p.x === (o.x+o.width) && p.y+p.height >= o.y && p.y+p.height <= o.y+o.height+p.height/2 ) {
            return true;
        } else {
            return false;
        }
    }
    function collidesBottom(p, o) {
        if (p.y + p.height === o.y && p.x >= o.x-p.width && p.x <= o.x+o.width ) {
            return true;
        } else {
            return false;
        }
    }
	
	function movement() {
        if (moveDown === false && moveLeft === false && moveRight === false && moveUp === false) {
            return false
        } else {
            return true
        }
    }
	
	function activate(event) {
        var keyCode = event.keyCode;
        if (keyCode === 38) {
            moveUp = true;
        } else if (keyCode === 39){
            moveRight = true;
        } else if (keyCode === 40) {
            moveDown = true;
        } else if (keyCode === 37) {
            moveLeft = true;
        } else if (keyCode === 32) {
            interact = true;
        } else if (keyCode === 13) {
            engage = true;
        }
    }
    
    function deactivate(event) {
        var keyCode = event.keyCode;
        if (keyCode === 38) {
            moveUp = false;
        } else if (keyCode === 39){
            moveRight = false;
        } else if (keyCode === 40) {
            moveDown = false;
        } else if (keyCode === 37) {
            moveLeft = false;
        } else if (keyCode === 32) {
            interact = false;
        } else if (keyCode === 13) {
            engage = false;
        }
    }
    
    
})();