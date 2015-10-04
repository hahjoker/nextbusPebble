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

var activeBuses;

// Get Active Buses from Rutgers Database
ajax({ url: 'http://runextbus.herokuapp.com/active', type: 'json' },
  function(data) {    
    console.log('Received data from `http://runextbus.herokuapp.com/active`.');
    
    activeBuses = data;
    
    console.log(activeBuses);
    
    main.body("Press select to browse.\n\nShake to refresh.");
  },  // End of success callback

  function(error) {
    console.log('Error receiving reddit data.');  
    main.body("Could not fetch active buses.");
    
    activeBuses = "Error";
  }   // End of error callback
);

main.on('click', 'up', function(e) {
   
		var menu = new UI.Menu({
			sections: [{
				items: [{
					title: 'Menu Item 1',
					icon: '/menu_icon.png',
					subtitle: 'Can do Menus'
				}, {
					title: 'Second Item',
					subtitle: 'Subtitle Text'
				}]
			}]
      
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body("nul");
  card.show();
});
