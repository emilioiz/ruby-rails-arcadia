class CreateJournalEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :journal_entries do |t|
      t.references :journal, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
