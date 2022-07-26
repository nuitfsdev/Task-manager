const {MongoClient, ObjectId}=require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName='task-manager'

// const id= new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error, client)=>{
    if(error)
    {
        return console.log('Unable to connect to database!')
    }
    const db=client.db(databaseName)
    //-------Insert-------
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Nam',
    //     age: 20
    // }, (error, results)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert user!')
    //     }
    //     console.log('Successfully Insert!')
    //     console.log(results.insertedId)
    // })
    //------Query--------
    // db.collection('users').findOne({name: 'Nam'}, (error, user)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    //------Update---------
    // const updatePromise= db.collection('users').updateOne(
    //     {_id: new ObjectId("62d441223da7f3e1c219d2c0")},
    //     {
    //         // $set:{

    //         //     name: "Ngoc Nam"
    //         // }
    //         $inc:{
    //             age: 1
    //         }
        
    //     })
    // updatePromise.then((result)=>{
    //     console.log(result)

    // }).catch((error)=>{
    //     console.log(error)
    // })
    //-----------Delete------------
    db.collection('users').deleteOne({
        name: "Nam"
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

})