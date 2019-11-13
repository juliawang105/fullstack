class Api::CardsController < ApplicationController
    before_action :require_login 

    def create
        # debugger
        @card = Card.new(card_params)

        if @card.save && @card.creator.id == current_user.id 
            render json: @card
        else 
            render json: @card.errors.full_messages,  status: 422 
        end
    end

    def show 
        @card = Card.includes(:deck).find(params[:id])
        render :show 

    end

    def update 
        @card = current_user.decks.cards.find(params[:id])
        
        if @card.update(card_params)
            render json: @card
        else 
            render json: @card.errors.full_messages,  status: 422 
        end
    end

    def destroy
        @card = current_user.decks.cards.find(params[:id])
        @card.destroy
    end 

    private 
    
    def card_params 
        params.require(:card).permit(:question, :answer, :deck_id)
    end
end
