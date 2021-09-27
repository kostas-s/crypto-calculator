class AddDataColumnToCurrency < ActiveRecord::Migration[6.1]
  def change
    add_column 'currencies', 'data', :text, null: true
  end
end
