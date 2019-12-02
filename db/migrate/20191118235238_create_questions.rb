class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.references :survey
      t.string :name, null: false, default: ""
      t.boolean :is_active, null: false, default: false

      t.timestamps
    end
  end
end
