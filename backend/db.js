import mongoose from 'mongoose';
import { config } from 'dotenv';
// config(); // Load environment variables from .env file

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONN_STRING);

  const toDoSchema = new Schema({
    "Entry_Date": { type: Date, default: Date.now },
    "Must_Do": [{
        "value": String,
        "completed": Boolean
    }],
    "Should_Do": [{
        "value": String,
        "completed": Boolean
    }],
    "Could_Do": [{
        "value": String,
        "completed": Boolean
    }],
    "I_Have_Time": [{
        "value": String,
        "completed": Boolean
    }]
  })

  const toDoModel = mongoose.model('toDoModel', toDoSchema);
  
}