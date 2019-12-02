class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.references :user
      t.string "first_name"
      t.string "last_name"
      t.string "photo_url"
      t.string "phone1"
      t.string "phone2"
      t.boolean "notification_opt_in"

      t.timestamps
    end
  end
end