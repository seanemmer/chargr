'use strict';

var agenda = require('agenda')(),
	mongoose = require('mongoose'),
	jobs = mongoose.connection.collection('jobs');

// Connect to job queue

jobs.ensureIndex({
    nextRunAt: 1, 
    lockedAt: 1, 
    name: 1, 
    priority: 1
}, function() {});

agenda.mongo(jobs);

// Set schedule

agenda.purge(function(err, numRemoved) {});

agenda.create('dailyPullComEd').schedule('3:15pm').repeatEvery('30 minutes').save();
//agenda.create('hourlyPullComEd').schedule('11:42am').repeatEvery('1 minute').save();	

module.exports = agenda;
