var roleUpgrader =
{
  run: function(creep)
  {
    // if creep is bringing energy to the controller but has no energy left
    if (creep.memory.working == true && creep.carry.energy == 0)
    {
      // switch state
      creep.memory.working = false;
      creep.say('No energy left, time to collect some');
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity)
    {
      // switch state
      creep.memory.working = true;
      creep.say('So much energy, time to upgrade stuff!');
    }

    // if creep is supposed to transfer energy to the controller
    if (creep.memory.working == true)
    {
      // try to upgrade the controller
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
      {
        // if not in range, move towards the controller
        creep.moveTo(creep.room.controller);
        creep.say('To the controller!');
      }
    }
    // if creep is supposed to harvest energy from source
    else
    {
      // find closest source
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      // try to harvest energy, if the source is not in range
      if (creep.harvest(source) == ERR_NOT_IN_RANGE)
      {
        creep.say('To the energy!');
        // move towards the source
        creep.moveTo(source);
      }
    }
  }
};

module.exports = roleUpgrader;
