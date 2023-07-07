import mongoose from 'mongoose'

mongoose
.connect('mongodb://127.0.0.1:27017/nostraGuille')
//.connect('mongodb+srv://tpfinalmongo:h3FlPOOR7ltruacL@tpfinaldb.g0hzp2c.mongodb.net/nostraDB')
.then(()=>console.log('la db esta conectada'))
.catch(error=>console.log(error))