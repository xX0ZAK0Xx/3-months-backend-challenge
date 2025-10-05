import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ApiError from '../utils/apiError.js';

const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    const token = jwt.sign({id: user._id, email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
                    res.status(200).json({success: true, data: {token}});
                }else{
                    next(ApiError.unauthorized('Invalid email or password1'));
                }
            });
        }else{
            next(ApiError.unauthorized('Invalid email or password2'));
        }
    } catch (error) {
        
    }
};

export { signIn};