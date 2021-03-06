class CurrenciesController < ApplicationController
  before_action :find_currency, only: [:calculate]

  def index; end

  # Takes in names of portfolio items, returns updated prices
  def refresh_portfolio
    updated_data = Currency.fetch_updated_data_for_coins(params[:coin_names])
    render json: { updated_data: JSON.parse(updated_data) }
  end

  def search
    @currencies = Currency.where('LOWER(name) LIKE ?', "%#{params[:search].downcase}%").order('id ASC')
    render json: { currencies: @currencies }
  end

  # Takes in currency id and amount owned, Returns final calculations
  def calculate
    Integer(params[:amount])
  rescue ArgumentError
    render json: {
      error: 'Amount should be an integer'
    }
  else
    amount = params[:amount]
    @currency.fetch_data
    if @currency.data
      render json: {
        currency: @currency,
        current_price: @currency.current_price,
        amount: amount,
        value: @currency.calculate_value(amount),
        image_src: @currency.image
      }
    else
      render json: {
        error: 'Error fetching resource from API'
      }
    end
  end

  private

  def find_currency
    @currency ||= Currency.find(params[:id])
  end
end
