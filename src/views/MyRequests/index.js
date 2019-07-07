import React, {Component, Fragment} from 'react';
import Header from 'Root/shared/components/Header';
import PageTitle from 'Root/shared/components/PageTitle';
import DeactivateList from 'Root/shared/components/DeactivateList';
import styles from './styles.less';

class MyRequests extends Component {
  state = {
    horizontally: false,
    vertically: true,
    lists: [],
  };

  componentDidMount() {
    this.setState({
      lists: [
        {
          id: '5ceb99b92e98592cd9940d53',
          address: 'TVWmQKmaJNowQewdGz16ekW2jQgXwaAfCc',
          creator: 'TAzaDwcKucTz9YJwMWotXKib4iH4RYG8PJ',
          acceptor: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
          currency: 'tron',
          predictPrice: 8000,
          predictTime: 1559212920, // based on seconds not miliseconds
          predictType: 1,
          submittedPrice: 0,
          disabled: false,
          done: false,
          betAmount: 5000, // 10 in sun
        },
        {
          id: '5ceb99b92e98592cd9940d53',
          address: 'TVWmQKmaJNowQewdGz16ekW2jQgXwaAfCc',
          creator: 'TAzaDwcKucTz9YJwMWotXKib4iH4RYG8PJ',
          acceptor: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
          currency: 'bitcoin',
          predictPrice: 6000,
          predictTime: 1559212920, // based on seconds not miliseconds
          predictType: 1,
          submittedPrice: 0,
          disabled: false,
          done: false,
          betAmount: 1000, // 10 in sun
        },
      ],
    });
  }

  showHorizontally = () => {
    this.setState({vertically: false, horizontally: true});
  };

  showVertically = () => {
    this.setState({vertically: true, horizontally: false});
  };

  isEven = (index) => {
    return ((index + 1) % 2) === 0;
  };

  render() {
    let column = null;
    let rightColDiv = null;
    let leftColDiv = null;

    if (this.state.horizontally) {
      column = 'col-12 mt-4';
      rightColDiv = '';
      leftColDiv = '';
    }

    if (this.state.vertically) {
      column = 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4';
      rightColDiv = 'pr-xl-4 pr-lg-4';
      leftColDiv = 'pl-xl-4 pl-lg-4';
    }
    return (
        <Fragment>
          <Header/>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div
                  className="col-xl-9 col-lg-11 col-md-11 col-sm-11 col-11 body-padding">
                <PageTitle
                    title="My Requests"
                    h={this.state.horizontally}
                    v={this.state.vertically}
                    horizontallyHandler={this.showHorizontally}
                    verticallyHandler={this.showVertically}/>
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="card block-padding">
                      <div className="row">
                        <div
                            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                          <h6 className="block-title">Form number</h6>
                          <div className="row">
                            <div
                                className="col-xl-7 col-lg-7 col-md-9 col-sm-9 col-9 pr-0">
                              <input className="form-control simple-form"
                                     pattern="[A-Za-z]"
                                     type="text"
                                     placeholder="Enter your form number"/>
                            </div>
                            <div className="col-3 text-right pl-xl-4 pl-lg-4">
                              <button
                                  className="btn simple-btn ml-xl-2 ml-lg-2">Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {this.state.lists.map((list, index) => (
                      <div className={column} key={index}>
                        <div className={this.isEven(index) ?
                            leftColDiv :
                            rightColDiv}>
                          <DeactivateList
                              list={list}
                              horizontally={this.state.horizontally}
                              vertically={this.state.vertically}
                          />
                        </div>
                      </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default MyRequests;
