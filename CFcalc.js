 $(function(){

 	let stagelevel;
 	let turncount;
 	let watage;
 	let strcount;
 	let ifcenter;
 	let damagecut;
 	let damageup;

 	let damage;


 	//入力チェック
 	function inputCheck(){
    	if(!$.isNumeric($("#stagelevel").val()) ||
    		!$.isNumeric($("#turncount").val()) ||  
    		!$.isNumeric($("#watage").val()) || 
    		!$.isNumeric($("#strcount").val()) ||
    		!$.isNumeric($("input[name='ifcenter']:checked").val()) ||
    		!$.isNumeric($("#damagecut1").val()) ||
    		!$.isNumeric($("#damagecut2").val()) ||
    		!$.isNumeric($("#damagecut3").val()) ||
    		!$.isNumeric($("#damagecut4").val()) ||
    		!$.isNumeric($("#damagecut5").val()) ||
    		!$.isNumeric($("#damagecut6").val()) ||
    		!$.isNumeric($("#damageup").val()) ){
    		alert("入力エラー")
      		return false;
    	}else{
      		return true;
    	}
	}

	//ダメージ計算
	function calc(stagelevel, turncount, watage, strcount, ifcenter, damagecut, damageup){
		
		damage = 0;

		//基礎ダメージ
		let base = 400;
		for (var i = 1; i < stagelevel; i++) {
			base *= 1.1;
		}
		
		//貫通ダメージ
		damage += base * 0.1 * (turncount - 1);
		
		//影響力ダウン出来るダメージ
		damage += base * (100 - watage) / 100;
		
		//4の倍数ターン判定
		if(turncount % 4 == 0) damage *= 2;
		
		//Ceステージ判定
		damage *= ifcenter;
		
		//ダメージCUT&UP
		let cuts = 1;
		for (let i=0; i<6; i++)
			cuts *= (100 - damagecut[i]) / 100;
		cuts *= (100 + damageup) / 100;

		//打たれ強い
		cuts *= Math.pow(0.95, strcount);

		//小数点以下切り捨て
		damage = Math.floor(damage*cuts);
	}


	//計算ボタンで処理開始
	$("#calc").click(function(){
		if(inputCheck()){
			stagelevel = Number($("#stagelevel").val());
 			turncount = Number($("#turncount").val());
 			watage = Number($("#watage").val());
 			strcount = Number($("#strcount").val());
 			ifcenter = Number($("input[name='ifcenter']:checked").val());
 			damagecut = [];
 			damagecut.push(Number($("#damagecut1").val()));
 			damagecut.push(Number($("#damagecut2").val()));
 			damagecut.push(Number($("#damagecut3").val()));
 			damagecut.push(Number($("#damagecut4").val()));
 			damagecut.push(Number($("#damagecut5").val()));
 			damagecut.push(Number($("#damagecut6").val()));
 			damageup = Number($("#damageup").val());
		}else{
			
		}
		calc(stagelevel, turncount, watage, strcount, ifcenter, damagecut, damageup);
		$("#damage").text(damage);

	})



})