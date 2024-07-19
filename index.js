const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const path = require('path')

const dbPath = path.join(__dirname, 'demodb.db')
let db = null

app.use(express.json())

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`DB Error : ${error.message}`)
    process.exit(1)
  }
}
initializeDbAndServer()

app.get('/', async (req, res) => {
    // const getUserQuery = 'create table google_keep(id INT PRIMARY KEY, title VARCHAR(50), description VARCHAR(500), date VARCHAR(25));'
    // const getUserQuery = "INSERT INTO google_keep (id, title, description, date) VALUES (1, 'cardDetails', 'axis bank details', 'July 18, 2024');"
  const getUserQuery = `select * from google_keep;`
  const userDbDetails = await db.all(getUserQuery)
  console.log("DB Value", userDbDetails)
  res.send(userDbDetails)
})

app.post('/insertCard', async (req, res) => {
  const {title, description, date} = req.body
    const getUserQuery = `select * from google_keep;`
  const getNoteLength = await db.all(getUserQuery)
const insertNotes = `INSERT INTO google_keep (id, title, description, date) VALUES('${getNoteLength.length+1}','${title}','${description}','${date}');`
console.log("INSERT", insertNotes)
const userDbDetails = await db.run(insertNotes)
console.log("DB Value", userDbDetails)
res.send(userDbDetails)
})

// app.listen(3000)