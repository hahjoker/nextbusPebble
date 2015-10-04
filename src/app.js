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
					title: activeBuses.routes[0].title,
					icon: '/menu_icon.png',
					subtitle: 'Can do Menus'
				}, {
					title: 'Second Item',
					subtitle: 'Subtitle Text'
				}]
			}]
      
      
  });
  
  
  for (var i = 0; i < activeBuses.routes.length; i++) {
    menu.items(i, [ { title: activeBuses.routes[i].title, subtitle: activeBuses.routes[i].tag }]);
  }
  
  menu.on('select', function(e) {
		
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
		
  });
  menu.show();
});


