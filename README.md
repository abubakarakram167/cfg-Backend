CFG social app

### Requirements

For development, you will only need Node.js and a node global package, npm/Yarn, installed in your environement.

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
    
#### Configure app
- copy `.env.exmple` and create `.env`
- create an empty `mysql` db with name opinia
- add your enviornment variables in `.env`

For migrations:

    sequelize-cli db:migrate

For seed data:

    sequelize-cli db:seed:all

#### Run express app
    npm start
