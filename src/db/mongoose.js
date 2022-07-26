const mongoose=require('mongoose')
// const validator=require('validator')

mongoose.connect(process.env.MONGODB_URL)

// const User=mongoose.model('User',{
//     name:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//             console.log(validator.isEmail(value))
//         }
//     },
//     age:{
//         type: Number,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value){
//             if(value.toLowerCase().includes('password'))
//             {
//                 throw new Error('Password can not contain "password"')
//             }
//         }

//     }
// })
// const me= new User({
//     name: "Nguyen Ngoc Nam",
//     email: "nam@gmail.com",
//     password: "123456890"
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

// const Task=mongoose.model('Task',{
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const addTask= new Task({
//     description: "Learn NodeJS",
//     completed: false
// })
// addTask.save().then(()=>{
//     console.log(addTask)
// }).catch((error)=>{
//     console.log(error)
// })