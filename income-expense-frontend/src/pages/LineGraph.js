import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { subDays } from "date-fns";
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";

export default function LineGraph() {

    const { id } = useParams();

    const [user, setUser] = useState({
        username: "",
        income: "",
        savings: "",
        savingGoal: "",
    });
    const [data, setData] = useState([])

    useEffect(() => {
        loadUser();
    }, [])

    useEffect(() => {
        loadData();
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/getById/${id}`);
        setUser(result.data);
    };

    const loadData = async () => {
        const resultt = await axios.get(`http://localhost:8080/exp/getAll/fk/${id}`)
        setData(resultt.data);
    };

    var incomeDaily = user.income / 365
    var savings = user.savings
    var expenseDaily = 0;
    var onetime = 0;

    for (let i = data.length - 1; i >= 0; i--) {
        let tmp = data.at(i);
        if (tmp.type === "onetime") {
            onetime += parseFloat(tmp.cost);
        }
        if (tmp.type === "daily") {
            expenseDaily += parseFloat(tmp.cost);
        }
        if (tmp.type === "weekly") {
            expenseDaily += parseFloat(tmp.cost / 7);
        }
        if (tmp.type === "monthly") {
            expenseDaily += parseFloat(tmp.cost / 30);
        }
        if (tmp.type === "yearly") {
            expenseDaily += parseFloat(tmp.cost / 365);
        }
    }

    const updata = [];

    updata.push({
        date: subDays(new Date(), 0).toISOString().substr(0, 10),
        amount: Math.round((incomeDaily + savings) - (expenseDaily + onetime))
    })

    var tmpAmount = (incomeDaily + savings) - (expenseDaily + onetime)

    for (let i = 1; i < 364; i++) {
        updata.push({
            date: subDays(new Date(), -i).toISOString().substr(0, 10),
            amount: Math.round((incomeDaily - expenseDaily) + tmpAmount)
        })
        tmpAmount += (incomeDaily - expenseDaily)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2> Savings Over Time</h2>
                    <div className='py-4'>
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={updata}>
                                <Area dataKey="amount" />
                                <YAxis dataKey="amount" />
                                <XAxis dataKey="date" />
                                <Tooltip />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <Link className="btn btn-outline-danger mx-2" to={`/profile/${id}`}>
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    )
}
