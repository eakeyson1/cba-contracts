import React, { PureComponent} from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js"
import cbaLogo2 from './CBALogo2.png';
import { FaBackspace } from 'react-icons/fa';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { RiDeleteBin6Line } from "react-icons/ri";


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default class App extends PureComponent {
//class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        blisVisible: false,
        consentOfSpouseVisible: false,
        corporateResolutionToSellVisible: false,
        brokerConfidentialityVisible: false,
        cashflowAnalysisVisible: false,

        /////   Consent of Spouse   /////
        consentOfSpousePersonName: "",
        consentOfSpouseSpouseName: "",
        consentOfSpouseBusinessName: "",
        consentOfSpouseBusinessLocation: "",
        consentOfSpouseDay: "Select",
        consentOfSpouseMonth: "Select",
        consentOfSpouseYear: "Select",
        consentOfSpouseError: "",

        /////   Corporate Resolution to Sell   /////    
        corporateResolutionToSellBusinessName: "",
        corporateResolutionToSellBusinessCity: "",
        corporateResolutionToSellBusinessCounty: "",
        corporateResolutionToSellEmployeeName: "",
        corporateResolutionToSellDay: "Select",
        corporateResolutionToSellMonth: "Select",
        corporateResolutionToSellYear: "Select",
        corporateResolutionToSellError: "",

        /////   Broker Confidentiality   /////    
        brokerConfidentialityClientName: "",
        brokerConfidentialityBrokerName: "",
        brokerConfidentialityDay: "Select",
        brokerConfidentialityMonth: "Select",
        brokerConfidentialityYear: "Select",
        brokerConfidentialityError: "",

        /////   Cashflow Analysis   /////
        cashflowAnalysisBusinessName: "",
        cashflowAnalysisFiscalYearSales: "0",
        cashflowAnalysisFiscalSalesDay: "Select",
        cashflowAnalysisFiscalSalesMonth: "Select",
        cashflowAnalysisFiscalSalesYear: "Select",
        cashflowAnalysisNetOperatingIncome: "0",
        cashflowAnalysisOwnerSalary: "0",
        cashflowAnalysisOwnerVehicle: "0",
        cashflowAnalysisOwnerInsurance: "0",
        cashflowAnalysisOwnerMedical: "0",
        cashflowAnalysisOwnerPayrollTaxes: "0",
        cashflowAnalysisOwnerTravelEntertainment: "0",
        cashflowAnalysisNonBusinessTelephone: "0",
        cashflowAnalysisNonBusinessUtilities: "0",
        cashflowAnalysisNonBusinessLegal: "0",
        cashflowAnalysisNonBusinessAccounting: "0",
        cashflowAnalysisInterestExpense: "0",
        cashflowAnalysisDeprecationAmortization: "0",
        cashflowAnalysisPartnerFamilyExcessSalary: "0",
        cashflowAnalysisNonRealSalaries: "0",
        cashflowAnalysisFamilyBenefits: "0",
        cashflowAnalysisDonations: "0",
        cashflowAnalysisNonRecurring: "0",
        cashflowAnalysisRentAdjustments: "0",
        cashflowAnalysisInventoryAdjustments: "0",
        cashflowAnalysisError: "",

        /////   For editing cash flow input rows    /////
        selectedCashFlowExtraRowType: "Fringe",
        selectedCashFlowExtraRowTitle: "",
        selectedCashFlowExtraRowValue: "0",
        cashflowAnalysisEditInputsVisible: false,
        cashflowAnalysisInputArray: [
          {type: "Fringe", title: "Owner's Vehicle", value: "0", id: '0'},
          {type: "Fringe", title: "Owner's Insurance", value: "0", id: '1'},
          {type: "Fringe", title: "Owner's Medical", value: "0", id: '2'},
          {type: "Fringe", title: "Owner's Payroll Taxes", value: "0", id: '3'},
          {type: "Fringe", title: "Owner's Travel/Entertainment", value: "0", id: '4'},
          {type: "Fringe", title: "Non-Business Telephone", value: "0", id: '5'},
          {type: "Fringe", title: "Non-Business Utilities", value: "0", id: '6'},
          {type: "Fringe", title: "Non-Business Legal", value: "0", id: '7'},
          {type: "Fringe", title: "Non-Business Accounting", value: "0", id: '8'},
          {type: "Other", title: "Partner/Family Excess Salary", value: "0", id: '11'},
          {type: "Other", title: "Non Real Salaries", value: "0", id: '12'},
          {type: "Other", title: "Family Benefits", value: "0", id: '13'},
          {type: "Other", title: "Donations", value: "0", id: '14'},
          {type: "Other", title: "Non Recurring", value: "0", id: '15'},
          {type: "Other", title: "Rent Adjustments", value: "0", id: '16'},
          {type: "Other", title: "Inventory Adjustments", value: "0", id: '17'},
        ]

    }
    this.separator = this.separator.bind(this);
    this.updateCashFlowAnalysisInputs = this.updateCashFlowAnalysisInputs.bind(this)
    this.addExtraCashFlowInputRow = this.addExtraCashFlowInputRow.bind(this)
    this.deleteCashFlowInputRow = this.deleteCashFlowInputRow.bind(this)
    this.updateCashFlowAnalysisInputsTitle = this.updateCashFlowAnalysisInputsTitle.bind(this)

  }

  updateCashFlowAnalysisInputs(event, id){
    var cashflowAnalysisInputArray = [...this.state.cashflowAnalysisInputArray]

    for(var i =0; i<cashflowAnalysisInputArray.length; i++){
      if(cashflowAnalysisInputArray[i].id === id){
        cashflowAnalysisInputArray[i].value = event.target.value
      }
    }
    this.setState({cashflowAnalysisInputArray: cashflowAnalysisInputArray})
  }

  updateCashFlowAnalysisInputsTitle(event, id){
    var cashflowAnalysisInputArray = [...this.state.cashflowAnalysisInputArray]

    for(var i =0; i<cashflowAnalysisInputArray.length; i++){
      if(cashflowAnalysisInputArray[i].id === id){
        cashflowAnalysisInputArray[i].title= event.target.value
      }
    }
    this.setState({cashflowAnalysisInputArray: cashflowAnalysisInputArray})
  }

  addExtraCashFlowInputRow = () => {

    if(this.state.selectedCashFlowExtraRowTitle === ""){
      alert("Enter a title for the new row")
      return
    }

    var cashflowAnalysisInputArray = [...this.state.cashflowAnalysisInputArray]
    var input = {
      type: this.state.selectedCashFlowExtraRowType, 
      title: this.state.selectedCashFlowExtraRowTitle, 
      value: this.state.selectedCashFlowExtraRowValue, 
    }
    cashflowAnalysisInputArray.push(input)
    this.setState({cashflowAnalysisInputArray: cashflowAnalysisInputArray, selectedCashFlowExtraRowTitle: "", selectedCashFlowExtraRowValue: "0"})
  }

  deleteCashFlowInputRow = (title) => {
    var cashflowAnalysisInputArray = [...this.state.cashflowAnalysisInputArray]

    for(var i =0; i<cashflowAnalysisInputArray.length; i++){
      if(cashflowAnalysisInputArray[i].title === title){
        cashflowAnalysisInputArray.splice(i, 1)
      }
    }
    this.setState({cashflowAnalysisInputArray: cashflowAnalysisInputArray})
  }

  calculateTotalFringe(){
    var totalFringe = 0
    for(var i =0; i<this.state.cashflowAnalysisInputArray.length; i++){
      if(this.state.cashflowAnalysisInputArray[i].type === "Fringe"){
        totalFringe += parseInt(this.state.cashflowAnalysisInputArray[i].value)
      }
    }
    return totalFringe
  }

  calculateTotalOther(){
    var totalOther = 0
    for(var i =0; i<this.state.cashflowAnalysisInputArray.length; i++){
      if(this.state.cashflowAnalysisInputArray[i].type === "Other"){
        totalOther += parseInt(this.state.cashflowAnalysisInputArray[i].value)
      }
    }
    return totalOther
  }

  renderConsentOfSpouseDayDropdown(){
    if(this.state.consentOfSpouseMonth === "January" || this.state.consentOfSpouseMonth === "March" || this.state.consentOfSpouseMonth === "May" || this.state.consentOfSpouseMonth === "July" || this.state.consentOfSpouseMonth === "August" || this.state.consentOfSpouseMonth === "October" || this.state.consentOfSpouseMonth === "December"){
      return(
        <DropdownButton alignRight title={this.state.consentOfSpouseDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "30"})}>30</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "31"})}>31</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.consentOfSpouseMonth === "April" || this.state.consentOfSpouseMonth === "June" || this.state.consentOfSpouseMonth === "September" || this.state.consentOfSpouseMonth === "November"){
      return(
        <DropdownButton alignRight title={this.state.consentOfSpouseDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "30"})}>30</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.consentOfSpouseMonth === "February"){
      return(
        <DropdownButton alignRight title={this.state.consentOfSpouseDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseDay: "28"})}>28</Dropdown.Item>
        </DropdownButton>
      )
    }
    else{
      return(
        <DropdownButton disabled={true} title={this.state.consentOfSpouseDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "January"})}>January</Dropdown.Item>
        </DropdownButton>
      )
    }
  }

  renderCorporateResolutionToSellDropdown(){
    if(this.state.corporateResolutionToSellMonth === "January" || 
    this.state.corporateResolutionToSellMonth === "March" || 
    this.state.corporateResolutionToSellMonth === "May" || 
    this.state.corporateResolutionToSellMonth === "July" || 
    this.state.corporateResolutionToSellMonth === "August" || 
    this.state.corporateResolutionToSellMonth === "October" || 
    this.state.corporateResolutionToSellMonth === "December"){
      return(
        <DropdownButton alignRight title={this.state.corporateResolutionToSellDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "30"})}>30</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "31"})}>31</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.corporateResolutionToSellMonth === "April" || 
    this.state.corporateResolutionToSellMonth === "June" || 
    this.state.corporateResolutionToSellMonth === "September" || 
    this.state.corporateResolutionToSellMonth === "November"){
      return(
        <DropdownButton alignRight title={this.state.corporateResolutionToSellDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "30"})}>30</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.corporateResolutionToSellMonth === "February"){
      return(
        <DropdownButton alignRight title={this.state.corporateResolutionToSellDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: "28"})}>28</Dropdown.Item>
        </DropdownButton>
      )
    }
    else{
      return(
        <DropdownButton disabled={true} alignRight title={this.state.corporateResolutionToSellMonth} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellDay: ""})}>January</Dropdown.Item>
        </DropdownButton>
      )
    }
  }

  renderbrokerConfidentialityDropdown(){
    if(this.state.brokerConfidentialityMonth === "January" || 
    this.state.brokerConfidentialityMonth === "March" || 
    this.state.brokerConfidentialityMonth === "May" || 
    this.state.brokerConfidentialityMonth === "July" || 
    this.state.brokerConfidentialityMonth === "August" || 
    this.state.brokerConfidentialityMonth === "October" || 
    this.state.brokerConfidentialityMonth === "December"){
      return(
        <DropdownButton alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "30"})}>30</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "31"})}>31</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.brokerConfidentialityMonth === "April" || 
    this.state.brokerConfidentialityMonth === "June" || 
    this.state.brokerConfidentialityMonth === "September" || 
    this.state.brokerConfidentialityMonth === "November"){
      return(
        <DropdownButton alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "30"})}>30</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.brokerConfidentialityMonth === "February"){
      return(
        <DropdownButton alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "1"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "2"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "3"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "4"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "5"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "6"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "7"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "8"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "9"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({brokerConfidentialityDay: "28"})}>28</Dropdown.Item>
        </DropdownButton>
      )
    }
    else{
      return(
        <DropdownButton disabled={true} alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "January"})}>January</Dropdown.Item>
        </DropdownButton>
      )
    }
  }

  renderCashflowAnalysisDropdown(){
    if(this.state.cashflowAnalysisFiscalSalesMonth === "January" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "March" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "May" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "July" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "August" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "October" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "December"){
      return(
        <DropdownButton title={this.state.cashflowAnalysisFiscalSalesDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "01"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "02"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "03"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "04"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "05"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "06"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "07"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "08"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "09"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "30"})}>30</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "31"})}>31</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.cashflowAnalysisFiscalSalesMonth === "April" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "June" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "September" || 
    this.state.cashflowAnalysisFiscalSalesMonth === "November"){
      return(
        <DropdownButton title={this.state.cashflowAnalysisFiscalSalesDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "01"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "02"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "03"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "04"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "05"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "06"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "07"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "08"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "09"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "28"})}>28</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "29"})}>29</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "30"})}>30</Dropdown.Item>
        </DropdownButton>
      )
    }
    else if(this.state.cashflowAnalysisFiscalSalesMonth === "February"){
      return(
        <DropdownButton title={this.state.cashflowAnalysisFiscalSalesDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "01"})}>1</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "02"})}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "03"})}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "04"})}>4</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "05"})}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "06"})}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "07"})}>7</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "08"})}>8</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "09"})}>9</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "10"})}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "11"})}>11</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "12"})}>12</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "13"})}>13</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "14"})}>14</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "15"})}>15</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "16"})}>16</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "17"})}>17</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "18"})}>18</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "19"})}>19</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "20"})}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "21"})}>21</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "22"})}>22</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "23"})}>23</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "24"})}>24</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "25"})}>25</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "26"})}>26</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "27"})}>27</Dropdown.Item>
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "28"})}>28</Dropdown.Item>
        </DropdownButton>
      )
    }
    else{
      return(
        <DropdownButton disabled={true} title={this.state.cashflowAnalysisFiscalSalesDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesDay: "January"})}>January</Dropdown.Item>
        </DropdownButton>
      )
    }
  }

  renderConsentOfSpouse() {
    if(this.state.consentOfSpouseVisible === true){
      return(
        <div style={{display: 'flex'}}>
          <div style={{width: '45%', marginLeft: '5%'}}>
            <div style={{display: 'flex'}}>
            <FaBackspace size={50} color="white" onClick={() => this.setState({consentOfSpouseVisible: false})}/>
              <p style={{color: 'white', marginLeft: '10%', fontSize: 40, fontWeight: 'bold'}}>Consent Of Spouse</p>
            </div>

            <div style={{alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>
              

                <div style={{marginLeft: '20%', display: 'flex', marginTop: '3vh'}}>

                  <div>
                    <DropdownButton alignRight title={this.state.consentOfSpouseMonth} id="dropdown-menu-align-right">
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "January"})}>January</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "February"})}>February</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "March"})}>March</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "April"})}>April</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "May"})}>May</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "June"})}>June</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "July"})}>July</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "August"})}>August</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "September"})}>September</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "October"})}>October</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "November"})}>November</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "December"})}>December</Dropdown.Item>
                    </DropdownButton>
                    <label style={{textAlign: 'center'}} className="Text-Label-Style">Month</label>
                  </div>

                  <div style={{marginLeft: '2vh'}}>
                    {this.renderConsentOfSpouseDayDropdown()}
                    <label style={{textAlign: 'center'}} className="Text-Label-Style">Day</label>
                  </div>

                  <div style={{marginLeft: '2vh'}}>
                    <DropdownButton alignRight disabled={(this.state.consentOfSpouseDay === "Select" || this.state.consentOfSpouseMonth === "Select") ? true : false}  title={this.state.consentOfSpouseYear} id="dropdown-menu-align-right">
                      <Dropdown.Item onClick={() => this.setState({consentOfSpouseYear: "2022"})}>2022</Dropdown.Item>
                    </DropdownButton>
                    <label style={{textAlign: 'center'}} className="Text-Label-Style">Year</label>
                  </div>
                </div>


                <form style={{marginTop: '5%', marginLeft: '10%'}}>
                  <div style={{display: 'flex'}}>
                    <div>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpousePersonName} onChange={(event) => this.setState({consentOfSpousePersonName: event.target.value})}/>
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Person Name</label>
                    </div>

                    <div style={{marginLeft: '3vh'}}>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessName} onChange={(event) => this.setState({consentOfSpouseBusinessName: event.target.value})}/>
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Business Name</label>
                    </div>
                  </div>

                  <div style={{display: 'flex'}}>
                    <div>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseSpouseName} onChange={(event) => this.setState({consentOfSpouseSpouseName: event.target.value})}/>
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Spouse Name</label>
                    </div>

                    <div style={{marginLeft: '3vh'}}>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessLocation} onChange={(event) => this.setState({consentOfSpouseBusinessLocation: event.target.value})} />
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Business Address</label>
                    </div>
                  </div>

                </form>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button className="Generate-PDF-Button" onClick={this.generateConsentOfSpouse}>Generate PDF</button>
            </div>
            <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.consentOfSpouseError}</p>

          </div>

          <div id="consentOfSpouseContent" style={{width: '50%', backgroundColor: 'white'}}>

            <img style={{height: 100, width: 210, marginLeft: 300, marginTop: 30}} src={cbaLogo2}></img>

            <p style={{textAlign: 'center', marginLeft: 150, width: 500, marginTop: 20, fontSize: 14, fontWeight: 'bold'}}>
              The CBA Group, LLC 20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274 Fax: (704) 895-4278
            </p>

            <p style={{width: 300, marginLeft: 300, fontSize: 25, fontWeight: 'bold'}}>
              Consent Of Spouse
            </p>

            <p style={{fontSize: 16, width: 625, marginLeft: 75, textAlign: 'center', marginTop: 20}}>
              Whereas I, <strong>{this.state.consentOfSpousePersonName}</strong> am the spouse of 
              <strong> {this.state.consentOfSpouseSpouseName}</strong> and do hereby consent and 
              agree to the following: My spouse may sign any and all documents necessary to close 
              the business transaction involving the sale of the Business known as, 
              <strong> {this.state.consentOfSpouseBusinessName}</strong> located at: 
              <strong> {this.state.consentOfSpouseBusinessLocation}</strong> which may include real 
              property, if any, associated with the Business.
            </p>

            <p style={{fontSize: 16, width: 500, marginLeft: 50, marginTop: 80}}>
              Dated the <strong>{this.state.consentOfSpouseDay}</strong> day of 
              <strong> {this.state.consentOfSpouseMonth}</strong>, 
              <strong> {this.state.consentOfSpouseYear}</strong>
            </p>

            
            <p style={{fontSize: 18, marginLeft: 50, textDecoration: "underline", marginTop: 15, marginBottom: 0, padding: 0}}>
              {this.state.consentOfSpousePersonName}
            </p>

            <div style={{marginLeft: 50, display: "flex"}}>
              <div style={{width: 300}}>
                <p style={{fontSize: 18, width: 300}}>
                  Printed Name
                </p>
              </div>

              <div style={{width: 300, marginLeft: '5%', borderTop: "1px solid black"}}>
                <p style={{width: 300, fontSize: 18}}>
                  <em>
                    Signature
                  </em>
                </p>
              </div>
            </div>

            <p style={{fontSize: 12, width: 150, marginLeft: 550, marginTop: 450}}>CBA Form 102119</p>

          </div>
        </div>
      )
    
    }
  }

  renderCorporateResolutionToSell() {
    if(this.state.corporateResolutionToSellVisible === true){
      return(
        <div style={{display: 'flex'}}>
          <div style={{width: '55%', marginLeft: '5%'}}>
            <div style={{display: 'flex'}}>
            <FaBackspace size={50} color="white" onClick={() => this.setState({corporateResolutionToSellVisible: false})}/>
              <p style={{color: 'white', marginLeft: '5%', fontSize: 40, fontWeight: 'bold'}}>Corporate Resolution To Sell</p>
            </div>

            <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>

              <div style={{marginLeft: '25%', display: 'flex'}}>

                <div>
                  <DropdownButton alignRight title={this.state.corporateResolutionToSellMonth} id="dropdown-menu-align-right">
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "January"})}>January</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "February"})}>February</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "March"})}>March</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "April"})}>April</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "May"})}>May</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "June"})}>June</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "July"})}>July</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "August"})}>August</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "September"})}>September</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "October"})}>October</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "November"})}>November</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellMonth: "December"})}>December</Dropdown.Item>
                  </DropdownButton>
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Month</label>
                </div>

                <div style={{marginLeft: '3vh'}}>
                  {this.renderCorporateResolutionToSellDropdown()}
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Day</label>
                </div>

                <div style={{marginLeft: '3vh'}}>
                  <DropdownButton alignRight disabled={(this.state.corporateResolutionToSellDay === "Select" || this.state.corporateResolutionToSellMonth === "Select") ? true : false} title={this.state.corporateResolutionToSellYear} id="dropdown-menu-align-right">
                    <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellYear: "2022"})}>2022</Dropdown.Item>
                  </DropdownButton>
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Year</label>
                </div>

              </div>

              <form style={{display: 'flex', marginTop: 15, marginLeft: '15%'}}>
                <div>
                  <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessName} onChange={(event) => this.setState({corporateResolutionToSellBusinessName :event.target.value})}/>
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Business Name</label>
                </div>
                <div style={{marginLeft: '3vh'}}>
                  <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessCity} onChange={(event) => this.setState({corporateResolutionToSellBusinessCity: event.target.value})} />
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Business City</label>
                </div>
              </form>

              <form style={{display: 'flex', marginTop: 15, marginLeft: '15%'}}>
                <div>
                  <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessCounty} onChange={(event) => this.setState({corporateResolutionToSellBusinessCounty: event.target.value})} />
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Business County</label>
                </div>
                <div style={{marginLeft: '3vh'}}>
                  <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellEmployeeName} onChange={(event) => this.setState({corporateResolutionToSellEmployeeName: event.target.value})} />
                  <label style={{textAlign: 'center'}} className="Text-Label-Style">Employee Name</label>
                </div>
              </form>
            </div>
      
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button className="Generate-PDF-Button" onClick={this.generateCorporateResolutionToSell}>Generate PDF</button>
            </div>
            <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.corporateResolutionToSellError}</p>

          </div>
          <div id="corporateResolutionToSellContent" style={{width: '50%', backgroundColor: 'white'}}>

            <img style={{height: 100, width: 210, marginLeft: 300, marginTop: 30}} src={cbaLogo2}></img>

            <p style={{textAlign: 'center', marginLeft: 150, width: 500, marginTop: 20, fontSize: 14, fontWeight: 'bold'}}>
              The CBA Group, LLC &nbsp; 20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274 Fax: (704) 895-4278
            </p>

            <p style={{width: 450, marginLeft: 235, fontSize: 25, fontWeight: 'bold'}}>
              Corporate Resolution To Sell
            </p>
            
            <p style={{fontsize: 13, width: 625, marginLeft: 75, textAlign: 'center'}}>
              The undersigned, being the Secretary of <strong>{this.state.corporateResolutionToSellBusinessName}</strong>, a 
              North Carolina Corporation and acting to North Carolina General Statutes Sections 55-7-04, 55-8-21 and 55-12-02, does hereby certify 
              that this is a true and correct resolution unanimously adopted by a joint meeting of the Shareholders and the 
              Board of Directors of the Corporation, at a special business meeting held pursuant to notice duly given in the 
              city of <strong>{this.state.corporateResolutionToSellBusinessCity}</strong>  in the County of 
              <strong> {this.state.corporateResolutionToSellBusinessCounty}</strong>, North Carolina, on the 
              <strong> {this.state.corporateResolutionToSellDay}</strong> day of <strong>{this.state.corporateResolutionToSellMonth}</strong>, <strong>{this.state.corporateResolutionToSellYear}</strong>, and 
              this resolution will not be revoked by any subsequent action of the Board of Directors of the Corporation, but will 
              remain in full force and effect.
            </p>

            <p style={{width: 500, marginLeft: 75, fontSize: 15, marginTop: 30}}>
              BE IT RESOLVED that <strong>{this.state.corporateResolutionToSellEmployeeName}</strong> of the Corporation is 
              hereby authorized and directed with the full and complete authority to:
            </p>

            <ol style={{width: 500, marginLeft: 75, marginTop: 30}}>
              <li data-list-text="1)">
                <p style={{fontSize: 16}}>
                  Sell any or all assets of the Corporation.
                </p> 
              </li>
              <li data-list-text="2)">
                <p style={{fontSize: 16}}>Execute an agreement to pay a fee to The CBA Group, LLC, and/or to The CBA 
                  Group Real Estate, in the event that the business and/or real property of the Corporation is disposed 
                  of under authority given to them in a Listing Contract, Commission Protection Plan or other Agreement.
                </p>
              </li>
              <li  data-list-text="3)">
                <p style={{fontSize: 16}}>Execute a contract for the sale, lease or exchange of the assets of the 
                  Corporation at such price, term and conditions as he/she, in his/her sole discretion, deems 
                  acceptable and thereafter to execute any and all documents necessary to complete the sale, lease 
                  or exchange.
                </p>
              </li>
            </ol>

            <p style={{fontSize: 15, marginLeft: 75, textDecoration: "underline", marginTop: 70, marginBottom: 0, padding: 0}}>
              {this.state.corporateResolutionToSellEmployeeName}
            </p>

            <div style={{marginLeft: 75, display: "flex"}}>
              <div style={{width: 200}}>
                <p style={{fontSize: 15, width: 200}}>
                  Printed Name
                </p>
              </div>

              <div style={{width: 300, marginLeft: '5%', borderTop: "1px solid black"}}>
                <p style={{width: 300, fontSize: 15}}>
                  <em>Signature</em> Secretary of the Corporation
                </p>
              </div>
            </div>

            <p style={{fontSize: 10, width: 90, marginLeft: 615, marginTop: 20}}>CBA Form 101719</p>
          </div>
        </div>
      )
    
    }
  }

  renderbrokerConfidentiality() {
    if(this.state.brokerConfidentialityVisible === true){
      return(
        <div style={{display: 'flex'}}>

        <div style={{width: '55%', marginLeft: '5%'}}>
           <div style={{display: 'flex', marginTop: '3vh'}}>
           <FaBackspace size={50} color="white" onClick={() => this.setState({brokerConfidentialityVisible: false})}/>
            <p style={{color: 'white', marginLeft: '10%', fontSize: 40, fontWeight: 'bold'}}>Broker Confidentiality</p>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>
            <div>
            <div style={{display: 'flex', marginLeft: '15%'}}>
              <div>
                <DropdownButton alignRight title={this.state.brokerConfidentialityMonth} id="dropdown-menu-align-right">
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "January"})}>January</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "February"})}>February</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "March"})}>March</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "April"})}>April</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "May"})}>May</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "June"})}>June</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "July"})}>July</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "August"})}>August</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "September"})}>September</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "October"})}>October</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "November"})}>November</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityMonth: "December"})}>December</Dropdown.Item>
                </DropdownButton>
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Month</label>
              </div>

              <div style={{marginLeft: '3vh'}}>
                {this.renderbrokerConfidentialityDropdown()}
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Day</label>
              </div>

              <div style={{marginLeft: '3vh'}}>
                <DropdownButton alignRight disabled={(this.state.brokerConfidentialityDay === "Select" || this.state.brokerConfidentialityMonth === "Select") ? true : false} title={this.state.brokerConfidentialityYear} id="dropdown-menu-align-right">
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityYear: "2022"})}>2022</Dropdown.Item>
                </DropdownButton>
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Year</label>
              </div>

            </div>

            <form style={{display: 'flex', marginTop: '5%'}}>
              <div>
                <input className="Text-Input-Style"  type="text" value={this.state.brokerConfidentialityClientName} onChange={(event) => this.setState({brokerConfidentialityClientName: event.target.value})}/>
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Client Name</label>
              </div>

              <div style={{marginLeft: '5vh'}}>
                <input className="Text-Input-Style" type="text" value={this.state.brokerConfidentialityBrokerName} onChange={(event) => this.setState({brokerConfidentialityBrokerName: event.target.value})}/>
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Broker Name</label>
              </div>
            </form>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="Generate-PDF-Button" onClick={this.generateBrokerConfidentiality}>Generate PDF</button>
          </div>
          <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.brokerConfidentialityError}</p>
        </div>

        <div id="brokerConfidentialityContent" style={{width: '50%', backgroundColor: 'white'}}>

          <img style={{height: 100, width: 210, marginLeft: 300, marginTop: 30}} src={cbaLogo2}></img>

          <p style={{textAlign: 'center', marginLeft: 150, width: 500, marginTop: 20, fontSize: 14, fontWeight: 'bold'}}>
            The CBA Group, LLC &nbsp; 20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274 Fax: (704) 895-4278
          </p>

          <p style={{width: 500, marginLeft: 210, fontSize: 25, fontWeight: 'bold'}}>
            Broker Confidentiality Agreement
          </p>

          <p style={{fontsize: 13, width: 625, marginLeft: 75, textAlign: 'center'}}>
            The undersigned Business Broker and <strong>The CBA Group, LLC </strong>
            agree that all information provided by <strong> {this.state.brokerConfidentialityClientName} 
            </strong>, and any of its affiliates, shall be held in strict confidence by the broker, its 
            agents, officers, and employees. All financial statements and any other related information 
            shall be used for the sole purpose of the valuation of the above named Company. The Company 
            understands that if a photocopy of this information is sent to the valuation department of 
            any selected Valuation Company they also shall maintain total confidentiality.
          </p>
          <p style={{fontSize: 14, width: 500, marginLeft: 50, marginTop: 30}}>
            Signed and Agreed to this on the <strong> {this.state.brokerConfidentialityDay} </strong> 
            day of <strong>{this.state.brokerConfidentialityMonth}, {this.state.brokerConfidentialityYear} 
            </strong>.</p>
          <p style={{fontSize: 13, width: 500, marginLeft: 50}}>
            Broker:
          </p>

          <div style={{width: 250, marginLeft: 50}}>
            <p style={{fontSize: 25, margin: 0, padding: 0, fontFamily: "Brush Script MT", textDecoration: "underline"}}>
              {this.state.brokerConfidentialityBrokerName}
            </p>
            <div style={{borderTopWidth: 1, borderTopColor: 'black'}}>
              <p style={{fontSize: 13, margin: 0, padding: 0}}>(Name)
              </p>
            </div>
          </div>

          <p style={{fontSize: 13, marginLeft: 50, width: 300, textDecoration: "underline", marginTop: 15, marginBottom: 0, padding: 0}}>
            20462 Chartwell Center Drive, Suite C
          </p>

          <p style={{fontSize: 13, marginLeft: 50, marginTop: 0, marginBottom: 0, padding: 0}}>
            (Address)
          </p>

          <p style={{fontSize: 13, marginLeft: 50, width: 300, textDecoration: "underline", marginTop: 15, marginBottom: 0, padding: 0}}>
            Cornelius, NC 28031
          </p>

          <p style={{fontSize: 13, marginLeft: 50, marginTop: 0, marginBottom: 0, padding: 0}}>
            (City/State/Zip)
          </p>

          <p style={{fontSize: 13, marginLeft: 50, width: 300, textDecoration: 'underline', marginTop: 15, marginBottom: 0, padding: 0}}>
            (704) 895-4274
          </p>

          <p style={{fontSize: 13, marginLeft: 50, marginTop: 0, marginBottom: 0, padding: 0}}>
            (Telephone)
          </p>

          <p style={{fontSize: 13, marginLeft: 50, width: 300, textDecoration: 'underline', marginTop: 15, marginBottom: 0, padding: 0}}>
            (704) 895-4278
          </p>

          <p style={{fontSize: 13, marginLeft: 50, marginTop: 0, marginBottom: 0, padding: 0}}>
            (Fax)
          </p>

          <p style={{fontSize: 12, width: 100, marginLeft: 600, marginTop: 190}}>CBA Form 2031</p>

          </div>
        </div>
      )
    }
  }

  renderCashflowAnalysis() {
    if(this.state.cashflowAnalysisVisible){

      var month = ""
      if(this.state.cashflowAnalysisFiscalSalesMonth === "January"){
        month = "01"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "February"){
        month = "02"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "March"){
        month = "03"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "April"){
        month = "04"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "May"){
        month = "05"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "June"){
        month = "06"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "July"){
        month = "07"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "August"){
        month = "08"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "September"){
        month = "09"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "October"){
        month = "10"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "November"){
        month = "11"
      }
      else if(this.state.cashflowAnalysisFiscalSalesMonth === "December"){
        month = "12"
      }

      return(
        <div style={{display: 'flex'}}>
          <div style={{width: '50%'}}>
            <div style={{marginLeft: '5%'}}>
              <div style={{display: 'flex', marginTop: 15}}>
                <div style={{width: '8%', marginTop: 4}}>
                  <FaBackspace size={50} color="white" onClick={() => this.setState({cashflowAnalysisVisible: false})}/>
                </div>
                <div style={{width: '92%'}}>
                  <p style={{color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>Cashflow Analysis</p>
                </div>
              </div>

              <div style={{alignItems: 'center', justifyContent: 'center', marginTop: '2vh'}}>

                <div style={{display: 'flex'}}>
                  <div style={{width: '50%'}}>
                    <input style={{width: '100%'}} type="text" value={this.state.cashflowAnalysisBusinessName} onChange={(event) => this.setState({cashflowAnalysisBusinessName: event.target.value})} />
                    <label className="Text-Label-Style">Business Name</label>
                  </div>

                  <div style={{width: '40%', marginLeft: '5%', border: '1px solid red', borderRadius: 5}}>
                    <p style={{fontSize: 14, margin: '2px 5px', color: 'red', fontWeight: 'bold', textAlign: 'center'}}>WHOLE NUMBERS ONLY, NO COMMAS OR DOLLAR SIGNS($)</p>
                  </div>
                </div>

                <div style={{display: 'flex', marginTop: '3%'}}>
                  <div>
                    <DropdownButton alignRight title={this.state.cashflowAnalysisFiscalSalesMonth} id="dropdown-menu-align-right">
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "January"})}>January</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "February"})}>February</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "March"})}>March</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "April"})}>April</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "May"})}>May</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "June"})}>June</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "July"})}>July</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "August"})}>August</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "September"})}>September</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "October"})}>October</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "November"})}>November</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesMonth: "December"})}>December</Dropdown.Item>
                    </DropdownButton>
                    <label className="Text-Label-Style">Month</label>
                  </div>

                  <div style={{marginLeft: '2vh'}}>
                    {this.renderCashflowAnalysisDropdown()}
                    <label className="Text-Label-Style">Day</label>
                  </div>

                  <div style={{marginLeft: '2vh'}}>
                    <DropdownButton alignRight disabled={(this.state.cashflowAnalysisFiscalSalesDay === "Select" || this.state.cashflowAnalysisFiscalSalesMonth === "Select") ? true : false} title={this.state.cashflowAnalysisFiscalSalesYear} id="dropdown-menu-align-right">
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesYear: "2018"})}>2018</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesYear: "2019"})}>2019</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesYear: "2020"})}>2020</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesYear: "2021"})}>2021</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.setState({cashflowAnalysisFiscalSalesYear: "2022"})}>2022</Dropdown.Item>
                    </DropdownButton>
                    <label className="Text-Label-Style">Year</label>
                  </div>
                </div>

                <div style={{display: 'flex', marginTop: '3%'}}>
                  <div>
                    <input style={{width: '13vh'}} type="text" value={this.state.cashflowAnalysisFiscalYearSales} onChange={(event) => this.setState({cashflowAnalysisFiscalYearSales: event.target.value})} />
                    <label className="Text-Label-Style">Year Sales</label>
                  </div>
                  <div style={{marginLeft: '2%'}}>
                    <input style={{width: '13vh'}} type="text" value={this.state.cashflowAnalysisNetOperatingIncome} onChange={(event) => this.setState({cashflowAnalysisNetOperatingIncome: event.target.value})} />
                    <label className="Text-Label-Style">Net Income</label>
                  </div>
                  <div style={{marginLeft: '2%'}}>
                    <input style={{width: '13vh'}} type="text" value={this.state.cashflowAnalysisOwnerSalary} onChange={(event) => this.setState({cashflowAnalysisOwnerSalary: event.target.value})} />
                    <label className="Text-Label-Style">Owner's Salary</label>
                  </div>
                </div>

                <div style={{display: 'flex', marginTop: '3%'}}>
                  <div>
                    <input style={{width: '13vh'}} type="text" value={this.state.cashflowAnalysisInterestExpense} onChange={(event) => this.setState({cashflowAnalysisInterestExpense: event.target.value})} />
                    <label className="Text-Label-Style">Interest Expense</label>
                  </div>
                  <div style={{marginLeft: '2%'}}>
                    <input style={{width: '13vh'}} type="text" value={this.state.cashflowAnalysisDeprecationAmortization} onChange={(event) => this.setState({cashflowAnalysisDeprecationAmortization: event.target.value})} />
                    <label className="Text-Label-Style">Depreciation/Amortization</label>
                  </div>
                </div>

                <div style={{display: 'flex', marginTop: '1%'}}>
                  <div style={{width: '50%'}}>
                    <p style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>Fringe Benefits</p>
                    <div style={{marginLeft: '5%'}}>
                      {this.state.cashflowAnalysisInputArray.map((input, key) => {
                        if(input.type === "Fringe"){
                          return(
                            <div style={{display: 'flex', marginTop: '5px'}} key={key}>
                              {this.state.cashflowAnalysisEditInputsVisible && (
                                <button className="delete-cash-flow-input-row" onClick={() => this.deleteCashFlowInputRow(input.title)}><RiDeleteBin6Line/></button>
                              )}
                              {this.state.cashflowAnalysisEditInputsVisible ? (
                                <input style={{width: '12vw'}} className="Text-Input-Number-Style" type="text" value={input.title} onChange={(event) => this.updateCashFlowAnalysisInputsTitle(event, input.id)} />
                              ) : (
                                <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>{input.title}</label>
                              )}
                              <input className="Text-Input-Number-Style" type="text" value={input.value} onChange={(event) => this.updateCashFlowAnalysisInputs(event, input.id)} />
                            </div>
                          )
                        }
                      })}

                    </div>
                  </div>
                  <div style={{width: '50%'}}>
                    <p style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>Other</p>
                    <div style={{marginLeft: '5%'}}>
                      {this.state.cashflowAnalysisInputArray.map((input, key) => {
                        if(input.type === "Other"){
                          return(
                            <div style={{display: 'flex', marginTop: '5px'}} key={key}>
                              {this.state.cashflowAnalysisEditInputsVisible && (
                                <button className="delete-cash-flow-input-row" onClick={() => this.deleteCashFlowInputRow(input.title)}><RiDeleteBin6Line/></button>
                              )}
                              {this.state.cashflowAnalysisEditInputsVisible ? (
                                <input style={{width: '12vw'}} className="Text-Input-Number-Style" type="text" value={input.title} onChange={(event) => this.updateCashFlowAnalysisInputsTitle(event, input.id)} />
                              ) : (
                                <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>{input.title}</label>
                              )}
                              <input className="Text-Input-Number-Style" type="text" value={input.value} onChange={(event) => this.updateCashFlowAnalysisInputs(event, input.id)} />
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <button style={{width: '20%', backgroundColor:  this.state.cashflowAnalysisEditInputsVisible ? 'green' : '#0099FF'}} className="edit-cashflow-inputs-button" onClick={() => this.setState({cashflowAnalysisEditInputsVisible: !this.state.cashflowAnalysisEditInputsVisible})}>{this.state.cashflowAnalysisEditInputsVisible ? 'Done' : 'Edit Titles'}</button>
              
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button className="Generate-Cashflow-PDF-Button" onClick={this.generateCashflow}>Generate PDF</button>
              </div>

              <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.cashflowAnalysisError}</p>

            </div>
          </div>

          <div id="cashFlowContent" style={{width: '50%', backgroundColor: 'white'}}>

            <img style={{height: 100, width: 210, marginLeft: 300, marginTop: 30}} src={cbaLogo2}></img>

            <p style={{textAlign: 'center', marginLeft: 150, width: 500, marginTop: 20, fontSize: 14, fontWeight: 'bold'}}>
              The CBA Group, LLC 20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274 Fax: (704) 895-4278
            </p>
            <p style={{width: 500, marginLeft: 195, fontSize: 18, marginBottom: 5, marginTop: 10, fontWeight: 'bold'}}>
              TOTAL OWNER BENEFIT “CASH FLOW” ANALYSIS 
            </p>

            <p style={{fontSize: 16, marginLeft: 75, marginBottom: 0}}>
              Business Name: <strong>{this.state.cashflowAnalysisBusinessName}</strong>
            </p>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 16, margin: 0, width: 250}}>
                Fiscal Year Sales
              </p>
              <p style={{fontSize: 16, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisFiscalYearSales))}
              </p>
            </div>
            
            <div style={{width: 600, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 15, margin: 0, width: 430}}>
                Net Operating Income for fiscal year ending: {month}/{this.state.cashflowAnalysisFiscalSalesDay}/{this.state.cashflowAnalysisFiscalSalesYear}
              </p>
              <p style={{fontSize: 15, margin: 0, width: 45}}>
                . . . . . .
              </p>
              <p style={{fontSize: 16, margin: 0, fontWeight: 'bold'}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNetOperatingIncome))}
              </p>
            </div>

            <div style={{width: 600, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 16, margin: 0, width: 200}}>
                Owners Salary per P&L only
              </p>
              <p style={{fontSize: 15, margin: 0, width: 275}}>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </p>
              <p style={{fontSize: 16, margin: 0, fontWeight: 'bold'}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerSalary))}
              </p>
            </div>

            <p style={{fontSize: 16, width: 200, marginLeft: 75, marginTop: 5, marginBottom: 0}}>
              Fringe Benefits
            </p>

            {this.state.cashflowAnalysisInputArray.map((input, key) => {
              if(input.type === "Fringe"){
                return(
                  <div style={{width: 500, marginLeft: 100, display: 'flex'}}>
                    <p style={{fontSize: 14, margin: 0, width: 225}}>
                      {input.title}
                    </p>
                    <p style={{fontSize: 14, margin: 0}}>
                      ${this.separator(parseInt(input.value))}
                    </p>
                  </div>
                )
              }
            })}

            <div style={{width: 600, marginLeft: 100, display: 'flex'}}>
              <p style={{fontSize: 15, margin: 0, width: 90, fontWeight: 'bold'}}>
                Total Fringe
              </p>
              <p style={{fontSize: 15, margin: 0, width: 360}}>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </p>
              <p style={{fontSize: 15, margin: 0, fontWeight: 'bold'}}>
                +${this.separator(this.calculateTotalFringe())}
              </p>
            </div>

            <div style={{width: 600, marginLeft: 75, display: 'flex', marginTop: 20}}>
              <p style={{fontSize: 15, margin: 0, width: 115}}>
                Interest Expense
              </p>
              <p style={{fontSize: 15, margin: 0, width: 360}}>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </p>
              <p style={{fontSize: 15, margin: 0, fontWeight: 'bold'}}>
                +${this.separator(parseInt(this.state.cashflowAnalysisInterestExpense))}
              </p>
            </div>

            <div style={{width: 600, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 15, marginBottom: 0, width: 180}}>
                Depreciation/Amortization
              </p>
              <p style={{fontSize: 15, marginBottom: 0, width: 295}}>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </p>
              <p style={{fontSize: 15, margin: 0, fontWeight: 'bold'}}>
                +${this.separator(parseInt(this.state.cashflowAnalysisDeprecationAmortization))}
              </p>
            </div>

            <p style={{marginLeft: 75, fontSize: 15, marginBottom: 0, width: 200, marginTop: 20}}>
              Other
            </p>

            {this.state.cashflowAnalysisInputArray.map((input, key) => {
              if(input.type === "Other"){
                return(
                  <div style={{width: 500, marginLeft: 100, display: 'flex'}}>
                    <p style={{fontSize: 14, margin: 0, width: 225}}>
                      {input.title}
                    </p>
                    <p style={{fontSize: 14, margin: 0}}>
                      ${this.separator(parseInt(input.value))}
                    </p>
                  </div>
                )
              }
            })}

            <div style={{width: 600, marginLeft: 100, display: 'flex', marginTop: 5}}>
              <p style={{fontSize: 15, margin: 0, width: 85, fontWeight: 'bold'}}>
                Total Other
              </p>
              <p style={{fontSize: 15, margin: 0, width: 365}}>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </p>
              <p style={{fontSize: 15, margin: 0, fontWeight: 'bold'}}>
                +${this.separator(this.calculateTotalOther())}
              </p>
            </div>

            <div style={{width: 600, marginLeft: 75, display: 'flex', marginTop: 10}}>
              <p style={{fontSize: 17, marginBottom: 0, width: 245, fontWeight: 'bold'}}>
                Total Owner Benefit/Cashflow
              </p>
              <p style={{fontSize: 15, margin: 0, width: 230}}>
                 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </p>
              <p style={{marginLeft: 20, fontSize: 17, margin: 0, fontWeight: 'bold'}}>
                =${this.separator(parseInt(this.state.cashflowAnalysisNetOperatingIncome) + parseInt(this.state.cashflowAnalysisOwnerSalary) + this.calculateTotalFringe() + this.calculateTotalOther() + parseInt(this.state.cashflowAnalysisInterestExpense) + parseInt(this.state.cashflowAnalysisDeprecationAmortization))}
              </p>
            </div>

            <div style={{width: 580, marginLeft: 50, display: 'flex', marginTop: 65}}>
              <div style={{borderTop: '1px solid black', width: 240}}>
                <p style={{fontSize: 13, marginBottom: 0, width: 240}}>
                  Owner Signature
                </p>
              </div>

              <div style={{borderTop: '1px solid black', width: 240, marginLeft: '5%'}}>
                <p style={{width: 240, fontSize: 13, marginBottom: 0}}>
                  Owner Printed Name
                </p>
              </div>

              <div style={{borderTop: '1px solid black', width: 100, marginLeft: '5%'}}>
                <p style={{width: 100, fontSize: 13, marginBottom: 0}}>
                  Date
                </p>
              </div>
            </div>

            <p style={{fontSize: 9, width: 650, marginLeft: 50, marginBottom: 0, marginTop: 10}}>
              CONFIDENTIALITY INFORMATION: This information is taken from sources provided by the 
              Owner and is not warranted or guaranteed by the Broker(s) and is subject to corrections 
              and/or changes by Owner.
            </p>

            <p style={{fontSize: 10, width: 100, marginLeft: 575}}>
              CBA Form 103019
            </p>
          </div>
        </div>
      )
    }
  }

  generateConsentOfSpouse = () => {

    if(this.state.consentOfSpouseBusinessLocation === ""){
      this.setState({consentOfSpouseError: "Please enter a business address"})
      return
    }
    else if(this.state.consentOfSpouseBusinessName === ""){
      this.setState({consentOfSpouseError: "Please enter a business name"})
      return
    }
    else if(this.state.consentOfSpousePersonName === ""){
      this.setState({consentOfSpouseError: "Please enter a person name"})
      return
    }
    else if(this.state.consentOfSpouseSpouseName === ""){
      this.setState({consentOfSpouseError: "Please enter a spouse name"})
      return
    }
    else if(this.state.consentOfSpouseDay === ""){
      this.setState({consentOfSpouseError: "Please select a day"})
      return
    }
    else if(this.state.consentOfSpouseMonth === ""){
      this.setState({consentOfSpouseError: "Please select a month"})
      return
    }
    else if(this.state.consentOfSpouseYear === ""){
      this.setState({consentOfSpouseError: "Please select a year"})
      return
    }
    else{
      this.setState({consentOfSpouseError: ""})
    }
     
    var element = document.getElementById('consentOfSpouseContent');

    html2pdf(element, {
      filename: 'Consent Of Spouse',
      html2canvas: { scale: 2,  logging: true },
      }).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    })
  }

  generateCorporateResolutionToSell = () => {

    if(this.state.corporateResolutionToSellMonth === "Select"){
      this.setState({corporateResolutionToSellError: "Please select a month"})
      return
    }
    else if(this.state.corporateResolutionToSellDay === "Select"){
      this.setState({corporateResolutionToSellError: "Please select a day"})
      return
    }
    else if(this.state.corporateResolutionToSellYear === "Select"){
      this.setState({corporateResolutionToSellError: "Please select a year"})
      return
    }
    else if(this.state.corporateResolutionToSellBusinessName === ""){
      this.setState({corporateResolutionToSellError: "Please enter a business name"})
      return
    }
    else if(this.state.corporateResolutionToSellBusinessCity === ""){
      this.setState({corporateResolutionToSellError: "Please enter a business city"})
      return
    }
    else if(this.state.corporateResolutionToSellBusinessCounty === ""){
      this.setState({corporateResolutionToSellError: "Please enter a business county"})
      return
    }
    else if(this.state.corporateResolutionToSellEmployeeName === ""){
      this.setState({corporateResolutionToSellError: "Please enter an employee name"})
      return
    }
    else{
      this.setState({corporateResolutionToSellError: ""})
    }
     
    var element = document.getElementById('corporateResolutionToSellContent');

    html2pdf(element, {
      filename: 'Corporate Resolution To Sell',
      html2canvas: { scale: 2,  logging: true },
      }).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    })
  }

  generateBrokerConfidentiality = () => {

    if(this.state.brokerConfidentialityBrokerName === ""){
      this.setState({brokerConfidentialityError: "Please enter a broker name"})
      return
    }
    else if(this.state.brokerConfidentialityClientName === ""){
      this.setState({brokerConfidentialityError: "Please enter a client name"})
      return
    }
    else if(this.state.brokerConfidentialityDay === ""){
      this.setState({brokerConfidentialityError: "Please select a day"})
      return
    }
    else if(this.state.brokerConfidentialityMonth === ""){
      this.setState({brokerConfidentialityError: "Please select a month"})
      return
    }
    else if(this.state.brokerConfidentialityYear === ""){
      this.setState({brokerConfidentialityError: "Please select a year"})
      return
    }
    else{
      this.setState({brokerConfidentialityError: ""})
    }

    var element = document.getElementById('brokerConfidentialityContent');

    html2pdf(element, {
      filename: 'Broker Confidentiality',
      html2canvas: { scale: 2,  logging: true },
      }).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    })

  }

  generateCashflow = () => {

    if(this.state.cashflowAnalysisBusinessName === ""){
      this.setState({cashflowAnalysisError: "Please add a business name"})
      return
    }
    if(this.state.cashflowAnalysisFiscalYearSales === "0" || this.state.cashflowAnalysisFiscalYearSales === ""){
      this.setState({cashflowAnalysisError: "Please add business fiscal sales"})
      return
    }
    if(this.state.cashflowAnalysisNetOperatingIncome === "0" || this.state.cashflowAnalysisNetOperatingIncome === ""){
      this.setState({cashflowAnalysisError: "Please add business net operating income"})
      return
    }
    if(this.state.cashflowAnalysisFiscalSalesMonth === "Select"){
      this.setState({cashflowAnalysisError: "Please select a month"})
      return
    }
    if(this.state.cashflowAnalysisFiscalSalesDay === "Select"){
      this.setState({cashflowAnalysisError: "Please select a day"})
      return
    }
    if(this.state.cashflowAnalysisFiscalSalesYear === "Select"){
      this.setState({cashflowAnalysisError: "Please select a year"})
      return
    }


    var element = document.getElementById('cashFlowContent');

    html2pdf(element, {
      filename: 'Cash Flow',
      html2canvas: { scale: 2,  logging: true },
      }).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    })
  }

  separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  renderView(){
    if(this.state.blisVisible === false && 
      this.state.consentOfSpouseVisible === false &&
      this.state.corporateResolutionToSellVisible === false &&
      this.state.brokerConfidentialityVisible === false &&
      this.state.cashflowAnalysisVisible === false){
        return(
          <div style={{height: '100vh'}}>
            <p style={{textAlign: 'center', color: 'white', fontSize: 40, paddingTop: '3%', textDecoration: 'underline'}}>Welcome to The CBA Group document creation website</p>
            <p style={{color: 'white', fontSize: 25, marginLeft: '16%'}}>Here you can easily create a number of documents.</p>
            <p style={{color: 'white', fontSize: 20, marginLeft: '16%', marginTop: '2%'}}>Benefits of this website:</p>
            <ol style={{color: 'white', fontSize: 18, marginLeft: '16%'}}>
              <li>Quickly and easily create documents</li>
              <li>All documents retain same formatting, maintaining document consistancy</li>
            </ol>  
            <p style={{color: 'white', fontSize: 25, marginLeft: '16%', marginTop: '3%'}}>GET STARTED by clicking one of the document buttons below:</p>
            <div style={{display: 'flex', marginLeft: '16%', marginTop: 10}}>
              <div>
                <button className="Contract-Button" onClick={() => this.setState({consentOfSpouseVisible: !this.state.consentOfSpouseVisible, blisVisible: false, corporateResolutionToSellVisible: false, brokerConfidentialityVisible: false, cashflowAnalysisVisible: false})}>Consent of Spouse</button>
                <button className="Contract-Button" onClick={() => this.setState({corporateResolutionToSellVisible: !this.state.corporateResolutionToSellVisible, consentOfSpouseVisible: false, blisVisible: false, brokerConfidentialityVisible: false, cashflowAnalysisVisible: false})}>Corporate Resolution To Sell</button>
              </div>
              <div style={{marginLeft: '10vh'}}>
                <button className="Contract-Button" onClick={() => this.setState({brokerConfidentialityVisible: !this.state.brokerConfidentialityVisible, corporateResolutionToSellVisible: false, consentOfSpouseVisible: false, blisVisible: false, cashflowAnalysisVisible: false})}>Broker Confidentiality</button>
                <button className="Contract-Button" onClick={() => this.setState({cashflowAnalysisVisible: !this.state.cashflowAnalysisVisible, brokerConfidentialityVisible: false, corporateResolutionToSellVisible: false, consentOfSpouseVisible: false, blisVisible: false})}>Cashflow Analysis</button>
              </div>
            </div>
          </div>
        )
    }
    else{
      return(
        <div>   
          {this.renderConsentOfSpouse()}
          {this.renderCorporateResolutionToSell()}
          {this.renderbrokerConfidentiality()}
          {this.renderCashflowAnalysis()}
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{backgroundColor: "#3c4548"}}>
        {this.renderView()}
      </div>
    )
  }
}

