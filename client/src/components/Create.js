import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_student = gql`
    mutation Addstudent(
        $name: String!,
        $email: String!,
        $phone: String!,
        $birthdate: String!,
        $subject: String!) {
        addstudent(
            name: $name,
            email: $email,
            phone: $phone,
            birthdate: $birthdate,
            subject: $subject) {
                _id
        }
    }
`;

class Create extends Component {
  
    render() {
      let name, email, phone, birthdate, subject;
      return (
        <Mutation mutation={ADD_student} onCompleted={() => this.props.history.push('/')}>
            {(addstudent, { loading, error }) => (
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD STUDENTS
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">student List</Link></h4>
                            <form onSubmit={e => {
                                e.preventDefault();
                                addstudent({ variables: { name: name.value, email: email.value, phone: phone.value, birthdate: birthdate.value, subject: subject.value } });
                                name.value = "";
                                email.value = "";
                                phone.value = "";
                                birthdate.value = "";
                                subject.value = "";
                            }}>

                                <div className="form-group">
                                    <label htmlFor="name">name:</label>
                                    <input type="text" className="form-control" name="name" ref={node => {
                                        name = node;
                                    }} placeholder="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">email:</label>
                                    <input type="text" className="form-control" name="email" ref={node => {
                                        email = node;
                                    }} placeholder="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Phone</label>
                                    <input type="number" className="form-control" name="phone" ref={node => {
                                        phone = node;
                                    }} placeholder="Phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">birthdate:</label>
                                    <input type="text" className="form-control" name="birthdate" ref={node => {
                                        birthdate = node;
                                    }} placeholder="birthdate" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Subject</label>
                                    <input type="text" className="form-control" name="subject" ref={node => {
                                        subject = node;
                                    }} placeholder="Subject" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;