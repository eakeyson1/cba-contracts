import React, { Component, Fragment } from "react";
import idx from "idx";
import moment from "moment";

class InvoiceRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { invoice } = this.props;
        return (
            <Fragment>
                <div className="row pv3">
                    <div className="col-lg-3">
                        <div>
                            <p className="bold invoice-table-row-content">Description</p>
                            <div>{idx(invoice, _ => _.desc)}</div>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="invoice-table-row-content">
                            {moment(idx(invoice, _ => _.start_date)).format("DD-MM-YYYY")}
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="invoice-table-row-content">
                            {idx(invoice, _ => _.time)}
                        </div>
                    </div>
                    <div className="col-lg-1">
                        <div className="invoice-table-row-content">
                            {idx(invoice, _ => _.unit_cost)}
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="invoice-table-row-content ">
                            {idx(invoice, _ => _.hour_rate) &&
                                `${idx(invoice, _ => _.hour_rate)}`}
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="invoice-table-row-content ">
                            {idx(invoice, _ => _.amount) && `${idx(invoice, _ => _.amount)}`}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

InvoiceRow.defaultProps = {
    invoice: {
        desc: "Proj description",
        time: "9:00 - 12:00",
        unit_cost: "30",
        hour_rate: "5$",
        amount: "180$"
    }
};

export default InvoiceRow;