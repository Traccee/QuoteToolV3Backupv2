


import { useEffect, useState } from "react";
import "./App.css";




// this is will create a new line and fill it with default values
const createLineItem = (lineNumber) => {
 return {lineNumber, itemType: "phone", device: "iphone17", tradeModel: "none",tradeCondition: "GOOD", isPort: false, aal: true,
   insurance: false,}; } //

const isPhone = (itemType ) => itemType ===  "phone" ; 
const isaWatchOrTab =  (itemType ) => itemType === "tablet" 
|| itemType === "watch"; 



function App()




{const  [segment, setSegment] = useState("Standard");
 const [plan, setPlan] = useState("Beyond") ;
 const [lines,  setLines] = useState(1);
 const [dainternetPlan, setDainternetPlan]  = useState ("none");




// starts with just 1 line
 const [lineItems, setLineItems] = useState ([createLineItem(1)]);




 const[quote,  setQuote] = useState(null);





//will either add or remove the lineItems(whole data of the line basically the whole line ) / lines
 useEffect( () => { setLineItems((prev) => {
     const updatedTheNumbasOfLines = [ ...prev]; // create a copy of that jawn
     //if one added line then it will push the new line and fill it with the default values but if you remove the line it will pop them off and remove until it matches number of lines you set
     while (updatedTheNumbasOfLines.length  <  lines) {
       updatedTheNumbasOfLines.push(createLineItem(updatedTheNumbasOfLines.length + 1)); }
     while (updatedTheNumbasOfLines.length  >  lines) {
                 updatedTheNumbasOfLines.pop (); }




//goes through each line updates the line number to match the index + 1 (because index starts at 0 but line numbers start at 1) and then returns the updated line with the new line number
     return updatedTheNumbasOfLines.map((line,  index) => ({ ...line, lineNumber : index + 1, }));
   });
 },
 [lines]);








//updates a single field(so like itemType, device, trademode, tradecondition and so on) on a single line
//however theres is a tricky instance from when you switch the itemType to watch and tablet because it means we gotta reset basically everything
function updateLineItem (index, field,  value)  {
   setLineItems( (prev) =>
     prev.map(( line, i) =>  {
     if (i !== index) return line //if this isnt the line that we are making changes to it will just skip over it and return it as it is




       //if they switched the item type we gotta reset the device and clear out
     //trade/port/insurance because those dont apply to watches and tablets
     if (field === "itemType") {
         let nextDevice = "iphone17" //it will first default this to the ip17
         if (value === "watch") nextDevice = "appleWatchSE3" // if they switch their item type to a watch or a tablet it will just default as these devices
         if (value === "tablet")nextDevice = "galaxyTabA11"
       
         // just resets all the values when you switch form phone to either a tablet or watch
         return { ...line, itemType: value, device: nextDevice, tradeModel: "none", tradeCondition: "GOOD", isPort: false, insurance: false }}




       //line will keep everythin that was already on this line but the [field]: value will overwrite the field that
       // //changed with the new value so for ex if you changed the device to iphone 16 then it will keep everything else the same but just update the device to iphone 16
       return { ...line, [field] : value } })
    )
 }
useEffect(() => {async function snatchDatQuoteSon() {
     const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:3001"
     const serverResponse = await fetch(`${serverUrl}/quote`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ segment, plan, lines, lineItems, dainternetPlan }),
     })
     const theQuote = await serverResponse.json()
     setQuote(theQuote)
   }
   snatchDatQuoteSon()
 }, [segment, plan, lines, lineItems, dainternetPlan])












 return (
   <div className="container">
        <h1 className= "mainTitle"> QUOTE TOOL </h1>




     <div className="createsTwoComlumnlayout">
       <div className="daLeftColumn">
         <div className="card">
           <h2>Account Details</h2>



          {/* determines whether they are a standard acc or a military first responder or a geezer */}
           <label>Customer Type</label>
           <select value={segment} onChange={(e) => setSegment(e.target.value)}>
             <option value="Standard">Standard</option>
             <option value="MIL_FR_55">Military -- First responder -- 55+</option>
           </select>



           
           <label>Desired Rate Plan   </label>
           <select value={plan} onChange={(e) => setPlan(e.target.value)}>
             <option value="Beyond"> Experience Beyond </option>
                 <option value="More">Experience   More</option>
                   <option value="Essentials">Essentials</option> </select>
           



           <label>Number Of Lines </label>
           <input
             type="number"
             min="1"
             max="6"
             value={lines}
             onChange={(e) => setLines(Number(e.target.value))}
           />




           <label> Wireless Internet plans   </label>
           <select  value={dainternetPlan } onChange={(e) => setDainternetPlan(e.target.value) }  >
               <option value="none">No Internet</option>
               <option value="rely"> Basic rely Internet ($30 a month) </option>
                <option value="amplified">Amplified internet ( $40 a month) </option>
               <option value="allin"> All in internet ($50 a month) </option>
            </select>
         </div>




         {lineItems.map((line, index) => (
           <div className="lineCard" key={line.lineNumber}>
             <h2>Line {line.lineNumber}</h2>




             <label>Item Type  </label>
             <select value={line.itemType}  onChange={(e) => updateLineItem(index, "itemType", e.target.value)}   >
               <option value="phone">Phone</option>
               <option value="watch">Watch</option>
               <option value="tablet">Tablet</option>
               </select>



            {/* select new device per line */}
             <label>Select a device </label>
             <select value={line.device} onChange={(e) => updateLineItem(index, "device", e.target.value)}>
               {line.itemType === "phone" && (
                 <>
                   <option value="iphone15">iPhone 15</option>
                   <option value="iphone16">iPhone 16</option>
                   <option value="iphone16e">iPhone 16e</option>
                   <option value="iphone17">iPhone 17</option>
                   <option value="iphone17pro">iPhone 17 Pro</option>
                   <option value="iphone17promax">iPhone 17 Pro Max</option>
                   <option value="GalaxyA17">Galaxy A17</option>
                   <option value="GalaxyS26">Galaxy S26</option>
                   <option value="GalaxyS26Plus">Galaxy S26 Plus</option>
                   <option value="GalaxyS26Ultra">Galaxy S26 Ultra</option>
                   <option value="GalaxyZflip7">Galaxy Z Flip 7</option>
                   <option value="GalaxyZfold7">Galaxy Z Fold 7</option>
                   <option value="Pixel10ProXl">Pixel 10 Pro XL</option>
                   <option value="Pixel10Pro">Pixel 10 Pro</option>
                   <option value="Pixel10">Pixel 10</option>
                   <option value="Pixel10a">Pixel 10a</option>
                   <option value="Razr2025">Moto Razr2025</option>
                         </>
               )}




               {isaWatchOrTab(line.itemType)  && (<>
                   <option value="appleWatchSE3">Apple Watch SE3</option>
                   <option value="appleWatchS11">Apple Watch S11</option>
                   <option  value="appleWatchUltra3">Apple Watch Ultra 3</option>
                   <option value="galaxyWatch8"> Galaxy Watch 8</option>
                   <option value = "galaxyTabA11" > Galaxy Tablet A11  </option> 
                   <option value = "iPadA16" > ipad A16 </option> </> 
                     )}
             </select>



              {/*  lets you add insurance to each line */}
             <label>Choose protection plan</label>
             <select value={String(line.insurance)}  onChange={(e) =>  updateLineItem(index,  "insurance", e.target.value  === "true")} >
               <option value="false">No Insurance</option>
               <option value="true">Add Insurance ($18/mo)</option>
                </select>



              {/* lets u select whether or not someone is porting a nmbr */}
             {line.itemType === "phone" && (
               <>
                 <label>Are the customers porting their number? </label>
                 <select  value={String(line.isPort)}  onChange={(e) => updateLineItem(index, "isPort",  e.target.value === "true" )}>
                   <option value="false">No</option>
                   <option value="true">Yes</option></select>



             {/* all trade in options  */}
                 <label>Trade in model of the phone</label>
                 <select value={line.tradeModel}   onChange={(e) => updateLineItem( index, "tradeModel", e.target.value)}>
                   <option value="none">No Trade In</option>

                    <option value="iphone13">iPhone 13</option>
                   <option value="iphone13mini">iPhone 13 Mini</option>
                   <option value="iphone13pro">iPhone 13 Pro</option>
                   <option value="iphone13promax">iPhone 13 Pro Max </option>
                   <option value="iphone14">iPhone 14</option>
                   <option value="iphone14plus">iPhone 14 Plus</option>
                   <option value="iphone14pro">iPhone 14 Pro</option>
                   <option value="iphone14promax">iPhone 14 Pro Max</option>
                   <option value="iphone15">iPhone 15</option>
                   <option value="iphone15plus">iPhone 15 Plus</option>
                   <option value="iphone15pro">iPhone  15 Pro</option>
                   <option value="iphone15promax">iPhone 15 Pro Max</option>
                   <option value="iphone16e">iPhone 16e</option>
                   <option value="iphone16">iPhone 16</option>
                   <option value="iphone16plus">iPhone 16 Plus</option>
                   <option value="iphone16pro" >iPhone 16 Pro</option>
                   <option value="iphone16promax">iPhone 16 Pro Max</option>


                   <option value="galaxys10">Galaxy S10</option>
                   <option value="galaxys10e">Galaxy S10e</option>
                   <option value="galaxys10plus">Galaxy S10+</option>
                   <option value="galaxys105g">Galaxy S10 5G </option>
                   <option value="galaxys20" >Galaxy S20</option>
                   <option value="galaxys20fe">Galaxy S20 FE</option>
                   <option value="galaxys20plus">Galaxy S20+</option>
                   <option value="galaxys20ultra">Galaxy S20 Ultra </option>
                   <option value="galaxys21" >Galaxy S21</option>
                   <option value="galaxys21fe">Galaxy S21 FE</option>
                   <option value="galaxys21plus">Galaxy S21+</option>
                   <option value="galaxys21ultra">Galaxy S21 Ultra </option>
                   <option value="galaxys22">Galaxy  S22</option>
                   <option value="galaxys22plus">Galaxy S22+</option>
                   <option value="galaxys22ultra" >Galaxy  S22 Ultra</option>
                   <option value="galaxys23">Galaxy S23</option>
                   <option value="galaxys23fe">Galaxy S23 FE</option>
                   <option value="galaxys23plus">Galaxy S23+</option>
                   <option value="galaxys23ultra">Galaxy S23 Ultra</option>
                   <option value="galaxys24">Galaxy S24</option>
                   <option value="galaxys24fe">Galaxy S24 FE</option>
                   <option value="galaxys24plus">Galaxy S24+</option>
                   <option value="galaxys24ultra">Galaxy S24 Ultra </option>
                   <option value="galaxys25">Galaxy S25</option>
                   <option value="galaxys25plus">Galaxy S25+</option>
                   <option value="galaxys25ultra">Galaxy S25 Ultra </option>
                   <option value="galaxys25edge"> Galaxy S25 Edge</option>
                   <option value="galaxynote9"> Galaxy Note 9</option>
                   <option value="galaxynote10">Galaxy Note 10</option>
                   <option value="galaxynote10plus">Galaxy Note 10+</option>
                   <option value="galaxynote10lite">Galaxy Note 10 Lite</option>
                   <option value="galaxynote20">Galaxy Note 20</option>
                   <option value="galaxynote20ultra">Galaxy Note 20 Ultra </option>
                   <option value="galaxyzflip3">Galaxy Z Flip 3 </option>
                   <option value="galaxyzflip4">Galaxy Z Flip 4</option>
                   <option value="galaxyzflip5">Galaxy Z Flip 5</option>
                   <option value="galaxyzflip6">Galaxy Z Flip 6</option>
                   <option value="galaxyzflip7">Galaxy Z Flip 7</option>
                   <option value="galaxyzfold3">Galaxy Z Fold 3</option>
                   <option value="galaxyzfold4">Galaxy Z Fold 4</option>
                   <option value="galaxyzfold5">Galaxy Z Fold 5</option>
                   <option value="galaxyzfold6">Galaxy Z Fold 6</option>
                   <option value="galaxyzfold7">Galaxy Z Fold 7</option>



                   <option value="pixel4">Pixel 4</option>
                   <option value="pixel4xl">Pixel 4 XL</option>
                   <option value="pixel4a5g">Pixel 4a 5G</option>
                   <option value="pixel5a5g">Pixel 5a 5G</option>
                   <option value="pixel6">Pixel 6</option>
                   <option value="pixel6pro">Pixel 6 Pro</option>
                   <option value="pixel6a">Pixel 6a</option>
                   <option value="pixel7">Pixel 7</option>
                   <option value="pixel7pro">Pixel 7 Pro</option>
                   <option value="pixel7a">Pixel 7a</option>
                   <option value="pixel8">Pixel 8</option>
                   <option value="pixel8pro">Pixel 8 Pro</option>
                   <option value="pixel8a">Pixel 8a</option>
                   <option value="pixel9">Pixel 9</option>
                   <option value="pixel9pro">Pixel 9 Pro</option>
                   <option value="pixel9xl">Pixel 9 XL</option>
                   <option value="pixel9fold">Pixel 9 Fold</option>
                   <option value="pixel9a">Pixel 9a</option>




                   <option value="oneplus9pro">OnePlus 9 Pro</option>
                   <option value="oneplus10pro">OnePlus 10 Pro</option>




                   <option value="motorizr2025">Moto Razr 2025</option>
                   <option value="motorazrplus2023">Moto Razr+ 2023</option>
                   <option value="motorazrplus2024">Moto Razr+ 2024</option>
                   <option value="motorazrplus2025">Moto Razr+ 2025</option>
                   <option value="motorazrultra2025">Moto Razr Ultra 2025</option>




                   <option value="iphone11">iPhone 11</option>
                   <option value="iphone11pro">iPhone 11 Pro</option>
                   <option value="iphone11promax">iPhone 11 Pro Max</option>
                   <option value="iphone12">iPhone 12</option>
                   <option value="iphone12mini">iPhone 12 Mini</option>
                   <option value="iphone12pro">iPhone 12 Pro</option>
                   <option value="iphone12promax">iPhone 12 Pro Max</option>
                   <option value="iphonex">iPhone X</option>
                   <option value="iphonexr">iPhone XR</option>
                   <option value="iphonexs">iPhone XS</option>
                   <option value="iphonexsmax">iPhone XS Max</option>
                   <option value="iphone8">iPhone 8</option>
                   <option value="iphone8plus">iPhone 8+</option>
                   <option value="iphone7">iPhone 7</option>
                   <option value="iphone7plus">iPhone 7+</option>
                   <option value="iphone6">iPhone 6</option>
                   <option value="iphone6plus">iPhone 6+</option>
                   <option value="iphone6s">iPhone 6s</option>
                   <option value="iphone6splus">iPhone 6s+</option>
                   <option value="iphoneSE1">iPhone SE (1st gen)</option>
                   <option value="iphoneSE2">iPhone SE (2nd gen)</option>
                   <option value="iphoneSE3">iPhone SE (3rd gen)</option>




                   <option value="galaxys8">Galaxy S8</option>
                   <option value="galaxys8plus">Galaxy S8+</option>
                   <option value="galaxys8active">Galaxy S8 Active</option>
                   <option value="galaxys9">Galaxy S9</option>
                   <option value="galaxys9plus">Galaxy S9+</option>
                   <option value="galaxynote8">Galaxy Note 8</option>
                     </select>



                   {/*choose between a good or bad condtion */}
                     {/*if bad will just make you pay in full for the device as no promo will attach */}

                 <label>Trade Condition</label>
                 <select value={line.tradeCondition}  onChange={(e) => updateLineItem(index, "tradeCondition", e.target.value) } >
                   <option value="GOOD">Good Condition  </option>
                   <option value="NOT_GOOD">Bad Condtion </option> </select>
               </>
             )}
           </div>
         ))}
       </div>




       <div className="andDaRightColumn">
         <div className="card quotecard">
           <h2> Quote breakdown overview    </h2>




       
         



           {/*these are the 4 main totals right under the quote breakdown overview section they show monthly plan costs, # of phone lines, # of line a customer will pay for  * /}
        {/*and their number of free lines if they are on a qualified rate plan  */}
           {quote?.breakdown && (
             <>
               <div className="summary-grid">
                 <div className="summaryCardofThe4totals">
                   <span className="summarylabelofThe4totals ">Monthly plan costs for all lines </span>
                   <span className="summaryvalueof4totals">${quote.breakdown.planMonthly}</span></div>



                 
                 <div className="summaryCardofThe4totals">
                   <span className="summarylabelofThe4totals ">Total number of Phone Lines</span>
                   <span className="summaryvalueof4totals"> {quote.breakdown.totalLines}
                     </span>
                 </div>



                
                 <div className="summaryCardofThe4totals">
                   <span className="summarylabelofThe4totals ">Number of lines customer pays for </span>
                   <span className="summaryvalueof4totals"> {quote.breakdown.paidLines } </span>
                 </div>



                 
                 <div className="summaryCardofThe4totals">
                   <span className="summarylabelofThe4totals ">Number Of Free Phone Lines</span>
                   <span className="summaryvalueof4totals">{quote.breakdown.freeLines}</span>
                  </div>
               </div>




               <hr />




               <h3 className="detailPerLine">Details Per line </h3>




               {quote.breakdown.lineItems?.map((line) => (
                 <div key={line.lineNumber} className="quote-line-card">
                   <p><b>Line {line.lineNumber}</b></p>
                   <p>Type: {line.itemType}</p>
                   <p>Device: {line.device} </p>




                  {line.itemType === "phone" && (
                     <>
                            <p>MSRP: ${line.deviceMsrp}</p>
                            <p>Trade In: {line.tradeModel}</p>
                            <p>Condition: {line.tradeCondition} </p>
                            <p>Port In: {line.isPort ? "Yes" : "No port"}</p>
                            <p>Insurance: {line.insurance ? "Yes" : "No insurance was added "}</p>
                            <p>Insurance Monthly: ${line.insuranceMonthly} </p>
                            <p>Promo: {line.promoName}</p>
                            <p>Promo Credit: ${line.promoCredit} </p>
                            <p>Remaining Balance: ${line.remainingDeviceBalance }</p>
                            <p>Device Monthly:  ${line.deviceMonthly} </p>
                            <p> <b>Line Monthly:  ${line.lineMonthly} </b> </p>
                     </>)}
                    {isaWatchOrTab(line.itemType)  && ( <>
                            <p>Insurance: {line.insurance ? "Yes" : "No"}</p>
                            <p>Insurance Monthly: ${line.insuranceMonthly}</p>
                            <p>Monthly Charge: ${line.deviceMonthly}</p>
                            <p> <b>Line Monthly: ${line.lineMonthly}</b></p>
                     </> )}
                 </div>))}




               <hr />




               
               
               <h2 className="monthlyTotal">Monthly Total: ${quote.monthlyTotal}</h2>
             </>
           )}
         </div>
       </div>
     </div>
   </div>
 );
}




export default App;





