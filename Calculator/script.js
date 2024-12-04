document.getElementById('emiForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const salary = parseFloat(document.getElementById('salary').value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const loanType = document.getElementById('loanType').value;

    const interestRates = {
        home: 8,        
        car: 9,       
        education: 7    
    };

    const annualRate = interestRates[loanType];
    const monthlyRate = annualRate / 12 / 100;

    const maxEMI = 0.4 * salary;

    let suggestedDuration = 0;
    let emi = 0;

    for (let months = 36; months <= 360; months += 12) {
        emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

        if (emi <= maxEMI) {
            suggestedDuration = months;
            break;
        }
    }

  if (suggestedDuration === 0) {
        document.getElementById('results').style.display = 'block';
        document.getElementById('emiResult').textContent = "Loan amount not feasible with your salary.";
        document.getElementById('durationResult').textContent = "";
        return;
    }

    document.getElementById('results').style.display = 'block';
    document.getElementById('emiResult').textContent = `EMI: ₹${emi.toFixed(2)}`;
    document.getElementById('durationResult').textContent = `Suggested Duration: ${suggestedDuration / 12} years (${suggestedDuration} months)`;
});
