var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function ()
{
  /* Get the overall energy availability for the rooms */
  for(var name in Game.rooms)
  {
    console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
  }

  /* Read the persistent memory and garbage collect all defunct creep data */
  for(var name in Memory.creeps)
  {
    if(!Game.creeps[name])
    {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  /* Get all harvesters, maintain the population */
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);

  if(harvesters.length < 2)
  {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
    console.log('Spawning new harvester: ' + newName);
  }

  // Get all builders
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log('Builders: ' + upgraders.length);

  if(builders.length < 1)
  {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder', building: false});
    console.log('Spawning new builder: ' + newName);
  }

  // Get all upgraders
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgraders: ' + upgraders.length);

  if(upgraders.length < 2)
  {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'upgrader', working: false});
    console.log('Spawning new upgrader: ' + newName);
  }

  /* The role based loop  */
  for(var name in Game.creeps)
  {
    var creep = Game.creeps[name];

    if(creep.memory.role == 'harvester')
    {
      roleHarvester.run(creep);
    }

    if(creep.memory.role == 'builder')
    {
      roleBuilder.run(creep);
    }

    if (creep.memory.role == 'upgrader')
    {
      roleUpgrader.run(creep);
    }
  }
}
