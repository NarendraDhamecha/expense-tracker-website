import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Expenses from "./components/expense-tracker/Expenses";
import Profile from "./components/expense-tracker/Profile";
import Store from "./redux-store/Store";

describe("forget password component", () => {
  test("header", () => {
    render(<ForgetPassword />);
    const headerTxt = screen.getByText("FORGET PASSWORD");
    expect(headerTxt).toBeInTheDocument();
  });

  test("lable", () => {
    render(<ForgetPassword />);
    const lableTxt = screen.getByText(
      "Enter the email with which you have registered."
    );
    expect(lableTxt).toBeInTheDocument();
  });

  test("button", () => {
    render(<ForgetPassword />);
    const buttonTxt = screen.getByText("Send Link");
    expect(buttonTxt).toBeInTheDocument();
  });
});

describe("Profile component", () => {
  test("header", () => {
    render(
      <Provider store={Store}>
        <Profile />
      </Provider>
    );

    const Headertxt = screen.getByText("Contact Details");
    expect(Headertxt).toBeInTheDocument();
  });

  test("profile photo lable", () => {
    render(
      <Provider store={Store}>
        <Profile />
      </Provider>
    );

    const profilePhotoTxt = screen.getByText("Profile Photo URL");
    expect(profilePhotoTxt).toBeInTheDocument();
  });

  test("full name lable", () => {
    render(
      <Provider store={Store}>
        <Profile />
      </Provider>
    );

    const fullNameTxt = screen.getByText("Full Name");
    expect(fullNameTxt).toBeInTheDocument();
  });
});

describe("expenses component", () => {
  test("download expense", () => {
    render(
      <Provider store={Store}>
        <Expenses />
      </Provider>
    );
    
    const activatePremiumbtn = screen.getByText('Activate Premium')
    userEvent.click(activatePremiumbtn);

    const downloadExpensesTxt = screen.getByText('Download Expenses');
    expect(downloadExpensesTxt).toBeInTheDocument()
  });

  test('delete button', () => {
    render(
        <Provider store={Store}>
            <Expenses/>
        </Provider>
    );

    const deleteBtnTxt = screen.getByText('Delete');
    expect(deleteBtnTxt).toBeInTheDocument();
  })

  test('edit button', () => {
    render(
        <Provider store={Store}>
            <Expenses/>
        </Provider>
    );

    const editBtnTxt = screen.getByText('Edit');
    expect(editBtnTxt).toBeInTheDocument();
  })
});
