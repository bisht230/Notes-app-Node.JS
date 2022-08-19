
const chalk = require('chalk');
const yargs = require('yargs');
const notes=require('./notes.js');

// create add command 

yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:{
          describe:'Note title',
          demandOption:true,
          type:'string'
        },
        body: {
           describe:'Note Body',
           demandOption:true,
           type:'string'
        }
      },
    handler(argv){
       notes.addNote(argv.title,argv.body);
    }
})

// creation of remove command
yargs.command({
    command:'remove',
    describe:'Removing a note',
    builder:{
     title : {
        describe:'Note title',
        demandOption:true,
        type:'string'
     }
    },
    handler(argv){
        notes.deleteNote(argv.title);
    }
})

// create list command
yargs.command({
    command:'list',
    describe:'List of notes',
    handler(){
        notes.listNotes();
    }
})

// creation of read command 
yargs.command({
    command:'read',
    describe:'Reading a note',
    builder : {
    title : {
        describe : 'Note title',
        demandOption : true,
        type : 'string'
    }
},
    
    handler(argv){
       notes.readNotes(argv.title)
    }
})

yargs.parse()
