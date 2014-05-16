/**
 * Alchemy data.
 * Hardcoding because of local file AJAX issues with Google Chrome
 * See http://tiny.cc/40787 (Google Chrome issue #40787)
 */
var alchemyEffects = {
  "hpr": { "abbr": "+HP", "desc": "Restore Health", "positive": 1 },
  "mag": { "abbr": "+MP", "desc": "Restore Magicka", "positive": 1 },
  "sta": { "abbr": "+SP", "desc": "Restore Stamina", "positive": 1 },
  "arm": { "abbr": "+Amr", "desc": "Armor Increase", "positive": 1 },
  "uns": { "abbr": "xStn", "desc": "Daze/Stun Immunity", "positive": 1 },
  "det": { "abbr": "+Det", "desc": "Detection Increase", "positive": 1 },
  "inv": { "abbr": "Inv", "desc": "Invisible", "positive": 1 },
  "spd": { "abbr": "+Spd", "desc": "Speed Increase", "positive": 1 },
  "scr": { "abbr": "+SCr", "desc": "Spell Crit Increase", "positive": 1 },
  "spw": { "abbr": "+SPw", "desc": "Spell Power Increase", "positive": 1 },
  "srs": { "abbr": "+Res", "desc": "Spell Resist Increase", "positive": 1 },
  "wcr": { "abbr": "+WCr", "desc": "Weapon Crit Increase", "positive": 1 },
  "wpt": { "abbr": "+Wep", "desc": "Weapon Potency Increase", "positive": 1 },
  "xar": { "abbr": "-Amr", "desc": "Armor Decrease", "positive": 0 },
  "xhp": { "abbr": "-HP", "desc": "Ravage Health", "positive": 0 },
  "xmg": { "abbr": "-MP", "desc": "Ravage Magicka", "positive": 0 },
  "xst": { "abbr": "-SP", "desc": "Ravage Stamina", "positive": 0 },
  "xsd": { "abbr": "-Spd", "desc": "Speed Decrease", "positive": 0 },
  "xsc": { "abbr": "-SCr", "desc": "Spell Crit Decrease", "positive": 0 },
  "xsp": { "abbr": "-SPw", "desc": "Spell Power Decrease", "positive": 0 },
  "xsr": { "abbr": "-Res", "desc": "Spell Resist Decrease", "positive": 0 },
  "stu": { "abbr": "Stun", "desc": "Stun Player", "positive": 0 },
  "xwc": { "abbr": "-WCr", "desc": "Weapon Crit Decrease", "positive": 0 },
  "xwp": { "abbr": "-Wep", "desc": "Weapon Potency Decrease", "positive": 0 }
};
var alchemyReagents = {
  "bt": { "e1": "sta", "e2": "xhp", "e3": "wpt", "e4": "spd", "img": "img/bt.png", "desc": "Blessed Thistle" },
  "be": { "e1": "xmg", "e2": "hpr", "e3": "xsp", "e4": "inv", "img": "img/be.png", "desc": "Blue Entoloma" },
  "bg": { "e1": "srs", "e2": "xsp", "e3": "hpr", "e4": "mag", "img": "img/bg.png", "desc": "Bugloss" },
  "cl": { "e1": "hpr", "e2": "sta", "e3": "mag", "e4": "uns", "img": "img/cl.png", "desc": "Columbine" },
  "cf": { "e1": "mag", "e2": "xhp", "e3": "spw", "e4": "det", "img": "img/cf.png", "desc": "Cornflower" },
  "dt": { "e1": "wpt", "e2": "xar", "e3": "sta", "e4": "wcr", "img": "img/dt.png", "desc": "Dragonthorn" },
  "er": { "e1": "xhp", "e2": "xst", "e3": "xmg", "e4": "stu", "img": "img/er.png", "desc": "Emetic Russala" },
  "is": { "e1": "xwp", "e2": "arm", "e3": "xst", "e4": "xwc", "img": "img/is.png", "desc": "Imp Stool" },
  "ls": { "e1": "spw", "e2": "xsr", "e3": "mag", "e4": "scr", "img": "img/ls.png", "desc": "Lady's Smock" },
  "lr": { "e1": "xst", "e2": "hpr", "e3": "xsp", "e4": "xsd", "img": "img/lr.png", "desc": "Luminous Russula" },
  "mf": { "e1": "arm", "e2": "xwp", "e3": "hpr", "e4": "sta", "img": "img/mf.png", "desc": "Moutain Flower" },
  "nr": { "e1": "scr", "e2": "inv", "e3": "spd", "e4": "uns", "img": "img/nr.png", "desc": "Namira's Rot" },
  "nn": { "e1": "xhp", "e2": "xwc", "e3": "xsc", "e4": "inv", "img": "img/nn.png", "desc": "Nirnroot" },
  "sh": { "e1": "xar", "e2": "spw", "e3": "xhp", "e4": "xst", "img": "img/sh.png", "desc": "Stinkhorn" },
  "vc": { "e1": "xsr", "e2": "spw", "e3": "xhp", "e4": "xmg", "img": "img/vc.png", "desc": "Violet Coprinus" },
  "wh": { "e1": "hpr", "e2": "wcr", "e3": "scr", "e4": "stu", "img": "img/wh.png", "desc": "Water Hyacinth" },
  "wc": { "e1": "xsc", "e2": "xmg", "e3": "srs", "e4": "xsd", "img": "img/wc.png", "desc": "Whitecap" },
  "ww": { "e1": "wcr", "e2": "det", "e3": "xst", "e4": "uns", "img": "img/ww.png", "desc": "Wormwood" }
};

var loadData = function() {
	//Prep arrays
	for(code in alchemyEffects) {
		alchemyEffects[code].reagents = new Array();
	}
	
	//Init variables
	$("#selected").data("num", 0);

	//Populate reagents grid
    for(code in alchemyReagents) {
        var reagent = alchemyReagents[code];
        var rdiv = "<div id='r" + code+"' class='squareReagent'>";
        rdiv += "<img src=\"" + reagent.img + "\" alt=\"" + reagent.desc + "\" />";
        rdiv += "<span class='effects'>.</span>"
        rdiv += "<br /><span>" + reagent.desc + "</span>";
        rdiv += "</div>";
        $("#reagents").append(rdiv);
        $("#r"+code).data("code",code);
        $("#r"+code).data("reagent",reagent);
        $("#r"+code).hover(hoverReagent);
        $("#r"+code).click(clickReagent);
        
        //Register back references
        alchemyEffects[reagent.e1].reagents.push(code);
        alchemyEffects[reagent.e2].reagents.push(code);
        alchemyEffects[reagent.e3].reagents.push(code);
        alchemyEffects[reagent.e4].reagents.push(code);
    }

    //Populate effects list
    for(code in alchemyEffects) {
    	var effect = alchemyEffects[code];
    	var ediv = "<div id='e" + code + "' class='effect ";
    	ediv += (effect.positive==1)?"positive":"negative";
    	ediv += "'>" + effect.desc + "</div>";
    	$("#effects").append(ediv);
    	$("#e"+code).data("code", code);
        $("#e"+code).data("effect", effect);
    }
}

var hoverReagent = function() {
	setDetail($(this).data("reagent"));
}

var setDetail = function(reagent) {
	$("#lg_img").html("<img src='" + reagent.img + "' />");
	$("#lg_title").html(reagent.desc);
	$("#effect1").html("1. " + alchemyEffects[reagent.e1].desc);
	$("#effect2").html("2. " + alchemyEffects[reagent.e2].desc);
	$("#effect3").html("3. " + alchemyEffects[reagent.e3].desc);
	$("#effect4").html("4. " + alchemyEffects[reagent.e4].desc);
	$("#detail_hide").show();
}

var clearDetail = function() {
	$("#detail_hide").hide();
}

var clickReagent = function(reagent) {
	var nReagents = $("#selected").data("num");
	var code = $(this).data("code");
	
	if( $(this).hasClass("in_potion") ) {
		$(this).removeClass("in_potion");
		$("#mixer ."+code).replaceWith("");
		$("#selected").data("num", nReagents - 1);
		regeneratePotionEffects();
		return;
	}
	
	if( $("#selected").data("num") < 3) {
		selectReagent(code, $(this).data("reagent"));
		$(this).addClass("in_potion")
		$("#selected").data("num", nReagents + 1);
		regeneratePotionEffects();
	}
}

var selectReagent = function(code, reagent) {
	var mixIn = "<div class='reagent " + code + "'>";
	mixIn += "<img src='" + reagent.img + "' />";
	mixIn += reagent.desc + "</div>";
	$("#mixer").append(mixIn);
	$("#mixer ."+code).data("code", code);
	$("#mixer ."+code).data("reagent", reagent);
}

var regeneratePotionEffects = function() {
	var nReagents = $("#selected").data("num");
	var potion = new Object();
	for(code in alchemyEffects) {
		potion[code] = 0;
	}
	
	$("#mixer .reagent").each(function() {
		var item = $(this).data("reagent");
		potion[item.e1] = potion[item.e1] + 1;
		potion[item.e2] = potion[item.e2] + 1;
		potion[item.e3] = potion[item.e3] + 1;
		potion[item.e4] = potion[item.e4] + 1;
	});
	
	$("#potion").empty();
	$("#reagents .match").removeClass("match");
	$("#reagents span.effects").empty();
	var matches = new Object();
	for(code in alchemyEffects) {
		if(potion[code] > 0) {
			var effect = alchemyEffects[code];
	    	var ediv = "<div class='effect " + code;
	    	ediv += (effect.positive==1)?" positive ":" negative ";
	    	ediv += (potion[code] > 1)?"active":"inactive";
	    	ediv += "'>" + effect.desc + "</div>";
	    	$("#potion").append(ediv);
	    	
	    	if(nReagents < 3) {
	    		var newMatches = alchemyEffects[code].reagents;
	    		console.log(newMatches);
	    		for(m in newMatches) {
	    			var match = newMatches[m];
	    			if(typeof matches[match] == 'undefined') {
	    				matches[match] = (effect.positive==1)? 1 : -1;
	    			} else if(matches[match]==1) {
	    				if(effect.positive==0) matches[match] = 0;
	    			} else if(matches[match]==-1) {
	    				if(effect.positive==1) matches[match] = 0;
	    			}
	    			$("#r"+match+" span.effects").append("<br />" + effect.abbr);
	    		}
	    	}
		}
	}
	for(m in matches) {
		console.log("#r"+m);
		$("#r"+m).addClass("match");
		if(matches[m] > -1) {
			$("#r"+m).addClass("positive");
		}
		if(matches[m] < 1) {
			$("#r"+m).addClass("negative");
		}
	}
}






