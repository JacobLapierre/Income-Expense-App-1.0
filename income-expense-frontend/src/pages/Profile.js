import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
    const [user, setUser] = useState({
        username: "",
        income: "",
        savings: "",
        savingGoal: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/getById/${id}`);
        setUser(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Profile</h2>

                    <div className="card">
                        <div className="card-header">
                            <b>ID #: </b> {user.id}
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <b>Username: </b>
                                    {user.username}
                                </li>
                                <li className="list-group-item">
                                    <b>Yearly Income: </b>$
                                    {user.income}
                                </li>
                                <li className="list-group-item">
                                    <b>Savings: </b>$
                                    {user.savings}
                                </li>
                                <li className="list-group-item">
                                    <b>Savings Goal: </b>$
                                    {user.savingGoal}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        {/* `/graphs/${id}` */}
                    </div>
                    <Link className="btn btn-primary mx-1 my-2" to={`/bargraph/${id}`}>
                        Expense Charts
                    </Link>
                    <Link className="btn btn-primary mx-1 my-2" to={`/linegraph/${id}`}>
                        Saving Over Time
                    </Link>
                    <Link className="btn btn-outline-dark mx-1" to={`/viewexpense/${id}`}>
                        Expenses
                    </Link>
                </div>
            </div>
        </div>
    );
}