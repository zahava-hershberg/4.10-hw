import React from 'react';
import PersonForm from './PersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';
class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditing: false,
        checkedPeople: []


    }
    loadPeople = () => {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data });
        });
    }

    componentDidMount = () => {
        this.loadPeople();
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });

    }

    onEditClick = (person) => {
        this.setState({
            isEditing: true, person: {
                id: person.id,
                firstName: person.firstName,
                lastName: person.lastName,
                age: person.age
            }
        })


    }
    onUpdateClick = () => {
        axios.post('api/people/edit', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                isEditing: false
            })
        })
    }
    onCancelClick = () => {
        this.setState({
            isEditing: false, person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }
    onDeleteClick = (person) => {
        axios.post('api/people/delete', person).then(response => {
            this.loadPeople();
           
        })
    }
    onCheckAll=()=>{
        this.setState({checkedPeople:[...this.state.checkedPeople]})
    }
    // onCheckAll = () => {
    //     this.setState({ checkedPeople: this.state.people.map(p => p.id) });
    // }
    onUncheckAll = () => {
        this.setState({ checkedPeople: [] })
    }

    onCheckChange = (id) => {
        const { checkedPeople } = this.state;
        if (checkedPeople.includes(id)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p !== id) });
        } else {
            this.setState({ checkedPeople: [...checkedPeople, id] });
        }
    }
  
    onDeleteAllClick = () => {
        const idsToDelete=[...this.state.checkedPeople]
        axios.post('api/people/deleteall', { ids: idsToDelete }).then(response => {
            this.loadPeople()
            
        })
    }



    render() {
        const { firstName, lastName, age } = this.state.person;
        const { people, isEditing, checkedPeople } = this.state;
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <PersonForm
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        onTextChange={this.onTextChange}
                        onAddClick={this.onAddClick}
                        isEditing={isEditing}
                        onCancelClick={this.onCancelClick}
                        onUpdateClick={this.onUpdateClick}

                    />


                    <div className='col-md-12'>
                        <table className='table table-hover table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th width='15%'>
                                        <button onClick={this.onDeleteAllClick} className='btn btn-danger w-100'>Delete All</button>
                                        <button onClick={this.onCheckAll} className='btn btn-outline-danger w-100'>Check All</button>
                                        <button onClick={this.onUncheckAll} className='btn btn-outline-danger w-100'>Uncheck All</button>
                                    </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map(person => (
                                    <PersonRow
                                        key={person.id}
                                        person={person}
                                        onEditClick={() => this.onEditClick(person)}
                                        onDeleteClick={() => this.onDeleteClick(person)}
                                        isChecked={checkedPeople.includes(person.id)}
                                        onCheckChange={() => this.onCheckChange(person.id)}
                                    />
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        )


    }
}
export default PeopleTable