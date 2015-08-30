var ajaxObj = {
	createXhr: function () {
		var xhrObj = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		return xhrObj;
	},
	formData: function (data) {
		var formdata = '';  
        for ( var i in data) {  
            formdata += i + '=' + data[i] + '&';  
        }  
        return formdata;
	},
	Get: function (xhr,target,callback,string) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					callback(xhr.responseText);
				} else {
					return;
				}
			}
		}
		if (string) {
			xhr.open("GET",target + "?" + string,true);
		} else {
			xhr.open("GET",target,true);
		}
		xhr.send(null);
	},
	Post: function (xhr,target,callback,string) {
		xhr.onreadystatechange = function() {  
            if (xhr.readyState == 4 && xhr.status == 200) {  
                callback.call(this, xhr.responseText);  
            }  
        }  
		xhr.open('POST', target, true);  
        // 这句比较重要  
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');  
        xhr.send(string);  
	}
}