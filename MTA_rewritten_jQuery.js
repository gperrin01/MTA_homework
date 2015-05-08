// function intersection  - was writting jScript indexOF on JQ ELEMENT!!!
// When defining event listeners, will using $(.class) impact ALL items with that class, or only the one(s) impacted by the event
var Mta = {
  'line N': ['times square_N', '34th_N', '28th_N', '23rd_N', 'union square', '8th_N'],
  'line L': ['8th_L', '6th_L', 'union square', '3rd_L', '1st_L'],
  'line 6': ['grand central_6', '33rd_6', '28th_6', '23rd_6', 'union square', 'astor place_6']
};
var init_line;
var init_stop; 
var end_line; 
var end_stop; 

var countTrips = localStorage.getItem('countTrips') || 0;

// DOC READY
$(document).ready(function() {
  createDropdowns();
  setUpEventListeners();
})
//EVENT LISTENERS
var setUpEventListeners = function() {
  $('#line_start').on('change', displayDestinationStart);
  $('#line_end').on('change', displayDestinationEnd);
  // this could be grouped into one function
  $('#click_result').on('click', displayJourney)
} // End event listenrers


// functions for Dropdowns and Buttons
function createDropdowns(){
  for (var i=0; i<Object.keys(Mta).length; i++) {
    $('.line').append('<option>'+ Object.keys(Mta)[i]  + '</option>')
  }
}
function displayDestinationStart() {
  //avoid adding up stops os multiple clcks
  $('#station_start').children().remove();
  $('#station_start').append('<option>Please select</option>');
  // what line am I on? -> $('#station_start').val()
  var hereLine = $('#line_start').val();
  Mta[hereLine].forEach(function(MtaStop){
    $('#station_start').append('<option>'+ MtaStop + '</option>');
  })
}
function displayDestinationEnd() {
  $('#station_end').children().remove();
  $('#station_end').append('<option>Please select</option>');
  var hereLine = $('#line_end').val();
  Mta[hereLine].forEach(function(MtaStop){
    $('#station_end').append('<option>'+ MtaStop + '</option>');
  })
}
function displayJourney() {
  init_line = $('#line_start').val();
  init_stop = $('#station_start').val(); 
  end_line = $('#station_end').val();
  end_stop = $('#station_end').val(); 
  $('#display_result').text(calcJourney(init_line, init_stop, end_line, end_stop));
}

// function to Calculate Journey
function calcJourney(init_line, init_stop, end_line, end_stop){
  var nstops;
  if (init_line === end_line) {
    nstops = numberStops(init_line, init_stop, end_stop);
    storeInLocalStorage(init_line, init_stop, end_line, end_stop);
    return ('Your trip takes ' + nstops +'stops.\nYou stay on the same line');
    // sould it be $('#display_result').val() = your trop takes?
  }
  else {
    // the below only works because there is a single intersection between 2 lines
    // var intersection =  findIntersection(Mta[init_line], Mta[end_line])[0]; 
    var intersection = 'union square';
    var nstops_init_line = numberStops(init_line, init_stop, intersection);
    var nstops_end_line = numberStops(end_line, end_stop, intersection);
    nstops = nstops_init_line + nstops_end_line;
    storeInLocalStorage(init_line, init_stop, end_line, end_stop);
    return ('Your trip takes ' + nstops +' stops.\nYou start with '+nstops_init_line+ ' stops on the '+init_line +'.\nYou change at ' +intersection+'.\nYou end with '+nstops_end_line+ ' stops on the '+end_line+ '.');
  }
  
}

function findIntersection(line1, line2) {
    return line1.filter(function(item) {
      return ( $.inArray(item, line2) != -1 );
  });
};
function numberStops(line, stop1, stop2){
  // return Math.abs( Mta[line].indexOf(stop1) - Mta[line].indexOf(stop2) );
  return Math.abs( $.inArray(stop1, Mta[line]) - $.inArray(stop2, Mta[line]) );
}
function storeInLocalStorage(init_line, init_stop, end_line, end_stop) {
  var journeyStore;
  countTrips++;
  var journeyStore = { 'from':[init_line, init_stop], 
                      'to': [end_line, end_stop] 
                    };
  stringJourneyStore = JSON.stringify(journeyStore);
  localStorage.setItem('countTrips', countTrips)
  var tripN = 'Trip_'+countTrips
  localStorage.setItem(tripN, stringJourneyStore);
}




      // for (var k=0; k<Object.keys(Mta)[i].length; k++)
      // $('.station').append('<option>'+ Mta[Object.keys(Mta)[i]][k] + '</option>');






