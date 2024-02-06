import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { random } from 'lodash-es';
import { shortscale } from 'shortscale';
import { Tasks } from '../api/tasks/tasks';
import { checkLoggedIn } from '../api/lib/auth';

/* server:start */
const SECRET_WONT_LEAK_CLIENT = 'XXX';
// eslint-disable-next-line no-console
console.log('SECRET_WONT_LEAK_CLIENT', SECRET_WONT_LEAK_CLIENT);
/* server:end */

/* server:start */async/* server:end */ function insertRandomTask() {
    const description = `${Random.id()}/${shortscale(random(100))}`;
    checkLoggedIn();

    const task = {
        description,
        userId: Meteor.userId(),
        createdAt: new Date(),
    };

    if (Meteor.isClient) {
        return Tasks.insert(task);
    }

    if (Meteor.isServer) {
        return Tasks.insertAsync(task);
    }

    return null;
}

Meteor.methods({ insertRandomTask });
