//获得地址栏传递的参数
function getUrlValue(name) {
	var str=window.location.search;
	if (str.indexOf(name)!=-1) {
		var pos_start=str.indexOf(name)+name.length+1;
		var pos_end=str.indexOf("&",pos_start);
		if (pos_end==-1) {					
			return decodeURI(str.substring(pos_start));
		}
		else {
			return decodeURI(str.substring(pos_start,pos_end));
		}
	}
	else {
		//没有指定name的url值
		return "";
	}
}

//获取地址栏传过来的json格式的数据
function getUrlJson(name) {
    var str=JSON.stringify(window.location.search);
    var str=str.substring(0,str.length-1);  //为什么？？？
    if (str.indexOf(name)!=-1) {
        var pos_start=str.indexOf(name)+name.length+1;
        var pos_end=str.indexOf("&",pos_start);
        if (pos_end==-1) {
            return decodeURI(str.substring(pos_start));
        }
        else {
            return decodeURI(str.substring(pos_start,pos_end));
        }
    }
    else {
        //没有指定name的url值
        return "";
    }
}
