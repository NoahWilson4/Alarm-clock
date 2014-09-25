$(document).on('ready', function() {

	var outerShell = $('<div class="outer-shell"></div>');
  	var innerShell = $('<div class="inner-shell"></div>');
  	var leftLabels = $('<div class="left-labels">PM<br>AM<br>ALARM</div>');
  	var clockScreen = $('<div class="clock-screen"></div>');
  	var clockText = $('<div class="clock-text"></div>');
  	var indicator = $('<div class="indicator">.</div>');
  	var amLabel = $('<div class="am-label">AM</div>');
  	var amFrequencies = $('<div class="am-frequencies">53   60   70   90   110   140   170</div>');
  	var fmLabel = $('<div class="fm-label">FM</div>');
  	var fmFrequencies = $('<div class="fm-frequencies">88 92 96 102 106 108</div>');
  	var alarmSlider = $('<div class="alarm-slider"></div>');
  	var alarmOn = $('<button class="alarm-on"></button>');
  	var alarmOff = $('<button class="alarm-off"></button>');
    var alarmLabel = $('<div class="alarm-label">ON OFF</div>;');
    var setAlarm = $('<button class="set-alarm">SET ALARM</button>');
    var clockTextAlarm = $('<div class="clock-text-alarm"></div>');
    var alarmHourUp = $('<button class="alarm-hour-up">HOUR</button>');
    var alarmMinutUp = $('<button class="alarm-minute-up">MIN</button>');
  	$('.main').append(outerShell);
  	$(outerShell).append(innerShell, alarmSlider, alarmHourUp, alarmMinutUp);
  	$(innerShell).append(leftLabels, clockScreen);
  	$(clockScreen).append(clockText, clockTextAlarm, indicator);
  	$(clockScreen).append(indicator);
  	$(innerShell).append(amFrequencies);
  	$(innerShell).append(fmFrequencies);
  	$(innerShell).append(amLabel);
  	$(innerShell).append(fmLabel);
    $(outerShell).append(alarmLabel, setAlarm);
  	$(alarmSlider).append(alarmOn);
  	$(alarmSlider).append(alarmOff);




  	function pmCorrect(x){
  		if (x > 12) {
			var y = x - 12;
				return y;
			} else {
				return x;
			}
		};
  	function addZero(x){
  		if (x < 10 ) {
			var y = '0' + x;
			return y;
		} else {
			return x;
		}
  	};

  	var updateTime = setInterval(function(){
	  	var timeNow = new Date($.now());
  		var time = [timeNow.getHours(), timeNow.getMinutes()];
  		if (time[0] > 12) {
  			$(indicator).addClass('indicator-pm');
  		} else {
  			$(indicator).addClass('indicator-am');
  		}
  		time[0] = pmCorrect(time[0]);
  		time[1] = addZero(time[1]);
  		$(clockText).text(time[0] + ":" + time[1]);		
	}, 100);
		// /////////////////alarm

	$(alarmOn).hide();
  $(alarmOff).on('click', function(){
      $(alarmOff).hide();
      $(alarmOn).show();
  });
  $(alarmOn).on('click', function(){
      $(alarmOn).hide();
      $(alarmOff).show();
  });
  $(clockTextAlarm).hide();
  var alarmHour = 6;
  var alarmMinute = 0;

  $(clockTextAlarm).text(alarmHour + ':00');
  
   $('.main').on('click', '.set-alarm', function(){
            $(setAlarm).addClass('setIt');
            $(setAlarm).addClass('set-alarm');
            $(clockTextAlarm).show();
            $(clockText).hide();
     });       
      $(alarmHourUp).on('click', function(){
          alarmHour++;
          if (alarmHour > 24) {
              alarmHour = 1;
          }
          alarmHour = pmCorrect(alarmHour);
          $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);
      });
      $(alarmMinutUp).on('click', function(){
          alarmMinute++;
          if (alarmMinute > 59){
               alarmMinute = 0;
          }
          alarmMinute = addZero(alarmMinute);
          $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);
                
      })
            

      var flashOnOff = 0;
      var alarmNumberFlash = setInterval(function(){
          flashOnOff++;
          if (flashOnOff % 2 === 0) {
              $(clockTextAlarm).addClass('transparent');
          } else {
              $(clockTextAlarm).removeClass('transparent');
          }
        }, 350);

            
        $('.main').on('click', '.setIt', function(){

            $(clockTextAlarm).hide();
            $(clockText).show();
            $(setAlarm).removeClass('setIt');
            $(setAlarm).addClass('set-it');
          });
/////////////////////// ??
        var shouldAlarmFlash = setInterval(function(){
          if (clockText === clockTextAlarm) {
            var alarmFlashOnOff = 0;
            setInterval(function(){
              console.log('flash!!!');
              alarmFlashOnOff++;
              if (alarmFlashOnOff % 2 === 0) {
                $(clockScreen).addClass('flash');
              } else {
                $(clockScreen).removeClass('flash');
              }
            }, 100);
          }
        }, 200);   
    

    // $('.main').on('click', '.set-alarm', function(){
    //         $(setAlarm).addClass('setIt');
    //         $(setAlarm).addClass('set-alarm');
    //         $(clockTextAlarm).show();
    //         $(clockText).hide();
            
    //         $(alarmHourUp).on('click', function(){
    //             alarmHour++;
    //             if (alarmHour > 24) {
    //               alarmHour = 1;
    //             }
    //             alarmHour = pmCorrect(alarmHour);
    //             $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);
    //         });
    //         $(alarmMinutUp).on('click', function(){
    //             alarmMinute++;
    //             if (alarmMinute > 59){
    //                alarmMinute = 0;
    //             }

                
    //             alarmMinute = addZero(alarmMinute);
    //             $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);
                
    //         })
    //         alarmHour = pmCorrect(alarmHour);
    //         alarmMinute = addZero(alarmMinute);
    //         $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);

    //         var flashOnOff = 0;
    //         var alarmNumberFlash = setInterval(function(){
    //             flashOnOff++;
    //             if (flashOnOff % 2 === 0) {
    //                 $(clockTextAlarm).addClass('transparent');
    //             } else {
    //                 $(clockTextAlarm).removeClass('transparent');
    //             }
    //           }, 350);

            
    //         $('.main').on('click', '.setIt', function(){

    //             $(clockTextAlarm).hide();
    //             $(clockText).show();
    //             $(setAlarm).removeClass('setIt');
    //             // clearInterval(alarmNumberFlash);
    //             $(setAlarm).addClass('set-it');
    //         })
            
    // });

      
          
          
      
  


});