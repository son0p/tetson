/*
    Copyright (c) 2013 Rafael Vega González <rvega@elsoftwarehamuerto.org>

    Dancing Bone Machine is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Dancing Bone Machine is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Entry point
 */
function main(){
   // You can require additional scripts using requirejs like follows,
   // or you can load scripts by including script tags in the html.
   // The function in the second parameter runs when the scripts are 
   // finished loading.
   requirejs.config({ 
      shim:{ 'scripts/jquery.knob':{ deps: ['scripts/jquery'] } },
   });

   require(['scripts/jquery.knob'], function(){
      // Init PureData engine and load synth.pd patch.
      PD.configurePlayback(44100, 2, false, false, function(){
         PD.openFile('pd/patches', 'tetson.pd', function(){
            PD.setActive(true);
            PD.sendFloat(0.5, 'frequency');
            PD.sendFloat(0.5, 'volume');
         });
      });

     

      var knobs = new Knobs();
      knobs.init();

     
   });
}



/**
 * Knobs
 */
Knobs = function(){
   this.init = function(){
      var w = $('#controls').innerWidth();
      var h = $('#controls').innerHeight();
      var options = {
         'fgColor': '#ffec03',
         'inputColor': '#ffec03',
         'bgColor': '#444444',
         'angleOffset': '-125',
         'angleArc': '250',
         'width': Math.ceil(w * 0.25),
         'height': Math.ceil(w * '0.22')
      };

      var opts2;

      // Frequency 
      opts2 = $.extend({'change': function(v){
          PD.sendFloat(v, 'frequency');
      }}, options);
      $("#frequency").knob( opts2 );

      // Volume
      opts2 = $.extend({'change': function(v){
         PD.sendFloat(v/100, 'volume');
      }}, options);
      $("#volume").knob( opts2 );
   };
};

