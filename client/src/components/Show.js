import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const DELETE_student = gql`
  mutation removestudent($id: String!) {
    removestudent(id:$id) {
      _id
    }
  }
`;

class Show extends Component {

  render() {
    return (
        <Query pollInterval={500} query={GET_student} variables={{ studentId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4><Link to="/">Student List</Link></h4>
                                <h3 className="panel-title">
                                {data.student.name}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{data.student.name}</dd>
                                    <dt>Email:</dt>
                                    <dd>{data.student.email}</dd>
                                    <dt>Phone:</dt>
                                    <dd>{data.student.phone}</dd>
                                    <dt>date of birth</dt>
                                    <dd>{data.student.birthdate}</dd>
                                    <dt>subject:</dt>
                                    <dd>{data.student.subject}</dd>
                                </dl>
                                <Mutation mutation={DELETE_student} key={data.student._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removestudent, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removestudent({ variables: { id: data.student._id } });
                                                }}>
                                                <Link to={`/edit/${data.student._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Show;