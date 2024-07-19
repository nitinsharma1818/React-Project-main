const Joi = require('joi')

/**Joi validation for user registration and updation */
const userValidationSchema = Joi.object({
    userName : Joi.string()
                  .min(3)
                  .max(30)
                  .pattern(new RegExp('^[a-zA-Z ]+$'))
                  .required(),

    userEmail : Joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required(),

    userPassword : Joi.string()
                      .min(8)
                      .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                      .required(),
                      
    userConfirmPassword : Joi.ref('userPassword'),

    userContact : Joi.string()
                     .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))  
                     .required()        
})
/**Joi validation for logging in to the profile */
const loginValidationSchema = Joi.object({
    userEmail : Joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required(),

    userPassword : Joi.string()
                      .min(8)
                      .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                      .required()     
})
const adminValidationSchema = Joi.object({
    adminName : Joi.string()
                  .min(3)
                  .max(30)
                  .pattern(new RegExp('^[a-zA-Z ]+$')),
    adminEmail : Joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required(),

    adminPassword : Joi.string()
                      .min(8)
                      .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                      .required()     
})

const movieValidationSchema = Joi.object({
    movieImageUrl : Joi.string()
                       .pattern(new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')) 
                       .required(),
    movieVideoUrl : Joi.string()
                    //    .pattern(new RegExp('^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$'))   
                       .required(),
    movieName : Joi.string()
                   .pattern(new RegExp('^[a-zA-Z0-9 ]+$'))
                   .required(),
    ticketCost : Joi.number()
                    .min(190)
                    .max(500)
                    .required(),
    description : Joi.string()
                     .pattern(new RegExp('^[a-zA-Z\.0-9\, ]+$'))
                     .min(10)
                     .required() ,
    actorName : Joi.string()
                   .min(3)
                   .max(30)
                   .pattern(new RegExp('^[a-zA-Z ]+$'))
                   .required(),
    directorName : Joi.string()
                      .min(3)
                      .max(30)
                      .pattern(new RegExp('^[a-zA-Z ]+$'))
                      .required() ,
    startBookingDate : Joi.date()
                          .greater(new Date())
                          .required(),
    endBookingDate   : Joi.date()  
                          .greater(new Date())
                          .required()      
})

const showValidationSchema = Joi.object({
    showDate : Joi.date()
                  .greater(new Date(Date.now()))
                  .required(),
    movieName : Joi.string()
                   .pattern(new RegExp('^[a-zA-Z0-9 ]+$'))
                   .required(),
    seats : Joi.array()
               .required()
})
module.exports = {
    userValidationSchema,
    loginValidationSchema,
    movieValidationSchema,
    adminValidationSchema
}