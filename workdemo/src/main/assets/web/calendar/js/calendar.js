/**
 * 完整代码
 */

var F_DATE="";
// 关于月份： 在设置时要-1，使用时要+1
$(function () {

  $('#calendar').calendar({
    ifSwitch: true, // 是否切换月份
    hoverDate: true, // hover是否显示当天信息
    backToday: true // 是否返回当天
  });

  var myDate = new Date();
  var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			if(month<10)
				month = "0"+month;
			if(day<10)
				day = "0"+day;
			var arg = myDate.getFullYear()+"-"+month+"-"+day;
			F_DATE = arg;
  			//步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      // alert(arg);
			//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open('post','http://123.59.119.190:8080/calendar/getcalendarbyday?user_id=1&day='+arg);
      // alert(arg)
			//步骤三:发送请求
			ajax.send();
			//步骤四:注册事件 onreadystatechange 状态改变就会调用
			ajax.onreadystatechange = function () {
			   if (ajax.readyState==4 &&ajax.status==200) {
				var obj = JSON.parse(ajax.responseText);  
				var temp="";
						 for (var name in obj){  	
							var temp_name="";
							if(obj[name].type == 0)
								temp_name="消息提醒";
							else if(obj[name].type == 1)
							    temp_name="招聘消息";
							else if(obj[name].type == 2)
								temp_name="网申截至消息";
							else if(obj[name].type == 3)
								temp_name="笔试消息";
								
							temp += "<div class='block'>";
                            temp += " <div class='cart_list'>";
							temp += " <div class='shop_title' shop_id='6860'>";
							temp += "	<div class='fl'><a class='shopLink eclipse' href=''>"+temp_name+"</a></div>";
							temp += "	<a class='fl right_arrow' href=''></a>";
							temp += "</div>";
							temp += "<div class='cart_item' id='1100604422' item_id='1935345606' stock='195'>";
							temp += "	<div class='detail' style='text-indent:1.5rem'>";
							temp += "    <p class='fl prd_tit' style='font-size:14px;'><a href=''>"+obj[name].content+"</a></p>";
							temp += "   <p class='fl prd_tit' style='text-align:right;'><a href=''>"+obj[name].time+"&nbsp&nbsp&nbsp</a></p>";
							temp += "    <p class='fl prd_tit'><a href=''>"+obj[name].other+"</a></p> ";
							temp += " 	</div>";
							temp += " 	<div class='bottom_line'></div>";
							temp += "</div>";
							temp += "</div>";
							temp += "</div>";
							
						} 
						document.getElementById('indexContent').innerHTML=temp;						

			  　　}
			}
});

;(function ($, window, document, undefined) {

  var Calendar = function (elem, options) {
    this.$calendar = elem;

    this.defaults = {
      ifSwitch: true,
      hoverDate: false,
      backToday: false
    };

    this.opts = $.extend({}, this.defaults, options);

    // console.log(this.opts);
  };

  Calendar.prototype = {
    showHoverInfo: function (obj) { // hover 时显示当天信息
      var _dateStr = $(obj).attr('data');
      var offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
      var offset_l = $(obj).offset().left + $(obj).width();
      var changeStr = addMark(_dateStr);
      var _week = changingStr(changeStr).getDay();
      var _weekStr = '';

      this.$calendar_today.show();

      this.$calendar_today
            .css({left: offset_l + 30, top: offset_t})
            .stop()
            .animate({left: offset_l + 16, top: offset_t});

      switch(_week) {
        case 0:
          _weekStr = '周日';
        break;
        case 1:
          _weekStr = '周一';
        break;
        case 2:
          _weekStr = '周二';
        break;
        case 3:
          _weekStr = '周三';
        break;
        case 4:
          _weekStr = '周四';
        break;
        case 5:
          _weekStr = '周五';
        break;
        case 6:
          _weekStr = '周六';
        break;
      }

      this.$calendarToday_date.text(changeStr);
      this.$calendarToday_week.text(_weekStr);
    },

    showCalendar: function () { // 输入数据并显示
      var self = this;
      var year = dateObj.getDate().getFullYear();
      var month = dateObj.getDate().getMonth() + 1;
      var dateStr = returnDateStr(dateObj.getDate());
      var firstDay = new Date(year, month - 1, 1); // 当前月的第一天

      this.$calendarTitle_text.text(year + '/' + dateStr.substr(4, 2));

      this.$calendarDate_item.each(function (i) {
        // allDay: 得到当前列表显示的所有天数
        var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
        var allDay_str = returnDateStr(allDay);

        $(this).text(allDay.getDate()).attr('data', allDay_str);

        if (returnDateStr(new Date()) === allDay_str) {
          $(this).attr('class', 'item item-curDay');
        } else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
          $(this).attr('class', 'item item-curMonth');
        } else {
          $(this).attr('class', 'item');
        }
      });

      // 已选择的情况下，切换日期也不会改变
      if (self.selected_data) {
        var selected_elem = self.$calendar_date.find('[data='+self.selected_data+']');

        selected_elem.addClass('item-selected');
      }
    },

    renderDOM: function () { // 渲染DOM
      this.$calendar_title = $('<div class="calendar-title"></div>');
      this.$calendar_week = $('<ul class="calendar-week"></ul>');
      this.$calendar_date = $('<ul class="calendar-date"></ul>');
      this.$calendar_today = $('<div class="calendar-today"></div>');


      var _titleStr = '<a href="#" class="title"></a>'+
                      '<a href="javascript:;" id="backToday">T</a>'+
                       '<a href="new_message.html?date='+F_DATE+'" id="new">+</a>' +
                      '<div class="arrow">'+
                        '<span class="arrow-prev"><</span>'+
                        '<span class="arrow-next">></span>'+
                      '</div>';
      var _weekStr = '<li class="item">日</li>'+
                      '<li class="item">一</li>'+
                      '<li class="item">二</li>'+
                      '<li class="item">三</li>'+
                      '<li class="item">四</li>'+
                      '<li class="item">五</li>'+
                      '<li class="item">六</li>';
      var _dateStr = '';
      var _dayStr = '<i class="triangle"></i>'+
                    '<p class="date"></p>'+
                    '<p class="week"></p>';

      for (var i = 0; i < 6; i++) {
        _dateStr += '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>';
      }

      this.$calendar_title.html(_titleStr);
      this.$calendar_week.html(_weekStr);
      this.$calendar_date.html(_dateStr);
      this.$calendar_today.html(_dayStr);

      this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
      this.$calendar.show();
    },

    inital: function () { // 初始化
      var self = this;

      this.renderDOM();

      this.$calendarTitle_text = this.$calendar_title.find('.title');
      this.$backToday = $('#backToday');
      this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
      this.$arrow_next = this.$calendar_title.find('.arrow-next');
      this.$calendarDate_item = this.$calendar_date.find('.item');
      this.$calendarToday_date = this.$calendar_today.find('.date');
      this.$calendarToday_week = this.$calendar_today.find('.week');

      this.selected_data = 0;

      this.showCalendar();

      if (this.opts.ifSwitch) {
        this.$arrow_prev.bind('click', function () {
          var _date = dateObj.getDate();

          dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));

          self.showCalendar();
        });

        this.$arrow_next.bind('click', function () {
          var _date = dateObj.getDate();

          dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));

          self.showCalendar();
        });
      }

      if (this.opts.backToday) {
        var cur_month = dateObj.getDate().getMonth() + 1;

        this.$backToday.bind('click', function () {
          var item_month = $('.item-curMonth').eq(0).attr('data').substr(4, 2);
          var if_lastDay = (item_month != cur_month) ? true : false;

          if (!self.$calendarDate_item.hasClass('item-curDay') || if_lastDay) {
            dateObj.setDate(new Date());

            self.showCalendar();
          }
        });
      }

      this.$calendarDate_item.hover(function () {
        self.showHoverInfo($(this));
      }, function () {
        self.$calendar_today.css({left: 0, top: 0}).hide();
      });

      this.$calendarDate_item.click(function () {
        var _dateStr = $(this).attr('data');
		var args = _dateStr;
        var _date = changingStr(addMark(_dateStr));
        var $curClick = null;

        self.selected_data = $(this).attr('data');

        dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));

        if (!$(this).hasClass('item-curMonth')) {
          self.showCalendar();
        }

        $curClick = self.$calendar_date.find('[data='+_dateStr+']');
        $curDay = self.$calendar_date.find('.item-curDay');
        if (!$curClick.hasClass('item-selected')) {
          self.$calendarDate_item.removeClass('item-selected');
            $curClick.addClass('item-selected');
			
            //document.getElementById('test_date').innerHTML = _date;
			var month = _date.getMonth()+1;
			var day = _date.getDate();
			if(month<10)
				month = "0"+month;
			if(day<10)
				day = "0"+day;
			var arg = _date.getFullYear()+"-"+month+"-"+day;
			F_DATE = arg;
			
			//步骤一:创建异步对象
			var ajax = new XMLHttpRequest();
			//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
			ajax.open('get','http://123.59.119.190:8080/calendar/getcalendarbyday?user_id=1&day='+arg);
			//步骤三:发送请求
			ajax.send();
			//步骤四:注册事件 onreadystatechange 状态改变就会调用
			ajax.onreadystatechange = function () {
			   if (ajax.readyState==4 &&ajax.status==200) {
				var obj = JSON.parse(ajax.responseText);  
				var temp="";
						 for (var name in obj){  	
							var temp_name="";
							if(obj[name].type == 0)
								temp_name="消息提醒";
							else if(obj[name].type == 1)
							    temp_name="招聘消息";
							else if(obj[name].type == 2)
								temp_name="网申截至消息";
							else if(obj[name].type == 3)
								temp_name="笔试消息";
								
							temp += "<div class='block'>";
                            temp += " <div class='cart_list'>";
							temp += " <div class='shop_title' shop_id='6860'>";
							temp += "	<div class='fl'><a class='shopLink eclipse' href=''>"+temp_name+"</a></div>";
							temp += "	<a class='fl right_arrow' href=''></a>";
							temp += "</div>";
							temp += "<div class='cart_item' id='1100604422' item_id='1935345606' stock='195'>";
							temp += "	<div class='detail' style='text-indent:1.5rem'>";
							temp += "    <p class='fl prd_tit' style='font-size:14px;'><a href=''>"+obj[name].content+"</a></p>";
							temp += "   <p class='fl prd_tit' style='text-align:right;'><a href=''>"+obj[name].time+"&nbsp&nbsp&nbsp</a></p>";
							temp += "    <p class='fl prd_tit'><a href=''>"+obj[name].other+"</a></p> ";
							temp += " 	</div>";
							temp += " 	<div class='bottom_line'></div>";
							temp += "</div>";
							temp += "</div>";
							temp += "</div>";
							
						} 
						document.getElementById('indexContent').innerHTML=temp;						

			  　　}
			}
        }
      });
    },

    constructor: Calendar
  };

  $.fn.calendar = function (options) {
    var calendar = new Calendar(this, options);

    return calendar.inital();
  };


  // ========== 使用到的方法 ==========

  var dateObj = (function () {
    var _date = new Date();

    return {
      getDate: function () {
        return _date;
      },

      setDate: function (date) {
        _date = date;
      }
    }
  })();
  

  

  function returnDateStr(date) { // 日期转字符串
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    month = month <= 9 ? ('0' + month) : ('' + month);
    day = day <= 9 ? ('0' + day) : ('' + day);

    return year + month + day;
  };

  function changingStr(fDate) { // 字符串转日期
    var fullDate = fDate.split("-");
    
    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]); 
  };

  function addMark(dateStr) { // 给传进来的日期字符串加-
    return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
  };

  // 条件1：年份必须要能被4整除
  // 条件2：年份不能是整百数
  // 条件3：年份是400的倍数
  function isLeapYear(year) { // 判断闰年
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
  };
 

})(jQuery, window, document);