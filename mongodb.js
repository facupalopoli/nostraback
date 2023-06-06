import mongoose from 'mongoose'

mongoose
.connect('mongodb://127.0.0.1:27017/nostraDB')
/* .connect('mongodb+srv://tpfinalmongo:Zy9GmI6t9zQqyHgO@tpfinaldb.g0hzp2c.mongodb.net/nostraDB') */
.then(()=>console.log('la db esta conectada'))
.catch(error=>console.log(error))