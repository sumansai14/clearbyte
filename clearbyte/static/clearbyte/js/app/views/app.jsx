import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

const SearchBox = React.createClass({
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
          this.props.onSubmit();
        }
      },

    render() {
        var searchText = this.props.searchText
        return (
            <div className="search-box">
            <div className="form-group row">
                <div className="col-12">
                    <input className="form-control" value={searchText} onChange={this.props.onChange} onKeyPress={this._handleKeyPress} type="search" placeholder="Eg: google.com" id="example-text-input" pattern="https?://.+" />
                </div>
            </div>
            <div className="row">
                <div className="col-3"> </div>
                <div className="col-2">
                    <button onClick={this.props.onSubmit} className="btn btn-outline-info btn-lg"> Search </button>                    
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-secondary btn-lg"> {"I'm Feeling Lucky"} </button>
                </div> 
                <div className="col-3"> </div>
            </div>
            </div>
        )
    }
});

const Company = React.createClass({
    _onClick() {
        this.props.onButtonClick(this.props.data);
    },
    render() { 
        return (
            <div className="row search-result">
                <div className="col-12">
                    <div className="card">
                        <div className="card-block">
                            <div className="card-title">
                                <div className="col-12 company-block"> 
                                <img src={this.props.data.image_url} className="rounded logo pull-left" alt="..."/>
                                <div>
                                    <h3 className="pull-left">{this.props.data.name}</h3> 
                                    <a target="_blank" href={this.props.data.site_url} className="company-link url"><i className="fa fa-external-link" aria-hidden="true"></i></a>
                                    {this.props.data.linkedin_handle && <a target="_blank" href={"https://linkedin.com/" + this.props.data.linkedin_handle} className="company-link linkedin"><i className="fa fa-linkedin" aria-hidden="true"></i></a>}
                                    {this.props.data.twitter_handle && <a target="_blank" href={"https://twitter.com/" + this.props.data.twitter_handle} className="company-link twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a>}
                                    {this.props.data.angellist_handle && <a target="_blank" href={"https://angellist.com/" + this.props.data.angellist_handle} className="company-link angellist"><i className="fa fa-angellist" aria-hidden="true"></i></a>}
                                    {this.props.data.facebook_handle && <a target="_blank" href={"https://facebook.com/" + this.props.data.facebook_handle} className="company-link facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a>}
                                    {this.props.isSearchResult ? <button className="btn btn-sm btn-outline-success pull-right" onClick={this._onClick}>Add Company</button> : <button className="btn btn-sm btn-outline-danger pull-right" onClick={this._onClick}>Remove Company</button>}
                                </div>
                                <p>{this.props.data.description}</p>
                                <p className="secondary-info"> <i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.data.city}, {this.props.data.state_code} - {this.props.data.country}</p>
                                <p className="secondary-info"> <i className="fa fa-users" aria-hidden="true"></i> {this.props.data.employee_count} Employees</p>                           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
});

const CompaniesList = React.createClass({
    render (){
        const self = this
        const companies = this.props.companies.slice();
        const companiesList = (companies ? companies.map((company, index) => (<Company key={company.id} data={company} isSearchResult={false} onButtonClick={this.props.removeCompany}/>)) : <div/>)
        return (
            <div>
                <h2>Your Companies</h2>
                {companies.length > 0 ? companiesList : <div>No Companies, Add companies</div>}
            </div>
        )
    }
});

const NotFound = React.createClass({
    render() {
        return (
            <div className="row search-result">
                <div className="col-12">
                    <div className="card text-center card-warning">
                        <div className="card-block">
                            <h4 className="card-title">Not Found</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

const Loading = React.createClass({
    render() {
        return (
                <div className="row search-result">
                    <div className="col-12">
                        <div className="card text-center">
                            <div className='contain'>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                              <svg height='80' width='210'>
                                <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>
                              </svg>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
})

const App = React.createClass({

    getInitialState() {
        return {searchText: this.props.params.domainName || '', searchResult:{}, yourCompanies: [], notFound: false, loading: true}
    },
    updateSearchResult(domainName){
        var self = this;
        // console.log(this.state.loading);
        $.get('/api/company/search?domain=' + domainName).done(function(data){
                self.setState({searchResult: data, notFound: false, loading: false});
            }).fail(function(){
                            self.setState({notFound: true, loading: false})
            });
    },
    getCompaniesList() {
        var self = this;
        $.get('/api/company/',  function(data){
            self.setState({yourCompanies: data});
        });
    },
    componentWillMount() {
        if (this.props.params.domainName){
            this.setState({notFound: false, loading: true})
        }
    },
    componentDidMount() {
        if (this.props.params.domainName){
            this.setState({loading: true, notFound: false})
            this.updateSearchResult(this.props.params.domainName)
        }
        this.getCompaniesList();
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.domainName && this.props.params.domainName != nextProps.params.domainName){
            this.setState({loading: true, notFound: false})
            this.updateSearchResult(nextProps.params.domainName)
        }
    },
    onSubmit(){
        this.props.router.push('/company/search/' + this.state.searchText + '/');
    },
    onChange(event){
        this.setState({searchText: event.target.value})
        if (event.target.value === '') {
            this.props.router.push('/');
            this.setState({searchResult: {}})
        }
    },
    addCompany(company) {
        var self = this;
        var companies = this.state.yourCompanies.slice();
        $.post({
            url: '/api/company/',
            data: JSON.stringify(self.state.searchResult),
            success: function(data){
                companies.splice(0, 0, data);
                self.setState({yourCompanies: companies, searchResult: data});
            },
            contentType: 'application/json',
            dataType: 'json'
        })
    },
    removeCompany(company) {
        // console.log(company);
        var self = this
        var companies = this.state.yourCompanies.slice();

        $.ajax({
            url: '/api/company/' + company.id + '/',
            type: 'DELETE',
            success: function(){
                _.remove(companies, function(o){
                    return (company.clearbit_id === o.clearbit_id)
                });
                self.setState({yourCompanies: companies});
            },
        });
    },
    render() {
        var isSearchResult = !_.some(this.state.yourCompanies, { 'clearbit_id': this.state.searchResult.clearbit_id });
        var callback;
        var key;
        var content;
        if (isSearchResult){
            callback = this.addCompany
            key = null
        } else{
            callback = this.removeCompany
            key = this.state.searchResult.id
        }
        if (this.state.loading){
            content = (<Loading />)
        } else if (this.state.notFound) {
            content = (<NotFound />)
        } else {
            content = (<Company data={this.state.searchResult} isSearchResult={isSearchResult} onButtonClick={callback} key={key}/> )
        }
        return (
            <div>
            <h1> Clearbyte </h1>
            <SearchBox searchText={this.state.searchText} onChange={this.onChange} onSubmit={this.onSubmit}/>
            {content}
            <CompaniesList companies={this.state.yourCompanies} removeCompany={this.removeCompany}/>
            </div>
        )        
    }
});

export default App;