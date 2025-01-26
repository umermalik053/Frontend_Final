import { createResource } from "@/api/crud";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

const LoanCategoriesForm = () => {
    const [calculator, setCalculator] = useState({
        category: "",
        subcategory: "",
        deposit: "",
        loanAmount: "",
        loanPeriod: "",
        estimate: "",

      });
    
      const loanCategories = [
        {
          name: "Wedding Loans",
          subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
          maxLoan: 500000, // 5 Lakh
          maxPeriod: 3, // 3 Years
        },
        {
          name: "Home Construction Loans",
          subcategories: ["Structure", "Finishing", "Loan"],
          maxLoan: 1000000, // 10 Lakh
          maxPeriod: 5, // 5 Years
        },
        {
          name: "Business Startup Loans",
          subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
          maxLoan: 1000000, // 10 Lakh
          maxPeriod: 5, // 5 Years
        },
        {
          name: "Education Loans",
          subcategories: ["University Fees", "Child Fees Loan"],
          maxLoan: "Based on requirement",
          maxPeriod: 4, // 4 Years
        },
      ];


    
      const handleCalculate = () => {
        if (
          !calculator.category ||
          !calculator.subcategory ||
          !calculator.deposit ||
          !calculator.loanAmount ||
          !calculator.loanPeriod
        ) {
          alert("Please fill out all fields");
          return;
        }
      
        const categoryData = loanCategories.find((cat) => cat.name === calculator.category);
        if (categoryData && calculator.loanAmount > categoryData.maxLoan && categoryData.maxLoan !== "Based on requirement") {
          alert(`Maximum loan for ${calculator.category} is PKR ${categoryData.maxLoan}`);
          return;
        }
      
        // Subtract deposit from desired loan amount
        const finalLoanAmount = Number(calculator.loanAmount) - Number(calculator.deposit);
      
        if (finalLoanAmount <= 0) {
          alert("Deposit amount cannot exceed or equal the desired loan amount!");
          return;
        }
      
        // Calculate yearly repayment amount
        const yearlyAmount = (finalLoanAmount / Number(calculator.loanPeriod)).toFixed(2);
      
        // Calculate monthly repayment amount
        const monthlyAmount = (yearlyAmount / 12).toFixed(2);
      
        // Update the calculator state with the breakdown
        setCalculator((prev) => ({
          ...prev,
          estimate: `Loan Amount After Deposit: PKR ${finalLoanAmount}\t \t Yearly Repayment: PKR ${yearlyAmount}\t Monthly Repayment: PKR ${monthlyAmount}`,
        }));
      };

      const handleSubmit = async () =>{
        try {
          const response =  await createResource("/loan/create", calculator)
          console.log(response);
            
        } catch (error) {
            
            alert('An error occurred while submitting the form. Please try again.');
        }
      }
    
      return (
        <div className="p-5 border rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-5">Loan Calculator</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Select Category */}
            <div>
              <label className="block text-blue-600 font-medium mb-2">Select Category</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={calculator.category}
                onChange={(e) => setCalculator((prev) => ({ ...prev, category: e.target.value }))}
              >
                <option value="">-- Select Category --</option>
                {loanCategories.map((cat, index) => (
                  <option key={index} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
    
            {/* Select Subcategory */}
            <div>
              <label className="block text-blue-600 font-medium mb-2">Select Subcategory</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={calculator.subcategory}
                onChange={(e) => setCalculator((prev) => ({ ...prev, subcategory: e.target.value }))}
              >
                <option value="">-- Select Subcategory --</option>
                {loanCategories
                  .find((cat) => cat.name === calculator.category)
                  ?.subcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
    
            {/* Loan Amount */}
            <div>
              <label className="block text-blue-600 font-medium mb-2">Desired Loan Amount (PKR)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={calculator.loanAmount}
                onChange={(e) => setCalculator((prev) => ({ ...prev, loanAmount: e.target.value }))}
              />
            </div>
    
            {/* Initial Deposit */}
            <div>
              <label className="block text-blue-600 font-medium mb-2">Initial Deposit (PKR)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={calculator.deposit}
                onChange={(e) => setCalculator((prev) => ({ ...prev, deposit: e.target.value }))}
              />
            </div>
    
            {/* Loan Period */}
            <div>
              <label className="block text-blue-600 font-medium mb-2">Loan Period (Years)</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={calculator.loanPeriod}
                onChange={(e) => setCalculator((prev) => ({ ...prev, loanPeriod: e.target.value }))}
              >
                <option value="">-- Select Loan Period --</option>
                {Array.from(
                  { length: loanCategories.find((cat) => cat.name === calculator.category)?.maxPeriod || 0 },
                  (_, i) => i + 1
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
    
          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="mt-5 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Calculate
          </button>
    
          {/* Estimated Loan Breakdown */}
          {calculator.estimate && (
            <div className="mt-5 text-xl text-blue-600 font-bold">
              Estimated Loan Breakdown: {calculator.estimate}
            </div>
          )}

          <Button onClick={handleSubmit}>Proceed</Button>
        </div>
      );
};

export default LoanCategoriesForm;
