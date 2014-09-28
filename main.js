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


    //// noise stuff 
    var buttonSound = $('<button class="alarm-button alarm-stop"></button>');
    $(outerShell).append(buttonSound);


        

        

   //      $('.alarm-button').click(function() {

			// var audioElement = document.createElement('audio');
	  //       audioElement.setAttribute('src', 'alaaarm.mp3');
	  //       audioElement.setAttribute('autoplay', 'autoplay');
	  //       audioElement.load()
	  //       $.get();
   //          audioElement.play();		
   //      });

        

   

    // context = new webkitAudioContext();

    // function loadSound() {
    //   var request = new XMLHttpRequest();
    //   request.open("GET", "alaaarm.mp3", true);
    //   request.responseType = "arraybuffer";
    //   request.onload = function(){
    //     var incomingData = request.response;
    //     play(incomingData);
    //   };
    //   request.send();
    // }

    // $(buttonSound).on('click', loadSound);










  	function pmCorrect(x){
  		if (x > 12) {
			var y = x - 12;
				return y;
			} else {
				return x;
			}
		};
  	function addZero(x){
  		if (x < 10 && x.toString().length < 2) {
			var y = '0' + x;
			return y;
		} else {
			return x;
		}
  	};
var turnOffFlash = true;
  	var time = [];
    var alarmFlashOnOff = 0;
  	var updateTime = setInterval(function(){
      $(clockScreen).removeClass('flash');
      alarmFlashOnOff++;
	  	var timeNow = new Date($.now());
  		time = [timeNow.getHours(), timeNow.getMinutes()];
  		if (time[0] > 12) {
  			$(indicator).addClass('indicator-pm');
  		} else {
  			$(indicator).addClass('indicator-am');
  		};
  		time[0] = pmCorrect(time[0]);
  		time[1] = addZero(time[1]);
  		$(clockText).text(time[0] + ":" + time[1]);
      /// ALARM FLASH
      
      $('.alarm-stop').click(function() {
            	turnOffFlash = false;
            	  	turnItOn = false;
      		$(alarmOn).hide();
      		$(alarmOff).show();
            	console.log('flash test: ', turnOffFlash)
        			});
      if (time[0] === alarmHour && time[1] === alarmMinute) {  
      	if (turnOffFlash === true && turnItOn === true){            
              if (alarmFlashOnOff % 2 === 0) {
                $(clockScreen).addClass('flash');
              } else {
                $(clockScreen).removeClass('flash');  
              }  
            
        } 
      };	
      /// UNDO FLASH
      // if (time[0] !== alarmHour && time[1] !== alarmMinute) {
        // $(clockScreen).removeClass('flash');
      // };
	   }, 200);
		
  		var alarmSoundOn = setInterval(function(){
  			if (turnItOn === true) {
  				
  				if (time[0] === alarmHour && time[1] === alarmMinute) { 
  					turnItOn = false;
  					var audioElement = document.createElement('audio');
			        audioElement.setAttribute('src', 'alaaarm.mp3');
			        audioElement.setAttribute('autoplay', 'autoplay');
			        audioElement.load()
			        $.get();
		            audioElement.play();	
		            $('.alarm-stop').click(function() {
            		audioElement.pause();
        			});
		            
  				}
  			}
  		}, 200);


///////ALARM   ON/OFF BUTTON
	var turnItOn = false;
	$(alarmOn).hide();
  $(alarmOff).on('click', function(){
  	turnItOn = true;
  	turnOffFlash = true;
  	console.log('turnitoff: ', turnItOn)
      $(alarmOff).hide();
      $(alarmOn).show();
  });
  $(alarmOn).on('click', function(){
  	turnItOn = false;
      $(alarmOn).hide();
      $(alarmOff).show();
  });

/// ALARM   ////////////////////////////
  var alarmHour = 6;
  var alarmMinute = 0;
  // var alarmFlashOnOff = 0;
  //////// ALARM SET
  $(clockTextAlarm).hide();
  $(clockTextAlarm).text(alarmHour + ':00');
   $('.main').on('click', '.set-alarm', function(){
            $(setAlarm).addClass('setIt');
            $(setAlarm).addClass('set-alarm');
            $(clockTextAlarm).show();
            $(clockText).hide();
    });   
//// ALARM HOUR
    $(alarmHourUp).on('click', function(){
      alarmHour++;
        if (alarmHour > 24) {
          alarmHour = 1;
        }
        alarmMinute = addZero(alarmMinute);
        alarmHour = pmCorrect(alarmHour);
        $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);
    });
/////// ALARM MINUTE
    $(alarmMinutUp).on('click', function(){
        alarmMinute++;
        if (alarmMinute > 59){
            alarmMinute = 0;
        }
        alarmMinute = addZero(alarmMinute);
        $(clockTextAlarm).text(alarmHour + ':' + alarmMinute);        
    });
///////// ALARM FLASH       
      var flashOnOff = 0;
      var alarmNumberFlash = setInterval(function(){
          flashOnOff++;
          if (flashOnOff % 2 === 0) {
              $(clockTextAlarm).addClass('transparent');
          } else {
              $(clockTextAlarm).removeClass('transparent');
          }
        }, 250);

///////////// ALARM DONE SETTING    
        $('.main').on('click', '.setIt', function(){
            $(clockTextAlarm).hide();
            $(clockText).show();
            $(setAlarm).removeClass('setIt');
            $(setAlarm).addClass('set-it');
          });
/////////////////////// ??
        // var shouldAlarmFlash = setInterval(function(){
        //   if (clockText === clockTextAlarm) {
            // var alarmFlashOnOff = 0;
            // setInterval(function(){
            //   console.log('flash!!!');
            //   alarmFlashOnOff++;
            //   if (alarmFlashOnOff % 2 === 0) {
            //     $(clockScreen).addClass('flash');
            //   } else {
            //     $(clockScreen).removeClass('flash');
            //   }
            // }, 100);
        //   }
        // }, 200);   
    

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