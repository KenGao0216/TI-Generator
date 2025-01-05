import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transactionModel from "../models/transactionModel.js"

const registerUser = async (req,res)=> {
        try {
            const {name,email,password} = req.body;

            if(!name || !email || !password){
                return res.json({success:false, message: 'incorrect details'})
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const userData = {
                name, email, password: hashedPassword
            }

            const newUser = new userModel(userData)
            const user = await newUser.save()

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success:true, token, user: {name: user.name}})

        } catch (error) {
            console.log(error) 
            res.json({success: false, message: error.message})
        }
}

const loginUser = async (req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message: 'user does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success:true, token, user: {name: user.name}})
        }
        else{
            return res.json({succss:false, message: 'invalid credentials'})
        }
    } catch (error) {
        console.log(error) 
        res.json({success: false, message: error.message})
    }
}

const userCoins = async(req, res)=> {
    try {
        const {userId} = req.body

        const user = await userModel.findById(userId)
        res.json({success: true, coins: user.coinBalance, user:{name: user.name}})
    } catch (error) {
        console.log(error) 
        res.json({success: false, message: error.message})
    }
}

const addCoins = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing details" });
        }
        
        let coins;
        switch (planId) {
            case "Basic":
                coins = 100;
                break;
            case "Advanced":
                coins = 300;
                break;
            case "Super":
                coins = 700;
                break;
            default:
                return res.json({ success: false, message: "Invalid plan" });
        }
        const newBalance = userData.coinBalance + coins;
        await userModel.findByIdAndUpdate(userId, { coinBalance: newBalance });

        await transactionModel.create({
            userId,
            plan: planId,
            coins,
            date: Date.now(),
            payment: true
        });

        res.json({ success: true, message: "Coins added successfully", newBalance });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {registerUser, loginUser, userCoins, addCoins}