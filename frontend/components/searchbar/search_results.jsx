import React from 'react';
import { withRouter } from 'react-router-dom';
import DeckItem from '../decks/deck_index_item';
class SearchResults extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            decks: []
        };
        
    };

    componentDidMount(){
        let ids = this.props.history.location.search.slice(5);
        let idArr = ids.split(",").map( id => {
            return parseInt(id)
        });
        
        let result = [];

        for(let i = 0; i < idArr.length; i ++ ){
            this.props.fetchDeck(idArr[i])
            .then( res =>{
                result.push(res.payload.deck)
                this.setState({ decks: result })
            })

        }
    }

    componentDidUpdate(oldProps){
        //debugger
        if(oldProps.location.search !== this.props.location.search){
           //console.log('it hit')
            let ids = this.props.history.location.search.slice(5);
            let idArr = ids.split(",").map(id => {
                return parseInt(id)
            });

            let result = [];

            for (let i = 0; i < idArr.length; i++) {
                this.props.fetchDeck(idArr[i])
                    .then(res => {
                        result.push(res.payload.deck)
                        this.setState({ decks: result })
                 })
            };
        };
    };

    render(){
       
        if(!this.state.decks) return null; 
        let matches = this.state.decks.map( deck => {
            return <DeckItem key={deck.id} 
                             deck={deck} 
                             session={this.props.session} 
                             openModal={this.props.openModal}
                             closeModal={this.props.closeModal}/>
        })
        //debugger
        return(
            <div>
                {matches}
            </div>
        )
    }
};

export default withRouter(SearchResults)