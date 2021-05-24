var isResponseAvailable = false;
// get api
    fetch('https://api.covid19india.org/state_district_wise.json')
    .then(Response => {
        return Response.json();
    }).then(covidDetail => {
        totalActive = 0;
        totalConfirmed = 0;
        totalDeceased = 0;
        totalRecovered = 0;
        mapDataWithStateCode = [];

         Object.entries(covidDetail).forEach(eachState => {
            var active = 0;
            var confirmed = 0;
            var deceased = 0;
            var recovered = 0;
            const [stateName, stateData] = eachState;
            var stateTableRow = document.createElement('tr');
            stateTableRow.setAttribute('class','statetable-row');
            var tableHeading = document.createElement('th');
            tableHeading.innerHTML = stateName;
            tableHeading.setAttribute('class', 'state-name');
            tableHeading.addEventListener('click', showDistricts);
            stateTableRow.appendChild(tableHeading);

            var createDistrictTable = document.createElement('table');
            createDistrictTable.setAttribute('class','table district-table hidden');
            var createDistrictTableHeading = document.createElement('thead');
            // createDistrictTableHeading.setAttribute('class', "thead-dark");
            var createDistrictHeadingRow = document.createElement('tr');
            var districtHeading = document.createElement('th');
            districtHeading.innerHTML = 'District';
            var districtConfirmedHeading = document.createElement('th');
            districtConfirmedHeading.innerHTML = 'Confirmed';
            var districtActiveHeading = document.createElement('th');
            districtActiveHeading.innerHTML = 'Active';
            var districtRecoveredHeading = document.createElement('th');
            districtRecoveredHeading.innerHTML = 'Recovered';
            var districtDeceasedHeading = document.createElement('th');
            districtDeceasedHeading.innerHTML = 'Deceased';
            createDistrictHeadingRow.appendChild(districtHeading);
            createDistrictHeadingRow.appendChild(districtConfirmedHeading);
            createDistrictHeadingRow.appendChild(districtActiveHeading);
            createDistrictHeadingRow.appendChild(districtRecoveredHeading);
            createDistrictHeadingRow.appendChild(districtDeceasedHeading);
            createDistrictTableHeading.appendChild(createDistrictHeadingRow);



            var districtTableBody = document.createElement('tbody');
            districtTableBody.setAttribute('class', 'district-list');


            
            Object.entries(stateData.districtData).forEach(eachDistrict => {
                const [districtName, DistrictData] = eachDistrict;
                active += DistrictData.active; 
                confirmed += DistrictData.confirmed;
                deceased += DistrictData.deceased;
                recovered += DistrictData.recovered;

                createDistrictTable.appendChild(createDistrictTableHeading);


                var districTableRow = document.createElement('tr');
                districTableRow.setAttribute('class','district-table-row');
                var distTableHeading = document.createElement('th');
                distTableHeading.innerHTML = districtName;
                districTableRow.appendChild(distTableHeading);
                // debugger;
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.confirmed, 'red'));
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.active ,'orange'));
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.recovered,'green'));
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.deceased,'blue'));
                districtTableBody.appendChild(districTableRow);
                createDistrictTable.appendChild(districtTableBody);
                // debugger;
            });
            totalActive += active;
            totalConfirmed += confirmed;
            totalDeceased += deceased;
            totalRecovered += recovered;
            mapDataWithStateCode.push([`in-${stateData.statecode.toLowerCase()}`, active]);
                // ['in-py', 0],
            // console.log(`${stateData.statecode} and active count is ${active}`);
            stateTableRow.appendChild(prepareCovidData(stateTableRow, confirmed, 'red'));
            stateTableRow.appendChild(prepareCovidData(stateTableRow, active, 'orange'));
            stateTableRow.appendChild(prepareCovidData(stateTableRow, recovered, 'green'));
            stateTableRow.appendChild(prepareCovidData(stateTableRow, deceased, 'blue'));
            stateTableRow.appendChild(createDistrictTable);
            document.getElementById('state-list').appendChild(stateTableRow);
        });
        console.log(mapDataWithStateCode);
        debugger;
        //Card

        let confirmDiv = document.createElement("div");
        confirmDiv.setAttribute('class' , ' box');
        document.querySelector('.main-div').appendChild(confirmDiv);
        let headingConfirm = document.createElement('h1');
        headingConfirm.innerHTML = 'Total Confirmed';
        confirmDiv.appendChild(headingConfirm);
        let tConfirm = document.createElement('p');
        tConfirm.setAttribute('class','caseNumber red');
        tConfirm.innerHTML = totalConfirmed;
        confirmDiv.appendChild(tConfirm);

        let activeDiv = document.createElement("div");
        activeDiv.setAttribute('class' , ' box');
        document.querySelector('.main-div').appendChild(activeDiv);
        let headingActive = document.createElement('h1');
        headingActive.innerHTML = 'Total Active';
        activeDiv.appendChild(headingActive);
        let tActive = document.createElement('p');
        tActive.setAttribute('class','caseNumber orange');
        tActive.innerHTML = totalActive;
        activeDiv.appendChild(tActive);

        
        
        let recoverDiv = document.createElement("div");
        recoverDiv.setAttribute('class' , ' box');
        document.querySelector('.main-div').appendChild(recoverDiv);
        let headingRecover = document.createElement('h1');
        headingRecover.innerHTML = 'Total Recovered';
        recoverDiv.appendChild(headingRecover);
        let tRecover = document.createElement('p');
        tRecover.setAttribute('class','caseNumber green');
        tRecover.innerHTML = totalRecovered;
        recoverDiv.appendChild(tRecover);
        

        let deceasedDiv = document.createElement("div");
        deceasedDiv.setAttribute('class' , ' box');
        document.querySelector('.main-div').appendChild(deceasedDiv);
        let headingDeceased = document.createElement('h1');
        headingDeceased.innerHTML = 'Total Deceased';
        deceasedDiv.appendChild(headingDeceased);
        let tDeceased = document.createElement('p');
        tDeceased.setAttribute('class','caseNumber blue');
        tDeceased.innerHTML = totalDeceased;
        deceasedDiv.appendChild(tDeceased);

        
    });


function prepareCovidData(tableRow, count, colorClass = '') {
    var tableData = document.createElement('td');
    tableData.setAttribute('class', `table-data ${colorClass}`);
    tableData.innerHTML = count;
    return tableData;
}

function showDistricts() {
    this.parentElement.querySelector('.district-table').classList.toggle('hidden');
}
