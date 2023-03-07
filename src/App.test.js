import { render, screen } from "@testing-library/react"
import ForgetPassword from "./components/Auth/ForgetPassword";

describe('forget password', () => {
    test('header', () => {
        render(<ForgetPassword/>);
        const headerTxt = screen.getByText('FORGET PASSWORD');
        expect(headerTxt).toBeInTheDocument();
    })
    
    test('lable', () => {
        render(<ForgetPassword/>);
        const lableTxt = screen.getByText('Enter the email with which you have registered.');
        expect(lableTxt).toBeInTheDocument();
    })
     
    test('button', () => {
        render(<ForgetPassword/>);
        const buttonTxt = screen.getByText('Send Link');
        expect(buttonTxt).toBeInTheDocument();
    })
    
})