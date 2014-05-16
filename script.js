/**
 * Alchemy data.
 * Hardcoding because of local file AJAX issues with Google Chrome
 * See http://tiny.cc/40787 (Google Chrome issue #40787)
 */
var alchemyEffects = {
  "hpr": { "abbr": "+HP", "desc": "Restore Health", "positive": 1 },
  "mag": { "abbr": "+MP", "desc": "Restore Magicka", "positive": 1 },
  "sta": { "abbr": "+SP", "desc": "Restore Stamina", "positive": 1 },
  "arm": { "abbr": "+Amr", "desc": "Increase Armor", "positive": 1 },
  "uns": { "abbr": "xStn", "desc": "Unstoppable", "positive": 1 },
  "det": { "abbr": "+Det", "desc": "Detection", "positive": 1 },
  "inv": { "abbr": "Inv", "desc": "Invisible", "positive": 1 },
  "spd": { "abbr": "+Spd", "desc": "Speed", "positive": 1 },
  "scr": { "abbr": "+SCr", "desc": "Spell Crit", "positive": 1 },
  "spw": { "abbr": "+SPw", "desc": "Increase Spell Power", "positive": 1 },
  "srs": { "abbr": "+Res", "desc": "Increase Spell Resist", "positive": 1 },
  "wcr": { "abbr": "+WCr", "desc": "Weapon Crit", "positive": 1 },
  "wpt": { "abbr": "+Wep", "desc": "Increase Weapon Power", "positive": 1 },
  "xar": { "abbr": "-Amr", "desc": "Lower Armor", "positive": 0 },
  "xhp": { "abbr": "-HP", "desc": "Ravage Health", "positive": 0 },
  "xmg": { "abbr": "-MP", "desc": "Ravage Magicka", "positive": 0 },
  "xst": { "abbr": "-SP", "desc": "Ravage Stamina", "positive": 0 },
  "xsd": { "abbr": "-Spd", "desc": "Reduce Speed", "positive": 0 },
  "xsc": { "abbr": "-SCr", "desc": "Spell Crit Decrease", "positive": 0 }, //don't see any
  "xsp": { "abbr": "-SPw", "desc": "Lower Spell Power", "positive": 0 },
  "xsr": { "abbr": "-Res", "desc": "Lower Spell Resist", "positive": 0 },
  "stu": { "abbr": "Stun", "desc": "Stun Player", "positive": 0 },
  "xwc": { "abbr": "-WCr", "desc": "Lower Weapon Crit", "positive": 0 },
  "xwp": { "abbr": "-Wep", "desc": "Lower Weapon Power", "positive": 0 }
};
var alchemyReagents = {
  "bt": { "e1": "sta", "e2": "xhp", "e3": "wpt", "e4": "spd", "img": "img/bt.png", "desc": "Blessed Thistle" }, //Verified
  "be": { "e1": "xmg", "e2": "hpr", "e3": "xsp", "e4": "inv", "img": "img/be.png", "desc": "Blue Entoloma" }, //Verified
  "bg": { "e1": "srs", "e2": "xsp", "e3": "hpr", "e4": "mag", "img": "img/bg.png", "desc": "Bugloss" }, //Verified
  "cl": { "e1": "hpr", "e2": "sta", "e3": "mag", "e4": "uns", "img": "img/cl.png", "desc": "Columbine" }, //Verified
  "cf": { "e1": "mag", "e2": "xhp", "e3": "spw", "e4": "det", "img": "img/cf.png", "desc": "Cornflower" }, //Verified
  "dt": { "e1": "wpt", "e2": "xar", "e3": "sta", "e4": "wcr", "img": "img/dt.png", "desc": "Dragonthorn" }, //Verified
  "er": { "e1": "xhp", "e2": "xmg", "e3": "xst", "e4": "stu", "img": "img/er.png", "desc": "Emetic Russala" }, //effect 3 not tested - checks out on esohead
  "is": { "e1": "xwp", "e2": "arm", "e3": "xst", "e4": "xwc", "img": "img/is.png", "desc": "Imp Stool" }, //Verified
  "ls": { "e1": "spw", "e2": "xsr", "e3": "mag", "e4": "scr", "img": "img/ls.png", "desc": "Lady's Smock" }, //Verified
  "lr": { "e1": "xst", "e2": "xwp", "e3": "hpr", "e4": "xsd", "img": "img/lr.png", "desc": "Luminous Russula" }, //Verified
  "mf": { "e1": "arm", "e2": "xwp", "e3": "hpr", "e4": "sta", "img": "img/mf.png", "desc": "Moutain Flower" }, //Verified
  "nr": { "e1": "scr", "e2": "inv", "e3": "spd", "e4": "uns", "img": "img/nr.png", "desc": "Namira's Rot" }, //effect 4 - checks out on esohead
  "nn": { "e1": "xhp", "e2": "xwc", "e3": "xsc", "e4": "inv", "img": "img/nn.png", "desc": "Nirnroot" }, //verified
  "sh": { "e1": "xar", "e2": "wpt", "e3": "xhp", "e4": "xst", "img": "img/sh.png", "desc": "Stinkhorn" }, //effect 4 not tested - checks out on esohead
  "vc": { "e1": "xsr", "e2": "spw", "e3": "xhp", "e4": "xmg", "img": "img/vc.png", "desc": "Violet Coprinus" }, //verified
  "wh": { "e1": "hpr", "e2": "wcr", "e3": "scr", "e4": "stu", "img": "img/wh.png", "desc": "Water Hyacinth" }, //Verified
  "wc": { "e1": "xsp", "e2": "srs", "e3": "xmg", "e4": "xsc", "img": "img/wc.png", "desc": "Whitecap" }, //verified
  "ww": { "e1": "wcr", "e2": "det", "e3": "xsd", "e4": "uns", "img": "img/ww.png", "desc": "Wormwood" } //Verified
};

var loadData = function() {
    clearDetail();
    
    //Prep arrays
    for(code in alchemyEffects) {
        alchemyEffects[code].reagents = new Array();
    }
    
    //Init variables
    $("#selected").data("num", 0);
    $("#reagents").data("mode", "use");
    //Set global event listeners
    $("#toggleMode").click(toggleClickMode);
    $("#disableAll").click(disableAllReagents);
    $("#enableAll").click(enableAllReagents);

    //Populate reagents grid
    for(code in alchemyReagents) {
        var reagent = alchemyReagents[code];
        //Classes for each effect for the reagent to allow easy CSS manipulation
        var classes = " re" + reagent.e1 + " re" + reagent.e2;
        classes += " re" + reagent.e3 + " re" + reagent.e4 + " ";
        var rdiv = "<div id='r" + code + "' class='squareReagent" + classes + "'>";
        rdiv += "<img src=\"" + reagent.img + "\" alt=\"" + reagent.desc + "\" />";
        //Generate effects text for when mixing a potion
        rdiv += "<span class='effects'>";
        rdiv += "<span class='sp" + reagent.e1 + "'>";
        rdiv += alchemyEffects[reagent.e1].abbr + "</span>";
        rdiv += "<span class='sp" + reagent.e2 + "'>";
        rdiv += alchemyEffects[reagent.e2].abbr + "</span>";
        rdiv += "<span class='sp" + reagent.e3 + "'>";
        rdiv += alchemyEffects[reagent.e3].abbr + "</span>";
        rdiv += "<span class='sp" + reagent.e4 + "'>";
        rdiv += alchemyEffects[reagent.e4].abbr + "</span>";
        //Close
        rdiv += "</span><br /><span class='name'>" + reagent.desc + "</span>";
        rdiv += "</div>";
        
        $("#reagents").append(rdiv);
        $("#r"+code).data("code",code);
        $("#r"+code).data("reagent",reagent);
        
        //Add event listeners
        $("#r"+code).hover(hoverReagent);
        $("#r"+code).click(clickReagent);
        
        //Register back references
        alchemyEffects[reagent.e1].reagents.push(code);
        alchemyEffects[reagent.e2].reagents.push(code);
        alchemyEffects[reagent.e3].reagents.push(code);
        alchemyEffects[reagent.e4].reagents.push(code);
    }
    
    //Initially hide all effects spans in the reagents
    $("#reagents .effects span").hide();

    //Populate effects list
    for(code in alchemyEffects) {
        var effect = alchemyEffects[code];
        var ediv = "<div id='e" + code + "' class='effect ";
        ediv += (effect.positive==1)?"positive":"negative";
        ediv += "'>" + effect.desc + "</div>";
        $("#effects").append(ediv);
        $("#e"+code).data("code", code);
        $("#e"+code).data("effect", effect);
        $("#e"+code).hover(hoverEffectIn, hoverEffectOut);
        $("#e"+code).click(clickEffect);
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

var clickEffect = function() {
	var code = $(this).data("code");
	if($(this).hasClass("active")) {
		$(this).removeClass("active");
		$("#reagents .active").removeClass("active");
	} else {
		$("#effects .active").removeClass("active");
		$("#reagents .active").removeClass("active");
		$(this).addClass("active");
		$("#reagents .re"+code).addClass("active");
	}
}

var hoverEffectIn = function() {
	$(this).addClass("hover");
}

var hoverEffectOut = function() {
	$(this).removeClass("hover");
}

var clearDetail = function() {
    $("#detail_hide").hide();
}

var clickReagent = function(reagent) {
    var mode = $("#reagents").data("mode");
    
    if(mode == "use") {
        useToggleReagent( this );
    }
    
    if(mode == "activate") {
        activateToggleReagent( this );
    }
}

var toggleClickMode = function() {
    var mode = $("#reagents").data("mode");
    
    if(mode == "use") {
        console.log("Going to disable mode");
        $("#reagents").data("mode", "activate");
        $("#toggleMode").html("Disable Mode");
    } else {
        console.log("Going to potion mode");
        $("#reagents").data("mode", "use");
        $("#toggleMode").html("Potion Mode");
    }
}
    
var useToggleReagent = function(clicked) {
    var nReagents = $("#selected").data("num");
    var code = $(clicked).data("code");
    
    if( $(clicked).hasClass("in_potion") ) {
        $(clicked).removeClass("in_potion");
        $("#mixer ."+code).replaceWith("");
        $("#selected").data("num", nReagents - 1);
        regeneratePotionEffects();
        return;
    }
    
    if( $("#selected").data("num") < 3) {
        selectReagent(code, $(clicked).data("reagent"));
        $(clicked).addClass("in_potion");
        $(clicked).removeClass("disabled");
        $("#selected").data("num", nReagents + 1);
        regeneratePotionEffects();
    }
}

var activateToggleReagent = function(clicked) {
    if( $(clicked).hasClass("in_potion") ) {
        $(clicked).removeClass("in_potion");
        $("#mixer ."+code).replaceWith("");
        $("#selected").data("num", nReagents - 1);
        regeneratePotionEffects();
        $(clicked).addClass("disabled");
        return;
    }
    
    if( $(clicked).hasClass("disabled") ) {
        $(clicked).removeClass("disabled");
    } else {
        $(clicked).addClass("disabled");
    }
}

var enableAllReagents = function() {
    console.log("Enabling All Reagents");
    $("#reagents .disabled").removeClass("disabled");
}

var disableAllReagents = function() {
    console.log("Disabling All Reagents");
    $("#reagents .squareReagent").addClass("disabled");
    $(".in_potion").removeClass("in_potion");
    $("#mixer").empty();
    $("#selected").data("num",0);
    regeneratePotionEffects();
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
    
    //Reset
    $("#potion").empty();
    $("#reagents .positive").removeClass("positive");
    $("#reagents .negative").removeClass("negative");
    $("#reagents .effects span").hide();
    $("#effects .possible").removeClass("possible");
    $("#effects .in_potion").removeClass("in_potion");
    
	//Generate potion effects
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
	
	//Display results
	for(code in alchemyEffects) {
		if(potion[code] > 0) {
			var effect = alchemyEffects[code];
			var posneg = (effect.positive==1) ? "positive" : "negative";
			//Show in potion area
	    	var ediv = "<div class='effect " + code + " " + posneg;
	    	ediv += (potion[code] > 1)?" active":" inactive";
	    	ediv += "'>" + effect.desc + "</div>";
	    	$("#potion").append(ediv);
	    	//Show info for adding another reagent if not full
	    	if(nReagents < 3 && potion[code] == 1) {
	    	    $("#reagents .re" + code).addClass(posneg);
	    	    $("#reagents .sp" + code).show();
	    		$("#e" + code).addClass("possible");
	    	}
	    	
	    	if(potion[code] > 1) {
	    		$("#e" + code).addClass("in_potion");
	    	}
		}
	}
	
	//Remove positive and negative from in_potion
	$("#reagents .in_potion").removeClass("positive");
	$("#reagents .in_potion").removeClass("negative");
	
	if(nReagents==3) {
		$("#selected .inactive").hide();
	} else {
		$("#selected .inactive").show();
	}
}






