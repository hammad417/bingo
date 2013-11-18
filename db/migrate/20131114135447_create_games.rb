class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :room
      t.integer :status
      t.text :b_pattern
      t.text :i_pattern
      t.text :n_pattern
      t.text :g_pattern
      t.text :o_pattern

      t.timestamps
    end
    add_index :games, :room_id
  end
end
