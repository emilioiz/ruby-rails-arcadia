class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.references :user
      t.string  "name", null: false
      t.string  "phone1"
      t.string  "phone2"
      t.string  "fax"
      t.string  "email"
      t.string  "address1"
      t.string  "address2"
      t.string  "city"
      t.string  "state"
      t.string  "zipcode", null: false
      t.string  "country"
      t.text    "notes"

      t.timestamps
    end
  end
end
