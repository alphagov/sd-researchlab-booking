import React from 'react';
import RegisterForm from '../components/register/RegisterForm';

const Register = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <span className="govuk-caption-xl">Guidance</span>
        <h1 className="govuk-heading-xl">Register to book a GDS lab</h1>
      </div>
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-body">
          Enter all the information in the fields below.
        </p>
        <p className="govuk-body">
          You will need access to your email as well a mobile phone.
        </p>
        <p className="govuk-body">
          Only Civil Servants and Local Government employees can register to use
          this service.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;

// import React, { Component } from 'react';
// import { Mutation } from 'react-apollo';
// import { withRouter } from 'react-router-dom';
// import { REGISTER_USER } from '../../queries';
// import Error from '../../containers/Error';

// const initialState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   password: ''
// };

// class Register extends Component {
//   state = { ...initialState };

//   clearState = () => {
//     this.setState({ ...initialState });
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   validateForm = () => {
//     const { firstName, lastName, email, phone, password } = this.state;

//     const isInvalid = !firstName || !lastName || !email || !phone || !password;
//     return isInvalid;
//   };

//   handleSubmit = (event, registerUser) => {
//     event.preventDefault();

//     registerUser()
//       .then(async ({ data }) => {
//         console.log(data.registerUser);
//         const { ok, _id } = data.registerUser;
//         this.clearState();

//         if (ok) {
//           // set a reg jwt?push with id of regtoken?
//           // just
//           this.props.history.push(`/register/confirm/${_id}`);
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   render() {
//     const { firstName, lastName, email, phone, password } = this.state;
//     return (
//       <div className="container">
//         <h3 className="App">Register</h3>
//         <Mutation
//           mutation={REGISTER_USER}
//           variables={{ firstName, lastName, email, phone, password }}
//         >
//           {(registerUser, { data, loading, error }) => {
//             return (
//               <form
//                 onSubmit={(event) => this.handleSubmit(event, registerUser)}
//               >
//                 <div className="row">
//                   <div className="six columns">
//                     <input
//                       type="text"
//                       name="firstName"
//                       placeholder="First name"
//                       onChange={this.handleChange}
//                       value={firstName}
//                       className="u-full-width"
//                     />
//                   </div>
//                   <div className="six columns">
//                     <input
//                       type="text"
//                       name="lastName"
//                       placeholder="Last name"
//                       onChange={this.handleChange}
//                       value={lastName}
//                       className="u-full-width"
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="six columns">
//                     <input
//                       type="email"
//                       className="u-full-width"
//                       name="email"
//                       placeholder="email address"
//                       onChange={this.handleChange}
//                       value={email}
//                     />
//                   </div>
//                   <div className="six columns">
//                     <input
//                       type="text"
//                       className="u-full-width"
//                       name="phone"
//                       placeholder="Phone number"
//                       onChange={this.handleChange}
//                       value={phone}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="six columns">
//                     <input
//                       type="password"
//                       className="u-full-width"
//                       name="password"
//                       placeholder="Password"
//                       onChange={this.handleChange}
//                       value={password}
//                     />
//                   </div>
//                 </div>
//                 <button
//                   className="button-primary"
//                   disabled={loading || this.validateForm()}
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//                 {error && <Error error={error} />}
//               </form>
//             );
//           }}
//         </Mutation>
//       </div>
//     );
//   }
// }

// export default withRouter(Register);