import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      email
      birthdate
      subject
    }
  }
`;

class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_STUDENTS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF STUDENTS
                  </h3>
                  <h4><Link to="/create">Add Student</Link></h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Subject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.students.map((student, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${student._id}`}>{student.name}</Link></td>
                          <td>{student.email}</td>
                          <td>{student.birthdate}</td>
                          <td>{student.subject}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;