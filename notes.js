const fs=require('fs');
const chalk = require('chalk')

const addNote = (title,body) => {
    const notes=loadNotes()
    const duplicateNote=notes.find((note)=>{
        return note.title === title
    })
    if(!duplicateNote){
        notes.push({
            title: title,
            body : body
        })
        savedNotes(notes)
        console.log("New note added!!")
     }
     else{

        console.log('Note title taken!')
     }
}
const savedNotes = (notes)=>{
     const dataJSON=JSON.stringify(notes)
     fs.writeFileSync('notes.json',dataJSON) 
}
const loadNotes = ()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json');
        const dataJSON=dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
       return []
    }
    
}

const deleteNote = (title)=>{
    const notes=loadNotes()
    const notesToKeep = notes.filter((note)=>{
        return note.title!=title
    })
    if(notes.length > notesToKeep.length){
     console.log(chalk.bgGreen('Note removed ! '))
     savedNotes(notesToKeep);
    }
    if(notes.length===notesToKeep.length){
        console.log(chalk.bgRed('Note not founded !'))
    }
}

const listNotes = () =>{
   console.log(chalk.blue('Your notes : '))
   const notes = loadNotes()
   notes.forEach((note)=>{
     console.log(note.title);
   })
}

const readNotes = (title) =>{
   const notes = loadNotes()
   const readNote = notes.find((note)=> {
     return note.title === title
   })
   if(!readNote){
    console.log(chalk.bgRed('Error'))
   }
   else{
    console.log(chalk.inverse(readNote.title))
    console.log(readNote.body)
   }
}
module.exports={
    addNote : addNote,
    deleteNote :deleteNote,
    listNotes : listNotes,
    readNotes: readNotes
}