class Currency < ApplicationRecord
  def calculate_value(amount)
    (current_price.to_f * amount.to_f).round(4)
  end

  def current_price
    url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=' + slug
    response = Faraday.get(url)
    logger.info JSON.parse(response.body)[0]["current_price"]
  end
end
