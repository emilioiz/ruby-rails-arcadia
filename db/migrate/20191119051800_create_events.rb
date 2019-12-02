class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references  :user
      t.datetime    :activity_date, null: false
      t.text        :notes,         null: false
      t.references  :eventable,     polymorphic: true
      t.timestamps
    end
  end
end
