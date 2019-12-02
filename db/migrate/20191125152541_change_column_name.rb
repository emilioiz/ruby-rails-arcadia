class ChangeColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :prescriptions, :brand_name, :name
  end
end
