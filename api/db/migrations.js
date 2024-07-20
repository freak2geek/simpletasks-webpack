import { Migrations } from 'meteor/quave:migrations';
import { Accounts } from 'meteor/accounts-base';
import { Tasks } from '../tasks/tasks';

Migrations.add({
  version: 1,
  name: 'Add a seed username and password.',
  async up() {
    await Accounts.createUserAsync({
      username: 'fredmaia',
      password: 'abc123',
    });
  },
});

Migrations.add({
  version: 2,
  name: 'Add a few sample tasks.',
  async up() {
    const user = await Accounts.findUserByUsername('fredmaia');
    await Tasks.insertAsync({
      description: 'Install Node@20',
      done: false,
      userId: user._id,
      createdAt: new Date(2024, 1, 1),
    });
    await Tasks.insertAsync({
      description: 'Install Meteor.js 3.0',
      done: false,
      userId: user._id,
      createdAt: new Date(2024, 1, 2),
    });
    await Tasks.insertAsync({
      description: 'Clone this repository',
      done: false,
      userId: user._id,
      createdAt: new Date(2024, 1, 3),
    });
  },
});

Migrations.add({
  version: 3,
  name: 'Add a task that is depending on the environment.',
  up: Meteor.wrapAsync(async (_, next) => {
    const createdAt = new Date();
    const { _id: userId } = Accounts.findUserByUsername('fredmaia');

    /* development:start */
    await Tasks.insertAsync({
      description: 'Deploy to Production',
      userId,
      createdAt,
    });
    /* development:end */

    /* production:start */
    await Tasks.insertAsync({
      description: 'Test Production',
      userId,
      createdAt,
    });
    /* production:end */

    next();
  }),
});
