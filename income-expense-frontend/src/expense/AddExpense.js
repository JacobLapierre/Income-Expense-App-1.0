import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



function AddExpense() {
    let navigate = useNavigate();

    const { id } = useParams()

    const [name1, setName] = useState("");
    const [cost1, setCost] = useState("");
    const [type1, setType] = useState("");

    const handlename = (event) => {
        const name = event.target.value;
        setName(name);
    };


    const handlecost = (event) => {
        const cost = event.target.value;
        setCost(cost);
    };

    const handletype = (event) => {
        const type = event.target.value;
        setType(type);
    };

    const submitUser = async (e) => {
        e.preventDefault();
        const userdata = {
            name: name1,
            cost: cost1,
            type: type1,
        };
        await axios.post(`http://localhost:8080/exp/new/${id}`, userdata)
            .then((result) => {

                console.log(result.data);

            });
        navigate(-1);
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Expense</h2>

                    <form onSubmit={submitUser}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name of expense"
                                name="name"
                                onChange={(e) => handlename(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Cost
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter cost of expense"
                                name="cost"
                                onChange={(e) => handlecost(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Write:  'daily'  'weekly'  'monthly'  'yearly'  or 'onetime'
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter how often the expense occurs"
                                name="type"
                                onChange={(e) => handletype(e)}
                            />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-outline-primary my-2">
                                Submit
                            </button>
                            <Link className="btn btn-outline-danger mx-2" to={`/profile/${id}`}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddExpense;