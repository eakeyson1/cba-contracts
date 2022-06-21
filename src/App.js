import React, { PureComponent } from "react";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CBALogoForHeader from './CBALogoForHeader.png'
import cbaLogo2 from './CBALogo2.png';
import { FaBackspace } from 'react-icons/fa';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

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

        /////   Consent of Spouse   /////
        consentOfSpousePersonName: "",
        consentOfSpouseSpouseName: "",
        consentOfSpouseBusinessName: "",
        consentOfSpouseBusinessLocation: "",
        consentOfSpouseDay: "",
        consentOfSpouseMonth: "",
        consentOfSpouseYear: "",

        consentOfSpouseError: "",

        /////   Corporate Resolution to Sell    
        corporateResolutionToSellBusinessName: "",
        corporateResolutionToSellBusinessCity: "",
        corporateResolutionToSellBusinessCounty: "",
        corporateResolutionToSellEmployeeName: "",
        corporateResolutionToSellDay: "",
        corporateResolutionToSellMonth: "",
        corporateResolutionToSellYear: "",

        corporateResolutionToSellError: "",

        /////   Broker Confidentiality    
        brokerConfidentialityClientName: "",
        brokerConfidentialityBrokerName: "",
        brokerConfidentialityDay: "",
        brokerConfidentialityMonth: "",
        brokerConfidentialityYear: "",

        brokerConfidentialityError: "",

    };
    this.displayBlis = this.displayBlis.bind(this);
    this.displayConsentOfSpouse = this.displayConsentOfSpouse.bind(this);
    this.displayCorporateResolutionToSell = this.displayCorporateResolutionToSell.bind(this);
    this.displaybrokerConfidentiality = this.displaybrokerConfidentiality.bind(this);


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

  displayBlis() {
    this.setState({
      blisVisible: !this.state.blisVisible,
      consentOfSpouseVisible: false,
      corporateResolutionToSellVisible: false,
      brokerConfidentialityVisible: false,
    })
  }

  displayConsentOfSpouse() {
    this.setState({
      consentOfSpouseVisible: !this.state.consentOfSpouseVisible,
      blisVisible: false,
      corporateResolutionToSellVisible: false,
      brokerConfidentialityVisible: false,
    })
  }

  displayCorporateResolutionToSell() {
    this.setState({
      corporateResolutionToSellVisible: !this.state.corporateResolutionToSellVisible,
      consentOfSpouseVisible: false,
      blisVisible: false,
      brokerConfidentialityVisible: false,
    })
  }

  displaybrokerConfidentiality(){
    this.setState({
      brokerConfidentialityVisible: !this.state.brokerConfidentialityVisible,
      corporateResolutionToSellVisible: false,
      consentOfSpouseVisible: false,
      blisVisible: false
    })
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
        <DropdownButton disabled={true} alignRight title={this.state.consentOfSpouseDay} id="dropdown-menu-align-right">
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

  renderConsentOfSpouse() {
    if(this.state.consentOfSpouseVisible === true){
      return(
        <div style={{width: '60%', margin: '0 auto'}}>
          <FaBackspace size={50} color="white" onClick={() => this.setState({consentOfSpouseVisible: false})}/>
          <h1 style={{color: 'white', textAlign: 'center'}}>Consent Of Spouse</h1>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>
            <div style={{display: 'flex'}}>
              <form>
                <input type="text" value={this.state.consentOfSpousePersonName} onChange={this.handleConsentOfSpouseChangePersonName} />
                <label className="Text-Label-Style">Person Name</label>

                <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseSpouseName} onChange={this.handleConsentOfSpouseChangeSpouseName} />
                <label className="Text-Label-Style">Spouse Name</label>

                <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessName} onChange={this.handleConsentOfSpouseChangeBusinessName} />
                <label className="Text-Label-Style">Business Name</label>

                <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessLocation} onChange={this.handleConsentOfSpouseChangeBusinessLocation} />
                <label className="Text-Label-Style">Business Address</label>
              </form>

              <form style={{marginLeft: '10%'}}>

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
                <label className="Text-Label-Style">Month</label>

                <div style={{marginTop: '2vh'}}>
                  {this.renderConsentOfSpouseDayDropdown()}
                  <label className="Text-Label-Style">Day</label>
                </div>
                <DropdownButton style={{marginTop: '2vh'}} alignRight title={this.state.consentOfSpouseYear} id="dropdown-menu-align-right">
                  <Dropdown.Item onClick={() => this.setState({consentOfSpouseYear: "2022"})}>2022</Dropdown.Item>
                </DropdownButton>
                <label className="Text-Label-Style">Year</label>
              </form>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="Generate-PDF-Button" onClick={this.generateConsentOfSpouse}>Generate PDF</button>
          </div>
          <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.consentOfSpouseError}</p>

        </div>
      )
    
    }
  }

  renderCorporateResolutionToSell() {
    if(this.state.corporateResolutionToSellVisible === true){
      return(
        <div style={{width: '60%', margin: '0 auto'}}>
          <FaBackspace size={50} color="white" onClick={() => this.setState({corporateResolutionToSellVisible: false})}/>
          <h1 style={{color: 'white', textAlign: 'center'}}>Corporate Resolution To Sell</h1>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>

            <div style={{display: 'flex'}}>
              <form>
                <input type="text" value={this.state.corporateResolutionToSellBusinessName} onChange={this.handleCorporateResolutionToSellChangeBusinessName} />
                <label className="Text-Label-Style">Business Name</label>

                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessCity} onChange={this.handleCorporateResolutionToSellChangeBusinessCity} />
                <label className="Text-Label-Style">Business City</label>

                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellBusinessCounty} onChange={this.handleCorporateResolutionToSellChangeBusinessCounty} />
                <label className="Text-Label-Style">Business County</label>

                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellEmployeeName} onChange={this.handleCorporateResolutionToSellChangeEmployeeName} />
                <label className="Text-Label-Style">Employee Name</label>

              </form>

              <form style={{marginLeft: '10%'}}>

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
                <label className="Text-Label-Style">Month</label>

                <div style={{marginTop: '2vh'}}>
                  {this.renderCorporateResolutionToSellDropdown()}
                  <label className="Text-Label-Style">Day</label>
                </div>

                <DropdownButton style={{marginTop: '2vh'}} alignRight title={this.state.corporateResolutionToSellYear} id="dropdown-menu-align-right">
                  <Dropdown.Item onClick={() => this.setState({corporateResolutionToSellYear: "2022"})}>2022</Dropdown.Item>
                </DropdownButton>
                <label className="Text-Label-Style">Year</label>

              </form>
            </div>
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
        <div style={{width: '60%', margin: '0 auto'}}>
          <FaBackspace size={50} color="white" onClick={() => this.setState({brokerConfidentialityVisible: false})}/>
          <h1 style={{color: 'white', textAlign: 'center'}}>Broker Confidentiality</h1>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>
            <div style={{display: 'flex'}}>
              <form>
                <input type="text" value={this.state.brokerConfidentialityClientName} onChange={this.handleBrokerConfidentialityChangeClientName} />
                <label className="Text-Label-Style">Client Name</label>

                <input className="Text-Input-Style" type="text" value={this.state.brokerConfidentialityBrokerName} onChange={this.handleBrokerConfidentialityChangeBrokerName} />
                <label className="Text-Label-Style">Broker Name</label>
              </form>

              <form style={{marginLeft: '10%'}}>

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
                <label className="Text-Label-Style">Month</label>

                <div style={{marginTop: '2vh'}}>
                  {this.renderbrokerConfidentialityDropdown()}
                  <label className="Text-Label-Style">Day</label>
                </div>

                <DropdownButton style={{marginTop: '2vh'}} alignRight title={this.state.brokerConfidentialityYear} id="dropdown-menu-align-right">
                  <Dropdown.Item onClick={() => this.setState({brokerConfidentialityYear: "2022"})}>2022</Dropdown.Item>
                </DropdownButton>
                <label className="Text-Label-Style">Year</label>

              </form>

            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="Generate-PDF-Button" onClick={this.generateBrokerConfidentiality}>Generate PDF</button>
          </div>
          <p style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.brokerConfidentialityError}</p>
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
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 150px">The CBA Group, LLC  20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895 -4274 - Fax: (704) 895 -427</p><p style="text-indent: 0pt;text-align: left;"></p> <h1 style="width: 450px; margin-left: 150px">Consent of Spouse</h1>'
    var string2 = '<p style="font-size: 13px; width: 500px; margin-left: 50px; text-align: center;">Whereas I, <u>' + this.state.consentOfSpousePersonName + '</u> am the spouse of <u>' + this.state.consentOfSpouseSpouseName + '</u>and do hereby consent and agree to the following: My spouse may sign any and all documents necessary to close the business transaction involving the sale of the Business known as, <u>' + this.state.consentOfSpouseBusinessName + '</u> located at: <u>' + this.state.consentOfSpouseBusinessLocation + '</u>,  which may include real property, if any, associated with the Business.</p>'
    var date = '<p style="font-size: 13px; width: 500px; margin-left: 50px; margin-top: 50px">Dated the <u>' + this.state.consentOfSpouseDay + '</u> day of <u>' + this.state.consentOfSpouseMonth + '</u>, ' + this.state.consentOfSpouseYear + '</p>'
    var signature = '<div style="margin-left: 50px; margin-top: 100px; width: 500px; display: flex"><div style="width: 35%"><div style="border-top: 1px solid black"><p style="font-size: 15px;">Printed Name</p></div></div><div style="width: 50%; margin-left: 5%"><div style="border-top: 1px solid black"><p style="width: 300px; font-size: 15px"><em>Signature</em> Secretary of the Corporation</p></div></div></div>'

    var finalString = string1 + string2 + date + signature
    
    var doc = new jsPDF('p', 'pt', 'letter')

    var title = "Consent of Spouse: " + this.state.consentOfSpouseBusinessName

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width/4, 0, 300, 125)
    doc.html(finalString, {
      callback: function(doc) {
        doc.save(title);
      }
    });
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
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 150px">The CBA Group, LLC  20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895 -4274 - Fax: (704) 895 -427</p><p style="text-indent: 0pt;text-align: left;"></p> <h2 style="width: 500px; margin-left: 100px">Corporate Resolution To Sell</h2>'
    var string2 = '<p style="font-size: 13px; width: 525px; margin-left: 40px; text-align: center;">The undersigned, being the Secretary of <u>' + this.state.corporateResolutionToSellBusinessName + '</u>, a North Carolina Corporation and acting pursuant to North Carolina General Statutes Sections, does hereby certify that this is a true and correct resolution unanimously adopted by a joint meeting of the Shareholders and the Board of Directors of the Corporation, at a special business meeting held pursuant to notice duly given in the city of in the County of <u>' + this.state.corporateResolutionToSellBusinessCity + '</u>  in the County of <u>' + this.state.corporateResolutionToSellBusinessCounty + '</u>, North Carolina, on the <u>' + this.state.corporateResolutionToSellDay + '</u> day of ' + this.state.corporateResolutionToSellMonth + ', ' + this.state.corporateResolutionToSellYear + ', and this resolution will not be revoked by any subsequent action of the Board of Directors of the Corporation, but will remain in full force and effect.'
    var string3 = '<p style="width: 500px; margin-left: 50px; font-size: 15px">BE IT RESOLVED that <u>' + this.state.corporateResolutionToSellEmployeeName + ' </u>of the Corporation is hereby authorized and directed with the full and complete authority to:</p>'
    var string4 = '<ol style="width: 500px; margin-left: 50px;"><li style="font-size: 13px" data-list-text="1)"> <p style="font-size: 13px">Sell any or all assets of the Corporation.</p> </li><li style="font-size: 13px" data-list-text="2)"><p style="font-size: 13px">Execute an agreement to pay a fee to The CBA Group, LLC, and/or to The CBA Group Real Estate, in the event that the business and/or real property of the Corporation is disposed of under authority given to them in a Listing Contract, Commission Protection Plan or other Agreement.</p></li><li style="font-size: 13px" data-list-text="3)"> <p style="font-size: 13px">Execute a contract for the sale, lease or exchange of the assets of the Corporation at such price, term and conditions as he/she, in his/her sole discretion, deems acceptable and thereafter to execute any and all documents necessary to complete the sale, lease or exchange.</p></li></ol>'
    var string5 = '<div style="margin-left: 50px; margin-top: 50px; width: 500px; display: flex"><div style="width: 35%"><div style="border-top: 1px solid black"><p style="font-size: 15px;">Printed Name</p></div></div><div style="width: 50%; margin-left: 5%"><div style="border-top: 1px solid black"><p style="width: 300px; font-size: 15px"><em>Signature</em> Secretary of the Corporation</p></div></div></div>'

    var finalString = string1 + string2 + string3 + string4 + string5
    
    var doc = new jsPDF('p', 'pt', 'letter')

    var title = "Corporate Resolution To Sell: " + this.state.consentOfSpouseBusinessName

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width/4, 0, 300, 125)
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

    var doc = new jsPDF('p', 'pt', 'letter')
    var title = "Broker Confidentiality"
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 130px; font-size: 14px"><strong>The CBA Group, LLC &nbsp; 20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895-4274 Fax: (704) 895-4278</strong></p><p style="text-indent: 0pt;text-align: left;"></p> <p style="width: 500px; margin-left: 150px; font-size: 20px"><strong>Broker Confidentiality Agreement</strong></p>'
    var string2 = '<p style="font-size: 13px; width: 525px; margin-left: 40px; text-align: center;">The undersigned Business &nbsp; Broker and <strong>The CBA Group, LLC </strong>&nbsp;agree that all information provided by <u>' + this.state.brokerConfidentialityClientName + '</u>, and any of its affiliates, shall be held in strict confidence by the broker, its agents, officers, and employees. All financial statements and any other related information shall be used for the sole purpose of the valuation of the above named Company. The Company understands that if a photocopy of this information is sent to the valuation department of <strong>any selected Valuation Company</strong> they also shall maintain total confidentiality.'
    var string3 = '<p style="font-size: 14px; width: 500px; margin-left: 50px">Signed and Agreed to this on the <u>' + this.state.brokerConfidentialityDay + '</u> day of <u>' + this.state.brokerConfidentialityMonth + ', ' + this.state.brokerConfidentialityYear + '</u>.'
    var string4 = '<p style="font-size: 13px; width: 500px; margin-left: 50px">Broker:</p>'
    var string5 = '<div style="width: 250px; margin-left: 50px; margin-top: 30px"><div style="border-top: 1px solid black"><p style="font-size: 13px; margin: 0px; padding: 0px">(Name)</p></div></div>'
    var address = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 15px; margin-bottom: 0px; padding: 0px">20462 Chartwell Center Drive, Suite C</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(Address)</p>'
    var city = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 15px; margin-bottom: 0px; padding: 0px">Cornelius, NC 28031</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(City/State/Zip)</p>'
    var telephone = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 15px; margin-bottom: 0px; padding: 0px">(704) 895-4274</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(Telephone)</p>'
    var fax = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 15px; margin-bottom: 0px; padding: 0px">(704) 895-4278</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(Fax)</p>'

    var finalString = string1 + string2 + string3 + string4 + string5 + address + city + telephone + fax
    

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width*0.3, 10, 250, 100)
    doc.html(finalString, {
      callback: function(doc) {
        doc.save(title);
      }
    });
  }

  renderView(){
    if(this.state.blisVisible === false && 
      this.state.consentOfSpouseVisible === false &&
      this.state.corporateResolutionToSellVisible === false &&
      this.state.brokerConfidentialityVisible === false){
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
                <button disabled={true} className="Contract-Button" onClick={this.displaybrokerConfidentiality}>Cashflow Analysis</button>
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
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{backgroundColor: "#3c4548", height: '100vh'}}>
        <div style={{flex: 1, alignItems: 'center'}}>
          <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '15%'}} src={CBALogoForHeader} alt="Logo" />
        </div>
        {this.renderView()}
       
      </div>
    )
  }
}

