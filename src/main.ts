import {Harvester} from 'Harvester';

const spawns = Game.spawns;
const creeps = Game.creeps;

interface CreepMemory {
    role: string;
    working: boolean;
}

const roles = {
    harvester: Harvester
}

module.exports.loop = function () {

    for (const creepName in creeps) {
        const creep = creeps[creepName];
        if (creep.memory.role == 'harvester') {
            Harvester(creep);
        }
    }
}

