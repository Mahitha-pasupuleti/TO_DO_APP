import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { z } from "zod";

const app = express();
const PORT = process.env.PORT;

/* 
  Data Validation
*/
const dynamicItems = z.object({
  "value": z.string(),
  "completed": z.boolean()
})

const dateTransform = (value) => {
  const dateFormatRegex = /^(0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])(\/|-)(19|20)\d{2}$/;
  if(dateFormatRegex.test(value)) {
    return value;
  } else {
    return false;
  }
}

const typeChecking = z.object({
  "Entry_Date": z.string().transform(dateTransform),
  "Must_Do": z.array(dynamicItems).nonempty({message: "Must_Do must be kept in JSON even if no entry is made within"}),
  "Should_Do": z.array(dynamicItems).nonempty({message: "Should_Do must be kept in JSON even if no entry is made within"}),
  "Could_Do": z.array(dynamicItems).min(0),
  "I_Have_Time": z.array(dynamicItems).min(0)
})

// Parse JSON bodies
app.use(bodyParser.json());

// Creating a TO-DO list which contains (Date, Must-Do, Should_Do, Could_do, I_Have_Time)
app.get('/createTodo', function(req, res) {
  try {
    const dataEntry = typeChecking.safeParse(req.body);
    // Storing data in values
    const currentDate = dataEntry.data.Entry_Date;
    const mustDoItems = dataEntry.data.Must_Do;
    const shouldDoItems = dataEntry.data.Should_Do;
    const couldDoItems = dataEntry.data.Could_Do;
    const iHaveTimeItems = dataEntry.data.I_Have_Time;
    
    if(currentDate == false) {
      res.send("Enter a proper date in MM/DD/YYYY format");
    } else {
      res.send(dataEntry);
    }
  }
  catch(error){
    const dataEntry = typeChecking.safeParse(req.body);
    res.status(400).json({
      "Name": "ERROR",
      "Recieved Error": error,
      "Response": typeChecking.safeParse(req.body)
    })
  }
})

app.listen(PORT, () =>
  console.log('Example app listening on port 3000!')
);