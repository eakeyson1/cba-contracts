import React, { PureComponent } from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CBALogoForHeader from './CBALogoForHeader.png'
import cbaLogo2 from './CBALogo2.png';
import { FaBackspace } from 'react-icons/fa';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './BRUSHSCI.ttf'

//<script src="~/Cairo-Regular-normal.js"></script>




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

    };
    this.displayBlis = this.displayBlis.bind(this);
    this.displayConsentOfSpouse = this.displayConsentOfSpouse.bind(this);
    this.displayCorporateResolutionToSell = this.displayCorporateResolutionToSell.bind(this);
    this.displaybrokerConfidentiality = this.displaybrokerConfidentiality.bind(this);
    this.displayCashflowAnalysis = this.displayCashflowAnalysis.bind(this);

    this.separator = this.separator.bind(this);

    /////   Consent of Spouse   /////
    this.handleConsentOfSpouseChangePersonName = this.handleConsentOfSpouseChangePersonName.bind(this);
    this.handleConsentOfSpouseChangeSpouseName = this.handleConsentOfSpouseChangeSpouseName.bind(this);
    this.handleConsentOfSpouseChangeBusinessName = this.handleConsentOfSpouseChangeBusinessName.bind(this);
    this.handleConsentOfSpouseChangeBusinessLocation = this.handleConsentOfSpouseChangeBusinessLocation.bind(this);
    this.handleConsentOfSpouseChangeDay = this.handleConsentOfSpouseChangeDay.bind(this);
    this.handleConsentOfSpouseChangeMonth = this.handleConsentOfSpouseChangeMonth.bind(this);
    this.handleConsentOfSpouseChangeYear = this.handleConsentOfSpouseChangeYear.bind(this);

    /////   Corporate Resolution to Sell    /////
    this.handleCorporateResolutionToSellChangeDay = this.handleCorporateResolutionToSellChangeDay.bind(this);
    this.handleCorporateResolutionToSellChangeMonth = this.handleCorporateResolutionToSellChangeMonth.bind(this);
    this.handleCorporateResolutionToSellChangeYear = this.handleCorporateResolutionToSellChangeYear.bind(this);
    this.handleCorporateResolutionToSellChangeBusinessName = this.handleCorporateResolutionToSellChangeBusinessName.bind(this);
    this.handleCorporateResolutionToSellChangeBusinessCity = this.handleCorporateResolutionToSellChangeBusinessCity.bind(this);
    this.handleCorporateResolutionToSellChangeBusinessCounty = this.handleCorporateResolutionToSellChangeBusinessCounty.bind(this);
    this.handleCorporateResolutionToSellChangeEmployeeName = this.handleCorporateResolutionToSellChangeEmployeeName.bind(this);

    /////   Broker Confidentiality    /////
    this.handleBrokerConfidentialityChangeClientName = this.handleBrokerConfidentialityChangeClientName.bind(this);
    this.handleBrokerConfidentialityChangeBrokerName = this.handleBrokerConfidentialityChangeBrokerName.bind(this);
    this.handleBrokerConfidentialityChangeDay = this.handleBrokerConfidentialityChangeDay.bind(this);
    this.handleBrokerConfidentialityChangeMonth = this.handleBrokerConfidentialityChangeMonth.bind(this);
    this.handleBrokerConfidentialityChangeYear = this.handleBrokerConfidentialityChangeYear.bind(this);

    /////   Cashflow Analysis   /////
    this.handleCashflowAnalysisChangeBusinessName = this.handleCashflowAnalysisChangeBusinessName.bind(this);
    this.handleCashflowAnalysisChangeNetOperatingIncome = this.handleCashflowAnalysisChangeNetOperatingIncome.bind(this);
    this.handleCashflowAnalysisChangeFiscalYearSales = this.handleCashflowAnalysisChangeFiscalYearSales.bind(this);
    this.handleCashflowAnalysisChangeOwnersPayrollTaxes = this.handleCashflowAnalysisChangeOwnersPayrollTaxes.bind(this);
    this.handleCashflowAnalysisChangeOwnerSalary = this.handleCashflowAnalysisChangeOwnerSalary.bind(this);
    this.handleCashflowAnalysisChangeOwnersVehicle = this.handleCashflowAnalysisChangeOwnersVehicle.bind(this);
    this.handleCashflowAnalysisChangeInterestExpense = this.handleCashflowAnalysisChangeInterestExpense.bind(this);
    this.handleCashflowAnalysisChangeOwnersInsurance = this.handleCashflowAnalysisChangeOwnersInsurance.bind(this);
    this.handleCashflowAnalysisChangeOwnersMedical = this.handleCashflowAnalysisChangeOwnersMedical.bind(this);
    this.handleCashflowAnalysisChangeOwnerTravelEntertainment = this.handleCashflowAnalysisChangeOwnerTravelEntertainment.bind(this);
    this.handleCashflowAnalysisChangeNonBusinessTelephone = this.handleCashflowAnalysisChangeNonBusinessTelephone.bind(this);
    this.handleCashflowAnalysisChangeNonBusinessUtilities = this.handleCashflowAnalysisChangeNonBusinessUtilities.bind(this);
    this.handleCashflowAnalysisChangeNonBusinessLegal = this.handleCashflowAnalysisChangeNonBusinessLegal.bind(this);
    this.handleCashflowAnalysisChangeNonBusinessAccounting = this.handleCashflowAnalysisChangeNonBusinessAccounting.bind(this);
    this.handleCashflowAnalysisChangeDepreciationAmortization = this.handleCashflowAnalysisChangeDepreciationAmortization.bind(this);
    this.handleCashflowAnalysisChangePartnerFamilyExcessSalary = this.handleCashflowAnalysisChangePartnerFamilyExcessSalary.bind(this);
    this.handleCashflowAnalysisChangeNonRealSalaries = this.handleCashflowAnalysisChangeNonRealSalaries.bind(this);
    this.handleCashflowAnalysisChangeFamilyBenefits = this.handleCashflowAnalysisChangeFamilyBenefits.bind(this);
    this.handleCashflowAnalysisChangeDonations = this.handleCashflowAnalysisChangeDonations.bind(this);
    this.handleCashflowAnalysisChangeNonRecurring = this.handleCashflowAnalysisChangeNonRecurring.bind(this);
    this.handleCashflowAnalysisChangeRentAdjustments = this.handleCashflowAnalysisChangeRentAdjustments.bind(this);
    this.handleCashflowAnalysisChangeInventoryAdjustments = this.handleCashflowAnalysisChangeInventoryAdjustments.bind(this);
  }

  handleConsentOfSpouseChangeDay(event) {
    this.setState({consentOfSpouseDay: event.target.value});
  }
  handleConsentOfSpouseChangeMonth(event) {
    this.setState({consentOfSpouseMonth: event.target.value});
  }
  handleConsentOfSpouseChangeYear(event) {
    this.setState({consentOfSpouseYear: event.target.value});
  }
  handleConsentOfSpouseChangePersonName(event) {
    this.setState({consentOfSpousePersonName: event.target.value});
  }
  handleConsentOfSpouseChangeSpouseName(event) {
    this.setState({consentOfSpouseSpouseName: event.target.value});
  }
  handleConsentOfSpouseChangeBusinessName(event) {
    this.setState({consentOfSpouseBusinessName: event.target.value});
  }
  handleConsentOfSpouseChangeBusinessLocation(event) {
    this.setState({consentOfSpouseBusinessLocation: event.target.value});
  }
  handleCorporateResolutionToSellChangeDay(event) {
    this.setState({corporateResolutionToSellDay: event.target.value});
  }
  handleCorporateResolutionToSellChangeMonth(event) {
    this.setState({corporateResolutionToSellMonth: event.target.value});
  }
  handleCorporateResolutionToSellChangeYear(event) {
    this.setState({corporateResolutionToSellYear: event.target.value});
  }
  handleCorporateResolutionToSellChangeBusinessName(event) {
    this.setState({corporateResolutionToSellBusinessName: event.target.value});
  }
  handleCorporateResolutionToSellChangeBusinessCity(event) {
    this.setState({corporateResolutionToSellBusinessCity: event.target.value});
  }
  handleCorporateResolutionToSellChangeBusinessCounty(event) {
    this.setState({corporateResolutionToSellBusinessCounty: event.target.value});
  }
  handleCorporateResolutionToSellChangeEmployeeName(event) {
    this.setState({corporateResolutionToSellEmployeeName: event.target.value});
  }
  handleBrokerConfidentialityChangeClientName(event) {
    this.setState({brokerConfidentialityClientName: event.target.value});
  }
  handleBrokerConfidentialityChangeBrokerName(event) {
    this.setState({brokerConfidentialityBrokerName: event.target.value});
  }
  handleBrokerConfidentialityChangeDay(event) {
    this.setState({brokerConfidentialityDay: event.target.value});
  }
  handleBrokerConfidentialityChangeMonth(event) {
    this.setState({brokerConfidentialityMonth: event.target.value});
  }
  handleBrokerConfidentialityChangeYear(event) {
    this.setState({brokerConfidentialityYear: event.target.value});
  }
  handleCashflowAnalysisChangeBusinessName(event) {
    this.setState({cashflowAnalysisBusinessName: event.target.value});
  }
  handleCashflowAnalysisChangeNetOperatingIncome(event) {
    this.setState({cashflowAnalysisNetOperatingIncome: event.target.value});
  }
  handleCashflowAnalysisChangeOwnerSalary(event) {
    this.setState({cashflowAnalysisOwnerSalary: event.target.value});
  }
  handleCashflowAnalysisChangeFiscalYearSales(event) {
    this.setState({cashflowAnalysisFiscalYearSales: event.target.value});
  }
  handleCashflowAnalysisChangeOwnersVehicle(event) {
    this.setState({cashflowAnalysisOwnerVehicle: event.target.value});
  }
  handleCashflowAnalysisChangeOwnersInsurance(event) {
    this.setState({cashflowAnalysisOwnerInsurance: event.target.value});
  }
  handleCashflowAnalysisChangeOwnersMedical(event) {
    this.setState({cashflowAnalysisOwnerMedical: event.target.value});
  }
  handleCashflowAnalysisChangeOwnersPayrollTaxes(event) {
    this.setState({cashflowAnalysisOwnerPayrollTaxes: event.target.value});
  }
  handleCashflowAnalysisChangeOwnerTravelEntertainment(event) {
    this.setState({cashflowAnalysisOwnerTravelEntertainment: event.target.value});
  }
  handleCashflowAnalysisChangeNonBusinessTelephone(event) {
    this.setState({cashflowAnalysisNonBusinessTelephone: event.target.value});
  }
  handleCashflowAnalysisChangeNonBusinessUtilities(event) {
    this.setState({cashflowAnalysisNonBusinessUtilities: event.target.value});
  }
  handleCashflowAnalysisChangeNonBusinessLegal(event) {
    this.setState({cashflowAnalysisNonBusinessLegal: event.target.value});
  }
  handleCashflowAnalysisChangeNonBusinessAccounting(event) {
    this.setState({cashflowAnalysisNonBusinessAccounting: event.target.value});
  }
  handleCashflowAnalysisChangeInterestExpense(event) {
    this.setState({cashflowAnalysisInterestExpense: event.target.value});
  }
  handleCashflowAnalysisChangeDepreciationAmortization(event) {
    this.setState({cashflowAnalysisDeprecationAmortization: event.target.value});
  }
  handleCashflowAnalysisChangePartnerFamilyExcessSalary(event) {
    this.setState({cashflowAnalysisPartnerFamilyExcessSalary: event.target.value});
  }
  handleCashflowAnalysisChangeNonRealSalaries(event) {
    this.setState({cashflowAnalysisNonRealSalaries: event.target.value});
  }
  handleCashflowAnalysisChangeFamilyBenefits(event) {
    this.setState({cashflowAnalysisFamilyBenefits: event.target.value});
  }
  handleCashflowAnalysisChangeDonations(event) {
    this.setState({cashflowAnalysisDonations: event.target.value});
  }
  handleCashflowAnalysisChangeNonRecurring(event) {
    this.setState({cashflowAnalysisNonRecurring: event.target.value});
  }
  handleCashflowAnalysisChangeRentAdjustments(event) {
    this.setState({cashflowAnalysisRentAdjustments: event.target.value});
  }
  handleCashflowAnalysisChangeInventoryAdjustments(event) {
    this.setState({cashflowAnalysisInventoryAdjustments: event.target.value});
  }

  displayBlis() {
    this.setState({
      blisVisible: !this.state.blisVisible,
      consentOfSpouseVisible: false,
      corporateResolutionToSellVisible: false,
      brokerConfidentialityVisible: false,
      cashflowAnalysisVisible: false,
    })
  }

  displayConsentOfSpouse() {
    this.setState({
      consentOfSpouseVisible: !this.state.consentOfSpouseVisible,
      blisVisible: false,
      corporateResolutionToSellVisible: false,
      brokerConfidentialityVisible: false,
      cashflowAnalysisVisible: false,
    })
  }

  displayCorporateResolutionToSell() {
    this.setState({
      corporateResolutionToSellVisible: !this.state.corporateResolutionToSellVisible,
      consentOfSpouseVisible: false,
      blisVisible: false,
      brokerConfidentialityVisible: false,
      cashflowAnalysisVisible: false,
    })
  }

  displaybrokerConfidentiality(){
    this.setState({
      brokerConfidentialityVisible: !this.state.brokerConfidentialityVisible,
      corporateResolutionToSellVisible: false,
      consentOfSpouseVisible: false,
      blisVisible: false,
      cashflowAnalysisVisible: false
    })
  }

  displayCashflowAnalysis(){
    this.setState({
      cashflowAnalysisVisible: !this.state.cashflowAnalysisVisible,
      brokerConfidentialityVisible: false,
      corporateResolutionToSellVisible: false,
      consentOfSpouseVisible: false,
      blisVisible: false
    })
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
        <DropdownButton alignRight title={this.state.cashflowAnalysisFiscalSalesDay} id="dropdown-menu-align-right">
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
        <DropdownButton alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
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
        <DropdownButton alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
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
        <DropdownButton disabled={true} alignRight title={this.state.brokerConfidentialityDay} id="dropdown-menu-align-right">
          <Dropdown.Item onClick={() => this.setState({consentOfSpouseMonth: "January"})}>January</Dropdown.Item>
        </DropdownButton>
      )
    }
  }

  renderBlis() {
    if(this.state.blisVisible === true){
      return(
        <div>
          <FaBackspace size={50} color="white" onClick={() => this.setState({blisVisible: false})}/>
          <p>blis stuff</p>
          <form action="/action_page.php">
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname"/>
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname"/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
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
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpousePersonName} onChange={this.handleConsentOfSpouseChangePersonName} />
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Person Name</label>
                    </div>

                    <div style={{marginLeft: '3vh'}}>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessName} onChange={this.handleConsentOfSpouseChangeBusinessName} />
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Business Name</label>
                    </div>
                  </div>

                  <div style={{display: 'flex'}}>
                    <div>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseSpouseName} onChange={this.handleConsentOfSpouseChangeSpouseName} />
                      <label style={{textAlign: 'center'}} className="Text-Label-Style">Spouse Name</label>
                    </div>

                    <div style={{marginLeft: '3vh'}}>
                      <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessLocation} onChange={this.handleConsentOfSpouseChangeBusinessLocation} />
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
        <div style={{width: '60%', margin: '0 auto'}}>
          <div style={{display: 'flex', marginTop: '3vh'}}>
           <FaBackspace size={50} color="white" onClick={() => this.setState({corporateResolutionToSellVisible: false})}/>
            <p style={{color: 'white', marginLeft: '20vh', fontSize: 40, fontWeight: 'bold'}}>Corporate Resolution To Sell</p>
          </div>

          <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>

            <div style={{marginLeft: '33%', display: 'flex'}}>

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
                <DropdownButton alignRight title={this.state.corporateResolutionToSellYear} id="dropdown-menu-align-right">
                  <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellYear: "2022"})}>2022</Dropdown.Item>
                </DropdownButton>
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Year</label>
              </div>

            </div>

            <form style={{display: 'flex', marginTop: '4vh'}}>

              <div>
                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessName} onChange={this.handleCorporateResolutionToSellChangeBusinessName} />
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Business Name</label>
              </div>

              <div style={{marginLeft: '3vh'}}>
                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessCity} onChange={this.handleCorporateResolutionToSellChangeBusinessCity} />
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Business City</label>
              </div>

              <div style={{marginLeft: '3vh'}}>
                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessCounty} onChange={this.handleCorporateResolutionToSellChangeBusinessCounty} />
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Business County</label>
              </div>

              <div style={{marginLeft: '3vh'}}>
                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellEmployeeName} onChange={this.handleCorporateResolutionToSellChangeEmployeeName} />
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Employee Name</label>
              </div>

            </form>
          </div>
    
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="Generate-PDF-Button" onClick={this.generateCorporateResolutionToSell}>Generate PDF</button>
          </div>
          <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.corporateResolutionToSellError}</p>

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
                <input className="Text-Input-Style"  type="text" value={this.state.brokerConfidentialityClientName} onChange={this.handleBrokerConfidentialityChangeClientName} />
                <label style={{textAlign: 'center'}} className="Text-Label-Style">Client Name</label>
              </div>

              <div style={{marginLeft: '5vh'}}>
                <input className="Text-Input-Style" type="text" value={this.state.brokerConfidentialityBrokerName} onChange={this.handleBrokerConfidentialityChangeBrokerName} />
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

          <p style={{fontsize: 12, width: 625, marginLeft: 75, textAlign: 'center'}}>
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
    if(this.state.cashflowAnalysisVisible === true){

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
          <div style={{width: '55%', marginLeft: '5%'}}>
            <div style={{display: 'flex'}}>
              <FaBackspace size={50} color="white" onClick={() => this.setState({cashflowAnalysisVisible: false})}/>
              <p style={{color: 'white', marginLeft: '35vh', fontSize: 40, fontWeight: 'bold'}}>Cashflow Analysis</p>
            </div>
            <p style={{color: 'white', fontWeight: 'bold', border: '1px solid white', width: '70%'}}>WHOLE NUMBERS ONLY, NO COMMAS OR DOLLAR SIGNS($)</p>
            <div style={{alignItems: 'center', justifyContent: 'center', marginTop: '2vh'}}>

              <div style={{display: 'flex'}}>
                <div>
                  <input type="text" value={this.state.cashflowAnalysisBusinessName} onChange={this.handleCashflowAnalysisChangeBusinessName} />
                  <label className="Text-Label-Style">Business Name</label>
                </div>
                <div style={{display: 'flex', marginLeft: '5%'}}>
                  <div style={{marginLeft: '2vh'}}>
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
              </div>


              <div style={{display: 'flex', marginTop: '4%'}}>
                <div>
                  <input style={{width: '15vh'}} type="text" value={this.state.cashflowAnalysisFiscalYearSales} onChange={this.handleCashflowAnalysisChangeFiscalYearSales} />
                  <label className="Text-Label-Style">Fiscal Year Sales</label>
                </div>
                <div style={{marginLeft: '5%'}}>
                  <input style={{width: '15vh'}} type="text" value={this.state.cashflowAnalysisNetOperatingIncome} onChange={this.handleCashflowAnalysisChangeNetOperatingIncome} />
                  <label className="Text-Label-Style">Net Operating Income</label>
                </div>
                <div style={{marginLeft: '5%'}}>
                  <input style={{width: '15vh'}} type="text" value={this.state.cashflowAnalysisOwnerSalary} onChange={this.handleCashflowAnalysisChangeOwnerSalary} />
                  <label className="Text-Label-Style">Owner's Salary</label>
                </div>
              </div>

              <div style={{display: 'flex', marginTop: '4%'}}>
                <div style={{width: '50%'}}>
                  <p style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>Fringe Benefits</p>
                  <div style={{marginLeft: '5%'}}>
                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Owner's Vehicle</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisOwnerVehicle} onChange={this.handleCashflowAnalysisChangeOwnersVehicle} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Owner's Insurance</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisOwnerInsurance} onChange={this.handleCashflowAnalysisChangeOwnersInsurance} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Owner's Medical</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisOwnerMedical} onChange={this.handleCashflowAnalysisChangeOwnersMedical} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Owner's Payroll Taxes</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisOwnerPayrollTaxes} onChange={this.handleCashflowAnalysisChangeOwnersPayrollTaxes} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Owner's Travel/Entertainment</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisOwnerTravelEntertainment} onChange={this.handleCashflowAnalysisChangeOwnerTravelEntertainment} />
                    </div>

                    <div style={{display: 'flex', marginTop: '3vh'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Non-Business Telephone</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisNonBusinessTelephone} onChange={this.handleCashflowAnalysisChangeNonBusinessTelephone} />
                    </div>

                    
                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Non-Business Utilities</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisNonBusinessUtilities} onChange={this.handleCashflowAnalysisChangeNonBusinessUtilities} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Non-Business Legal</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisNonBusinessLegal} onChange={this.handleCashflowAnalysisChangeNonBusinessLegal} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Non-Business Accounting</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisNonBusinessAccounting} onChange={this.handleCashflowAnalysisChangeNonBusinessAccounting} />
                    </div>

                  </div>
                </div>
                <div style={{width: '50%'}}>
                  <p style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>Other</p>
                  <div style={{marginLeft: '5%'}}>
                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Interest Expense</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisInterestExpense} onChange={this.handleCashflowAnalysisChangeInterestExpense} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Depreciation/Amortization</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisDeprecationAmortization} onChange={this.handleCashflowAnalysisChangeDepreciationAmortization} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Partner/Family Excess Salary</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisPartnerFamilyExcessSalary} onChange={this.handleCashflowAnalysisChangePartnerFamilyExcessSalary} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Non Real Salaries</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisNonRealSalaries} onChange={this.handleCashflowAnalysisChangeNonRealSalaries} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Family Benefits</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisFamilyBenefits} onChange={this.handleCashflowAnalysisChangeFamilyBenefits} />
                    </div>

                    <div style={{display: 'flex', marginTop: '3vh'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Donations</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisDonations} onChange={this.handleCashflowAnalysisChangeDonations} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Non Recurring</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisNonRecurring} onChange={this.handleCashflowAnalysisChangeNonRecurring} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Rent Adjustments</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisRentAdjustments} onChange={this.handleCashflowAnalysisChangeRentAdjustments} />
                    </div>

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'white', fontSize: 14, padding: 0, margin: 0, width: '25vh', marginTop: 3}}>Inventory Adjustments</label>
                      <input className="Text-Input-Number-Style" type="text" value={this.state.cashflowAnalysisInventoryAdjustments} onChange={this.handleCashflowAnalysisChangeInventoryAdjustments} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button className="Generate-Cashflow-PDF-Button" onClick={this.generateCashflow}>Generate PDF</button>
            </div>

            <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.cashflowAnalysisError}</p>

          </div>

          <div id="cashFlowContent" style={{width: '50%', backgroundColor: 'white'}}>

            <img style={{height: 100, width: 210, marginLeft: 250, marginTop: 30}} src={cbaLogo2}></img>

            <p style={{textAlign: 'center', marginLeft: 150, width: 400, marginTop: 10, fontSize: 13, marginBottom: 0, fontWeight: 'bold'}}>
              The CBA Group, LLC &nbsp; 20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274 Fax: (704) 895-4278
            </p>
            <p style={{marginLeft: 135, fontSize: 18, marginBottom: 5, marginTop: 10}}>
              <strong>
                TOTAL OWNER BENEFIT “CASH FLOW” ANALYSIS 
              </strong>
            </p>

            <p style={{fontSize: 12, marginLeft: 50, marginBottom: 0}}>
              Business Name: {this.state.cashflowAnalysisBusinessName}
            </p>

            
            
            <div style={{width: 500, marginLeft: 50, display: 'flex'}}>
              <p style={{fontSize: 12, margin: 0, width: 350}}>
                Net Operating Income for fiscal year ending
              </p>
              <p style={{fontSize: 12, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNetOperatingIncome))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 50, display: 'flex'}}>
              <p style={{fontSize: 12, margin: 0, width: 350}}>
                Owners Salary per P&L only
              </p>
              <p style={{fontSize: 12, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerSalary))}
              </p>
            </div>

            <p style={{fontSize: 13, width: 200, marginLeft: 50, marginTop: 5, marginBottom: 0}}>
              Fringe Benefits
            </p>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Owners Vehicle
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerVehicle))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Owners Insurance
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerInsurance))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Owners Medical
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerMedical))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Owners Payroll Taxes
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerPayrollTaxes))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Owners Travel/Entertainment
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisOwnerTravelEntertainment))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Non-Business Telephone
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNonBusinessTelephone))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Non-Business Utilities
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNonBusinessUtilities))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Non-Business Legal
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNonBusinessLegal))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
            <p style={{fontSize: 11, margin: 0, width: 225}}>
                Non-Business Accounting
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNonBusinessAccounting))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 12, margin: 0, width: 325}}>
                Total Fringe
              </p>
              <p style={{fontSize: 12, margin: 0}}>
                +${this.separator(parseInt(this.state.cashflowAnalysisOwnerVehicle) + parseInt(this.state.cashflowAnalysisOwnerInsurance) + parseInt(this.state.cashflowAnalysisOwnerMedical) + parseInt(this.state.cashflowAnalysisOwnerPayrollTaxes) + parseInt(this.state.cashflowAnalysisOwnerTravelEntertainment) + parseInt(this.state.cashflowAnalysisNonBusinessTelephone) + parseInt(this.state.cashflowAnalysisNonBusinessUtilities) + parseInt(this.state.cashflowAnalysisNonBusinessLegal) + parseInt(this.state.cashflowAnalysisNonBusinessAccounting))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 50, display: 'flex', marginTop: 5}}>
            <p style={{fontSize: 12, margin: 0, width: 350}}>
                Interest Expense
              </p>
              <p style={{fontSize: 12, margin: 0}}>
                +${this.separator(parseInt(this.state.cashflowAnalysisInterestExpense))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 50, display: 'flex'}}>
              <p style={{fontSize: 12, marginBottom: 0, width: 350}}>
                Depreciation/Amortization
              </p>
              <p style={{fontSize: 12, margin: 0}}>
                +${this.separator(parseInt(this.state.cashflowAnalysisDeprecationAmortization))}
              </p>
            </div>

            <p style={{marginLeft: 50, fontSize: 13, marginBottom: 0, width: 200, marginTop: 5}}>
              Other
            </p>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Partner/Family Excess Salary
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisPartnerFamilyExcessSalary))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
            <p style={{fontSize: 11, margin: 0, width: 225}}>
                Non Real Salaries
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNonRealSalaries))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Family Benefits
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisFamilyBenefits))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Donations
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisDonations))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Non Recurring
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisNonRecurring))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Rent Adjustments
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisRentAdjustments))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 75, display: 'flex'}}>
              <p style={{fontSize: 11, margin: 0, width: 225}}>
                Inventory Adjustments
              </p>
              <p style={{fontSize: 11, margin: 0}}>
                ${this.separator(parseInt(this.state.cashflowAnalysisInventoryAdjustments))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 50, display: 'flex', marginTop: 5}}>
              <p style={{fontSize: 11, margin: 0, width: 350}}>
                Total Other
              </p>
              <p style={{fontSize: 12, margin: 0}}>
                +${this.separator(parseInt(this.state.cashflowAnalysisPartnerFamilyExcessSalary) +  parseInt(this.state.cashflowAnalysisNonRealSalaries) +  parseInt(this.state.cashflowAnalysisFamilyBenefits) +  parseInt(this.state.cashflowAnalysisDonations) +  parseInt(this.state.cashflowAnalysisNonRecurring) +  parseInt(this.state.cashflowAnalysisRentAdjustments) +  parseInt(this.state.cashflowAnalysisInventoryAdjustments))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 50, display: 'flex'}}>
              <p style={{fontSize: 15, marginBottom: 0, width: 350, textAlign: 'left'}}>
                Total Owner Benefit/Cashflow
              </p>
              <p style={{marginLeft: 20, fontSize: 15, margin: 0}}>
                =${ this.separator(parseInt(this.state.cashflowAnalysisNetOperatingIncome) + parseInt(this.state.cashflowAnalysisOwnerSalary) + parseInt(this.state.cashflowAnalysisOwnerVehicle) + parseInt(this.state.cashflowAnalysisOwnerInsurance) + parseInt(this.state.cashflowAnalysisOwnerMedical) + parseInt(this.state.cashflowAnalysisOwnerPayrollTaxes) + parseInt(this.state.cashflowAnalysisOwnerTravelEntertainment) + parseInt(this.state.cashflowAnalysisNonBusinessTelephone) + parseInt(this.state.cashflowAnalysisNonBusinessUtilities) + parseInt(this.state.cashflowAnalysisNonBusinessLegal) + parseInt(this.state.cashflowAnalysisNonBusinessAccounting) + parseInt(this.state.cashflowAnalysisPartnerFamilyExcessSalary) +  parseInt(this.state.cashflowAnalysisNonRealSalaries) +  parseInt(this.state.cashflowAnalysisFamilyBenefits) +  parseInt(this.state.cashflowAnalysisDonations) +  parseInt(this.state.cashflowAnalysisNonRecurring) +  parseInt(this.state.cashflowAnalysisRentAdjustments) +  parseInt(this.state.cashflowAnalysisInventoryAdjustments) + parseInt(this.state.cashflowAnalysisInterestExpense) + parseInt(this.state.cashflowAnalysisDeprecationAmortization))}
              </p>
            </div>

            <div style={{width: 500, marginLeft: 50, display: 'flex', marginTop: 30}}>
              <div style={{borderTop: '1px solid black', width: '40%'}}>
                <p style={{fontSize: 13, marginBottom: 0}}>
                  Owner Signature
                </p>
              </div>

              <div style={{borderTop: '1px solid black', width: '40%', marginLeft: '5%'}}>
                <p style={{width: 300, fontSize: 13, marginBottom: 0}}>
                  Owner Printed Name
                </p>
              </div>

              <div style={{borderTop: '1px solid black', width: '20%', marginLeft: '5%'}}>
                <p style={{width: 300, fontSize: 13, marginBottom: 0}}>
                  Date
                </p>
              </div>
            </div>

            <p style={{fontSize: 9, width: 500, marginLeft: 50, marginBottom: 0}}>
              CONFIDENTIALITY INFORMATION: This information is taken from sources provided by the 
              Owner and is not warranted or guaranteed by the Broker(s) and is subject to corrections 
              and/or changes by Owner.
            </p>

            <p style={{fontSize: 10, width: 100, marginLeft: 500}}>
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

    if(this.state.corporateResolutionToSellBusinessCity === ""){
      this.setState({corporateResolutionToSellError: "Please enter a business city"})
      return
    }
    else if(this.state.corporateResolutionToSellBusinessCounty === ""){
      this.setState({corporateResolutionToSellError: "Please enter a business county"})
      return
    }
    else if(this.state.corporateResolutionToSellBusinessName === ""){
      this.setState({corporateResolutionToSellError: "Please enter a business name"})
      return
    }
    else if(this.state.corporateResolutionToSellEmployeeName === ""){
      this.setState({corporateResolutionToSellError: "Please enter an employee name"})
      return
    }
    else if(this.state.corporateResolutionToSellDay === ""){
      this.setState({corporateResolutionToSellError: "Please select a day"})
      return
    }
    else if(this.state.corporateResolutionToSellMonth === ""){
      this.setState({corporateResolutionToSellError: "Please select a month"})
      return
    }
    else if(this.state.corporateResolutionToSellYear === ""){
      this.setState({corporateResolutionToSellError: "Please select a year"})
      return
    }
    else{
      this.setState({corporateResolutionToSellError: ""})
    }
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 150px; font-size: 13px"><strong>The CBA Group, LLC &nbsp;20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274  Fax: (704) 895-4278</strong></p><p style="width: 450px; margin-left: 160px; font-size: 22px"><strong>Corporate Resolution To Sell</strong></p>'
    var string2 = '<p style="font-size: 13px; width: 525px; margin-left: 40px; text-align: center;">The undersigned, being the Secretary of <strong>' + this.state.corporateResolutionToSellBusinessName + '</strong>, a North Carolina Corporation and acting pursuant to North Carolina General Statutes Sections, does hereby certify that this is a true and correct resolution unanimously adopted by a joint meeting of the Shareholders and the Board of Directors of the Corporation, at a special business meeting held pursuant to notice duly given in the city of <strong>' + this.state.corporateResolutionToSellBusinessCity + '</strong>  in the County of <strong>' + this.state.corporateResolutionToSellBusinessCounty + '</strong>, North Carolina, on the <strong>' + this.state.corporateResolutionToSellDay + '</strong> day of <strong>' + this.state.corporateResolutionToSellMonth + ', ' + this.state.corporateResolutionToSellYear + '</strong>, and this resolution will not be revoked by any subsequent action of the Board of Directors of the Corporation, but will remain in full force and effect.'
    var string3 = '<p style="width: 500px; margin-left: 50px; font-size: 15px">BE &nbsp;IT RESOLVED&nbsp;&nbsp;&nbsp; that <strong>' + this.state.corporateResolutionToSellEmployeeName + ' </strong> of the Corporation is hereby authorized and directed with the full and complete authority to:</p>'
    var string4 = '<ol style="width: 500px; margin-left: 50px;"><li style="font-size: 13px" data-list-text="1)"> <p style="font-size: 13px">Sell any or all assets&nbsp; of the Corporation.</p> </li><li style="font-size: 13px" data-list-text="2)"><p style="font-size: 13px">Execute&nbsp; an agreement to pay a fee to The CBA Group, LLC, and/or to The CBA Group Real Estate, in the event that the business and/or real property of the Corporation is disposed of under authority given to them in a Listing Contract, Commission Protection Plan or other Agreement.</p></li><li style="font-size: 13px" data-list-text="3)"> <p style="font-size: 13px">Execute&nbsp; a contract for the sale, lease or exchange of the assets&nbsp; of the Corporation at such price, term and conditions as he/she, in his/her sole discretion, deems acceptable and thereafter to execute any and all documents necessary&nbsp; to complete the sale, lease or exchange.</p></li></ol>'
    var string5 = '<div style="margin-left: 50px; margin-top: 30px; width: 500px; display: flex"><div style="width: 35%"><div style="border-top: 1px solid black"><p style="font-size: 13px;">Printed Name</p></div></div><div style="width: 50%; margin-left: 5%"><div style="border-top: 1px solid black"><p style="width: 300px; font-size: 13px"><em>Signature</em> Secretary of the Corporation</p></div></div></div>'
    var bottomNumber = '<p style="font-size: 10px; width: 100px; margin-left: 500px">CBA101719</p>'

    var finalString = string1 + string2 + string3 + string4 + string5 + bottomNumber
    
    var doc = new jsPDF('p', 'pt', 'letter')

    var title = "Corporate Resolution To Sell: " + this.state.consentOfSpouseBusinessName

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width*0.3, 10, 250, 100)
    doc.html(finalString, {
      callback: function(doc) {
        doc.save(title);
      }
    });
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
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
            <div style={{display: 'flex'}}>
              <div style={{marginTop: '5vh'}}>
                <button disabled={true} className="Contract-Button" onClick={this.displayBlis}>BLIS</button>
                <button className="Contract-Button" onClick={this.displayConsentOfSpouse}>Consent of Spouse</button>
                <button className="Contract-Button" onClick={this.displayCorporateResolutionToSell}>Corporate Resolution To Sell</button>
              </div>
              <div style={{marginTop: '5vh', marginLeft: '10vh'}}>
                <button className="Contract-Button" onClick={this.displaybrokerConfidentiality}>Broker Confidentiality</button>
                <button className="Contract-Button" onClick={this.displayCashflowAnalysis}>Cashflow Analysis</button>
                <button disabled={true} className="Contract-Button" onClick={this.displaybrokerConfidentiality}>Partners Consent To Sell</button>
              </div>
            </div>
          </div>
        )
    }
    else{
      return(
        <div>   
          {this.renderBlis()}
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
      <div style={{backgroundColor: "#3c4548", height: '100vh'}}>
        {this.renderView()}
      </div>
    )
  }
}

