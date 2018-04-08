import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import '../../css/components/Vouch.css'

import 'font-awesome/css/font-awesome.min.css';

class VouchAverage extends Component {
  constructor(props){
    super(props);
    this.fivePerc = 0
    this.fourPerc = 0;
    this.threePerc = 0;
    this.twoPerc = 0;
    this.onePerc = 0;
    this.state ={vouches: []};
  }

  componentDidMount(){
      const idFor = this.props._id;
      fetch('/api/account/getVouches?idFor='+idFor)
       .then(res => res.json())
       .then(vouches => this.setState({vouches}));
  }


  countNum(num)
  {
    var count = 0;
    for (var x in this.state.vouches)
    {
      if(x)
      {
        if(this.state.vouches[x].rating===num)
        {
          count++;
        }
      }
    }

    return count;
  }

  perc(num)
  {
    var tot = 0;
    var count = 0;
    for (var x in this.state.vouches)
    {
      if(x)
      {
        tot++;
        if(this.state.vouches[x].rating===num)
        {
          count++;
        }
      }
    }

    return count/tot*100;
  }

  render() {
    this.fivePerc = this.perc(5);
    this.fourPerc = this.perc(4);
    this.threePerc = this.perc(3);
    this.twoPerc = this.perc(2);
    this.onePerc = this.perc(1);

    return (
      <div>
            <div className="container-fluid">
              <div className="rating-breakdown" style={{display:"block"}}>

                <div className="pull-left">
                  <div className="pull-left" style={{width:"50px", lineHeight:1}}>
                      <div style={{height:"9px", margin:"5px", fontSize: "20px"}}>5<i className="fa fa-star" aria-hidden="true"></i></div>
                  </div>
                  <div className="pull-left" style={{width:"130px"}}>
                      <div className="progress" style={{height:"12px", margin:"8px"}}>
                          <div className="progress-bar bg-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="1000" style={{width: this.fivePerc+"%"}}>
                              <span className="sr-only">80% Complete (danger)</span>
                          </div>
                      </div>
                  </div>

                  <div className="pull-right" style={{marginLeft:"5px", fontSize: "20px"}}>{this.countNum(5)}</div>
                </div>

                <div className="pull-left">
                  <div className="pull-left" style={{width:"50px", lineHeight:1}}>
                      <div style={{height:"9px", margin:"5px", fontSize: "20px"}}>4<i className="fa fa-star" aria-hidden="true"></i></div>
                  </div>
                  <div className="pull-left" style={{width:"130px"}}>
                      <div className="progress" style={{height:"12px", margin:"8px"}}>
                          <div className="progress-bar" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="1000" style={{width: this.fourPerc+"%"}}>
                              <span className="sr-only">80% Complete (danger)</span>
                          </div>
                      </div>
                  </div>

                  <div className="pull-right" style={{marginLeft:"5px", fontSize: "20px"}}>{this.countNum(4)}</div>
                </div>

                <div className="pull-left">
                  <div className="pull-left" style={{width:"50px", lineHeight:1}}>
                      <div style={{height:"9px", margin:"5px", fontSize: "20px"}}>3<i className="fa fa-star" aria-hidden="true"></i></div>
                  </div>
                  <div className="pull-left" style={{width:"130px"}}>
                      <div className="progress" style={{height:"12px", margin:"8px"}}>
                          <div className="progress-bar bg-info" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="1000" style={{width: this.threePerc+"%"}}>
                              <span className="sr-only">80% Complete (danger)</span>
                          </div>
                      </div>
                  </div>

                  <div className="pull-right" style={{marginLeft:"5px", fontSize: "20px"}}>{this.countNum(3)}</div>
                </div>

                <div className="pull-left">
                  <div className="pull-left" style={{width:"50px", lineHeight:1}}>
                      <div style={{height:"9px", margin:"5px", fontSize: "20px"}}>2<i className="fa fa-star" aria-hidden="true"></i></div>
                  </div>
                  <div className="pull-left" style={{width:"130px"}}>
                      <div className="progress" style={{height:"12px", margin:"8px"}}>
                          <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="1000" style={{width: this.twoPerc+"%"}}>
                              <span className="sr-only">80% Complete (danger)</span>
                          </div>
                      </div>
                  </div>

                  <div className="pull-right" style={{marginLeft:"5px", fontSize: "20px"}}>{this.countNum(2)}</div>
                </div>

                <div className="pull-left">
                  <div className="pull-left" style={{width:"50px", lineHeight:1}}>
                      <div style={{height:"9px", margin:"5px", fontSize: "20px"}}>1<i className="fa fa-star" aria-hidden="true"></i></div>
                  </div>
                  <div className="pull-left" style={{width:"130px"}}>
                      <div className="progress" style={{height:"12px", margin:"8px"}}>
                          <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="1000" style={{width: this.onePerc+"%"}}>
                              <span className="sr-only">80% Complete (danger)</span>
                          </div>
                      </div>
                  </div>

                  <div className="pull-right" style={{marginLeft:"5px", fontSize: "20px"}}>{this.countNum(1)}</div>
                </div>



                </div>
              </div>
      </div>
    );
  }
}

export default VouchAverage;
