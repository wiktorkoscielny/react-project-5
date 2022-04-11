import { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
        width: fit-content;
        text-align: center;
        margin-top: 3%;
        margin-left: auto;
        margin-right: auto;
`

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

    handleDelete = async (id) => {
        try 
        {
            // rove item from ui
            let todos = this.state.todos.filter(item => item.id !== id);
            // then set state to todos without deleted todos
            this.setState({ todos });
            // delete data from api
            await axios.delete(`http://localhost:3000/todos/${id}`)
            .then(res => {
                console.log(res);
            })
        } catch (err) {
            console.log(err)
        }
    }

    deleteAll = () => {
        
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
                

            <Wrapper>

                <table border='3'>
                <caption>Users</caption>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.todos.map((todo) => {
                        return(
                            <tr key={todo.id}>
                                <td>{todo.firstName}</td>
                                <td>{todo.lastName}</td>
                                <td><button onClick={() => this.handleDelete(todo.id)}>X</button></td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3"></td>
                        <td><button onClick={() => this.handleDelete(todo.id)}></button></td>
                    </tr>
                </tfoot>
                </table>
                
            </Wrapper>

            </>
        )
    }

}

export default TodoApp;

// <ul>
//  {this.state.todos.map((todo) => {
//      return(
//          <li key={todo.id}>
//              {todo.firstName}
//              <button onClick={() => this.handleDelete(todo.id)}>X</button>
//          </li>
//      )
//  })}
// </ul>