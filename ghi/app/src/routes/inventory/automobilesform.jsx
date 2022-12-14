import React from 'react';

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        color:'',
        year:'',
        vin:'',
        model_id:'',
        models:[]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeVin = this.handleChangeVin.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
  }

  async componentDidMount() {
    const modelsUrl = 'http://localhost:8100/api/models/';

    const modelsResponse = await fetch(modelsUrl, {method:"get"});

    if (modelsResponse.ok) {
      const modelsData = await modelsResponse.json();
      this.setState({ models: modelsData.models });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.models;

    const autoUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(autoUrl, fetchConfig);
    if (response.ok) {

      this.setState({
        color:'',
        year:'',
        vin:'',
        model_id:'',
      });
    }
  }

  handleChangeYear(event) {
    const value = event.target.value;
    this.setState({ year: value });
  }

  handleChangeColor(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleChangeModel(event) {
    const value = event.target.value;
    this.setState({ model_id: value });
  }

  handleChangeVin(event) {
    const value = event.target.value;
    this.setState({ vin: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new automobile</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeYear} value = {this.state.year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="mb-3">
                <label htmlFor="color">Color</label>
                <input onChange={this.handleChangeColor} value = {this.state.color} required type = 'text' className="form-control" id="color" name="color"></input>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeVin} value = {this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeModel} value = {this.state.model_id} required name="location" id="location" className="form-select">
                  <option value="">Choose a model_id</option>
                  {this.state.models.map(model_id => {
                    return (
                      <option key={model_id.id} value={model_id.id}>{model_id.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AutomobileForm;