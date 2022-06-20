import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from 'react';
import Invoice from "./Invoice";
import * as ReactDOMServer from 'react-dom/server';


import CBALogoForHeader from './CBALogoForHeader.png'
import cbaLogo from './CBALogo.png';
import cbaLogo2 from './CBALogo2.png';

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
        personName: "",
        spouseName: "",
        consentOfSpouseBusinessName: "",
        consentOfSpouseBusinessLocation: "",
        consentOfSpouseDay: "",
        consentOfSpouseMonth: "",
        consentOfSpouseYear: "",

        /////   Corporate Resolution to Sell    
        corporateResolutionToSellBusinessName: "",
        corporateResolutionToSellBusinessCity: "",
        corporateResolutionToSellBusinessCounty: "",
        corporateResolutionToSellEmployeeName: "",
        corporateResolutionToSellDay: "",
        corporateResolutionToSellMonth: "",
        corporateResolutionToSellYear: "",

        /////   Broker Confidentiality    
        brokerConfidentialityClientName: "",
        brokerConfidentialityBrokerName: "",
        brokerConfidentialityDay: "",
        brokerConfidentialityMonth: "",
        brokerConfidentialityYear: "",

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
    this.setState({personName: event.target.value});
  }
  handleConsentOfSpouseChangeSpouseName(event) {
    this.setState({spouseName: event.target.value});
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
        <div style={{width: '60%', margin: '0 auto'}}>
          <h1 style={{color: 'white', textAlign: 'center'}}>Consent Of Spouse</h1>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6vh'}}>

          <div style={{display: 'flex'}}>
          <form>
            <input type="text" value={this.state.personName} onChange={this.handleConsentOfSpouseChangePersonName} />
            <label className="Text-Label-Style">Person Name</label>

            <input className="Text-Input-Style" type="text" value={this.state.spouseName} onChange={this.handleConsentOfSpouseChangeSpouseName} />
            <label className="Text-Label-Style">Spouse Name</label>

            <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessName} onChange={this.handleConsentOfSpouseChangeBusinessName} />
            <label className="Text-Label-Style">Business Name</label>

            <input className="Text-Input-Style" type="text" value={this.state.consentOfSpouseBusinessLocation} onChange={this.handleConsentOfSpouseChangeBusinessLocation} />
            <label className="Text-Label-Style">Business Address</label>
          </form>

          <form style={{marginLeft: '10%'}}>

            <input type="text" value={this.state.consentOfSpouseDay} onChange={this.handleChangeDay} />
            <label className="Text-Label-Style">Day</label>

            <input className="Text-Input-Style"  type="text" value={this.state.consentOfSpouseMonth} onChange={this.handleConsentOfSpouseChangeMonth} />
            <label className="Text-Label-Style">Month</label>

            <input className="Text-Input-Style"  type="text" value={this.state.consentOfSpouseYear} onChange={this.handleConsentOfSpouseChangeYear} />
            <label className="Text-Label-Style">Year</label>
          </form>
          </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button className="Generate-PDF-Button" onClick={this.generateConsentOfSpouse}>Generate PDF</button>

          </div>

        </div>
      )
    
    }
  }

  renderCorporateResolutionToSell() {
    if(this.state.corporateResolutionToSellVisible === true){
      return(
        <div style={{width: '60%', margin: '0 auto'}}>
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

                <input type="text" value={this.state.corporateResolutionToSellDay} onChange={this.handleCorporateResolutionToSellChangeDay} />
                <label className="Text-Label-Style">Day</label>

                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellMonth} onChange={this.handleCorporateResolutionToSellChangeMonth} />
                <label className="Text-Label-Style">Month</label>

                <input className="Text-Input-Style" type="text" value={this.state.corporateResolutionToSellYear} onChange={this.handleCorporateResolutionToSellChangeYear} />
                <label className="Text-Label-Style">Year</label>
              </form>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="Generate-PDF-Button" onClick={this.generateCorporateResolutionToSell}>Generate PDF</button>
          </div>

        </div>
      )
    
    }
  }

  renderbrokerConfidentiality() {
    if(this.state.brokerConfidentialityVisible === true){
      return(
        <div style={{width: '60%', margin: '0 auto'}}>
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
                <input type="text" value={this.state.brokerConfidentialityDay} onChange={this.handleBrokerConfidentialityChangeDay} />
                <label className="Text-Label-Style">Day</label>

                <input className="Text-Input-Style" type="text" value={this.state.brokerConfidentialityMonth} onChange={this.handleBrokerConfidentialityChangeMonth} />
                <label className="Text-Label-Style">Month</label>

                <input className="Text-Input-Style" type="text" value={this.state.brokerConfidentialityYear} onChange={this.handleBrokerConfidentialityChangeYear} />
                <label className="Text-Label-Style">Year</label>
              </form>

            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="Generate-PDF-Button" onClick={this.generateBrokerConfidentiality}>Generate PDF</button>
          </div>
        </div>
      )
    }
  }

  generateConsentOfSpouse = () => {
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 150px">The CBA Group, LLC  20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895 -4274 - Fax: (704) 895 -427</p><p style="text-indent: 0pt;text-align: left;"></p> <h1 style="width: 450px; margin-left: 75px">Broker Confidentiality</h1>'
    var string2 = '<p style="font-size: 13px; width: 500px; margin-left: 50px; text-align: center;">The undersigned Business Broker and <strong>The CBA Group, LLC</strong> agree that all information provided by <u>' + this.state.brokerConfidentialityClientName + '</u>,and any of its affiliates, shall be held in strict confidence by the broker, its agents, officers, and employees. All financial statements and any other related information shall be used for the sole purpose of the valuation of the above named Company. The Company understands that if a photocopy of this information is sent to the valuation department of <strong>any selected Valuation Company</strong> they also shall maintain total confidentiality.'
   
     
    var finalString = string1 + string2
    
    var doc = new jsPDF('p', 'pt', 'letter')

    var title = "Consent of Spouse: " + this.state.consentOfSpouseBusinessName

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width/4, 0, 300, 125)
    doc.html(finalString, {
      callback: function(doc) {
        console.log("in callback");
        doc.save(title);
      }
    });
  }

  generateCorporateResolutionToSell = () => {
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 150px">The CBA Group, LLC  20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895 -4274 - Fax: (704) 895 -427</p><p style="text-indent: 0pt;text-align: left;"></p> <h1 style="width: 450px; margin-left: 75px">Corporate Resolution To Sell</h1>'
    var string2 = '<p style="font-size: 13px; width: 500px; margin-left: 50px; text-align: center;">The undersigned, being the Secretary of <u>' + this.state.corporateResolutionToSellBusinessName + '</u>, a North Carolina Corporation and acting pursuant to North Carolina General Statutes Sections, does hereby certify that this is a true and correct resolution unanimously adopted by a joint meeting of the Shareholders and the Board of Directors of the Corporation, at a special business meeting held pursuant to notice duly given in the city of in the County of <u>' + this.state.corporateResolutionToSellBusinessCity + '</u>  in the County of <u>' + this.state.corporateResolutionToSellBusinessCounty + '</u>, North Carolina, on the <u>' + this.state.corporateResolutionToSellDay + '</u> day of ' + this.state.corporateResolutionToSellMonth + ', ' + this.state.corporateResolutionToSellYear + ', and this resolution will not be revoked by any subsequent action of the Board of Directors of the Corporation, but will remain in full force and effect.'
    var string3 = '<p style="width: 500px; margin-left: 50px; font-size: 15px">BE IT RESOLVED that <u>' + this.state.corporateResolutionToSellEmployeeName + ' </u>of the Corporation is hereby authorized and directed with the full and complete authority to:</p>'
    var string4 = '<ol style="width: 500px; margin-left: 50px;"><li style="font-size: 14px" data-list-text="1)"> <p style="font-size: 14px">Sell any or all assets of the Corporation.</p> </li><li style="font-size: 14px" data-list-text="2)"><p style="font-size: 14px">Execute an agreement to pay a fee to The CBA Group, LLC, and/or to The CBA Group Real Estate, in the event that the business and/or real property of the Corporation is disposed of under authority given to them in a Listing Contract, Commission Protection Plan or other Agreement.</p></li><li style="font-size: 14px" data-list-text="3)"> <p style="font-size: 14px">Execute a contract for the sale, lease or exchange of the assets of the Corporation at such price, term and conditions as he/she, in his/her sole discretion, deems acceptable and thereafter to execute any and all documents necessary to complete the sale, lease or exchange.</p></li></ol>'
    var string5 = '<div style="margin-left: 50px; margin-top: 50px; width: 500px; display: flex"><div style="width: 35%"><div style="border-top: 1px solid black"><p style="font-size: 15px;">Printed Name</p></div></div><div style="width: 50%; margin-left: 5%"><div style="border-top: 1px solid black"><p style="width: 300px; font-size: 15px"><em>Signature</em> Secretary of the Corporation</p></div></div></div>'

    var finalString = string1 + string2 + string3 + string4 + string5
    
    var doc = new jsPDF('p', 'pt', 'letter')

    var title = "Corporate Resolution To Sell: " + this.state.consentOfSpouseBusinessName

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width/4, 0, 300, 125)
    doc.html(finalString, {
      callback: function(doc) {
        console.log("in callback");
        doc.save(title);
      }
    });
  }

  generateBrokerConfidentiality = () => {

    var doc = new jsPDF('p', 'pt', 'letter')
    var title = "Broker Confidentiality: " + this.state.consentOfSpouseBusinessName
     
    var string1 = '<p style="text-align: center; margin-left: 50px; width: 500px; margin-top: 150px">The CBA Group, LLC  20462 Chartwell Center Dr. Suite C, Cornelius, NC 28031 Phone: (704) 895 -4274 - Fax: (704) 895 -427</p><p style="text-indent: 0pt;text-align: left;"></p> <h1 style="width: 450px; margin-left: 160px">Broker Confidentiality</h1>'
    var string2 = '<p style="font-size: 13px; width: 500px; margin-left: 50px; text-align: center;">The undersigned Business Broker and <strong>The CBA Group, LLC</strong> agree that all information provided by <u>' + this.state.brokerConfidentialityClientName + '</u>, and any of its affiliates, shall be held in strict confidence by the broker, its agents, officers, and employees. All financial statements and any other related information shall be used for the sole purpose of the valuation of the above named Company. The Company understands that if a photocopy of this information is sent to the valuation department of <strong>any selected Valuation Company</strong> they also shall maintain total confidentiality.'
    var string3 = '<p style="font-size: 14px; width: 500px; margin-left: 50px">Signed and Agreed to this on the <u>' + this.state.brokerConfidentialityDay + '</u> day of <u>' + this.state.brokerConfidentialityMonth + ',' + this.state.brokerConfidentialityYear + '</u>.'
    var string4 = '<p style="width: 500px; margin-left: 50px">Broker:</p>'
    var string5 = '<div style="width: 250px; margin-left: 50px; margin-top: 50px"><div style="border-top: 1px solid black"><p style="margin: 0px; padding: 0px">Name</p></div></div>'
    var address = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 25px; margin-bottom: 0px; padding: 0px">20462 Chartwell Center Drive, Suite C</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(Address)</p>'
    var city = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 25px; margin-bottom: 0px; padding: 0px">Cornelius, NC 28031</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(City/State/Zip)</p>'
    var telephone = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 25px; margin-bottom: 0px; padding: 0px">(704) 895-4274</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(Telephone)</p>'
    var fax = '<p style="font-size: 13px; margin-left: 50px; width: 300px; text-decoration: underline; margin-top: 25px; margin-bottom: 0px; padding: 0px">(704) 895-4278</p><p style="font-size: 13px; margin-left: 50px; margin-top: 0px; margin-bottom: 0px; padding: 0px">(Fax)</p>'

    var finalString = string1 + string2 + string3 + string4 + string5 + address + city + telephone + fax
    

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(cbaLogo2, 'png', width/4, 0, 300, 125)
    doc.html(finalString, {
      callback: function(doc) {
        console.log("in callback");
        doc.save(title);
      }
    });
  }

  render() {
    console.log("corporate resolution to sell: " + this.state.corporateResolutionToSellVisible)
    return (
      <div style={{backgroundColor: "#3c4548", height: '100vh'}}>
        <div style={{flex: 1, alignItems: 'center'}}>
          <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '15%'}} src={CBALogoForHeader} alt="Logo" />
        </div>
       
        <button className="Contact-Button" onClick={this.displayBlis}>BLIS</button>
        <button className="Contact-Button" onClick={this.displayConsentOfSpouse}>Consent of Spouse</button>
        <button className="Contact-Button" onClick={this.displayCorporateResolutionToSell}>Corporate Resolution To Sell</button>
        <button className="Contact-Button" onClick={this.displaybrokerConfidentiality}>Broker Confidentiality</button>


        {this.renderBlis()}
        {this.renderConsentOfSpouse()}
        {this.renderCorporateResolutionToSell()}
        {this.renderbrokerConfidentiality()}
      </div>
    )
  }
}

