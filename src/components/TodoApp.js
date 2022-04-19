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
        state3: '',
            todos: [
                {
                    firstName: '',
                    lastName: '',
                    salary: 0,
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
                salary: this.state.state3
            })
            .then(res => {
             console.log(res);
                this.setState({
                    state1: '',
                    state2: '',
                    state3: '',
                        todos: [
                            ...this.state.todos,
                            {
                                firstName: res.data.firstName,
                                lastName: res.data.lastName,
                                salary: res.data.salary,
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
    
// First Idea...
  //  handleAllDelete = (id) => {
  //  // remove item from ui
  //  const todos = this.state.todos.filter(item => item.id !== item.id);
  //  // then set state to todos without deleted todos
  //  this.setState({ todos });
  //  console.log(todos)
  //  // delete data from api
  //  // ?
  //  const arrayids = [];
  //  this.state.todos.forEach(item => {
  //      if (parseInt(item.id)) {
  //          arrayids.push(parseInt(item.id))
  //      }
  //      console.log(arrayids)
  //      
  //  })
  //      
  //        
  //   axios.delete(`http://localhost:3000/todos/${arrayids}`)
  //   .then(res => {
  //       console.log(res);
  //   })      
  //  }

// Second idea...
//removeTodo = (id) => {
//    //  clear the data from UI
//    const todos = [...this.state.todos]
//    todos.splice(id, 0)
//    this.setState({
//      todos
//    })
//    console.log(id)
//     // Delete data from backend 
//     axios.delete(`http://localhost:3000/todos/${id}`)
//       .then(res => {
//         // console.log(res.data);
//         const todos = [...this.state.todos]
//         todos.splice(id, 0)
//         this.setState({
//           todos
//         })
//       })
//  }


    render() {
        
        
        const sumOfSalary = this.state.todos.reduce((acc, i) => acc + parseInt(i.salary), 0);

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
                    <input
                        type='number'
                        id='salaryInput'
                        name='salaryInput'
                        placeholder='Enter Your Salary'
                        value={this.state.state3}
                        onChange={(e) => this.handleOnChange(e, 'state3')}
                    >
                    </input>
                    <button type="submit" disabled={!this.state.state3}>Add</button>
                </form>
                

            <Wrapper>

                <table border='3'>
                <caption>Users</caption>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.todos.map((todo) => {
                        return(
                            <tr key={todo.id}>
                                <td>{todo.firstName}</td>
                                <td>{todo.lastName}</td>
                                <td>{todo.salary}</td>
                                <td><button onClick={() => this.handleDelete(todo.id)}>X</button></td>
                            </tr>
                            
                        )
                    })}
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Summary</td>
                        <td colSpan="2">{sumOfSalary}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">Delete All<button>X</button></td>
                    </tr>
                </tfoot>
                </table>
                
            </Wrapper>

            </>
        )
    }

}

export default TodoApp;
// add salary and sum it up
// add search function


   