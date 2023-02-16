const events = require('express').Router();
const Event = require('../../models/events');

events.get('/', async (req,res) => {
    const events = await Event.findAll()
})

//Create Event
events.post('/', async (req,res) => {
   const {eventName, eventDate, eventTime, eventLocation, eventDescription, userId} = req.body
   if(eventName && eventDate && eventTime && eventLocation && eventDescription && userId) {
    try {
        const foundOverlappedEvent = await Event.findOne({ where: { eventDate, eventTime, userId } });
        if(foundOverlappedEvent) {
            res.status(400).send(`An event named ${eventName}, already exists at this date and time`)
            return
        }
        const newEvent = await Event.create({ eventName, eventDate, eventTime, eventLocation, eventDescription, userId });
        res.json(newEvent)
    } catch (error) {
        res.status(500).send()
    }
   } else {
    res.status(400).send()
   }   
})

// events.get('/:eventId', async (req,res) => {
//     const {eventId} = req.params
//     if(eventId){
//         try {
//             const foundUser = await User.findOne({ where: { eventId } });
//             if(foundUser){
//                 res.json(foundUser)
//             } else {
//                 res.status(404).send()
//             }
//         } catch (error) {
//             res.status(500).send()   
//         }    
//     } else {
//         res.status(400).send()
//     }
// })


module.exports = events;