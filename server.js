const mongoose = require ("mongoose");
const Person = require('./models/Person')


MONGO_URI="mongodb+srv://Boutheina:bibadev07@cluster0.j3szbqj.mongodb.net/contact?retryWrites=true&w=majority"

// connecting to database
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database is connected !!'))
.catch((error) => console.log(error))


// *************************************   Create and Save a Record of a Model ****************
//  creating a new person
// const person = new Person({
//     name: 'Adem',
//     age: 14,
//     favoriteFoods: ['Pizza']
// });

// saving the new person to database
// person.save()
// .then(() => console.log('New person added'))
// .catch((error) => console.log(error))

// *********************************************   Create Many Records with model.create()   **********
 // const arrayOfPeople = [
  // {name: 'Youssef', age: 13, favoriteFoods: ['Pasta'] }, 
  // {name: 'Khaled', age: 9, favoriteFoods: ['Crêpes, Lasagnes']}
  
// ]

 //  Person.create(arrayOfPeople)
 //  .then(() => console.log('New persons added'))
 //  .catch((error) => console.log(error))
   
//*********************************************  Use model.find() to Search Your Database *************/

// const findPeopleByName = (personName, done)=> {
 //  Person.find({"name":personName},(err,data)=>{
 //  if(err) return done(err)
//    return done(null,data)
 //   })  

 // };
/*************************************** Model.findOne() -> Person*********************/
//const findOneByFood = (favFood, ok) => {
// Person.findOne({favoriteFoods: favFood}, (err, personFood)=> {
//    if (err) return console.log(err);
//    ok (null, personFood) 
//   } )
//  };
/******************************************** model.findById() *********************/ 
//const findPersonById = (personId, ok) =>{
//  Person.findById (personId,(err, data) =>{
   
// if (err) return console.log(err);
//    ok (null, data) 
//  });
 
//};

/*************************************Find, Edit, then Save ************************ */
const findEditThenSave = (personId, data) => {
  const foodToAdd = 'hamburger';
 
  // .findById() method to find a person by _id 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
   
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods.
    person.favoriteFoods.push(foodToAdd);
 
    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      data (null, updatedPerson)
    });
  })
};
/************************************model.findOneAndUpdate()*****************************/ 
const findAndUpdate = (personName, data) => {
  const ageToSet = 20;
 
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    data(null, updatedDoc);
  });
};
/*********************Delete One Document Using model.findByIdAndRemove********************** */

const removeById = (personId, data) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err);
    data(null, removedDoc);
  });
};
/****************************Delete Many Documents with model.remove()************** */
const removeManyPeople = (data) => {
  const nameToRemove = "Adem";
 
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    data(null, response);
  });
};
/********************Chain Search Query Helpers to Narrow Search Results ***************** */
const queryChain = (done) => {
  var foodToSearch = "burritos";
 
  Person
  .find({favoriteFoods: foodToSearch})
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};
/******************************************************************************************* */






