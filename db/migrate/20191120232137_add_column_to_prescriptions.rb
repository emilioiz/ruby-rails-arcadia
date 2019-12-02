class AddColumnToPrescriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :prescriptions, :brand_name,   :string
    add_column :prescriptions, :generic_name, :string
    add_column :prescriptions, :dosage_form,  :string
    add_column :prescriptions, :product_type, :string
    add_column :prescriptions, :product_id,   :string
    add_column :prescriptions, :product_ndc,  :string
    add_column :prescriptions, :user_dosage,  :string
    add_column :prescriptions, :user_notes,   :string
  end
end
