titles = []
titlev = []
titled = []
contenedor = []
for(let x = 0 ; x < 20 ; x++){
    titlev[x] = []
}  
for(let i = 0 ; i < 20 ; i++){
    titled[i] = document.getElementById(''+i)
}
titles[0] = titlev
titles[1] = titled
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');
axios.get("./data/credit_customers.csv").then((response) => {
    const data = Papa.parse(response.data, { header: true }).data;
    delete data[1000]
    console.log(data);
    const options = {
      task: 'classification',
      debug: true
    }
    const nn = ml5.neuralNetwork(options);
    var n = 0 
    data.forEach(item => {
        const inputs = {
            checking_status: item.checking_status,
            duration: parseInt(item.duration),
            credit_history: item.credit_history,
            purpose: item.purpose,
            credit_amount: parseFloat(item.credit_amount),
            savings_status: item.savings_status,
            employment: item.employment,
            installment_commitment: item.installment_commitment,
            personal_status: item.personal_status,
            other_parties: item.other_parties,
            residence_since: item.residence_since,
            property_magnitude: item.property_magnitude,
            age: parseFloat(item.age),
            other_payment_plans: item.other_payment_plans,
            housing: item.housing,
            existing_credits: item.existing_credits,
            job: item.job,
            num_dependents: item.num_dependents,
            own_telephone: item.own_telephone,
            foreign_worker: item.foreign_worker
        };
        n = n + 1
        const output = {
            class: item.class
        };
        nn.addData(inputs, output);
        if(!titles[0][0].includes(item.checking_status)){
            titles[0][0].push(item.checking_status)
        }
        if(!titles[0][1].includes(item.duration)){
            titles[0][1].push(item.duration)
        
        }
        if(!titles[0][2].includes(item.credit_history)){
            titles[0][2].push(item.credit_history)
        
        }
        if(!titles[0][3].includes(item.purpose)){
            titles[0][3].push(item.purpose)
        
        }
        if(!titles[0][4].includes(item.credit_amount)){
            titles[0][4].push(item.credit_amount)
        }
        if(!titles[0][5].includes(item.savings_status)){
            titles[0][5].push(item.savings_status)
        
        }
        if(!titles[0][6].includes(item.employment)){
            titles[0][6].push(item.employment)
        
        }
        if(!titles[0][7].includes(item.installment_commitment)){
            titles[0][7].push(item.installment_commitment)
        
        }
        if(!titles[0][8].includes(item.personal_status)){
            titles[0][8].push(item.personal_status)
        }
        if(!titles[0][9].includes(item.other_parties)){
            titles[0][9].push(item.other_parties)
        
        }
        if(!titles[0][10].includes(item.residence_since)){
            titles[0][10].push(item.residence_since)
        
        }
        if(!titles[0][11].includes(item.property_magnitude)){
            titles[0][11].push(item.property_magnitude)
        
        }
        if(!titles[0][12].includes(item.age)){
            titles[0][12].push(item.age)
        }
        if(!titles[0][13].includes(item.other_payment_plans)){
            titles[0][13].push(item.other_payment_plans)
        
        }
        if(!titles[0][14].includes(item.housing)){
            titles[0][14].push(item.housing)
        
        }
        if(!titles[0][15].includes(item.existing_credits)){
            titles[0][15].push(item.existing_credits)
        
        }
        if(!titles[0][16].includes(item.job)){
            titles[0][16].push(item.job)
        }
        if(!titles[0][17].includes(item.num_dependents)){
            titles[0][17].push(item.num_dependents)
        
        }
        if(!titles[0][18].includes(item.own_telephone)){
            titles[0][18].push(item.own_telephone)
        
        }
        if(!titles[0][19].includes(item.foreign_worker)){
            titles[0][19].push(item.foreign_worker)
        }   
    });
    console.log(titles)
    for(let a = 0 ; a < 20 ; a++){
        if(a == 1){
            a = 2
        }
        if(a == 4){
            a = 5
        }
        if(a == 12){
            a = 13
        }
        let y=0
        for( y = 0 ; y < titles[0][a].length ; y++ ){
            if( y <= 0 ){
                titles[1][a].options[y] = new Option('Selecionar')
                titles[1][a].options[y].value = ''
            }
            titles[1][a].options[y+1] = new Option(titles[0][a][y])
        }   
    } 
    nn.normalizeData();
    const trainingOptions = {
      epochs: 320,
      batchSize: 120
    }
    nn.train(trainingOptions, finishedTraining)
    function finishedTraining() {
      classify();
    }
    function classify() {    
        form.addEventListener('submit', function(event) {
        event.preventDefault();
        const input = {
            checking_status: titles[1][0].options[titles[1][0].selectedIndex].value,
            duration: parseFloat(titles[1][1].value),
            credit_history: titles[1][2].options[titles[1][2].selectedIndex].value,
            purpose: titles[1][3].options[titles[1][3].selectedIndex].value,
            credit_amount: parseFloat(titles[1][4].value),
            savings_status: titles[1][5].options[titles[1][5].selectedIndex].value,
            employment: titles[1][6].options[titles[1][6].selectedIndex].value,
            installment_commitment: titles[1][7].options[titles[1][7].selectedIndex].value,
            personal_status: titles[1][8].options[titles[1][8].selectedIndex].value,
            other_parties: titles[1][9].options[titles[1][9].selectedIndex].value,
            residence_since: titles[1][10].options[titles[1][10].selectedIndex].value,
            property_magnitude: titles[1][11].options[titles[1][11].selectedIndex].value,
            age: parseFloat(titles[1][12].value),
            other_payment_plans: titles[1][13].options[titles[1][13].selectedIndex].value,
            housing: titles[1][14].options[titles[1][14].selectedIndex].value,
            existing_credits: titles[1][15].options[titles[1][15].selectedIndex].value,
            job: titles[1][16].options[titles[1][16].selectedIndex].value,
            num_dependents: titles[1][17].options[titles[1][17].selectedIndex].value,
            own_telephone: titles[1][18].options[titles[1][18].selectedIndex].value,
            foreign_worker: titles[1][19].options[titles[1][19].selectedIndex].value
        }
        console.log(input)
        nn.classify(input, handleResults)
      })
     /* const input = {
        checking_status: "<0",
        duration: 6.0,
        credit_history: "critical/other existing credit",
        purpose: "radio/tv",
        credit_amount: 13883.0,
        savings_status: "no known savings",
        employment: ">=7",
        installment_commitment: "4.0",
        personal_status: "male single",
        other_parties: "none",
        residence_since: "4.0",
        property_magnitude: "real estate",
        age: 67.0,
        other_payment_plans: "none",
        housing: "own",
        existing_credits: "2.0",
        job: "skilled",
        num_dependents: "1.0",
        own_telephone: "yes",
        foreign_worker: "yes"
      }
      nn.classify(input, handleResults)
      */
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modelo Entrenado Correctamente',
        showConfirmButton: true,
        timer: 100000
      })
    }
    function handleResults(error, result) {
      if (error) {
        console.error(error);
        return;
      }
      console.log(result);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'el resultado de la evaluacion es - \n' + JSON.stringify(result[0].label) + ': %' + parseFloat(JSON.stringify(result[0].confidence)) * 100 + '\n' + JSON.stringify(result[1].label) + ': %' + parseFloat(JSON.stringify(result[1].confidence)) * 100,
        showConfirmButton: true,
        timer: 100000
      })
    }
  })
  .catch((err) => {
    console.log("Error", err);
  });
