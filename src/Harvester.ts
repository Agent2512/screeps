export function Harvester(creep:Creep) {
    if (creep.store.energy == 0) {
        creep.memory.working = false;
    }
    else if (creep.store.energy == creep.store.getCapacity()) {
        creep.memory.working = true;
    }

    if (creep.memory.working == false) {
        harvest(creep);
    }
    else {
        transfer(creep);
    }
}

export const harvest = function (creep:Creep) {
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (source) {
            if (creep.pos.inRangeTo(source, 1)) {
                creep.harvest(source);
            }
            else {
                creep.moveTo(source);
            }
        }
}



export const transfer = (creep:Creep) =>  {
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER
            )
            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}
