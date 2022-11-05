import React, { useEffect, useState } from "react";
import {
    Checkbox,
    Divider,
    Form,
    Grid,
} from "semantic-ui-react";
import CloseBtn from '../assets/close-btn.svg';
import ResetBtn from '../assets/reset-icon.svg';
import AddIcon from '../assets/add-icon.svg';

import '../css/style.css';
var formatThousands = require("format-thousands");


const Calculator = () => {
    const [earnings, setEarnings] = useState([
        { value: 20000, checked: false },
        { value: 10000, checked: true },
    ]);
    const [deductions, setDeductions] = useState([5000]);
    const [basicSalary, setBasicSalary] = useState(100000);

    const addEarnings = () => {
        setEarnings([...earnings, { value: "", checked: false }]);
    };

    const deleteEarnings = (idx) => {
        earnings.splice(idx, 1);
        setEarnings([...earnings]);
    };

    const setEarningValues = (idx, e) => {
        let earn = earnings;
        earn[idx] = { value: Number(e.target.value) };
        setEarnings([...earn]);
    };

    const addDeductions = () => {
        setDeductions([...deductions, ""]);
    };

    const deleteDeductions = (idx) => {
        deductions.splice(idx, 1);
        setDeductions([...deductions]);
    };

    const setDeductionValues = (idx, e) => {
        let deduct = deductions;
        deduct[idx] = e.target.value;
        setDeductions([...deduct]);
    };


    const formReset = () => {
        setEarnings([{ value: 0, checked: false }]);
        setDeductions([0]);
        setBasicSalary(0);
    }

    const setETF = (idx) => {
        let earn = earnings;
        earn[idx] = { ...earn[idx], checked: !earn[idx].checked };
        setEarnings([...earn]);
    };

    const getBasicSalary = () => {
        let tot = earnings.reduce((acc, curr) => {
            return acc + Number(curr.value);
        }, 0);
        return tot;
    };

    const getTotalDeduction = () => {
        let tot = deductions.reduce((acc, curr) => {
            return acc + Number(curr);
        }, 0);
        return tot;
    };

    const EmployerEPF = (per) => {
        let tot = earnings
            .filter((item) => {
                return item.checked === true;
            })
            .map((item) => {
                return item.value;
            });
        return ((Number(basicSalary) + Number(tot)) * per) / 100;
    };

    const netSalary = () => {
        return Number(basicSalary) + getBasicSalary() - getTotalDeduction() - EmployerEPF(8);
    };

    const costToCompany = () => {
        return (
            Number(basicSalary) + getBasicSalary() - getTotalDeduction() + EmployerEPF(12) + EmployerEPF(3)
        );
    };

    useEffect(() => {
        console.log(earnings);
    });
    return (
        <div>
            <Grid>
                <Grid.Row className="gap">
                    <Grid.Column className="left-container">
                        <div className="container-space">
                            <Form>
                                <div className="flex-space-between mb-24 ">
                                    <div className="heading-4">Calculate Your Salary </div>

                                    <div className="flex-center" onClick={() => formReset()}>
                                        <img src={ResetBtn} width="24px" height="24px" alt='add-icon' />
                                        <p className="Button-Text ml-6">Reset</p>
                                    </div>
                                </div>
                                <div className="Body-Large-Semibold mb-8 ">
                                    Basic Salary
                                </div>
                                <input
                                    value={basicSalary}
                                    onChange={(e) => setBasicSalary(e.target.value)}
                                />

                                <div className="Body-Large-Semibold mt-24 mb-8" >
                                    Earnings
                                    <p className="Body-Small">
                                        Allowance, Fixed Allowance, Bonus and etc.
                                    </p>
                                </div>

                                {earnings.map((item, idx) => (
                                    <Grid columns={3} key={`Grid ${idx}`} >
                                        <Grid.Row style={{ display: 'flex', alignItems: 'center' }} className="mb-16">
                                            <Grid.Column computer={10} tablet={11} mobile={9} className="pl-0 " >
                                                <input
                                                    onChange={(e) => setEarningValues(idx, e)}
                                                    value={item.value}
                                                />
                                            </Grid.Column>

                                            <Grid.Column computer={6} tablet={2} mobile={6} style={{ display: 'flex', alignItems: 'center' }} className="pl-0">
                                                <img src={CloseBtn} onClick={() => deleteEarnings(idx)} width="32px" height="32px" alt='add-icon' className="close-btn-margin " />

                                                <Checkbox
                                                    label="EPF/ETF"
                                                    checked={item.checked}
                                                    onChange={() => setETF(idx)}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                ))}


                                <div color="blue" onClick={addEarnings} className="flex-center">
                                    <img src={AddIcon} width="24px" height="24px" alt='add-icon' />
                                    <p className="Button-Text">Add New Allowance</p>
                                </div>

                                <Divider />

                                <p className="Body-Large-Semibold">
                                    Deduction
                                    <p className="Body-Small">
                                        Salary, Advances, Loan, Deductions and all.
                                    </p>
                                </p>

                                {deductions.map((item, idx) => (
                                    <Grid columns={3} key={`Grid ${idx}`}>
                                        <Grid.Row style={{ display: 'flex', alignItems: 'center' }} className="mb-16">
                                            <Grid.Column computer={10} tablet={11} mobile={9} className="pl-0">
                                                <input
                                                    placeholder=""
                                                    value={item}
                                                    onChange={(e) => setDeductionValues(idx, e)}
                                                />
                                            </Grid.Column>
                                            <Grid.Column computer={2} tablet={2} mobile={6} className="pl-0">
                                                <img src={CloseBtn} onClick={() => deleteDeductions(idx)} width="32px" height="32px" alt='add-icon' className="close-btn-margin" />

                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                ))}

                                <div color="blue" onClick={addDeductions} className='flex-center'>
                                    <img src={AddIcon} width="24px" height="24px" alt='add-icon' />
                                    <p className="Button-Text">Add New Allowance</p>
                                </div>
                            </Form>
                        </div>
                    </Grid.Column>

                    <Grid.Column className='right-container'>
                        <div className="container-space">
                            <div className="heading-4 mb-24" >Your Salary</div>

                            <div className="flex-space-between mb-16">
                                <div className="Body-Default-Semibold ">
                                    Item
                                </div>

                                <div className="Body-Default-Semibold ">
                                    Amount
                                </div>
                            </div>


                            <div className="flex-space-between mb-8">

                                <div >Basic Salary</div>

                                <div>
                                    {formatThousands(parseFloat(basicSalary).toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>

                            <div className="flex-space-between mb-8">

                                <div >Gross Earnings</div>

                                <div>
                                    {formatThousands(getBasicSalary().toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>

                            <div className="flex-space-between mb-8">

                                <div size="small">Gross Deduction</div>
                                <div size="small">
                                    {formatThousands(getTotalDeduction().toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>
                            <div className="flex-space-between mb-24">

                                <div size="small">Employee EPF (8%)</div>

                                <div size="small">
                                    {formatThousands(EmployerEPF(8).toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>

                            <div className="flex-space-between border">

                                <div size="small">Net Salary(Take Home)</div>
                                <div size="small">
                                    {formatThousands(netSalary().toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>

                            <div className="Body-Default-Semibold mt-24 mb-16">
                                Contribute from the Employer
                            </div>
                            <div className="flex-space-between mb-8">

                                <div>Employer EPF (12%)</div>

                                <div>
                                    {formatThousands(EmployerEPF(12).toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>

                            <div className="flex-space-between mb-8">

                                <div>Employer EPF (3%)</div>
                                <div>
                                    {formatThousands(EmployerEPF(3).toFixed(2), {
                                        separator: ",",
                                    })}
                                </div>
                            </div>

                            <div className="flex-space-between mt-32">

                                <p size="small">CTC (Cost to Company)</p>
                                <p size="small">
                                    {formatThousands(costToCompany().toFixed(2), {
                                        separator: ",",
                                    })}
                                </p>
                            </div>

                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};
export default Calculator;
