
const User=require('../models/User')
const Address=require('../models/Address')


const userRegister= async (req,res)=>{
    const {username,address}=req.body
    try{
        const isUserPresent= await User.findOne({username})
        console.log(isUserPresent!==null)
        if (isUserPresent){
            const user_id=isUserPresent._id
            const isAddressTaken= await Address.findOne({address})
            if (isAddressTaken){
                res.status(500).json("Address already taken")

            }else{
                const newAddress= new Address({
                    user_id,
                    address,
                })
                await newAddress.save()
                res.status(200).json({messege:"Details updated successfully"})

            }
            

            
        }

        else{
            const isAddressTaken= await Address.findOne({address})
            if(isAddressTaken){
                res.status(500).json("Address already taken")
            }else{
                const newUser= new User({
                    username
                })
        
                await newUser.save()
        
                const newUserId=newUser._id
                console.log(newUserId)
        
                const newAddress= new Address({
                    user_id:newUserId,
                    address:address
                })
        
                await newAddress.save()
                res.status(200).json({messege:"Details updated successfully"})
            }
            
        }

        


    }catch(error){
        console.log(error)
        res.status(500).json({Error:"internal Error"})


    }


}

module.exports={userRegister}