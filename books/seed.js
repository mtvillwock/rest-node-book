// // var models = require('../models');
// // var faker = require('faker');

// var seedFile = {

//         seed: function seed() {
//             var users = ["Frank", "John", "Joe"]
//             for (var i = users.length - 1; i >= 0; i--) {
//                 console.log("iterations remaining: ", i);

//                 var fakeEmail = faker.internet.email();
//                 var fakePw = faker.internet.password();

//                 models.User.create({
//                     email: fakeEmail,
//                     password: fakePw
//                 })
//                     .then(function createUserSuccess(user) {
//                         console.log("new user created:", user);
//                     }, function createUserError(err) {
//                         console.log("error is:", err);
//                     })

//             };
//         }
//     }
//     // // models.List.create({
//     // //             name: body["name"],
//     // //             type: body["type"],
//     // //             UserId: req.session.user_id,
//     // //             user_id: req.session.user_id
//     // //         })
//     // //             .then(function createlistSuccess(list) {
//     // //                 console.log("list is: ", list);
//     // //             }, function createlistError(err) {
//     // //                 console.log("error is:", err);
//     // //             })

// // // models.Book.create({
// // //             author: body["author"],
// // //             title: body["title"],
// // //             list_id: req.params.id,
// // //             ListId: req.params.id //body["list_id"]
// // //         })
// // //             .then(function createBookSuccess(book) {
// // //                 console.log("book is: ", book);
// // //             }, function createBookError(err) {
// // //                 console.log("error is:", err);
// // //             })
// console.log("seed file", seedFile);
// return seedFile;

// module.exports = seed;