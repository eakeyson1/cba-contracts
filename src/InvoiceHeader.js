import React, { Component, Fragment } from "react";

class InvoiceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-3">
            <span className="invoice-table-header-tag">
              Project Description
            </span>
          </div>
          <div className="col-lg-2">
            <span className="invoice-table-header-tag"> Date</span>
          </div>
          <div className="col-lg-2">
            <span className="invoice-table-header-tag">Time</span>
          </div>
          <div className="col-lg-1">
            <span className="invoice-table-header-tag">Unit Cost</span>
          </div>
          <div className="col-lg-2">
            <span className="invoice-table-header-tag">Hourly Rate</span>
          </div>
          <div className="col-lg-2">
            <span className="invoice-table-header-tag">Amount</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default InvoiceHeader;