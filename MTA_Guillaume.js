// function MTA_lines() {
//   this.N = [times_square_N, 34th_N, 28th_N, 23rd_N, union_square_N, 8th_N];
//   this.L = [8th_L, 6th_L, union_square_L, 3rd_L, 1st_L];
//   this.6 = [grand_central_6, 33rd_6, 28th_6, 23rd_6, union_square_6, astor_place_6];
// }
// wanted to do a function object, can we then scroll through the params
var Mta = {
  'line N': ['times square_N', '34th_N', '28th_N', '23rd_N', 'union square', '8th_N'],
  'line L': ['8th_L', '6th_L', 'union square', '3rd_L', '1st_L'],
  'line 6': ['grand central_6', '33rd_6', '28th_6', '23rd_6', 'union square', 'astor place_6']
};
function findIntersection(line1, line2){
  return line1.filter(function(item) {
    return (line2.indexOf(item) != -1);
  });
};

// Asking user for initial and final lines and stops; the WHILE loops are here to ensure that the line and stop match what has been defined in the object MTA
var init_line = prompt('What initial line are you taking?\nPlease input the full name as per below\n' + Object.keys(Mta)+' ?');
while (Object.keys(Mta).indexOf(init_line) === -1) {
  init_line = prompt('Please input the initial line in the correct format, eg line L\n' + Object.keys(Mta)+' ?');
}  
var init_stop = prompt('What is your initial stop?\nPlease input the full name as per below\n' + Mta[init_line]+' ?');
while (Mta[init_line].indexOf(init_stop) === -1) {
  init_stop = prompt('Please input the initial stop in the correct format, as per below\n' + Mta[init_line]+' ?');
}  
var end_line = prompt('What is your line at destination?\nPlease input the full name as per below\n' + Object.keys(Mta)+' ?');
while (Object.keys(Mta).indexOf(end_line) === -1) {
  end_line = prompt('Please input the end line in the correct format, eg line L\n' + Object.keys(Mta)+' ?');
}   
var end_stop = prompt('What is your final stop?\nPlease input the full name as per below\n' + Mta[end_line]+' ?');
while (Mta[end_line].indexOf(end_stop) === -1) {
  end_stop = prompt('Please input the final stop in the correct format, as per below\n' + Mta[end_line]+' ?');
}  

// number stops - 2 cases: if staying on same line or changing
var nstops;
if (init_line === end_line) {
  nstops = Math.abs( Mta[init_line].indexOf(init_stop) - Mta[init_line].indexOf(end_stop) );
  alert('Your trip takes ' + nstops +'stops.\nYou stay on the same line');
}
else {
  // finding the intersection between init and end line - note the below line only works because there is only one intersection between 2 lines in our case
  var intersection =  findIntersection(Mta[init_line], Mta[end_line])[0];
  // counting stops to intersection on initial line
  var nstops_init_line = Math.abs( Mta[init_line].indexOf(init_stop) - Mta[init_line].indexOf(intersection) );
  // counting stops to intersection on final line
  var nstops_end_line = Math.abs( Mta[end_line].indexOf(end_stop) - Mta[end_line].indexOf(intersection) );
  nstops = nstops_init_line + nstops_end_line;
  alert('Your trip takes ' + nstops +' stops.\nYou start with '+nstops_init_line+ ' stops on the '+init_line +'.\nYou change at ' +intersection+'.\nYou end with '+nstops_end_line+ ' stops on the '+end_line+ '.');
} 












