class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.string :name, null: false, default: ""
      t.boolean :is_active, null: false, default: false

      t.timestamps
    end
  end
end
