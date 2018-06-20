'use strict';

var _EnemyPlane = require('./EnemyPlane');

var _MyPlane = require('./MyPlane');

var enemyPlane = new _EnemyPlane.EnemyPlane('color', 18, 'left', 1000);

var myPlane = new _MyPlane.MyPlane('color', 18, 'left', 'right');

enemyPlane.moveDown();

myPlane.shoot();

// let zhangsan = {
//     name: 'zhangsan',
//     age: 18,
//     speak() {
//         console.log('I can speak')
//     }
// }