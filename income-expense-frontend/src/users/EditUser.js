import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        username: "",
        income: "",
        savings: "",
        savingGoal: "",
    });

    const { username, income, savings, savingGoal } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/update/${id}`, user);
        navigate("/");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/getById/${id}`);
        setUser(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="income" className="form-label">
                                Income
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your income"
                                name="income"
                                value={income}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Savings" className="form-label">
                                Savings
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your savings"
                                name="savings"
                                value={savings}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SavingGoal" className="form-label">
                                Savings Goal
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your saving goal"
                                name="savingGoal"
                                value={savingGoal}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

