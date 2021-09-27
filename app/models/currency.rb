class Currency < ApplicationRecord
  def calculate_value(amount)
    (current_price.to_f * amount.to_f)  .round(4)
  end

  def current_price
    logger.info("======HITTING THE API NOW===================================")
    url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=' + slug
    response = Faraday.get(url)
    JSON.parse(response.body)[0]["current_price"]
  end
end

# [{"id"=>"bitcoin",
# "symbol"=>"btc",
# "name"=>"Bitcoin",
# "image"=>"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
# "current_price"=>37319,
# "market_cap"=>702183269514,
# "market_cap_rank"=>1,
# "fully_diluted_valuation"=>783198392828,
# "total_volume"=>24816287092,
# "high_24h"=>37859,
# "low_24h"=>36650,
# "price_change_24h"=>275.03,
# "price_change_percentage_24h"=>0.74245,
# "market_cap_change_24h"=>6614874859,
# "market_cap_change_percentage_24h"=>0.951,
# "circulating_supply"=>18827731.0,
# "total_supply"=>21000000.0,
# "max_supply"=>21000000.0,
# "ath"=>54205,
# "ath_change_percentage"=>-31.15289,
# "ath_date"=>"2021-04-14T11:54:46.763Z",
# "atl"=>51.3,
# "atl_change_percentage"=>72647.94285,
# "atl_date"=>"2013-07-05T00:00:00.000Z",
# "roi"=>nil,
# "last_updated"=>"2021-09-27T14:33:41.902Z"}]
