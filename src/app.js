/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'NextBus Pebble App',
  icon: '/bus.png',
  subtitle: '',
  body: 'Press  button.'
});

main.show();

var activeBuses, config;

// Get Active Buses from Rutgers Database
ajax({ url: 'http://runextbus.herokuapp.com/active', type: 'json' },
  function(data) {    
    console.log('Received data from `http://runextbus.herokuapp.com/active`.');
    activeBuses = data;
  },  // End of success callback

  function(error) {
    console.log('Error receiving reddit data.');  
    main.body("Could not fetch active buses.");
    
    activeBuses = "Error";
  }   // End of error callback
);

ajax({ url: 'http://runextbus.herokuapp.com/config', type: 'json' },
  function(data) {    
    console.log('Received data from `http://runextbus.herokuapp.com/config`.');
    config = data;
  },  // End of success callback

  function(error) {
    console.log('Error receiving reddit data.');  
    main.body("Could not fetch config file.");
    
    activeBuses = "Error";
  }   // End of error callback
);


main.on('click', 'up', function(e) {
		var menu = new UI.Menu({
			sections: [{
				items: [{
					
				}]
			}]
      
      
  });
  
  var busTags=[ activeBuses.routes.length];
  for (var i = 0; i < activeBuses.routes.length; i++) {
    menu.items(i, [ { title: activeBuses.routes[i].title, subtitle: 'Select for stops' }]);
		busTags=[activeBuses.routes[i].tag];
		console.log(busTags[i]);
		//activeBuses.routes[i].tag Access to bus tag call func
  }
  
  menu.on('select', function(e) {
		var innerMenu = new UI.Menu
		({
			sections: [{
				items: [{
				}]
			}]
		});
		for (var i = 0; i < config.routes.busTags[i].stops.length; i++) 
		{
				innerMenu.items(i, [ { title: config.routes.busTags[i].stops[i], subtitle: 'Select for times' }]);
		//activeBuses.routes[i].tag Access to bus tag call func
		}
		innerMenu.show();
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
		
  });
  menu.show();
});


