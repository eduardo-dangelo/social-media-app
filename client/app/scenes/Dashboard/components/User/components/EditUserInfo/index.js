import React from 'react';
import FormControl from "../../../../../components/FormControl";

class EditUserInfo extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormControl
          name="firstName"
          type="text"
          placeholder="First Name"
          // value={this.state.firstName}
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <FormControl
          name="lastName"
          type="text"
          placeholder="Last Name"
          // value={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
        <FormControl
          name="email"
          type="text"
          placeholder="Email"
          // value={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
        <button className="btn waves-effect waves-light" type="submit" name="action">
          Save
        </button>
      </form>
    )
  }
}

export default EditUserInfo