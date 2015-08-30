
(function (win, doc) {
	var start = 0;
	function reFresh () {
		var myScroll,
		upIcon = doc.querySelector('.pullup');
    	myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true ,vScroll: true,checkDOMChanges:true});
        myScroll.on("slideUp",function(){
    		if(this.maxScrollY - this.y > 40){
    			var len = 3,
    			    str,
    			    xhr = ajaxObj.createXhr();
    			str = ajaxObj.formData({"start":start,"len":len});
    			ajaxObj.Post(xhr,'http://kaohe.zeroling.com/kaohe/list',function (res) {
            		var backinfo = JSON.parse(res);
            		for (var i = 0; i < len; i++) {
            			if (backinfo.data[i] == undefined) {
            			    var pullinfo = document.querySelector('.pullup');
            			    pullinfo.innerHTML = '已无更多';
            		    }else {
            		    	console.log(backinfo.data[i]);
            		    	console.log(start);
            		    	console.log(i);
            		    	var body1 = document.querySelector('.container');
            		    	var divShop = document.createElement("div");
            		    	domHandler.addClass(divShop,'shops');
            		    	body1.appendChild(divShop);
            		    	var shopImg = document.createElement("img");
            		    	domHandler.addClass(shopImg,'shop-img');
            		    	shopImg.setAttribute("src",backinfo.data[i].imgUrl);
            		    	divShop.appendChild(shopImg);
            		    	var divInfo = document.createElement('div');
            		    	domHandler.addClass(divInfo,'info');
            		    	divShop.appendChild(divInfo);
            		    	var shopName = document.createElement('p');
            		    	shopName.innerHTML = backinfo.data[i].title;
            		    	domHandler.addClass(shopName,'shop-name');
            		    	divInfo.appendChild(shopName);
            		    	var spanName = document.createElement('span');
            		    	if (backinfo.data[i].flag != "") {
            		    		var flags = backinfo.data[i].flag.split('|'),
            		    		    imgStr = "";
            		    		for (var k = 0; k < flags.length; k++) {
            		    			imgStr += '<img src=\"images\/' + flags[k] + '\.png\">';
            		    		}
            		    		spanName.innerHTML = imgStr;
            		    	}else {
            		    		spanName.innerHTML = "";
            		    	}
            		    	shopName.appendChild(spanName);
            		    	var averageCost = document.createElement('p'); 
            		    	domHandler.addClass(averageCost,'average-cost');
            		    	divInfo.appendChild(averageCost);
            		    	var intN = parseInt(backinfo.data[i].stars);
            		    	var relN = Number(backinfo.data[i].stars);
            		    	var remainstar = 5 - intN;
            		    	if (intN !== relN) {
            		    		var strstar = '';
            		    		for (var k = 0; k < relN; k++) {
            		    			strstar += '<img src=\"images\/' + 'full-star' + '\.png\">';
            		    		}
            		    		str += '<img src=\"images\/' + 'half-star' + '\.png\">';
            		    		for (var k = 0; k < remainstar; k++) {
            		    			strstar += '<img src=\"images\/' + 'none-star' + '\.png\">';
            		    		}
            		    		averageCost.innerHTML = strstar;
            		    	}else {
            		    		var strstar = '';
            		    		for (var k = 0; k < relN; k++) {
            		    			strstar += '<img src=\"images\/' + 'full-star' + '\.png\">';
            		    		}
            		    		for (var k = 0; k < remainstar; k++) {
            		    			strstar += '<img src=\"images\/' + 'none-star' + '\.png\">';
            		    		};
            		    		averageCost.innerHTML = strstar;
            		    	}
            		    	var averageText = document.createElement('span');
            		    	averageText.innerHTML = "人均" + backinfo.data[i].average + "元";
            		    	averageCost.appendChild(averageText);
            		    	var remainInfo = document.createElement('p');
            		    	domHandler.addClass(remainInfo,'remain-info');
            		    	divInfo.appendChild(remainInfo);
            		    	if (backinfo.data[i].good) {
            		    		var zan = document.createElement('img');
            		    		zan.setAttribute("src","images/zan.png");
            		    		remainInfo.appendChild(zan);
            		    		var zanSpan = document.createElement('span');
            		    		zanSpan.innerHTML = backinfo.data[i].good + "位朋友";
            		    		domHandler.addClass(zanSpan,"friends");
            		    		remainInfo.appendChild(zanSpan);
            		    		var distanceSpan = document.createElement('span');
            		    		distanceSpan.innerHTML = backinfo.data[i].distance;
            		    		remainInfo.appendChild(distanceSpan);
            		    	}else {
            		    		var zanSpan = document.createElement('span');
            		    		zanSpan.innerHTML = backinfo.data[i].people + "人已分享";
            		    		domHandler.addClass(zanSpan,"friends");
            		    		remainInfo.appendChild(zanSpan);
            		    		var distanceSpan = document.createElement('span');
            		    		distanceSpan.innerHTML = backinfo.data[i].distance;
            		    		remainInfo.appendChild(distanceSpan);
            		    	}
            		    	var discountDiv = document.createElement('div');
            		    	domHandler.addClass(discountDiv,"discount");
            		    	divShop.appendChild(discountDiv);
            		    	var discountNum = document.createElement('span');
            		    	discountNum.innerHTML = backinfo.data[i].discount;
            		    	domHandler.addClass(discountNum,"discount-num");
            		    	discountDiv.appendChild(discountNum);
            		    	var discountWord = document.createElement('span');
            		    	discountWord.innerHTML = "折";
            		    	domHandler.addClass(discountWord,"discount-word");
            		    	discountDiv.appendChild(discountWord);

            		    }           			
            		}
            		start += 3;
            		myScroll.refresh();
            	},str);    
    		}
    	});
	
	}
	reFresh();
	setTimeout(reFresh, 200);
	
})(window, document);