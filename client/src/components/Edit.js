import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_student = gql`
    query student($studentId: String) {
        student(id: $studentId) {
            _id
            name
            email
            phone
            birthdate
            subject
        }
    }
`;

const UPDATE_student = gql`
    mutation updatestudent(
        $id: String!,
        $name: String!,
        $email: String!,
        $phone: String!,
        $birthdate: String!,
        $subject: String!) {
        updatestudent(
        id: $id,
        name: $name,
        email: $email,
        phone: $phone,
        birthdate: $birthdate,
        subject: $subject) {
            _id
        }
    }
`;

class Edit extends Component {

    render() {
        let name, email, phone, birthdate, subject;
        return (
            <Query query={GET_student} variables={{ studentId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_student} key={data.student._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateStudent, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">
                                                EDIT STUDENTS
                                            </h3>
                                        </div>
                                        <div className="panel-body">
                                            <h4><Link to="/" className="btn btn-primary">student List</Link></h4>
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateStudent({ variables: {id: data.student._id, name: name.value, email: email.value, phone: phone.value, birthdate: birthdate.value, subject: subject.value } });
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
                }}
            </Query>
        );
    }
}

export default Edit;