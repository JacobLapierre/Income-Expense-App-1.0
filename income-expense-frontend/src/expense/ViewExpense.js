import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ViewUser() {
    let navigate = useNavigate();

    const [users, setUsers] = useState([])

    const { id } = useParams()

    useEffect(() => {
        loadExpense();
    }, [])

    const loadExpense = async () => {
        const result = await axios.get(`http://localhost:8080/exp/getAll/fk/${id}`)
        setUsers(result.data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`http://localhost:8080/exp/delete/${id}`)
        loadExpense()
    };

    return (

        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 rounded p-4 mt-2">
                    <Link
                        className="btn btn-primary mx-2" to={`/profile/${id}`}>
                        Go Back
                    </Link>
                    <Link className="btn btn-outline-dark mx-2" to={`/addexpense/${id}`}>
                        Add Expense
                    </Link>
                </div>
            </div>
            <div className='py-4'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Expense</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Occurrence</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{user.id}</td> */}
                                    <td>{user.name}</td>
                                    <td>{user.cost}</td>
                                    <td>{user.type}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary mx-2"
                                            to={`/editexpense/${user.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => deleteExpense(user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

