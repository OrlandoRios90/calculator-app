import { useEffect, useState, useRef } from "react";

function Calculator() {

    const [selection, setSelection] = useState("");
    const [finalAnswer, setFinalAnswer] = useState(null);
    const prevSelection = useRef("");
    

    useEffect(() => {
        prevSelection.current = selection
    }, [selection]);

    const buttonValues = ["%", "CE", "C", "DEL", "1/x","^2", "Sqrt", "\\", 7, 8, 9, "X",
                            4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "="];
    
    function buttonPress(button) {
        
        const operationButtons = [1,2,3,4,5,6,7,8,9,0,"+", "-", "\\", "Sqrt", "^2", "%", "1/x", "X"];

        if (operationButtons.includes(button)) {
            setSelection((prevState) => [...prevState, button])
        } else if (button === "C" || button === "CE") {
            setSelection("");
            setFinalAnswer(null);
        } else if (button === "=") {
            handleEqual();
        } else if (button === "DEL") {
            setSelection(prevState => prevState.slice(0,-1));
        }

    }

    const handleEqual = () => {
        let firstNum = [];
        let firstNumComplete = false;
        let operand;
        let secondNum = [];

        for (let value of selection) {
            if (typeof value === "number" && firstNumComplete === false) {
                firstNum.push(value)
            } else if (typeof value != "number") {
                operand = value;
                firstNumComplete = true;
            } else if (typeof value === "number" && firstNumComplete === true) {
                secondNum.push(value)
            }
         }
        
        firstNum = firstNum.join("");
        secondNum = secondNum.join("");
            
        handleMath(firstNum, operand, secondNum);
        
    }

    const handleMath = (firstNum, operand, secondNum) => {
        let answer;
        const firstNumber = Number(firstNum);
        const secondNumber = Number(secondNum);

        console.log(operand)
        switch (operand) {
            case "+":
                answer = firstNumber + secondNumber;
                break;
            case "-":
                answer = firstNumber - secondNumber;
                break;
            case "X":
                answer = firstNumber * secondNumber;
                break;
            case "^2":
                answer = firstNumber * firstNumber;
                break;
            case "\\":
                answer = firstNumber / secondNumber;
                break;
            case "1/x":
                answer = 1 / firstNumber;
                break;
            case "Sqrt":
                answer = Math.sqrt(firstNumber);
                break;
            case "%":
                answer = firstNumber % secondNumber;
        }

        setFinalAnswer(answer);
        setSelection("");
    }

    return (
        <div className="calculator-container">
            <div className="display">
                <h4>
                    {finalAnswer != null ? finalAnswer: selection}
                </h4>
            </div>
            <div className="buttons-section">
                {buttonValues.map(button => {
                    return (
                        <button className={button === "=" ? "calc-btn equal" : "calc-btn"}
                            id={button} value={button} key={button} onClick={() => buttonPress(button)}>
                            {button}
                        </button> 
                    )
                })}
            </div>
            <div className="please-clear">
                <h5>For best results please hit C or CE after each operation</h5>
            </div>
        </div>
    )
};

export default Calculator;