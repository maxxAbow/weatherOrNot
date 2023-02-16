const events = require('express').Router();
const Events = require('../../models/events');
const Event = require('../../models/events');

events.get('/:userId', async (req,res) => {
    const {userId} = req.params
    if(!userId){
        res.status(400).send('User ID not sent in request')
    }
    const events = await Event.findAll({ where: { userId } })
    const groupedEventsObject = {}
    events.forEach((event) => {
        const todaysEvents = groupedEventsObject[event.eventDate]
        const hoursAndMinutes = event.eventTime.split(':')
        let twelveHourFormat
        if(hoursAndMinutes[0] > 12){
            twelveHourFormat = `${parseInt(hoursAndMinutes[0]) - 12}:${hoursAndMinutes[1]} PM`
        } else {
            twelveHourFormat = `${hoursAndMinutes[0]}:${hoursAndMinutes[1]} AM`
        }
        if(!todaysEvents){
            groupedEventsObject[event.eventDate] = [{title: event.eventName, time: twelveHourFormat}]
        } else {
            groupedEventsObject[event.eventDate].push({title: event.eventName, time: twelveHourFormat})
        }
    })
    const finalEventStructure = []
    for(date in groupedEventsObject){
        const yearDayMonth = date.split('-')

        const dateEventsObject = { day: parseInt(yearDayMonth[2]), month: parseInt(yearDayMonth[1]), year: parseInt(yearDayMonth[0]), events: groupedEventsObject[date] }
        finalEventStructure.push(dateEventsObject)
    }
    res.json(finalEventStructure)
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

events.get('/:eventId', async (req,res) => {
    const {eventId} = req.params
    if(eventId){
        try {
            const foundEvent = await Events.findOne({ where: { id: eventId } });
            if(foundEvent){
                res.json(foundEvent)
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


module.exports = events;