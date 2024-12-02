const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('../src/routers/authRoutes')
const taskRoutes = require('../src/routers/tasksRoutes')
const projectRoutes = require('../src/routers/projectRoutes');
const teamsRoutes = require('../src/routers/teamsRoutes')

require("dotenv").config({ path: "./config/.env" });
require("./db/mongoose")
// const contextPath = "/rest/api";
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
// app.use(contextPath)
require("./swagger/swagger")(app);
app.use(helmet());
app.use(cors());
const PORT = process.env.PORT;

app.use('/api/auth', authRoutes)
app.use('/api',taskRoutes)
app.use('/project',projectRoutes)
app.use('/Teams',teamsRoutes)


app.get('/', (req,res) => {
    res.send("hi this is task management application by stark")
})


const server = app.listen(PORT, () =>
    console.log(`server running on port ${PORT}`)
)