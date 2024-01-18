import { useEffect, useState, useRef } from "react";

function Calculator() {

    const [selection, setSelection] = useState("");
    const [finalAnswer, setFinalAnswer] = useState(null);
    const prevSelection = useRef("");
    

    useEffect(() => {
        prevSelection.current = selection
    }, [selection]);

    const buttonValues = ["%", "CE", "C", "DEL", "1/x","x2", "Sqrt", "\\", 7, 8, 9, "X",
                            4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "="];
    
    function buttonPress(button) {
        if (button != "=") {
            setSelection((prevState) => [...prevState, button])
        } else {
            handleEqual();
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

        switch (operand) {
            case "+":
                answer = firstNumber + secondNumber;
                break;
        }

        console.log(firstNum);
        console.log(typeof firstNum)
        //setSelection(answer);
        setFinalAnswer(answer);
        setSelection("");
    }

    return (
        <div className="calculator-container">
            <div className="display">
                {finalAnswer != null ? finalAnswer: selection}
                
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
        </div>
    )
};

export default Calculator;