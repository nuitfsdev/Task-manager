const express=require('express')
const router=new express.Router()
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')

const upload=multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        //file.originalname.endsWith('.pdf')
        if(!file.originalname.match(/\.(jpg|png)$/)){
            cb(new Error('Please upload a jpg or png'))
        }
        cb(undefined,true)
    }
})

router.get('/users/me', auth , async(req,res)=>{
    res.send(req.user)
    // try{
    //     const users= await User.find({})
    //     res.send(users)
    // }catch(e){
    //     res.status(500).send()
    // }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

// router.get('/users/:id',async (req,res)=>{
//     const _id=req.params.id
//     try{
//         const user= await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //             return res.status(404).send()
//     //     }
//     //     res.status(201).send(user)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })
router.post('/users', async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuToken()
        res.send({user,token})
    } catch(e){ 
        res.status(400).send(e)
    }
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)

    // })
})
router.post('/users/login', async(req,res)=>{
    try{
        const user= await User.findByCredentials(req.body.email, req.body.password)
        const token=await user.generateAuToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logout')
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send('Logout All User')
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/me/avatar', auth , upload.single('avatar'), async (req,res)=>{
   const buffer=await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send('Upload success!')
},(error,req,res,next)=>{
    res.status(400).send(error.message)
})
router.patch('/users/me',auth, async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowUpdates=["name","age","password","email"]
    const isValidOperation=updates.every((update)=>{
        return allowUpdates.includes(update)
    })
    if(!isValidOperation)
    {
        return res.status(400).send("error: Invalid updates!")
    }
    try{
        //const user= await User.findById(req.params.id)
        //const user= await User.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true})
        const user= req.user
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})
router.delete('/users/me',auth, async(req,res)=>{
    try{
        // const user= await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(404).send()
        // }
        const userName=req.user.name
        await req.user.remove()
        res.send('Deleted user '+userName)
    }catch(e){
        res.status(500).send(e)
    }
})
router.delete('/users/me/avatar', auth, async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send('Delete success!')
},(error,req,res,next)=>{
    res.status(400).send(error.message)
})
router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(!user || !user.avatar)
        {
             throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send(e)
    }
})
module.exports= router