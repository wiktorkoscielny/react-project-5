import { Component } from "react";
import axios from "axios";

class TodoApp extends Component {
    state = {
        state1: '',
        state2: '',
            todos: [
                {
                    firstName: '',
                    lastName: '',
                    id: ''
                }
            ]
    }

    fetchData = async () => {
        try {
            await axios.get(`http://localhost:3000/todos`)
                .then(res => {
                // console.log(res)
                const todos = res.data;
                this.setState({
                    ...todos,
                    todos
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    handleOnChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:3000/todos` , {
                firstName: this.state.state1,
                lastName: this.state.state2,
            })
            .then(res => {
                // console.log(res)
                this.setState({
                    state1: '',
                    state2: '',
                        todos: [
                            ...this.state.todos,
                            {
                                firstName: res.data.firstName,
                                lastName: res.data.lastName,
                                id: res.data.id
                            }
                        ]
                })
            })
        } catch (err) {
            console.log(err)
        }
    }




    render() {
        return(
            <>
                <form
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <input
                        type='text'
                        id='firstNameInput'
                        name='firstNameInput'
                        placeholder='Enter Your First Name'
                        value={this.state.state1}
                        onChange={(e) => this.handleOnChange(e, 'state1')}
                    >
                    </input>
                    <input
                        type='text'
                        id='lastNameInput'
                        name='lastNameInput'
                        placeholder='Enter Your Last Name'
                        value={this.state.state2}
                        onChange={(e) => this.handleOnChange(e, 'state2')}
                    >
                    </input>
                    <button type="submit">Add</button>
                </form>


                <ul>
                    {this.state.todos.map((todo) => {
                        return(
                            <li key={todo.id}>
                                {todo.firstName}
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }

}

export default TodoApp;