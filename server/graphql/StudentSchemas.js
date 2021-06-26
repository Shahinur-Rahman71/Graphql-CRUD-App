var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var StudentModel = require('../models/Students');

var studentType = new GraphQLObjectType({
    name: 'student',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        phone: {
          type: GraphQLString
        },
        birthdate: {
          type: GraphQLString
        },
        subject: {
          type: GraphQLString
        }
      }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        students: {
          type: new GraphQLList(studentType),
          resolve: function () {
            const students = StudentModel.find().exec()
            if (!students) {
              throw new Error('Error')
            }
            return students
          }
        },
        student: {
          type: studentType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const studentDetails = StudentModel.findById(params.id).exec()
            if (!studentDetails) {
              throw new Error('Error')
            }
            return studentDetails
          }
        }
      }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addstudent: {
          type: studentType,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            phone: {
              type: new GraphQLNonNull(GraphQLString)
            },
            birthdate: {
              type: new GraphQLNonNull(GraphQLString)
            },
            subject: {
              type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: function (root, params) {
            const studentModel = new StudentModel(params);
            const newstudent = studentModel.save();
            if (!newstudent) {
              throw new Error('Error');
            }
            return newstudent
          }
        },
        updatestudent: {
          type: studentType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            phone: {
              type: new GraphQLNonNull(GraphQLString)
            },
            birthdate: {
              type: new GraphQLNonNull(GraphQLString)
            },
            subject: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
        resolve(root, params) {
            return StudentModel.findByIdAndUpdate(params.id, { name: params.name, email: params.email, phone: params.phone, birthdate: params.birthdate, subject: params.subject }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removestudent: {
          type: studentType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
        resolve(root, params) {
            const remstudent = StudentModel.findByIdAndRemove(params.id).exec();
            if (!remstudent) {
              throw new Error('Error')
            }
            return remstudent;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});