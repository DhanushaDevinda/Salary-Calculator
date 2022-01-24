import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export class Earnings extends Component {

    constructor(props) {
        super(props);

        this.onChangeEarningsValue = this.onChangeEarningsValue.bind(this);

        this.onChangeDecuctionsValue = this.onChangeDecuctionsValue.bind(this);

        this.onChangeBasicSalary = this.onChangeBasicSalary.bind(this);

        this.state = {
            countEar: 1,
            countEarArray: [1],
            EarningsArray: [],
            EPFEarningsArray: [],
            TotalEarningsValue: 0,

            countDed: 1,
            countDedArray: [1],
            DeductionsArray: [],
            TotalDeductionsValue: 0,

            GrossSalary: 0,
            EPF8: 0,
            NetSalary: 0,
            ETF3: 0,
            EPF12: 0,
            CTC: 0
        };
    }

    addMoreEarnings = () => {
        let {countEar} = this.state;
        this.setState({
            countEar: countEar + 1
        });
        this.state.countEarArray.push(this.state.countEar)
        this.state.EarningsArray.push(this.state.EarningsValue)
        this.state.TotalEarningsValue = parseInt(this.state.TotalEarningsValue) + parseInt(this.state.EarningsValue);

        console.log(this.state.EarningsArray)
        console.log(this.state.TotalEarningsValue)
        this.calculateTotal();
        //this.state.GrossSalary = parseInt(this.state.BasicSalary) + parseInt(this.state.TotalEarningsValue);
        //this.state.EPF8 = ((parseInt(this.state.BasicSalary) + 10000) * 8) / 100;
        //  this.state.NetSalary = (parseInt(this.state.GrossSalary) - parseInt(this.state.TotalDeductionsValue)) - parseInt(this.state.EPF8)


        //    this.state.ETF3 = ((parseInt(this.state.BasicSalary) + 10000) * 3) / 100;
        //      this.state.EPF12 = ((parseInt(this.state.BasicSalary) + 10000) * 12) / 100;

//        this.state.CTC = (parseInt(this.state.GrossSalary) - parseInt(this.state.TotalDeductionsValue)) + (parseInt(this.state.ETF3) + parseInt(this.state.EPF12))

    }

    calculateTotal = () => {
        this.state.GrossSalary = parseInt(this.state.BasicSalary) + parseInt(this.state.TotalEarningsValue);
        //this.state.EPF8 = ((parseInt(this.state.BasicSalary) + 10000) * 8) / 100;
        //this.state.ETF3 = ((parseInt(this.state.BasicSalary) + 10000) * 3) / 100;
        //this.state.EPF12 = ((parseInt(this.state.BasicSalary) + 10000) * 12) / 100;

        // this.state.ETF3 = ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 3) / 100;
        // this.state.EPF12= ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 12) / 100;
        // this.state.EPF8= ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 8) / 100;

        this.state.GrossSalary = parseInt(this.state.BasicSalary) + parseInt(this.state.TotalEarningsValue);
        this.state.CTC = (parseInt(this.state.GrossSalary) - parseInt(this.state.TotalDeductionsValue)) + (parseInt(this.state.ETF3) + parseInt(this.state.EPF12));
        this.state.NetSalary = (parseInt(this.state.GrossSalary) - parseInt(this.state.TotalDeductionsValue)) - parseInt(this.state.EPF8);


    }

    removeEarningsRow = () => {
        this.setState({
            countEarArray: this.state.countEarArray.slice(0, -1)
        });
        this.state.TotalEarningsValue = parseInt(this.state.TotalEarningsValue) - parseInt(this.state.EarningsValue);
        console.log(this.state.EarningsArray)
        console.log(this.state.TotalEarningsValue)
    };

    addMoreDeductions = () => {
        let {countDed} = this.state;
        this.setState({
            countDed: countDed + 1
        });
        this.state.countDedArray.push(this.state.countDed)
        this.state.DeductionsArray.push(this.state.DeductionsValue)
        this.state.TotalDeductionsValue = parseInt(this.state.TotalDeductionsValue) + parseInt(this.state.DeductionsValue);

        console.log(this.state.DeductionsArray)
        console.log(this.state.TotalDeductionsValue)

    }


    reset = () => {

        this.setState({
            GrossSalary: 0,
            EPF8: 0,
            NetSalary: 0,
            ETF3: 0,
            EPF12: 0,
            CTC: 0,
            DeductionsValue:0,
            BasicSalary:0,
            EarningsValue:0,
        });

    }

    removeDeductionRow = (index) => {
        this.setState({
            countDedArray: this.state.countDedArray.slice(0, -1)
        });
        this.state.TotalDeductionsValue = parseInt(this.state.TotalDeductionsValue) - parseInt(this.state.DeductionsValue);
        console.log(this.state.DeductionsArray)
        console.log(this.state.TotalDeductionsValue)

    };


    onChangeEarningsValue(e) {
        this.setState({
            EarningsValue: e.target.value
        });
    }

    onChangeDecuctionsValue(e) {
        this.setState({
            DeductionsValue: e.target.value
        });
    }

    onChangeBasicSalary(e) {
        this.setState({
            BasicSalary: e.target.value
        });
        //this.calculateTotal();
    }

    setEPTF(index, checked) {
        console.log(index, checked);
        //index - checked index of earnings array

        if (checked) {

            this.state.EPFEarningsArray.push(parseInt(this.state.EarningsArray[index]));
            console.log(this.state.EPFEarningsArray)

            this.setState({
                ETF3: ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 3) / 100,
                EPF12: ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 12) / 100,
                EPF8: ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 8) / 100,


            })
            this.calculateTotal();
        } else {
            this.state.EPFEarningsArray.splice(this.state.EPFEarningsArray.indexOf(this.state.EarningsArray[index]));

            this.setState({
                ETF3: ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 3) / 100,
                EPF12: ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 12) / 100,
                EPF8: ((parseInt(this.state.BasicSalary) + this.state.EPFEarningsArray.reduce((a, b) => a + b, 0)) * 8) / 100,

                GrossSalary: parseInt(this.state.BasicSalary) + parseInt(this.state.TotalEarningsValue),
                CTC: (parseInt(this.state.GrossSalary) - parseInt(this.state.TotalDeductionsValue)) + (parseInt(this.state.ETF3) + parseInt(this.state.EPF12)),
                NetSalary: (parseInt(this.state.GrossSalary) - parseInt(this.state.TotalDeductionsValue)) - parseInt(this.state.EPF8)
            })

        }

        console.log(this.state.ETF3, this.state.EPF12, this.state.EPF8);
        this.calculateTotal();
    }

    render() {
        return (

                <div className="row">
                    <div className="col-sm-6">
                        <div className="p-3 mb-2 bg-light text-dark rounded">
                            <div className="row">
                                <div className="col-sm-10">

                                    <h5 className="font-weight-bold">Calculate Your Salary</h5>
                                    <br/>
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-link text-decoration-none fa fa-undo"
                                            onClick={this.reset.bind(this)}> Reset
                                    </button>
                                </div>
                            </div>


                            <input type="text" value={this.state.BasicSalary} onChange={this.onChangeBasicSalary}
                                   name="descriptionMessage"
                                   className="form-control" placeholder=""></input>
<br/>
                            <h5 className="text-bold text-left">Earnings</h5>
                            <p className="text-secondary text-left">Allowance, Fixed Allowance, Bonus and etc.</p>

                            {this.state.countEarArray.map((item, index) => {
                                return (

                                    <div className="row">
                                        <div className="col-sm-8">
                                            <input type="text" onChange={this.onChangeEarningsValue}
                                                   name="descriptionMessage" class="form-control"
                                                   placeholder=""></input>
                                        </div>

                                        <div className="col-sm-1">
                                            <button type="button"
                                                    className="fa fa-times btn btn-light rounded-circle text-primary"
                                                    onClick={this.removeEarningsRow}></button>
                                        </div>


                                        <div className="col-sm-3">
                                            <div className="form-check">
                                                <input type="checkbox" value="money" class="form-check-input"
                                                       onChange={(e) => this.setEPTF(index, e.target.checked)}/>
                                                <label className="form-check-label"
                                                       htmlFor="exampleCheck1">EPF/ETF</label>
                                            </div>
                                        </div>
                                    </div>


                                );
                            })}

                            <button type="button" className="btn btn-link text-decoration-none fa fa-plus float-left"
                                    onClick={this.addMoreEarnings.bind(this)}><span
                                className="">Add new Allowance</span>
                            </button>

                            <br/><br/>
                            <hr/>
                            <h5 className="text-bold text-left">Deductions</h5>
                            <p className="text-secondary text-left">Salary,Loan Deduction and all</p>
                            {this.state.countDedArray.map((item, index) => {
                                return (

                                    <div className="row">
                                        <div className="col-sm-8">

                                            <input type="text" onChange={this.onChangeDecuctionsValue}
                                                   name="descriptionMessage" class="form-control"
                                                   placeholder=""></input>
                                        </div>

                                        <div className="col-sm-1">
                                            <button type="button"
                                                    className="fa fa-times btn btn-light rounded-circle text-primary"
                                                    onClick={() => this.removeDeductionRow(index)}></button>
                                        </div>
                                    </div>

                                );
                            })}
                            <button type="button" className="btn btn-link text-decoration-none fa fa-plus  float-left"
                                    onClick={this.addMoreDeductions.bind(this)}>Add new Deduction
                            </button>
                            <br/><br/><br/><br/>
                        </div>

                    </div>
                    <div className="col-sm-5">
                        <div className="row p-2 border rounded">

                            <div className="row">
                                <div className="col-sm-10">

                                    <h5 className="font-weight-bold text-left">Calculate Your Salary</h5>
                                    <br/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">

                                    <p>Items</p>
                                    <h6>Gross Earning</h6>
                                    <h6>Gross Deduction</h6>
                                    <h6>Employee EPF (8%)</h6>
                                </div>
                                <div className="col-sm-5">
                                    <p className="text-right">Amount</p>
                                    <h6 className="text-right">{this.state.GrossSalary}</h6>
                                    <h6 className="text-right">{this.state.TotalDeductionsValue}</h6>
                                    <h6 className="text-right">{this.state.EPF8}</h6>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <br/>
                                </div>
                            </div>

                            <div className="p-2 border rounded">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h6 className="font-weight-bold">Net Salaty (Take Home)</h6>
                                    </div>

                                    <div className="col-sm-5">
                                        <h6 className=" font-weight-bold text-right">{this.state.NetSalary}</h6>
                                    </div>

                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <br/>
                                </div>
                            </div>


                            <p>Contribution from the Employer</p>
                            <div className="row">
                                <div className="col-sm-6">
                                    <h6>Employeer EPF(12%)</h6>
                                    <h6>Employeer ETF(3%)</h6>
                                    <br/>
                                    <h6>CTC (Cost to Company)</h6>
                                </div>

                                <div className="col-sm-5">

                                    <h6 className="text-right">{this.state.EPF12}</h6>
                                    <h6 className="text-right">{this.state.ETF3}</h6>
                                    <br/>
                                    <h6 className="text-right">{this.state.CTC}</h6>
                                    <br/><br/><br/><br/>
                                </div>

                            </div>


                        </div>

                    </div>

                </div>


        );
    }


}
