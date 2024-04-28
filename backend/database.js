import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

todoEntry().catch(err => console.log(err));

// DB Schema
const toDoSchema = new mongoose.Schema({
  Entry_Date: { type: Date, default: Date.now },
  Must_Do: [{
      value: String,
      completed: Boolean
  }],
  Should_Do: [{
      value: String,
      completed: Boolean
  }],
  Could_Do: [{
      value: String,
      completed: Boolean
  }],
  I_Have_Time: [{
      value: String,
      completed: Boolean
  }]
})

const toDoModel = mongoose.model('toDoModel', toDoSchema);

// To make new entry
async function newTodoEntry(dataEntry) {
  todoEntry();
  console.log("Database connectivity sucessfully established...");

  const todoNewEntry = new toDoModel;
  todoNewEntry.Entry_Date = dataEntry.data.Entry_Date,
  todoNewEntry.Must_Do = dataEntry.data.Must_Do,
  todoNewEntry.Should_Do = dataEntry.data.Should_Do,
  todoNewEntry.Could_Do = dataEntry.data.Could_Do,
  todoNewEntry.I_Have_Time = dataEntry.data.I_Have_Time

  await todoNewEntry.save()
  console.log("New Todo Entry done!")

  await mongoose.disconnect();
}

// To Establish DB connectivity
async function todoEntry() {
  await mongoose.connect(process.env.DB_CONN_STRING);

}

export {newTodoEntry}

