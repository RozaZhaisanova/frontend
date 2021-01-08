import React, { Component } from "react";
import ClientDataService from "../services/client.service";

export default class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getClient(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          name: name
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        email: email
      }
    }));
  }

  getClient(id) {
    ClientDataService.get(id)
      .then(response => {
        this.setState({
          currentClient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentClient.id,
      title: this.state.currentClient.title,
      description: this.state.currentClient.description,
      published: status
    };

    ClientDataService.update(this.state.currentClient.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentClient: {
            ...prevState.currentClient,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClient() {
    ClientDataService.update(
      this.state.currentClient.id,
      this.state.currentClient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The client was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClient() {    
    ClientDataService.delete(this.state.currentClient.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentClient } = this.state;

    return (
      <div>
        {currentClient ? (
          <div className="edit-form">
            <h4>Client</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentClient.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentClient.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentClient.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentClient.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteClient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateClient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Client...</p>
          </div>
        )}
      </div>
    );
  }
}