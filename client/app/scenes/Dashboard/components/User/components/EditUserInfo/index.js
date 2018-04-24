import React from 'react';
import FormControl from "../../../../../components/FormControl";

class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      dob: ''
    }
  }

  componentWillMount() {
    const { user } = this.props;

    this.setState({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob
    });
  }

  componentWillUnmount() {
    this.setState({
      id: '',
      firstName: '',
      lastName: '',
      dob: ''
    });
  }

  handleSubmit(e) {
    const { onSubmit } = this.props;
    const { id, firstName, lastName, dob } = this.state;
    e.preventDefault();

    onSubmit({ id, firstName, lastName, dob })
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="card-title">Edit Profile</div>
        <FormControl
          name="firstName"
          type="text"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <FormControl
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
        <FormControl
          name="dob"
          type="text"
          placeholder="Date of birth"
          value={this.state.dob}
          onChange={(e) => this.setState({ dob: e.target.value })}
        />
        <button className="btn waves-effect waves-light" type="submit" name="action">
          Save
        </button>
      </form>
    )
  }
}

export default EditUserInfo