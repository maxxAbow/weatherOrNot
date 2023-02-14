const users = require('express').Router();
const User = require('../../models/users')
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt');
const saltRounds = 10;
users.get('/', async (req,res) => {
    const users = await User.findAll()
})

//Create User
users.post('/', async (req,res) => {
   const {displayName, emailAddress, password} = req.body
   if(displayName && emailAddress && password) {
    try {
        const foundUserWithEmail = await User.findOne({ where: { emailAddress } });
        if(foundUserWithEmail) {
            res.status(400).send(`User with the email address, ${emailAddress} already exists`)
        }
        const foundUserWithDisplayName = await User.findOne({ where: { displayName } });
        if(foundUserWithDisplayName) {
            res.status(400).send(`User with the display name, ${displayName} already exists`)
        }
        const createDate = new Date().toUTCString();
        const userId = uuidv4()
        bcrypt.hash(password, saltRounds, async (err, hash) => {
        // Store hash in your password DB.
        if(err) {
            throw new Error('Error hashing user password')
        }
        const newUser = await User.create({ displayName, emailAddress, password: hash, createDate, userId  });
        res.json(newUser)
    });
    } catch (error) {
        res.status(500).send()
    }
   } else {
    res.status(400).send()
   }   
})

users.get('/:userId', async (req,res) => {
    const {userId} = req.params
    if(userId){
        try {
            const foundUser = await User.findOne({ where: { userId } });
            if(foundUser){
                res.json(foundUser)
            } else {
                res.status(404).send()
            }
        } catch (error) {
            res.status(500).send()   
        }    
    } else {
        res.status(400).send()
    }
})

users.post('/login', async (req,res) => {
    const {emailAddress, password} = req.body
    if(emailAddress && password){
        try {
            const foundUser = await User.findOne({ where: { emailAddress } });
            if(!foundUser) {
                res.status(404).send()
                return
            }
            const {emailAddress: userEmailAddress, displayName, userId, createDate} = foundUser
            const activeUser = {
                emailAddress: userEmailAddress,
                displayName,
                userId,
                createDate
            }
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if(err) {
                    res.status(500).send()
                }
                if(!result){
                    res.status(400).send('Incorrect password')
                }
                res.status(200).json(activeUser)
            });
        } catch (error) {
            res.status(500).send()   
        }    
    } else {
        res.status(400).send()
    }
})

module.exports = users;