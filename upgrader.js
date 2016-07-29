var roleUpgrader =
{
  run: function(creep)
  {
    // if creep is bringing energy to the controller but has no energy left
    if (creep.memory.working == true && creep.carry.energy == 0)
    {
      // switch state
      creep.memory.working = false;
      console.log('P1');
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity)
    {
      // switch state
      creep.memory.working = true;
      console.log('P2');
    }

    // if creep is supposed to transfer energy to the controller
    if (creep.memory.working == true)
    {
      console.log('P3');
      // try to upgrade the controller
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
      {
        // if not in range, move towards the controller
        creep.moveTo(creep.room.controller);
        console.log('P4');
      }
      // if creep is supposed to harvest energy from source
      else
      {
        // find closest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE)
        {
          console.log('P5');
          // move towards the source
          creep.moveTo(source);
        }
      }
    }
    else
    {
      console.log('P6');
    }
  }
};

module.exports = roleUpgrader;
