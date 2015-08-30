var domHandler = {
	addClass: function (element, value) {
        if(!element.className){
            element.className = value;
        }else{
            var newClassName = element.className;
            newClassName += " " + value;
            element.className = newClassName;
        }
    },
	getStyle: function (obj, attr) {
    	if (obj.currentStyle) {
    		return obj.currentStyle[attr];
    	}else {
    		return window.getComputedStyle(obj,null)[attr];
    	}
    }
};
var EventUntil = {
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type,handler);
		} else {
			element["on" + type] = handler;
		}
	}
};
(function (win, doc) {
	var xhr = ajaxObj.createXhr(),
	    state1 = doc.querySelector('#wrapper'),
	    state2 = doc.querySelector('.citydeny'),
	    state3 = doc.querySelector('.fullcitydeny'),
	    state4 = doc.querySelector('.nosuitedshop'),
	    state5 = doc.querySelector('.noweekenddis'),
	    shops = doc.querySelectorAll('.shop-img'),
	    furbuy = state5.getElementsByTagName('input')[0],
	    staterecord;
	ajaxObj.Post(xhr,'http://kaohe.zeroling.com/kaohe/state',function (res) {
		var data = JSON.parse(res);
		if (data.state === '1') {
			state1.style.display = 'block';
		}else if (data.state === '2') {
			var currentheight;
			state2.style.display = 'block';
			state1.style.display = 'block';
			// currentheight = domHandler.getStyle(state2,"height");
			currentheight = window.getComputedStyle(state2,null)["height"];
			state1.style.marginTop = currentheight;
		}else if (data.state === '3') {
			state3.style.display = 'block';
		}else if (data.state === '4') {
			state4.style.display = 'block';
		}else {
			state1.style.display = 'block';
		}
		staterecord = data.state;
	},null);
	for (var i = 0; i < shops.length; i++) {
		EventUntil.addHandler(shops[i],'touchstart',function () {
			ajaxObj.Post(xhr,'http://kaohe.zeroling.com/kaohe/state',function (res) {
        		var data = JSON.parse(res);
        		if (data.state === '5') {
        			state1.style.display = 'none';
        			state2.style.display = 'none';
        			state5.style.display = 'block';
        		}else {
        			state1.style.display = 'none';
        			state2.style.display = 'none';
        			state5.style.display = 'block';
        		}
        	},null);
		})
	};
	EventUntil.addHandler(furbuy,'touchstart',function () {
		if (staterecord === '1') {
			state1.style.display = 'block';
			state5.style.display = 'none';
		}else if (staterecord === '2') {
			var currentheight;
			state2.style.display = 'block';
			state1.style.display = 'block';
			currentheight = domHandler.getStyle(state2,'height');
			state1.style.marginTop = currentheight;
			state5.style.display = 'none';
		}
	})
})(window, document);