import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

// const date = new Date();
const now = moment();

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide a description and an amount for your expense",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import moment from "moment";
// import { SingleDatePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
// // import "react-dates/initialize";

// export default class ExpenseForm extends Component {
//   state = {
//     description: "",
//     amount: "",
//     note: "",
//     createdAt: moment(),
//     focused: false,
//   };

//   handleDescription = (e) => {
//     const description = e.target.value;
//     this.setState(() => ({ description }));
//   };

//   handleAmount = (e) => {
//     const amount = e.target.value;
//     if (amount.match(/^\d*(\.\d{0,2})?$/)) {
//       this.setState(() => ({ amount }));
//     }
//   };

//   handleNote = (e) => {
//     const note = e.target.value;
//     this.setState(() => ({ note }));
//   };

//   render() {
//     return (
//       <div>
//         <form>
//           <input
//             type="text"
//             placeholder="Description"
//             autoFocus
//             value={this.state.description}
//             onChange={this.handleDescription}
//           />
//           <SingleDatePicker
//             date={this.state.date} // momentPropTypes.momentObj or null
//             onDateChange={(createdAt) => this.setState({ createdAt })} // PropTypes.func.isRequired
//             focused={this.state.focused} // PropTypes.bool
//             onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
//             // id="your_unique_id" // PropTypes.string.isRequired,
//           />
//           <input
//             type="text"
//             placeholder="Amount"
//             value={this.state.amount}
//             onChange={this.handleAmount}
//           />
//           <textarea
//             placeholder="Add a note (optional)"
//             value={this.state.note}
//             onChange={this.handleNote}
//           />
//         </form>
//       </div>
//     );
//   }
// }
